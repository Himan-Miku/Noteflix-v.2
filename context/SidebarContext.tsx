"use client";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type Props = {
  children: React.ReactNode;
};

export interface ISidebarContext {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}

const SidebarContext = createContext<ISidebarContext | null>(null);

export const SidebarContextProvider = ({ children }: Props) => {
  const [showSidebar, setShowSidebar] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <SidebarContext.Provider value={{ showSidebar, setShowSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const sidebarContext = () => {
  return useContext(SidebarContext);
};
