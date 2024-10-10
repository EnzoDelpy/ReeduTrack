import apiClient from './client';

export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/login', { email, password });
  return response.data;
};

// export const register = async (email: string, password: string) => {
//   const response = await apiClient.post('/users', { email, password });
//   return response.data;
// };

// export const logout = async () => {
//   const response = await apiClient.post('/logout');
//   return response.data;
// };
