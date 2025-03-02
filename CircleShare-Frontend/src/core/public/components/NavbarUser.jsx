import { Link, useLocation } from 'react-router-dom';

const NavbarUser = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed w-full bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img src={'src/assets/image/circle_logo.png'} alt="Logo" className="h-20 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {[
              { path: '/dashboard', label: 'Home' },
              { path: '/how-it-works', label: 'How it Works' },
              { path: '/about', label: 'About' }
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`relative text-sm font-medium transition-colors group ${isActive(path) ? 'text-black' : 'text-gray-600 hover:text-black'
                  }`}
              >
                {label}
                {isActive(path) && <div className="absolute left-0 w-full h-0.5 bg-black bottom-0" />}
              </Link>
            ))}
          </div>

          {/* Sign in and Sign up */}
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-sm text-gray-600 hover:text-black">
              Sign in
            </Link>
            <Link to="/signup" className="bg-black text-white px-4 py-1.5 text-sm rounded-md hover:bg-gray-800">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarUser;