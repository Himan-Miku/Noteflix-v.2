import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
export const db = getFirestore(app);
