"use client";

import { iModalContext, modalContext } from "@/context/ModalContext";
import { Dialog, Transition } from "@headlessui/react";
import React, { ChangeEvent, Fragment, useState } from "react";

const Modal = () => {
  const { isOpen, closeModal } = modalContext() as iModalContext;
  const [rows, setRows] = useState(1);
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
  });

  const handleTextAreaInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputs({ ...inputs, content: e.target.value });
    console.log(e.target.scrollHeight, " => height");
    console.log(e.target.value.length, " => inputLength");

    if (e.target.scrollHeight <= 64 || inputs.content.length <= 29) setRows(1);
    else if (e.target.scrollHeight === 88 || inputs.content.length <= 58)
      setRows(2);
    else if (e.target.scrollHeight === 112 || inputs.content.length <= 87)
      setRows(3);
    else if (e.target.scrollHeight === 136 || inputs.content.length <= 116)
      setRows(4);
    else if (e.target.scrollHeight >= 160 || inputs.content.length >= 145)
      setRows(5);
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
            <div className="fixed inset-0 bg-black bg-opacity-[16%]" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3">
                    <input
                      className="bg-transparent px-4 py-2 focus:outline-none w-full text-white font-semibold placeholder:font-semibold caret-white"
                      placeholder="Title"
                      value={inputs.title}
                      onChange={(e) =>
                        setInputs({ ...inputs, title: e.target.value })
                      }
                      required
                    />
                  </Dialog.Title>
                  <div className="mt-2">
                    <textarea
                      className={`bg-[#202124] px-4 py-2 mt-1 focus:outline-none w-full placeholder:font-semibold placeholder:text-sm caret-white resize-none overflow-hidden h-auto max-h-40 text-white`}
                      placeholder="Take a note..."
                      value={inputs.content}
                      onChange={(e) => handleTextAreaInput(e)}
                      rows={rows}
                      autoFocus
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      close
                    </button>
                  </div>
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
