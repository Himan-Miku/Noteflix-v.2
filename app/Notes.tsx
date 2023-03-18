"use client";
import { db } from "@/config/firebase";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { collection, query, orderBy } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Note from "@/components/Note";

export interface iNote {
  title: string;
  content: string;
  userId: string;
  bgImage?: string;
}

export default function Notes() {
  const [parent, enableAnimations] = useAutoAnimate();
  const q = query(collection(db, "notes"), orderBy("createdAt"));

  const [notes] = useCollection(q);

  notes?.docs.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });

  return (
    <div ref={parent} className="notes-columns gap-4 p-4 my-8">
      {notes?.docs.map((note) => (
        <Note key={note.id} id={note.id} data={note.data()} />
      ))}
    </div>
  );
}
