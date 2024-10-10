import apiClient from "./client";

export const getUserExercice = async (queryParams: Record<string, any> = {}, userId: number) => {
  const response = await apiClient.get(`/user/${userId}/exercises`, { params: queryParams });
  return response.data;
};
