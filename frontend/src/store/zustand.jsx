import { create } from "zustand";

export const useStore = create((set) => ({
  isLogin: false,
  setIsLogin: (value) => set(() => ({ isLogin: value })),
  isAdmin: "user",
  setIsAdmin: (value) => set(() => ({ isAdmin: value })),
}));
