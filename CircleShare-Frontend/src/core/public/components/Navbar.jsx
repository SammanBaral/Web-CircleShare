import { Link, useLocation } from 'react-router-dom';
import circleLogo from '../../../assets/image/circle_logo.png'; // Adjust the path if necessary

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed w-full bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img src={circleLogo} alt="Logo" className="h-20 w-auto" />
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

          {/* User Info */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Samman</span>
            <img
              src="https://gravatar.com/avatar/505aeac1b7c876f0a820d868c3f58ace?s=400&d=robohash&r=x" // Replace with the actual avatar URL
              alt="User Avatar"
              className="h-10 w-10 rounded-full"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;