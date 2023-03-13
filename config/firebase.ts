import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBT7mAxpH33FU2R1oxN4ZWuUMNlqHJNpE0",
  authDomain: "noteflix-621dd.firebaseapp.com",
  projectId: "noteflix-621dd",
  storageBucket: "noteflix-621dd.appspot.com",
  messagingSenderId: "280443811042",
  appId: "1:280443811042:web:a13f445df0399c6f749abb",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
