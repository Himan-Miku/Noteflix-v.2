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

  useEffect(() => {
    setInput({
      title: notedata?.title || "",
      content: notedata?.content || "",
    });
  }, [notedata, isOpen]);

  console.log("title : ", input.title);
  console.log("content: ", input.content);
  console.log("id: ", id);

  const handleTextAreaInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput({ ...input, content: e.target.value });
  };

  const handleClose = () => {
    closeModal();
    setInput({
      title: "",
      content: "",
    });
  };

  const handleSubmitChanges = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await updateDoc(doc(db, "notes", id!), {
      title: input.title,
      content: input.content,
    });

    closeModal();
  };

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                    backgroundImage: `url(${notedata?.bgImage})`,
                    backgroundPositionX: "right",
                    backgroundPositionY: "bottom",
                    backgroundSize: "cover",
                  }}
                  className="w-full max-w-md transform overflow-hidden rounded-2xl p-2 text-left align-middle shadow-xl transition-all"
                >
                  <form onSubmit={handleSubmitChanges}>
                    <div>
                      <input
                        className="bg-transparent px-4 py-2 focus:outline-none w-full text-white font-semibold placeholder:font-semibold caret-white"
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
                        className={`bg-transparent px-4 py-2 mt-1 focus:outline-none w-full placeholder:font-semibold placeholder:text-sm caret-white resize-none overflow-auto h-auto max-h-80 text-white scrollbar-hide`}
                        placeholder="Take a note..."
                        value={input.content}
                        onChange={(e) => handleTextAreaInput(e)}
                        rows={rows}
                        required
                      />
                    </div>

                    <div className="mt-4 px-4 pb-2">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={handleClose}
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Save
                      </button>
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
