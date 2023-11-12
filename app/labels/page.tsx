"use client";
import { labelDataWithoutID } from "@/components/Options";
import { db } from "@/config/firebase";
import { LabelsStore } from "@/context/LabelsContext";
import {
  addDoc,
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDoc,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { ChangeEvent, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { MdDelete, MdLabel } from "react-icons/md";
import { useSession } from "next-auth/react";

export default function LabelsPage() {
  const [labelName, setLabelName] = useState("");
  const { labels } = LabelsStore();
  const { data: session } = useSession();

  let username = session?.user?.email || "";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let labelName = e.target.value;
    setLabelName(labelName);
  };

  const createNewLabel = async () => {
    if (labelName.length > 0) {
      const labelExists = labels.some((label) => labelName === label.title);

      if (labelExists) {
        alert("Label already exists");
        return;
      }

      await addDoc(collection(db, "labels"), {
        labelName,
        madeBy: username,
      });

      console.log("data sent");

      setLabelName("");
    }
  };

  const deleteLabel = async (id: string) => {
    const batch = writeBatch(db);
    const docRef = doc(db, "labels", id);
    let labelSnapshot = await getDoc(docRef);

    let labelSnapData = labelSnapshot.data() as labelDataWithoutID;
    labelSnapData.noteRefs.forEach((noteId) => {
      const noteRef = doc(db, "notes", noteId);
      batch.update(noteRef, {
        labels: arrayRemove(labelSnapData.labelName),
      });
    });
    await batch.commit();
    await deleteDoc(doc(db, "labels", id));
  };

  return (
    <main
      className="cal-h overflow-y-auto overflow-x-hidden scrollbar px-20 pt-10 pb-8"
      style={{
        backgroundImage: `url("/note-page-2.png")`,
        backgroundSize: "cover",
        backgroundPositionX: "left",
        backgroundPositionY: "top",
      }}
    >
      <div className="flex items-center justify-center">
        <div
          style={{
            backgroundImage: `url("/akaWritings-bg-low-opacity.jpg")`,
            backgroundPositionX: "left",
            backgroundPositionY: "top",
            backgroundSize: "cover",
          }}
          className="w-1/3 flex flex-col gap-4 justify-center items-center rounded-lg py-2"
        >
          <div className="text-2xl font-semibold text-[#9F4040] pt-2">
            <h3>Edit Labels :</h3>
          </div>
          <div className="flex gap-2 min-w-fit items-center px-2 py-1">
            <div
              onClick={createNewLabel}
              className="rounded-full p-1 text-[#DA7370] hover:bg-[#2f3033]"
            >
              <AiOutlinePlus />
            </div>
            <input
              type="text"
              id="labelName"
              autoComplete="off"
              placeholder="Create new label"
              className="bg-[#2f3033] text-[#e6e6e6] outline-none px-2 py-1 caret-gray-400 rounded-md placeholder:text-white"
              value={labelName}
              onChange={handleChange}
            />
            <div
              onClick={createNewLabel}
              className="rounded-full p-1 text-[#DA7370] hover:bg-[#2f3033]"
            >
              <BsCheckLg />
            </div>
          </div>
          <div className="w-[18.3rem] min-w-fit">
            {labels &&
              labels.map((label, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-center justify-between py-2 px-1"
                >
                  <div className="flex gap-4 font-medium items-center">
                    <div className="p-1 rounded-full">
                      <MdLabel size={"1.2em"} />
                    </div>

                    <p>{label.title}</p>
                  </div>
                  <div
                    onClick={() => deleteLabel(label.id)}
                    className="p-1 rounded-full bg-transparent transition-all duration-300 ease-in-out hover:bg-[#DA7370] hover:text-white cursor-pointer"
                  >
                    <MdDelete size={"1.2em"} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
