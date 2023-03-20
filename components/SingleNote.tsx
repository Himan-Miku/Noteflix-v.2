"use client";
import Options from "./Options";
import { useRouter } from "next/navigation";
import { doc, DocumentData, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { ChangeEvent, FormEvent, useState } from "react";

interface noteProps {
  id: string;
  data: DocumentData;
}

const Note = ({ id, data }: noteProps) => {
  const router = useRouter();
  const [inputs, setInputs] = useState({
    title: data?.title,
    content: data?.content,
  });
  const [rows, setRows] = useState(1);

  const bgImageFn = async (image: string) => {
    const noteImage = await updateDoc(doc(db, "notes", id), {
      bgImage: image,
    });
    console.log(noteImage);

    router.refresh();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await updateDoc(doc(db, "notes", id), {
      title: inputs.title,
      content: inputs.content,
    });

    router.refresh();
  };

  const handleTextAreaInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputs({ ...inputs, content: e.target.value });
    console.log(e.target.scrollHeight, " => height");
    console.log(e.target.value.length, " => inputLength");

    if (e.target.scrollHeight <= 64 || inputs.content.length <= 29) setRows(1);
    else if (e.target.scrollHeight === 88 || inputs.content.length <= 58)
      setRows(2);
    else if (e.target.scrollHeight === 112 || inputs.content.length <= 87)
      setRows(3);
    else if (e.target.scrollHeight === 136 || inputs.content.length <= 116)
      setRows(4);
    else if (e.target.scrollHeight >= 160 || inputs.content.length >= 145)
      setRows(5);
  };

  return (
    <div className={`flex justify-center items-center`}>
      <form
        style={{
          backgroundImage: `url(${data?.bgImage})`,
          backgroundPositionX: "right",
          backgroundPositionY: "bottom",
          backgroundSize: "cover",
        }}
        className="w-full rounded-lg outline outline-1 outline-gray-400 p-3 shadow-black box-shadow-color"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <input
          className="bg-transparent px-4 py-2 focus:outline-none w-full text-white font-semibold placeholder:font-semibold caret-white"
          placeholder="Title"
          value={inputs.title}
          onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
          required
        />

        <textarea
          className={`bg-transparent px-4 py-2 mt-1 focus:outline-none w-full placeholder:font-semibold placeholder:text-sm caret-white resize-none overflow-hidden h-auto max-h-40 text-white`}
          placeholder="Take a note..."
          value={inputs.content}
          onChange={(e) => handleTextAreaInput(e)}
          rows={rows}
          autoFocus
          required
        />

        <div>
          <Options
            id={id}
            title={data?.title}
            content={data?.content}
            bgImage={data?.bgImage!}
            bgImageFn={bgImageFn}
          />
        </div>
      </form>
    </div>
  );
};

export default Note;
