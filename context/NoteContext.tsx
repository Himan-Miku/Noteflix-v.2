"use client";
import { noteData } from "@/app/Notes";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  useContext,
} from "react";

type Props = {
  children: React.ReactNode;
};

export interface iNoteContext {
  notedata: noteData | null;
  setNotedata: Dispatch<SetStateAction<noteData | null>>;
  id?: string;
  setId: Dispatch<SetStateAction<string | undefined>>;
}

const NoteContext = createContext<iNoteContext | null>(null);

export const NoteContextProvider = ({ children }: Props) => {
  const [notedata, setNotedata] = useState<noteData | null>(null);
  const [id, setId] = useState<string>();

  return (
    <NoteContext.Provider value={{ notedata, setNotedata, id, setId }}>
      {children}
    </NoteContext.Provider>
  );
};

export const noteContext = () => {
  return useContext(NoteContext);
};
