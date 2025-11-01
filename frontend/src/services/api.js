import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const predictQoS = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/predict`, data);
    
    if (response.data.success) {
      return response.data.prediction;
    } else {
      throw new Error(response.data.error || 'Failed to predict QoS metrics');
    }
  } catch (error) {
    console.error('Error predicting QoS metrics:', error);
    throw error;
  }
};

export const checkHealth = async () => {
  try {
    const response = await axios.get(`${API_URL}/health`);
    return response.data;
  } catch (error) {
    console.error('Error checking API health:', error);
    throw error;
  }
};