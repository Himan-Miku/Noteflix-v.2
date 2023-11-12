"use client";
import Options from "./Options";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { modalContext, iModalContext } from "@/context/ModalContext";
import { iNoteContext, noteContext } from "@/context/NoteContext";
import { noteData } from "@/app/Notes";
import LabelItem from "./LabelItem";

interface noteProps {
  id: string;
  data: noteData;
}

const Note = ({ id, data }: noteProps) => {
  const { openModal } = modalContext() as iModalContext;
  const { setNotedata, setId } = noteContext() as iNoteContext;

  const bgImageFn = async (image: string, opImage: string) => {
    const noteImage = await updateDoc(doc(db, "notes", id), {
      bgImage: image,
      opImage: opImage,
    });
    console.log(noteImage);
  };

  const handleOnClick = () => {
    openModal();
    setNotedata(data);
    setId(id);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${data.bgImage})`,
        backgroundPositionX: "right",
        backgroundPositionY: "bottom",
        backgroundSize: "cover",
      }}
      className={`inline-block p-3 md:mb-4 mb-3 w-full h-max border border-1 border-[#575B5F] rounded-lg`}
    >
      <button type="button" onClick={handleOnClick} className="note-btn">
        <div className="px-2">
          <h3 className="text-[#f5f5f5] font-semibold text-lg">{data.title}</h3>
        </div>
        <div className="p-2">
          <p className="text-[#f5f5f5] font-normal leading-[1.35rem] text-sm max-h-64 break-all overflow-y-auto scrollbar-hide">
            {data.content}
          </p>
        </div>
      </button>
      {data.labels && data.labels.length > 0 && (
        <div className="flex gap-3 p-2">
          {data.labels?.map((labelName, index) => (
            <LabelItem key={index} labelName={labelName} id={id} />
          ))}
        </div>
      )}
      <div>
        <Options
          id={id}
          title={data.title}
          content={data.content}
          bgImage={data.bgImage!}
          bgImageFn={bgImageFn}
          status={data.archived}
        />
      </div>
    </div>
  );
};

export default Note;
