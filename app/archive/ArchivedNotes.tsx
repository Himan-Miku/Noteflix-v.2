"use client";
import { db } from "@/config/firebase";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { collection, query, where } from "firebase/firestore";
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

export default function ArchivedNotes() {
  const [parent, enableAnimations] = useAutoAnimate();
  const { data: session } = useSession();
  const userId = session?.user?.email || "";
  const q = query(
    collection(db, "notes"),
    where("archived", "==", true),
    where("userId", "==", userId)
  );

  const [notes] = useCollection(q);

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
