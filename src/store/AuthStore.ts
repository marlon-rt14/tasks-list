import { create } from "zustand";
import { IUserLogged, IUserSigned } from "../interfaces/IUser";

interface AuthState {
  isAuthenticated: Boolean;
  user: IUserSigned | any;
  signin: (user: IUserSigned) => void;
}

/* This code exports a custom hook called `useAuthStore` that creates a state management store using
the `create` function from the `zustand` library. The store has three properties: `isAuthenticated`,
`user`, and `signin`. */
export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  signin: (user) => {
    set((state) => ({
      ...state,
      isAuthenticated: true,
      user,
    }));
  },
}));
