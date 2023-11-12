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
    if (labelSnapData.noteRefs) {
      labelSnapData.noteRefs.forEach((noteId) => {
        const noteRef = doc(db, "notes", noteId);
        batch.update(noteRef, {
          labels: arrayRemove(labelSnapData.labelName),
        });
      });
      await batch.commit();
    }
    await deleteDoc(doc(db, "labels", id));
  };

  return (
    <main
      className="cal-h overflow-y-auto overflow-x-hidden scrollbar md:px-20 px-10 md:pt-10 pt-6 md:pb-8 pb-6"
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
          className="md:w-1/3 w-5/6 flex flex-col md:gap-4 gap-3 justify-center items-center rounded-lg py-2"
        >
          <div className="md:text-2xl text-xl font-semibold text-[#9F4040] pt-2">
            <h3>Edit Labels :</h3>
          </div>
          <div className="w-[20rem] flex flex-col md:gap-3 gap-2">
            <div className="flex md:gap-3 gap-4 min-w-fit w-full items-center px-2 py-1 justify-center">
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
            <div className="w-full min-w-fit pl-3 pr-2">
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
      </div>
    </main>
  );
}
