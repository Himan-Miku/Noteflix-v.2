"use client";

import { bgImages } from "@/utils/backgrounds";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface notesProps {
  id: string;
  content: string | null;
  title: string;
  bgImage: string | null;
  bgImageFn: (image: string) => void;
}

export interface deletedNote {
  id: string;
  title: string;
}

const Options = ({ content, title, bgImage, id, bgImageFn }: notesProps) => {
  const router = useRouter();
  const [showBackgrounds, setShowBackgrounds] = useState(false);
  const deleteHandler = async ({ id, title }: deletedNote) => {
    const data = await fetch("/api/notes", {
      method: "DELETE",
      body: JSON.stringify({
        id,
        title,
      }),
    });
    const res = await data.json();
    console.log(res);
    router.refresh();
  };
  return (
    <div>
      <button
        className="bg-transparent hover:bg-[#2f3033] text-white font-bold p-2 rounded-full"
        onClick={() => deleteHandler({ id, title })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          className="fill-white"
        >
          <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path>
          <path d="M9 8h2v9H9zm4 0h2v9h-2z"></path>
        </svg>
      </button>
      <button className="bg-transparent hover:bg-[#2f3033] text-white font-bold p-2 rounded-full">
        <img
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjZmZmZmZmIj4KICA8cGF0aCBkPSJNMTMgOWgtMnYySDl2MmgydjJoMnYtMmgydi0yaC0yeiIvPgogIDxwYXRoIGQ9Ik0xOCAxN3YtNmMwLTMuMDctMS42My01LjY0LTQuNS02LjMyVjRjMC0uODMtLjY3LTEuNS0xLjUtMS41cy0xLjUuNjctMS41IDEuNXYuNjhDNy42NCA1LjM2IDYgNy45MiA2IDExdjZINHYyaDE2di0yaC0yem0tMiAwSDh2LTZjMC0yLjQ4IDEuNTEtNC41IDQtNC41czQgMi4wMiA0IDQuNXY2em0tNCA1YzEuMSAwIDItLjkgMi0yaC00YzAgMS4xLjkgMiAyIDJ6Ii8+Cjwvc3ZnPgo="
          alt="reminder"
          height={20}
          width={20}
        />
      </button>
      <button className="bg-transparent hover:bg-[#2f3033] text-white font-bold p-2 rounded-full">
        <img
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjZmZmZmZmIj4KICA8cGF0aCBkPSJNMjAuNTQgNS4yM2wtMS4zOS0xLjY4QzE4Ljg4IDMuMjEgMTguNDcgMyAxOCAzSDZjLS40NyAwLS44OC4yMS0xLjE2LjU1TDMuNDYgNS4yM0MzLjE3IDUuNTcgMyA2LjAyIDMgNi41VjE5YzAgMS4xLjkgMiAyIDJoMTRjMS4xIDAgMi0uOSAyLTJWNi41YzAtLjQ4LS4xNy0uOTMtLjQ2LTEuMjd6TTYuMjQgNWgxMS41MmwuODMgMUg1LjQybC44Mi0xek01IDE5VjhoMTR2MTFINXptMTEtNS41bC00IDQtNC00IDEuNDEtMS40MUwxMSAxMy42N1YxMGgydjMuNjdsMS41OS0xLjU5TDE2IDEzLjV6Ii8+Cjwvc3ZnPgo="
          alt="archive"
          height={20}
          width={20}
        />
      </button>
      <div className="relative inline-block">
        <button
          className="bg-transparent hover:bg-[#2f3033] text-white font-bold p-2 rounded-full"
          onClick={() => setShowBackgrounds((prev) => !prev)}
        >
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjZmZmZmZmIj4KICA8cGF0aCBkPSJNMTIgMjJDNi40OSAyMiAyIDE3LjUxIDIgMTJTNi40OSAyIDEyIDJzMTAgNC4wNCAxMCA5YzAgMy4zMS0yLjY5IDYtNiA2aC0xLjc3Yy0uMjggMC0uNS4yMi0uNS41IDAgLjEyLjA1LjIzLjEzLjMzLjQxLjQ3LjY0IDEuMDYuNjQgMS42N0EyLjUgMi41IDAgMCAxIDEyIDIyem0wLTE4Yy00LjQxIDAtOCAzLjU5LTggOHMzLjU5IDggOCA4Yy4yOCAwIC41LS4yMi41LS41YS41NC41NCAwIDAgMC0uMTQtLjM1Yy0uNDEtLjQ2LS42My0xLjA1LS42My0xLjY1YTIuNSAyLjUgMCAwIDEgMi41LTIuNUgxNmMyLjIxIDAgNC0xLjc5IDQtNCAwLTMuODYtMy41OS03LTgtN3oiLz48Y2lyY2xlIGN4PSI2LjUiIGN5PSIxMS41IiByPSIxLjUiLz4KICA8Y2lyY2xlIGN4PSI5LjUiIGN5PSI3LjUiIHI9IjEuNSIvPjxjaXJjbGUgY3g9IjE0LjUiIGN5PSI3LjUiIHI9IjEuNSIvPjxjaXJjbGUgY3g9IjE3LjUiIGN5PSIxMS41IiByPSIxLjUiLz4KPC9zdmc+Cg=="
            alt="background"
            height={20}
            width={20}
          />
        </button>
        {showBackgrounds && (
          <div className="absolute -right-56 top-11 rounded-lg box-shadow-color bg-[#202124] p-4">
            <div className="flex justify-center items-center gap-1 mb-2">
              {bgImages.slice(0, 10).map((image) => (
                <div
                  key={image.imageId}
                  className="rounded-full w-9 h-9 cursor-pointer hover:border-2 hover:border-white flex justify-center items-center"
                  onClick={() => bgImageFn(image.svgSrc)}
                >
                  <img src={image.coverPic} className="w-[100%] rounded-full" />
                </div>
              ))}
            </div>
            <hr className="border border-[#575B5F]" />
            <div className="flex justify-center items-center gap-1 mt-2">
              {bgImages.slice(10).map((image) => (
                <div
                  key={image.imageId}
                  className="rounded-full w-9 h-9 cursor-pointer hover:border-2 hover:border-white flex justify-center items-center"
                  onClick={() => bgImageFn(image.svgSrc)}
                >
                  <img src={image.coverPic} className="w-[100%] rounded-full" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Options;
