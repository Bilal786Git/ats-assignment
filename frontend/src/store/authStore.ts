"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@ats/types";

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

function getInitialState(): {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
} {
  if (typeof window === "undefined") {
    return { token: null, user: null, isAuthenticated: false };
  }
  try {
    const stored = localStorage.getItem("ats_auth");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.token) {
        return {
          token: parsed.token,
          user: parsed.user || null,
          isAuthenticated: true,
        };
      }
    }
  } catch {}
  return { token: null, user: null, isAuthenticated: false };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...getInitialState(),

      setAuth: (token, user) => {
        set({ token, user, isAuthenticated: true });
      },

      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
      },
    }),
    {
      name: "ats_auth",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
