import type { AuthStore, Login, Signup } from "@/types/auth";
import { create } from "zustand";
import api from "@/lib/axios";

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthLoading: true,
  isSubmitting: false,
  isAuthenticated: false,
  error: null,

  initializeAuth: async (): Promise<void> => {
    set({ isAuthLoading: true });

    try {
      const res = await api.get("api/auth/me");
      const data = res.data;

      set({ user: data, isAuthenticated: true });
    } catch (error) {
      console.error(error);
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isAuthLoading: false });
    }
  },

  signup: async (authData: Signup): Promise<void> => {
    set({ isSubmitting: true });

    try {
      const res = await api.post("api/auth/register", authData);

      const data = res.data;

      set({ user: data, isAuthenticated: true });
    } catch (error: any) {
      console.error(error);
      set({ error: error.response?.data?.message || error.message });
    } finally {
      set({ isSubmitting: false });
    }
  },

  login: async (authData: Login): Promise<void> => {
    set({ isSubmitting: true });

    try {
      const res = await api.post("api/auth/login", authData);

      const data = res.data;

      set({ user: data, isAuthenticated: true });
    } catch (error: any) {
      console.error(error);
      set({ error: error.response?.data?.message || error.message });
    } finally {
      set({ isSubmitting: false });
    }
  },

  logout: async (): Promise<void> => {
    try {
      await api.post("api/auth/logout");
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },
}));
