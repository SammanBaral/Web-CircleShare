const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

// Create uploads directories if they don't exist
const createUploadsDirectories = () => {
  const dirs = ["./uploads", "./uploads/items"];
  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

createUploadsDirectories();

// Multer file filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

// Storage configuration for item images
const itemStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/items");
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(12, (err, buffer) => {
      const filename = buffer.toString("hex") + path.extname(file.originalname);
      cb(null, filename);
    });
  },
});

const uploadItemImage = multer({
  storage: itemStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1, // Single file
  },
});

module.exports = {
  uploadItemImage: uploadItemImage.single("imageFile"),
};
