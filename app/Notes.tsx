"use client";
import { db } from "@/config/firebase";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { collection, query, orderBy, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Note from "@/components/Note";
import { NoteContextProvider } from "@/context/NoteContext";
import Modal from "@/components/Modal";
import { useSession } from "next-auth/react";

export interface iNote {
  title: string;
  content: string;
  userId: string;
  bgImage?: string;
}

export interface noteData {
  title: string;
  content: string;
  bgImage?: string;
  opImage?: string;
  archived: boolean;
}

export default function Notes() {
  const { data: session } = useSession();
  const [parent, enableAnimations] = useAutoAnimate();

  const userEmail = session?.user?.email || "";
  const q = query(
    collection(db, "notes"),
    orderBy("createdAt"),
    where("userId", "==", userEmail),
    where("archived", "==", false)
  );

  const [notes, loading, error] = useCollection(q);

  console.log("error from notes : ", error);
  console.log("notes from notes : ", notes);

  return (
    <NoteContextProvider>
      <div ref={parent} className="notes-columns gap-4 p-4 my-8">
        {notes?.docs.map((note) => (
          <Note key={note.id} id={note.id} data={note.data() as noteData} />
        ))}
        <Modal />
      </div>
    </NoteContextProvider>
  );
}
