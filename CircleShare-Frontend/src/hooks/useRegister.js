import { useAuthContext } from '@/context/AuthContext';
import axios from 'axios';
import { useState } from 'react';

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const register = async (firstName, lastName, username, email, phone, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const userData = {
        firstName,
        lastName,
        username,
        email,
        phone,
        password,
        profilePictureUrl: null, // Defaulting to null
        isAdmin: false, // Assuming new users are not admins
        averageRating: 0 // Default rating for new users
      };

      const response = await axios.post("/api/user/create", userData);

      const { user, token } = response.data;

      localStorage.setItem('circleshare_user', JSON.stringify({ ...user, token }));

      dispatch({ type: 'LOGIN', payload: { ...user, token } });

      setIsLoading(false);
      return { success: true };
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      setIsLoading(false);
      return { success: false, error: error.response?.data?.message };
    }
  };

  return { register, isLoading, error };
};
