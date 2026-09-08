import apiClient from "./api-client";

import type {
  Patient,
  QueueSnapshot,
} from "../types/token";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const getQueueApi = async (): Promise<
  Patient[]
> => {
  const response = await apiClient.get<
    ApiResponse<Patient[]>
  >("/api/tokens/queue");

  return response.data.data;
};

export const getCurrentApi = async (): Promise<
  Patient | null
> => {
  const response = await apiClient.get<
    ApiResponse<Patient | null>
  >("/api/tokens/current");

  return response.data.data;
};

export const getStaffSnapshotApi =
  async (): Promise<QueueSnapshot> => {
    const [queue, currentPatient] =
      await Promise.all([
        getQueueApi(),
        getCurrentApi(),
      ]);

    return {
      queue,
      currentPatient,
    };
  };

export const nextPatientApi =
  async (): Promise<Patient> => {
    const response = await apiClient.post<
      ApiResponse<Patient>
    >("/api/tokens/next");

    return response.data.data;
  };

export const recallPatientApi =
  async (): Promise<Patient> => {
    const response = await apiClient.post<
      ApiResponse<Patient>
    >("/api/tokens/recall");

    return response.data.data;
  };

export const completePatientApi =
  async (): Promise<Patient> => {
    const response = await apiClient.post<
      ApiResponse<Patient>
    >("/api/tokens/complete");

    return response.data.data;
  };