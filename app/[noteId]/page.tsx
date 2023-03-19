import SingleNote from "@/components/SingleNote";
import { db } from "@/config/firebase";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import React from "react";

type Props = {
  params: {
    noteId: string;
  };
};

const selectedNote = async (noteId: string) => {
  const note = await getDoc(doc(db, "notes", noteId));
  return note.data() as DocumentData;
};

const NotePage = async ({ params: { noteId } }: Props) => {
  const note = await selectedNote(noteId);

  return (
    <div
      style={{
        backgroundImage: "url(/note-page.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="cal-h flex justify-center items-center"
    >
      <div className="w-1/2">
        <SingleNote id={noteId} data={note} />
      </div>
    </div>
  );
};

export default NotePage;
