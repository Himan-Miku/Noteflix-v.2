"use client";
import { DocumentData } from "firebase/firestore";
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
  notedata?: DocumentData;
  setNotedata: Dispatch<SetStateAction<DocumentData | undefined>>;
}

const NoteContext = createContext<iNoteContext | null>(null);

export const NoteContextProvider = ({ children }: Props) => {
  const [notedata, setNotedata] = useState<DocumentData>();

  return (
    <NoteContext.Provider value={{ notedata, setNotedata }}>
      {children}
    </NoteContext.Provider>
  );
};

export const noteContext = () => {
  return useContext(NoteContext);
};
