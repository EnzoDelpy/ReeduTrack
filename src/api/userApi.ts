import apiClient from "./client";

export const getUsers = async (queryParams: Record<string, any> = {}) => {
  const response = await apiClient.get("/users", { params: queryParams });
  return response.data;
};
