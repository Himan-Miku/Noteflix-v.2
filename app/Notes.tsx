"use client";
import { db } from "@/config/firebase";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { getDocs, collection, query, orderBy } from "firebase/firestore";

export default function Notes() {
  const [parent, enableAnimations] = useAutoAnimate();
  const q = query(collection(db, "notes"), orderBy("createdAt"));

  return <div ref={parent} className="notes-columns gap-4 p-4 my-8"></div>;
}
