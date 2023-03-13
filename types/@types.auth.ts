export type AuthContextType = {
  googleSignIn: () => Promise<void>;
  githubSignIn: () => Promise<void>;
  logOut: () => Promise<void>;
};
