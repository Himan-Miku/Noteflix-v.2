"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";

type UserProps = {
  image: string;
  isOnMobile: boolean;
};

const Logout = ({ image, isOnMobile }: UserProps) => {
  return (
    <div className="flex justify-center items-center gap-4">
      {isOnMobile ? (
        <Image
          onClick={() => signOut()}
          width={40}
          height={40}
          alt="profile pic"
          src={image}
          priority
          className="rounded-full cursor-pointer"
        />
      ) : (
        <Link href={`/`}>
          <Image
            width={64}
            height={64}
            alt="profile pic"
            src={image}
            priority
            className="rounded-full"
          />
        </Link>
      )}

      {!isOnMobile && (
        <button
          className="px-4 py-2 text-gray-300 rounded-lg font-medium m-1 w-full bg-[#9f4040a7] transition-all duration-300 hover:bg-[#9f4040c7] hover:-translate-y-[1px]"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default Logout;
