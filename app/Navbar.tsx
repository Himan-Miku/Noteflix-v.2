"use client";
import Logout from "@/components/Logout";
import { useEffect } from "react";
import Searchbar from "@/components/Searchbar";
import { useSession } from "next-auth/react";
import { MobileStore } from "@/context/MobileContext";

const Navbar = () => {
  const { data: session } = useSession();
  const isMobile = () => window.innerWidth < 768;
  const { isOnMobile, setIsOnMobile } = MobileStore();

  useEffect(() => {
    if (isMobile()) {
      setIsOnMobile(true);
    }
  }, []);

  return (
    <div className="flex border-b border-gray-500 justify-between items-center md:px-4 px-6 py-2">
      {!isOnMobile && (
        <div className="flex md:gap-4 gap-3 items-center justify-center">
          <img className="w-10" src="/aka.png" alt="logo" />
          <h1 className="font-bold text-xl text-[#E9E9E9]">Noteflix</h1>
        </div>
      )}
      <div className="flex gap-2 items-center justify-between rounded-md bg-[#525355] md:w-[31vw] px-2 py-4 w-[75vw] h-[3rem] md:-ml-6">
        <Searchbar isOnMobile={isOnMobile} />
      </div>
      <div>
        {session?.user && (
          <Logout image={session.user.image!} isOnMobile={isOnMobile} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
