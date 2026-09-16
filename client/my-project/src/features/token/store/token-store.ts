import { create } from "zustand";

import {
  completePatientApi,
  getStaffSnapshotApi,
  nextPatientApi,
  recallPatientApi,
} from "../../../api/token.api";

import { registerTokenApi } from "../../../api/register.api";

import { staffSocket } from "../../../lib/socket";

import type { Patient, QueueSnapshot } from "../../../types/token";

interface TokenStore {
  queue: Patient[];
  currentPatient: Patient | null;

  isLoading: boolean;
  isActionLoading: boolean;
  isRegistering: boolean;

  error: string | null;

  initialize: () => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;

  registerPatient: (patientName: string, age: number) => Promise<Patient>;

  callNext: () => Promise<void>;
  recall: () => Promise<void>;
  complete: () => Promise<void>;

  clearError: () => void;
}

export const useTokenStore = create<TokenStore>((set) => ({
  queue: [],
  currentPatient: null,

  isLoading: false,
  isActionLoading: false,
  isRegistering: false,

  error: null,

  // ----------------------------------------
  // Initialize
  // ----------------------------------------

  initialize: async () => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const snapshot = await getStaffSnapshotApi();

      set({
        queue: snapshot.queue,
        currentPatient: snapshot.currentPatient,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message ?? "Failed to load queue.",
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  // ----------------------------------------
  // Socket
  // ----------------------------------------

  connectSocket: () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      return;
    }

    staffSocket.auth = {
      token,
    };

    const handleQueueUpdated = (snapshot: QueueSnapshot) => {
      set({
        queue: snapshot.queue,
        currentPatient: snapshot.currentPatient,
        error: null,
      });
    };

    staffSocket.off("staff:queue-updated");

    staffSocket.on("staff:queue-updated", handleQueueUpdated);

    if (!staffSocket.connected) {
      staffSocket.connect();
    }
  },

  disconnectSocket: () => {
    staffSocket.off("staff:queue-updated");

    if (staffSocket.connected) {
      staffSocket.disconnect();
    }
  },

  // ----------------------------------------
  // Register Patient
  // ----------------------------------------

  registerPatient: async (patientName, age) => {
    set({
      isRegistering: true,
      error: null,
    });

    try {
      const patient = await registerTokenApi({
        patientName,
        age,
      });

      return patient;
    } catch (error: any) {
      const message =
        error.response?.data?.message ?? "Failed to register patient.";

      set({
        error: message,
      });

      throw new Error(message);
    } finally {
      set({
        isRegistering: false,
      });
    }
  },

  // ----------------------------------------
  // Call Next
  // ----------------------------------------

  callNext: async () => {
    set({ isActionLoading: true, error: null });

    try {
      await nextPatientApi();
    } catch (error: any) {
      set({
        error: error.response?.data?.message ?? "Failed to call next patient.",
      });
    } finally {
      set({ isActionLoading: false });
    }
  },

  // ----------------------------------------
  // Recall
  // ----------------------------------------

  recall: async () => {
    set({
      isActionLoading: true,
      error: null,
    });

    try {
      await recallPatientApi();
    } catch (error: any) {
      set({
        error: error.response?.data?.message ?? "Failed to recall patient.",
      });
    } finally {
      set({
        isActionLoading: false,
      });
    }
  },

  // ----------------------------------------
  // Complete
  // ----------------------------------------

  complete: async () => {
    set({
      isActionLoading: true,
      error: null,
    });

    try {
      await completePatientApi();
    } catch (error: any) {
      set({
        error: error.response?.data?.message ?? "Failed to complete patient.",
      });
    } finally {
      set({
        isActionLoading: false,
      });
    }
  },

  clearError: () => {
    set({
      error: null,
    });
  },
}));
