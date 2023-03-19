"use client";
import Options from "./Options";
import { useRouter } from "next/navigation";
import { doc, DocumentData, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { FormEvent, useState } from "react";

interface noteProps {
  id: string;
  data: DocumentData;
}

const Note = ({ id, data }: noteProps) => {
  const router = useRouter();
  const [inputs, setInputs] = useState({
    title: data.title,
    content: data.content,
  });

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

  return (
    <div
      style={{
        backgroundImage: `url(${data?.bgImage})`,
        backgroundPositionX: "right",
        backgroundPositionY: "bottom",
        backgroundSize: "cover",
      }}
      className={`inline-block p-3 mb-4 w-full h-max border border-1 border-[#575B5F] rounded-lg box-shadow-color`}
    >
      <form
        className="w-full rounded-lg outline outline-1 outline-gray-400 p-3 shadow-black shadow-lg"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        {/* <h3 className="text-[#f5f5f5] font-semibold text-lg">{data.title}</h3> */}
        <input
          className="bg-transparent px-4 py-2 focus:outline-none w-full text-white font-semibold placeholder:font-semibold caret-white"
          placeholder="Title"
          value={inputs.title}
          onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
          required
        />

        {/* <p className="text-[#f5f5f5] font-normal leading-[1.35rem] text-sm max-h-64 break-words overflow-y-auto scrollbar-hide">
          {data.content}
        </p> */}
        <textarea
          onInput={(e) => {
            e.currentTarget.style.setProperty("height", "1px");
            e.currentTarget.style.setProperty(
              "height",
              e.currentTarget.scrollHeight + "px"
            );
          }}
          className={`bg-transparent px-4 py-2 focus:outline-none w-full placeholder:font-semibold placeholder:text-sm caret-white resize-none overflow-auto min-h-fit text-white`}
          placeholder="Take a note..."
          value={inputs.content}
          onChange={(e) => setInputs({ ...inputs, content: e.target.value })}
          rows={1}
          required
        />

        <div>
          <Options
            id={id}
            title={data.title}
            content={data.content}
            bgImage={data.bgImage!}
            bgImageFn={bgImageFn}
          />
        </div>
      </form>
    </div>
  );
};

export default Note;
