"use client";

import { db } from "@/config/firebase";
import { query, collection, orderBy } from "firebase/firestore";
import { ChangeEvent } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { searchContext, tSearchC } from "@/context/SearchContext";

const Searchbar = () => {
  const { setFilteredNotes } = searchContext() as tSearchC;
  const q = query(collection(db, "notes"), orderBy("createdAt"));
  const [notes] = useCollection(q);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchWord = e.target.value;
    const filter = notes?.docs.filter((note) => {
      return note.data().title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredNotes(null);
    } else {
      setFilteredNotes(filter);
    }
  };

  return (
    <>
      <button className="btn btn-ghost btn-circle h-[2.5rem]">
        <svg
          focusable="false"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-[#e9e9e9]"
        >
          <path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path>
          <path d="M0,0h24v24H0V0z" fill="none"></path>
        </svg>
      </button>
      <input
        placeholder="Search . . ."
        className="w-full px-2 bg-[#525355] text-[#E9E9E9] placeholder-[#E9E9E9] outline-none"
        type="text"
        onChange={handleChange}
        onBlur={(e) => {
          e.target.value = "";
          setFilteredNotes(null);
        }}
      />
      <button className="btn btn-ghost btn-circle h-[2.5rem]">
        <svg
          focusable="false"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-[#E9E9E9]"
        >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          <path d="M0 0h24v24H0z" fill="none"></path>
        </svg>
      </button>
    </>
  );
};

export default Searchbar;
