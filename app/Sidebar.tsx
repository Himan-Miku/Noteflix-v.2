"use client";

import { db } from "@/config/firebase";
import { LabelsStore } from "@/context/LabelsContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import clsx from "clsx";
import { ISidebarContext, sidebarContext } from "@/context/SidebarContext";
import { MobileStore } from "@/context/MobileContext";

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
  const { labels, setLabels } = LabelsStore();
  const { isOnMobile } = MobileStore();
  const { showSidebar } = sidebarContext() as ISidebarContext;
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
      <div>
        <Toaster position="bottom-left" reverseOrder={true} />
      </div>
      <div
        className={clsx(
          "cal-h md:w-72 w-64 py-2 overflow-y-auto bg-[#202124] scrollbar",
          {
            "hidden md:block -translate-x-full": !showSidebar && isOnMobile,
            "translate-x-0 absolute z-20": showSidebar,
            relative: !isOnMobile,
            "border-r border-[#575B5F]": isOnMobile,
          }
        )}
      >
        {isOnMobile && (
          <Link href={"/"}>
            <div className="flex gap-5 items-center justify-start pt-3 pb-4 px-6">
              <img className="w-10" src="/aka.png" alt="logo" />
              <h1 className="font-bold text-xl text-[#E9E9E9]">Noteflix</h1>
            </div>
          </Link>
        )}
        {sideBar.map((item, index) => (
          <Link key={index} href={item.path}>
            <div
              className={`group md:w-64 w-[14.5rem] flex gap-8 font-medium rounded-tr-full rounded-br-full text-gray-300 border-none md:px-4 px-8 py-3 text-[0.925rem] md:text-[1.05rem] cursor-pointer ${
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
              className={`group md:w-64 w-[14.5rem] flex gap-8 font-medium rounded-tr-full rounded-br-full text-gray-300 border-none md:px-4 px-8 py-3 md:text-[1.05rem] text-[0.925rem] cursor-pointer ${
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
              className={`group md:w-64 w-[14.5rem] flex gap-8 font-medium rounded-tr-full rounded-br-full text-gray-300 border-none md:px-4 px-8 py-3 md:text-[1.05rem] text-[0.925rem] cursor-pointer ${
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
      </div>
    </>
  );
};

export default Sidebar;
