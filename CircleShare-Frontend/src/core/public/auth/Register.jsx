import { useRegister } from '@/hooks/useRegister';
import { useState } from 'react';
import { FiLock, FiMail, FiPhone, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/image/circle_logo.png'; // Adjust the path to your logo image

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState(''); // 🔹 New username field
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { register, isLoading, error } = useRegister();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const result = await register(firstName, lastName, username, email, phone, password);

    if (result.success) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">

        {/* Left Side - Form */}
        <div className="w-full md:w-3/5 p-8">
          <div className="text-center mb-6">
            <img src={logo} alt="Logo" className="h-24 w-auto mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-neutral-900">Create your account</h1>
            <p className="text-neutral-600">Join our community of sharers today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First & Last Name */}
            <div className="flex gap-2">
              <input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-1/2 p-2 border rounded-lg" required />
              <input type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-1/2 p-2 border rounded-lg" required />
            </div>

            {/* Username */}
            <div className="flex items-center border rounded-lg p-2">
              <FiUser className="text-gray-500" />
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 focus:outline-none" required />
            </div>

            {/* Email */}
            <div className="flex items-center border rounded-lg p-2">
              <FiMail className="text-gray-500" />
              <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 focus:outline-none" required />
            </div>

            {/* Phone Number */}
            <div className="flex items-center border rounded-lg p-2">
              <FiPhone className="text-gray-500" />
              <input type="text" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 focus:outline-none" required />
            </div>

            {/* Password */}
            <div className="flex items-center border rounded-lg p-2">
              <FiLock className="text-gray-500" />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 focus:outline-none" required />
            </div>

            {/* Confirm Password */}
            <div className="flex items-center border rounded-lg p-2">
              <FiLock className="text-gray-500" />
              <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 focus:outline-none" required />
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={isLoading} className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            {/* Already Have an Account */}
            <p className="text-center text-sm text-neutral-600">
              Already have an account? <Link to="/login" className="text-black font-medium">Sign in</Link>
            </p>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block md:w-2/5 bg-gray-300 flex items-center justify-center">
          <img src={"src/assets/image/image.png"} alt="Side Image" className="h-full w-auto object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Register;