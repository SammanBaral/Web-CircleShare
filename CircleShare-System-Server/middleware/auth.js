const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const User = require("../models/User");

// 🔹 PROTECT ROUTES: Ensure user is authenticated
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]; // Extract token
  }

  // 🔸 If no token, check if user ID is provided in request body (alternative authentication)
  if (!token && req.body.userId) {
    const user = await User.findById(req.body.userId).select("-password"); // Exclude password
    if (!user) {
      return res.status(401).json({ message: "User not found. Authentication failed." });
    }
    req.user = user;
    return next();
  }

  // 🔸 Ensure token exists
  if (!token) {
    return res.status(401).json({ message: "Not authorized to access this route" });
  }

  try {
    // 🔸 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token, authorization denied" });
  }
});

// 🔹 AUTHORIZE ACCESS: Grant access to specific roles (e.g., admin, publisher)
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `User role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};

// 🔹 ADMIN ACCESS: Ensure only admins can access certain routes
exports.adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied, admin privileges required" });
  }
  next();
};

// 🔹 RESOURCE OWNERSHIP VALIDATION: Ensure users can only modify their own data
exports.ownerMiddleware = (model) => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params.id;
      const resource = await model.findById(resourceId);

      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }

      // Check if user is the owner of the resource
      const ownerId = resource.userId || resource.ownerId || resource.lenderId;
      if (!ownerId || ownerId.toString() !== req.user.id.toString()) {
        return res.status(403).json({ message: "You don't have permission to modify this resource" });
      }

      req.resource = resource;
      next();
    } catch (error) {
      res.status(500).json({ message: "Error checking resource ownership", error: error.message });
    }
  };
};