import { UserRoleType } from "@/lib/constant";
import { create } from "zustand";

interface UserInterface {
    id: number,
    email?: string,
    mobile?: number,
    name: string,
    gender: string,
    roles: UserRoleType[],
    householdId?: number,
    isActive: boolean,
    isDeleted: boolean,
    updatedBy?: string,
    updatedOn?: Date,
    createdBy?: string,
    createdOn?: Date
}

interface AuthStateInterface {
  user: UserInterface | null;
  token: string | null;
  setUser: (user: UserInterface) => void;
  setToken: (token: string) => void;
  fetchUser: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStateInterface>((set) => ({
  user: null,
  token: null,

  setUser: (user) => set({ user }),
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },
  fetchUser: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("/api/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Invalid token");

      const user = await res.json();
      set({ user });
    } catch (error) {
      console.error("Failed to fetch user", error);
      localStorage.removeItem("token");
      set({ user: null, token: null });
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
