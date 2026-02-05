import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { isTokenExpired } from "@/utils/token";
import { encryptedStorage } from "@/utils/encryptedStorage";

interface User {
  id: number;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN" | "STUDENT" | "TEACHER";
  name?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  login: (token: string, user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  checkTokenExpiry: () => boolean;
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
      token: null,
      isAuthenticated: false,
      redirectPath: null,

      // Login action
      login: (token, user) =>
        set({
          token,
          user,
          isAuthenticated: true,
        }),

      // Update token only
      setToken: (token) => set({ token }),

      // Logout action
      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        }),

      // Update user info (for profile updates)
      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),

      checkTokenExpiry: () => {
        const { token } = get();

        if (!token) {
          return false;
        }

        if (isTokenExpired(token)) {
          // We don't call logout() here anymore because we want to allow
          // the refresh token interceptor to handle it when an API call is made.
          return true;
        }
        return false;
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => encryptedStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
