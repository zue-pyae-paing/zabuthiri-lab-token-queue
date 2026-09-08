import { create } from "zustand";

import type { User } from "../../../types/auth";
import { loginApi } from "../../../api/auth.api";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (
    username: string,
    password: string
  ) => Promise<void>;

  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: localStorage.getItem("accessToken"),
  isAuthenticated: !!localStorage.getItem("accessToken"),
  isLoading: false,

  login: async (username, password) => {
    set({ isLoading: true });

    try {
      const result = await loginApi({
        username,
        password,
      });

      localStorage.setItem(
        "accessToken",
        result.token
      );

      localStorage.setItem(
        "auth-user",
        JSON.stringify(result.user)
      );

      set({
        accessToken: result.token,
        user: result.user,
        isAuthenticated: true,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("auth-user");

    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    });
  },
}));