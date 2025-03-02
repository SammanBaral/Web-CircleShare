import circleLogo from '@/assets/image/circle_logo.png'; // Adjust path
import { useLogin } from '@/hooks/useLogin';
import { useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import ForgotPasswordModal from './ForgotPassword';

const LoginPage = () => {
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login, isLoading, error } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(username, password);
    if (result.success) {
      if (username === 'sir' && password === 'sir@123') {
        navigate('/admin/dashboard'); // Redirect to admin dashboard
      } else {
        navigate('/dashboard'); // Redirect to user dashboard
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side - Login Form */}
        <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
          {/* Logo */}
          <div className="flex justify-center">
            <Link to="/">
              <img src={circleLogo} alt="Logo" className="h-28 mt-4 w-30" />
            </Link>
          </div>

          {/* Welcome Text */}
          <h2 className="text-2xl font-bold text-gray-900 text-center">Welcome back</h2>
          <p className="text-center text-gray-600 mb-6">Sign in to your account</p>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FaUser className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Username"
                className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <button
                type="button"
                onClick={() => setIsForgotPasswordOpen(true)}
                className="text-gray-600 hover:underline"
              >
                Forgot your password?
              </button>
            </div>

            <button type="submit" className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800">
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>

            {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account? <Link to="/register" className="text-black font-medium hover:underline">Sign up</Link>
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block md:w-2/5 bg-gray-200 flex items-center justify-center">
          <img src={"src/assets/image/dog/download1.jpeg"} alt="Login Illustration" className="object-cover w-full h-full" />
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal isOpen={isForgotPasswordOpen} onClose={() => setIsForgotPasswordOpen(false)} />
    </div>
  );
};

export default LoginPage;