import { create } from "zustand";
import { persist } from "zustand/middleware";
import { isTokenExpired } from "@/utils/token";

interface User {
  id: number;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN" | "STUDENT";
  name?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  checkTokenExpiry: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,

      // Login action
      login: (token, user) =>
        set({
          token,
          user,
          isAuthenticated: true,
        }),

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
        const { token, logout } = get();

        if (!token) {
          return false;
        }

        if (isTokenExpired(token)) {
          logout();
          return true;
        }
        return false;
      },
    }),
    {
      name: "auth-storage",
      // Only persist these fields
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

if (typeof window !== "undefined") {
  const checkInterval = setInterval(() => {
    const store = useAuthStore.getState();
    if (store.isAuthenticated) {
      store.checkTokenExpiry();
    } else {
      clearInterval(checkInterval);
    }
  }, 60000);
}
