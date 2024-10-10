import apiClient from './client';

export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/login', { email, password });
  return response.data;
};

