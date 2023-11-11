"use client";

import { db } from "@/config/firebase";
import { alertContext, tAlertC } from "@/context/AlertContext";
import { LabelsStore } from "@/context/LabelsContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export type LabelsData = {
  id: string;
  title: string;
  path: string;
  svgPath: JSX.Element;
};
type LabelsDataWithoutID = {
  labelName: string;
};

const sideBar: {
  id?: string;
  title: string;
  path: string;
  svgPath?: JSX.Element;
}[] = [
  {
    title: "Notes",
    path: "/",
    svgPath: (
      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path>
    ),
  },
  {
    title: "Archive",
    path: "/archive",
    svgPath: (
      <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.59L16 13.5z"></path>
    ),
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { setAlert, alert } = alertContext() as tAlertC;
  const { labels, setLabels } = LabelsStore();
  const { data: session } = useSession();
  let user = session?.user?.email || "";
  console.log(user);

  const q = query(collection(db, "labels"), where("madeBy", "==", user));

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let updatedResults: Array<LabelsData> = [];

      snapshot.docs.forEach((doc) => {
        const actualData = doc.data() as LabelsDataWithoutID;
        const data = {
          id: doc.id,
          title: actualData.labelName,
          path: `/labels/${actualData.labelName}`,
          svgPath: (
            <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path>
          ),
        };
        updatedResults.push(data);
      });

      setLabels(updatedResults);
      console.log("updatedResults: ", updatedResults);
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  console.log("labels from sidebar: ", labels);

  return (
    <>
      <div className="cal-h w-72 py-2 overflow-y-auto bg-[#202124] relative scrollbar">
        {sideBar.map((item, index) => (
          <Link key={index} href={item.path}>
            <div
              className={`group w-64 flex gap-8 font-medium rounded-tr-full rounded-br-full text-gray-300 border-none px-4 py-3 text-[1.05rem] cursor-pointer ${
                pathname === item.path
                  ? "bg-none bg-[#9f4040a7]"
                  : "bg-none hover:text-gray-300 hover:bg-[#28292C]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className={`${
                  pathname === item.path ? "fill-gray-300" : "fill-gray-500"
                }`}
              >
                {item.svgPath}
              </svg>
              <p>{item.title}</p>
            </div>
          </Link>
        ))}
        {labels.map((item, index) => (
          <Link key={index} href={item.path}>
            <div
              className={`group w-64 flex gap-8 font-medium rounded-tr-full rounded-br-full text-gray-300 border-none px-4 py-3 text-[1.05rem] cursor-pointer ${
                pathname === item.path
                  ? "bg-none bg-[#9f4040a7]"
                  : "bg-none hover:text-gray-300 hover:bg-[#28292C]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className={`${
                  pathname === item.path ? "fill-gray-300" : "fill-gray-500"
                }`}
              >
                {item.svgPath}
              </svg>
              <p>{item.title}</p>
            </div>
          </Link>
        ))}
        {labels && labels.length > 0 && (
          <Link href={`/labels`}>
            <div
              className={`group w-64 flex gap-8 font-medium rounded-tr-full rounded-br-full text-gray-300 border-none px-4 py-3 text-[1.05rem] cursor-pointer ${
                pathname === "/labels"
                  ? "bg-none bg-[#9f4040a7]"
                  : "bg-none hover:text-gray-300 hover:bg-[#28292C]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className={`${
                  pathname === "/labels" ? "fill-gray-300" : "fill-gray-500"
                }`}
              >
                <path d="M20.41 4.94l-1.35-1.35c-.78-.78-2.05-.78-2.83 0L13.4 6.41 3 16.82V21h4.18l10.46-10.46 2.77-2.77c.79-.78.79-2.05 0-2.83zm-14 14.12L5 19v-1.36l9.82-9.82 1.41 1.41-9.82 9.83z"></path>
              </svg>
              <p>Edit labels</p>
            </div>
          </Link>
        )}
        {alert && (
          <div
            id="alert-5"
            className="flex p-4 rounded-lg bg-[#73353693] absolute bottom-4 left-10"
            role="alert"
          >
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5 text-gray-300 dark:text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Info</span>
            <div className="ml-3 text-sm font-medium text-gray-300 dark:text-gray-300">
              Note Archived
            </div>
            <button
              onClick={() => setAlert(false)}
              type="button"
              className="ml-3 -mx-1.5 -my-1.5 transition-colors duration-300 bg-transparent text-gray-300 rounded-lg p-1.5 hover:bg-[#733536d0] inline-flex h-8 w-8"
              data-dismiss-target="#alert-5"
              aria-label="Close"
            >
              <span className="sr-only">Dismiss</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
