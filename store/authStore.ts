import { signOut, User } from "firebase/auth";
import { create } from "zustand";
import { signInWithPopup } from "firebase/auth";
import { auth, githubProvider, googleProvider } from "@/config/firebase";

export type AuthContextType = {
  googleSignIn: () => Promise<void>;
  githubSignIn: () => Promise<void>;
  logOut: () => Promise<void>;
  user: User | null;
};

const useAuthStore = create<AuthContextType>((set) => ({
  user: null,
  googleSignIn: async () => {
    try {
      const providedUser = await signInWithPopup(auth, googleProvider);
      set({ user: providedUser.user });
    } catch (error) {
      console.log(error);
    }
  },
  githubSignIn: async () => {
    try {
      const providedUser = await signInWithPopup(auth, githubProvider);
      set({ user: providedUser.user });
    } catch (error) {
      console.log(error);
    }
  },
  logOut: async () => {
    try {
      await signOut(auth);
      set({ user: null });
    } catch (error) {
      console.log(error);
    }
  },
}));

auth.onAuthStateChanged((user) => {
  useAuthStore.setState({ user });
});

export default useAuthStore;
