"use client";

import React, { createContext, useContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export interface iModalContext {
  isOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
}

const ModalContext = createContext<iModalContext | null>(null);

export const ModalContextProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <ModalContext.Provider value={{ isOpen, closeModal, openModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const modalContext = () => {
  return useContext(ModalContext);
};
