"use client";
import { db } from "@/config/firebase";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Note from "@/components/Note";
import { NoteContextProvider } from "@/context/NoteContext";
import Modal from "@/components/Modal";
import { useSession } from "next-auth/react";
import { noteData } from "../Notes";

export interface iNote {
  title: string;
  content: string;
  userId: string;
  bgImage?: string;
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
      <div className="flex flex-col gap-2">
        <div className="text-[#DA7370] font-semibold text-2xl px-4">
          <h3>Archived Notes : </h3>
        </div>
        <div ref={parent} className="notes-columns gap-4 p-4 my-4">
          {notes?.docs.map((note) => (
            <Note key={note.id} id={note.id} data={note.data() as noteData} />
          ))}
          <Modal />
        </div>
      </div>
    </NoteContextProvider>
  );
}
