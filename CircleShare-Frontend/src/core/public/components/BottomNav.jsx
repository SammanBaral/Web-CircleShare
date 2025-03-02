import { FiHome, FiPlusCircle, FiSearch, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const BottomNav = () => {
  return (
    <footer className="bg-white h-16 border-t border-gray-200 flex justify-around items-center">
      <Link to="/dashboard" className="flex flex-col items-center text-black">
        <FiHome className="text-xl" />
        <span className="text-xs mt-1">Home</span>
      </Link>
      <Link to="/search" className="flex flex-col items-center text-gray-400 hover:text-black">
        <FiSearch className="text-xl" />
        <span className="text-xs mt-1">Search</span>
      </Link>
      <Link to="/add-item" className="flex flex-col items-center text-gray-400 hover:text-black">
        <FiPlusCircle className="text-xl" />
        <span className="text-xs mt-1">Add Item</span>
      </Link>
      <Link to="/profile" className="flex flex-col items-center text-gray-400 hover:text-black">
        <FiUser className="text-xl" />
        <span className="text-xs mt-1">Profile</span>
      </Link>
    </footer>
  );
};

export default BottomNav;