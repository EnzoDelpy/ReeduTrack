import apiClient from "./client";

export const getUserExercice = async (
  queryParams: Record<string, any> = {},
  userId: number
) => {
  const response = await apiClient.get(`/user/${userId}/exercises`, {
    params: queryParams,
  });
  return response.data;
};

export const createUserExercise = async (data: {
  user_id: number;
  exercice_id: number;
  date: string;
  Optional: boolean;
  Checked: boolean;
  series: number;
  repetitions: number;
}) => {
  const response = await apiClient.post('/userexercice', data);
  return response.data;
};
