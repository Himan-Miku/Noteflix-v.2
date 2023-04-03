"use client";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type Props = {
  children: React.ReactNode;
};

export type tAlertC = {
  alert: boolean;
  setAlert: Dispatch<SetStateAction<boolean>>;
};

const AlertContext = createContext<tAlertC | null>(null);

export const AlertContextProvider = ({ children }: Props) => {
  const [alert, setAlert] = useState(false);

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const alertContext = () => {
  return useContext(AlertContext);
};
