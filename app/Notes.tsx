"use client";
import { db } from "@/config/firebase";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { collection, query, orderBy, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Note from "@/components/Note";
import { NoteContextProvider } from "@/context/NoteContext";
import Modal from "@/components/Modal";
import { useSession } from "next-auth/react";
import { AlgoliaStore } from "@/context/AlgoliaContext";

export interface iNote {
  title: string;
  content: string;
  userId: string;
  bgImage?: string;
}

export interface noteData {
  id: string;
  title: string;
  content: string;
  bgImage?: string;
  opImage?: string;
  archived: boolean;
  labels?: Array<string>;
}

export default function Notes() {
  const { data: session } = useSession();
  const [parent, enableAnimations] = useAutoAnimate();
  const { searchResults, queryy } = AlgoliaStore();

  const userEmail = session?.user?.email || "";
  const q = query(
    collection(db, "notes"),
    where("userId", "==", userEmail),
    where("archived", "==", false)
  );

  const [notes, loading, error] = useCollection(q);

  return (
    <NoteContextProvider>
      <div
        ref={parent}
        className={`${
          (queryy === "" && (!notes || notes.docs.length === 0)) ||
          (queryy !== "" && searchResults.length === 0)
            ? "flex justify-center items-center p-4 my-8"
            : "notes-columns gap-4 p-4 my-8"
        }`}
      >
        {queryy === "" && (!notes || notes.docs.length === 0) ? (
          <div className="flex items-center justify-center gap-12 flex-col">
            <h3 className="text-[#DA7370] text-2xl font-semibold">
              No Notes Created 📝
            </h3>
            <img src="/empty.gif" alt="empty gif" className="w-64" />
          </div>
        ) : (
          <>
            {queryy === "" ? (
              notes?.docs.map((note) => (
                <Note
                  key={note.id}
                  id={note.id}
                  data={note.data() as noteData}
                />
              ))
            ) : searchResults.length > 0 ? (
              searchResults.map((result) => (
                <Note
                  key={result.id}
                  id={result.id}
                  data={result as noteData}
                />
              ))
            ) : (
              <div className="flex items-center justify-center gap-12 flex-col">
                <h3 className="text-[#DA7370] text-2xl font-semibold">
                  No Results Found 🔍
                </h3>
                <img src="/search.gif" alt="search gif" className="w-64" />
              </div>
            )}
          </>
        )}
        <Modal />
      </div>
    </NoteContextProvider>
  );
}
