"use client";
import { useState } from "react";
import { updateDoc, doc, arrayRemove } from "firebase/firestore";
import { db } from "@/config/firebase";

export default function LabelItem({
  labelName,
  id,
}: {
  labelName: string;
  id: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const removeLabel = async () => {
    await updateDoc(doc(db, "notes", id), {
      labels: arrayRemove(labelName),
    });
  };

  return (
    <div className="rounded-xl">
      <div
        className="rounded-xl w-fit px-1 py-[0.15rem] text-xs font-medium text-white bg-transparent border border-white relative hover:cursor-pointer"
        onClick={removeLabel}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h3>{isHovered ? "remove" : labelName}</h3>
      </div>
    </div>
  );
}
