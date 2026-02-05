import { create } from "zustand";

interface NetworkState {
  isOnline: boolean;
  isUnstable: boolean;
  setIsOnline: (status: boolean) => void;
  setIsUnstable: (status: boolean) => void;
}

export const useNetworkStore = create<NetworkState>((set) => ({
  isOnline: typeof window !== "undefined" ? window.navigator.onLine : true,
  isUnstable: false,
  setIsOnline: (status) => set({ isOnline: status }),
  setIsUnstable: (status) => set({ isUnstable: status }),
}));
