import apiClient from "./api-client";

import type { Patient } from "../types/token";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const registerTokenApi = async (payload: {
  patientName: string;
  age: number;
}): Promise<Patient> => {
  const response = await apiClient.post<
    ApiResponse<Patient>
  >("/api/tokens", payload);

  return response.data.data;
};