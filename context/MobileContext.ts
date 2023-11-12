import { create } from "zustand";

interface IMobileStore {
  isOnMobile: boolean;
  setIsOnMobile: (b: boolean) => void;
}

export const MobileStore = create<IMobileStore>()((set) => ({
  isOnMobile: false,
  setIsOnMobile: (b: boolean) => set({ isOnMobile: b }),
}));
