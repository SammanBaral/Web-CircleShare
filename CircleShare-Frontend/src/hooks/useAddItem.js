import axios from 'axios';
import { useState } from 'react';

export const useAddItem = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addItem = async (itemData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/items/create', itemData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setIsLoading(false);
      return { success: true, data: response.data };
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to add item');
      setIsLoading(false);
      return { success: false, error: error.response?.data?.error };
    }
  };

  return { addItem, isLoading, error };
};
