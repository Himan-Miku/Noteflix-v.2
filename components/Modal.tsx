"use client";

import { db } from "@/config/firebase";
import { iModalContext, modalContext } from "@/context/ModalContext";
import { iNoteContext, noteContext } from "@/context/NoteContext";
import { Dialog, Transition } from "@headlessui/react";
import { doc, updateDoc } from "firebase/firestore";
import React, {
  ChangeEvent,
  Fragment,
  useState,
  useEffect,
  FormEvent,
} from "react";
import {
  IoCloseCircleOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import { usePathname } from "next/navigation";
import {
  archiveNoteToast,
  discardChangesToast,
  saveChangesToast,
  unarchiveNoteToast,
} from "@/utils/toasts";

export interface NoteInput {
  title?: string;
  content?: string;
}

const Modal = () => {
  const { isOpen, closeModal } = modalContext() as iModalContext;
  const { notedata, id } = noteContext() as iNoteContext;
  const [rows, setRows] = useState(10);
  const [input, setInput] = useState<NoteInput>({
    title: notedata?.title || "",
    content: notedata?.content || "",
  });
  const pathname = usePathname();

  useEffect(() => {
    setInput({
      title: notedata?.title || "",
      content: notedata?.content || "",
    });
  }, [notedata, isOpen]);

  const handleTextAreaInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput({ ...input, content: e.target.value });
  };

  const handleClose = () => {
    closeModal();
    setInput({
      title: "",
      content: "",
    });

    discardChangesToast();
  };

  const handleSubmitChanges = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await updateDoc(doc(db, "notes", id!), {
      title: input.title,
      content: input.content,
    });

    saveChangesToast();

    closeModal();
  };

  const handleArchive = async () => {
    await updateDoc(doc(db, "notes", id!), {
      archived: true,
    });
    archiveNoteToast();
  };

  const handleUnarchive = async () => {
    await updateDoc(doc(db, "notes", id!), {
      archived: false,
    });
    unarchiveNoteToast();
  };

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  style={{
                    backgroundImage: `url(${notedata?.opImage})`,
                    backgroundPositionX: "right",
                    backgroundPositionY: "bottom",
                    backgroundSize: "cover",
                  }}
                  className="w-full max-w-md transform overflow-hidden rounded-2xl p-2 text-left align-middle shadow-xl transition-all"
                >
                  <form onSubmit={handleSubmitChanges}>
                    <div>
                      <input
                        className="bg-transparent px-3 md:px-4 md:py-2 py-1 focus:outline-none w-full text-white font-semibold placeholder:font-semibold md:text-2xl text-xl caret-white"
                        placeholder="Title"
                        value={input.title}
                        onChange={(e) =>
                          setInput({ ...input, title: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <textarea
                        className={`bg-transparent md:px-4 px-3 md:py-2 py-1 mt-1 focus:outline-none w-full placeholder:font-semibold placeholder:text-sm caret-white resize-none overflow-auto h-auto max-h-80 text-white scrollbar-hide text-sm`}
                        placeholder="Take a note..."
                        value={input.content}
                        onChange={(e) => handleTextAreaInput(e)}
                        rows={rows}
                        required
                      />
                    </div>

                    <div className="mt-4 px-4 pb-2 flex justify-between items-center">
                      <div className="flex gap-3 justify-around items-center">
                        <button
                          type="submit"
                          className="bg-transparent transition-colors duration-300 hover:bg-[#2f3033] text-2xl text-white font-bold p-[0.37rem] rounded-full"
                        >
                          <IoCheckmarkCircleOutline />
                        </button>
                        {pathname === "/archive" ? (
                          <button
                            onClick={handleUnarchive}
                            className="bg-transparent transition-colors duration-300 hover:bg-[#2f3033] text-3xl text-white font-bold p-[0.37rem] rounded-full"
                          >
                            <img
                              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjZmZmZmZmIj4KICA8cGF0aCBkPSJNMjAuNTQgNS4yM2wtMS4zOS0xLjY4QzE4Ljg4IDMuMjEgMTguNDcgMyAxOCAzSDZjLS40NyAwLS44OC4yMS0xLjE2LjU1TDMuNDYgNS4yM0MzLjE3IDUuNTcgMyA2LjAyIDMgNi41VjE5YzAgMS4xLjkgMiAyIDJoMTRjMS4xIDAgMi0uOSAyLTJWNi41YzAtLjQ4LS4xNy0uOTMtLjQ2LTEuMjd6TTYuMjQgNWgxMS41MmwuODMgMUg1LjQybC44Mi0xek01IDE5VjhoMTR2MTFINXptMy01LjVsNC00IDQgNC0xLjQxIDEuNDFMMTMgMTMuMzNWMTdoLTJ2LTMuNjdsLTEuNTkgMS41OUw4IDEzLjV6Ii8+Cjwvc3ZnPgo="
                              alt="unarchive"
                              height={25}
                              width={25}
                            />
                          </button>
                        ) : (
                          <button
                            onClick={handleArchive}
                            className="bg-transparent transition-colors duration-300 hover:bg-[#2f3033] text-3xl text-white font-bold p-[0.37rem] rounded-full"
                          >
                            <img
                              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjZmZmZmZmIj4KICA8cGF0aCBkPSJNMjAuNTQgNS4yM2wtMS4zOS0xLjY4QzE4Ljg4IDMuMjEgMTguNDcgMyAxOCAzSDZjLS40NyAwLS44OC4yMS0xLjE2LjU1TDMuNDYgNS4yM0MzLjE3IDUuNTcgMyA2LjAyIDMgNi41VjE5YzAgMS4xLjkgMiAyIDJoMTRjMS4xIDAgMi0uOSAyLTJWNi41YzAtLjQ4LS4xNy0uOTMtLjQ2LTEuMjd6TTYuMjQgNWgxMS41MmwuODMgMUg1LjQybC44Mi0xek01IDE5VjhoMTR2MTFINXptMTEtNS41bC00IDQtNC00IDEuNDEtMS40MUwxMSAxMy42N1YxMGgydjMuNjdsMS41OS0xLjU5TDE2IDEzLjV6Ii8+Cjwvc3ZnPgo="
                              alt="archive"
                              height={25}
                              width={25}
                            />
                          </button>
                        )}
                      </div>
                      <div>
                        <button
                          type="button"
                          className="bg-transparent transition-colors duration-300 hover:bg-[#2f3033] text-2xl text-white font-bold p-[0.37rem] rounded-full"
                          onClick={handleClose}
                        >
                          <IoCloseCircleOutline />
                        </button>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Modal;
