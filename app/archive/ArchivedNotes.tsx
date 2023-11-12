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
import clsx from "clsx";
import { MobileStore } from "@/context/MobileContext";

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
  const { isOnMobile } = MobileStore();

  const [notes] = useCollection(q);

  return (
    <NoteContextProvider>
      <div className="flex flex-col gap-2">
        <div
          className={clsx(
            "text-[#DA7370] font-semibold text-xl md:text-2xl md:px-4 px-2",
            {
              hidden: !notes || notes.docs.length === 0,
            }
          )}
        >
          <h3>Archived Notes : </h3>
        </div>
        <div
          ref={parent}
          className={`${
            notes && notes.docs.length > 0
              ? isOnMobile
                ? "notes-col md:gap-4 gap-3 md:p-4 px-2 my-4"
                : "notes-columns md:gap-4 gap-3 md:p-4 px-2 my-4"
              : "flex justify-center items-center md:p-4 p-2 md:my-8 my-4"
          }`}
        >
          {notes && notes.docs.length > 0 ? (
            notes.docs.map((note) => (
              <Note key={note.id} id={note.id} data={note.data() as noteData} />
            ))
          ) : (
            <div className="flex items-center justify-center md:gap-12 gap-6 flex-col">
              <h3 className="text-[#DA7370] md:text-2xl text-xl font-semibold">
                No Notes Archived 👇
              </h3>
              <img
                src="/spongedance.gif"
                alt="spongebob gif"
                className="md:w-64 w-52 rounded-md"
              />
            </div>
          )}
          <Modal />
        </div>
      </div>
    </NoteContextProvider>
  );
}
