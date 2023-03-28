"use client";
import { db } from "@/config/firebase";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { collection, query, orderBy } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Note from "@/components/Note";
import { NoteContextProvider } from "@/context/NoteContext";
import Modal from "@/components/Modal";
import { searchContext, tSearchC } from "@/context/SearchContext";

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
}

export default function Notes() {
  const { filteredNotes } = searchContext() as tSearchC;
  const [parent, enableAnimations] = useAutoAnimate();
  const q = query(collection(db, "notes"), orderBy("createdAt"));

  const [notes] = useCollection(q);

  return (
    <NoteContextProvider>
      <div ref={parent} className="notes-columns gap-4 p-4 my-8">
        {filteredNotes
          ? filteredNotes?.length != 0 &&
            filteredNotes?.map((note) => (
              <Note key={note.id} id={note.id} data={note.data() as noteData} />
            ))
          : notes?.docs.map((note) => (
              <Note key={note.id} id={note.id} data={note.data() as noteData} />
            ))}
        <Modal />
      </div>
    </NoteContextProvider>
  );
}
