"use client";
import Options from "./Options";
import { useRouter } from "next/navigation";
import { doc, DocumentData, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

interface noteProps {
  id: string;
  data: DocumentData;
}

const Note = ({ id, data }: noteProps) => {
  const router = useRouter();

  const bgImageFn = async (image: string) => {
    const noteImage = await updateDoc(doc(db, "notes", id), {
      bgImage: image,
    });
    console.log(noteImage);

    router.refresh();
  };

  return (
    <div
      style={{
        backgroundImage: `url(${data.bgImage})`,
        backgroundPositionX: "right",
        backgroundPositionY: "bottom",
        backgroundSize: "cover",
      }}
      className={`inline-block p-3 mb-4 w-full h-max border border-1 border-[#575B5F] rounded-lg`}
    >
      <div className="px-2">
        <h3 className="text-[#f5f5f5] font-semibold text-lg">{data.title}</h3>
      </div>
      <div className="p-2">
        <p className="text-[#f5f5f5] font-normal leading-[1.35rem] text-sm max-h-64 break-words overflow-y-auto scrollbar-hide">
          {data.content}
        </p>
      </div>
      <div>
        <Options
          id={id}
          title={data.title}
          content={data.content}
          bgImage={data.bgImage!}
          bgImageFn={bgImageFn}
        />
      </div>
    </div>
  );
};

export default Note;
