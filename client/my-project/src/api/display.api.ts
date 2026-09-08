import apiClient from "./api-client";
import type { DisplayQueueSnapshot } from "../types/token";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const getDisplaySnapshotApi =
  async (): Promise<DisplayQueueSnapshot> => {
    const response =
      await apiClient.get<ApiResponse<DisplayQueueSnapshot>>(
        "/api/tokens/display",
      );

    return response.data.data;
  };