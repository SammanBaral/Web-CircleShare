import axios from 'axios';
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("🔄 Attempting login with:", { username, password });

      const response = await axios.post('/api/user/login', { username, password });

      console.log("✅ Login successful:", response.data);

      const { user, token } = response.data;

      if (!token) {
        throw new Error("⚠️ No token received from the server.");
      }

      // ✅ Save token separately to prevent missing token issues
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // ✅ Double-check if token is stored
      console.log("📌 Stored Token:", localStorage.getItem('token'));

      // ✅ Update auth context
      dispatch({ type: 'LOGIN', payload: { ...user, token } });

      setIsLoading(false);
      return { success: true };
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data || error.message);

      const errorMessage = error.response?.data?.message || 'An error occurred';
      setError(errorMessage);
      setIsLoading(false);

      return { success: false, error: errorMessage };
    }
  };

  return { login, isLoading, error };
};
