import apiClient from "./api-client";
import type { LoginResponse, User } from "../types/auth";

interface LoginPayload {
  username: string;
  password: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const loginApi = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const response = await apiClient.post<
    ApiResponse<LoginResponse>
  >("/api/auth/login", payload);

  return response.data.data;
};

export const getMeApi = async (): Promise<User> => {
  const response = await apiClient.get<ApiResponse<User>>(
    "/api/auth/me"
  );

  return response.data.data;
};