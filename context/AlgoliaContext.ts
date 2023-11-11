import { SearchResults } from "@/components/Searchbar";
import { create } from "zustand";

interface IAlgoliaContext {
  queryy: string;
  setQueryy: (q: string) => void;
  searchResults: SearchResults;
  setSearchResults: (sr: SearchResults) => void;
}

export const AlgoliaStore = create<IAlgoliaContext>()((set) => ({
  queryy: "",
  setQueryy: (q: string) => set({ queryy: q }),
  searchResults: [],
  setSearchResults: (sr: SearchResults) => set({ searchResults: sr }),
}));
