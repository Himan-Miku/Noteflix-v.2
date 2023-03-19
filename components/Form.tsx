"use client";

import { BsFillPatchPlusFill } from "react-icons/bs";
import { useState, useRef, useEffect, RefObject, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useSession } from "next-auth/react";

export interface postNote {
  title: string;
  content: string | null;
}

const Form = () => {
  const router = useRouter();
  const formRef = useRef(null);
  const { data: session } = useSession();

  const [inputs, setInputs] = useState({
    title: "",
    content: "",
  });

  const [showInput, setShowInput] = useState(false);

  function useOutsideAlerter(ref: RefObject<HTMLFormElement>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowInput(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(formRef);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addDoc(collection(db, "notes"), {
      title: inputs.title,
      content: inputs.content,
      createdAt: serverTimestamp(),
      userId: session?.user?.email,
    });

    setInputs({
      title: "",
      content: "",
    });

    router.refresh();
  };

  const handleShowInput = () => {
    setShowInput(true);
  };

  return (
    <div className="flex justify-center items-center">
      <form
        className="w-1/2 rounded-lg outline outline-1 outline-gray-400 p-3 shadow-black shadow-lg"
        onSubmit={handleSubmit}
        autoComplete="off"
        ref={formRef}
      >
        {showInput && (
          <input
            className="bg-[#202124] px-4 py-2 focus:outline-none w-full text-white font-semibold placeholder:font-semibold caret-white"
            placeholder="Title"
            value={inputs.title}
            onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
            required
          />
        )}

        <textarea
          onClick={handleShowInput}
          onInput={(e) => {
            e.currentTarget.style.setProperty("height", "1px");
            e.currentTarget.style.setProperty(
              "height",
              e.currentTarget.scrollHeight + "px"
            );
          }}
          className={`bg-[#202124] px-4 py-2 focus:outline-none w-full placeholder:font-semibold placeholder:text-sm caret-white resize-none overflow-hidden max-h-40 text-white`}
          placeholder="Take a note..."
          value={inputs.content}
          onChange={(e) => setInputs({ ...inputs, content: e.target.value })}
          autoFocus
          rows={1}
          required
        />

        {showInput && (
          <div className="flex justify-end items-center">
            <button className="rounded-full" type="submit">
              <BsFillPatchPlusFill
                style={{ fontSize: "2rem", color: "#9f404085" }}
              />
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
