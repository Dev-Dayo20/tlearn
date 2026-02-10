import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { isTokenExpired } from "@/utils/token";

interface User {
  id: number;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN" | "STUDENT" | "TEACHER";
  name?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;

  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

// Helper functions for redirect path (outside of Zustand)
export const saveRedirectPath = (path: string) => {
  localStorage.setItem("redirect-path", path);
};

export const getRedirectPath = (): string | null => {
  return localStorage.getItem("redirect-path");
};

export const clearRedirectPath = () => {
  localStorage.removeItem("redirect-path");
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      redirectPath: null,

      login: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),

      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
