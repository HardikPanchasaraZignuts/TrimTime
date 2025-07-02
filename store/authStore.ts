import { User } from "firebase/auth";
import { create } from "zustand";


interface AuthState {
    user: User | null;
    setUser: (user: User | null) => void;
    isLoading: boolean;
    setIsLoading: (val: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoading: false,
    setUser: (user) => set({user}),
    setIsLoading: (val) => set({ isLoading: val})
}))