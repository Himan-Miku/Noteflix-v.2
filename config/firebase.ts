import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: "noteflix-9e44b.firebaseapp.com",
  projectId: "noteflix-9e44b",
  storageBucket: "noteflix-9e44b.appspot.com",
  messagingSenderId: "827485663913",
  appId: "1:827485663913:web:f4ce49f1331c3ad29fefb8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
