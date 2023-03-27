"use client";

import { DocumentData } from "firebase/firestore";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type Props = {
  children: React.ReactNode;
};

export type tSearchC = {
  filteredNotes: DocumentData[] | undefined;
  setFilteredNotes: Dispatch<SetStateAction<DocumentData[] | undefined>>;
};

const SearchContext = createContext<tSearchC | null>(null);

export const SearchContextProvider = ({ children }: Props) => {
  const [filteredNotes, setFilteredNotes] = useState<DocumentData[]>();

  return (
    <SearchContext.Provider value={{ filteredNotes, setFilteredNotes }}>
      {children}
    </SearchContext.Provider>
  );
};

export const searchContext = () => {
  return useContext(SearchContext);
};
