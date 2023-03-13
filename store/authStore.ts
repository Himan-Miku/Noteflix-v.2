import create from "zustand";
import { signInWithPopup, signOut } from "firebase/auth";
import { googleProvider, githubProvider, auth } from "@/config/firebase";
import { AuthContextType } from "@/types/@types.auth";

export const useAuthStore = create<AuthContextType>((set) => ({
  googleSignIn: async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
  },
  githubSignIn: async () => {
    try {
      await signInWithPopup(auth, githubProvider);
    } catch (error) {
      console.log(error);
    }
  },
  logOut: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  },
}));
