import { create } from "zustand";
import type { AppStore } from "../types/app";
import { persist } from "zustand/middleware";


export const useAppStore = create<AppStore>()(
  persist((set) => ({

    theme: "dark",

    changeTheme: (theme) => {
        set({theme: theme})
    }
  }), { name: "app-store" }),
);