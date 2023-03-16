"use client";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div>
        <img src="/landing-img.png" alt="Girl Pic" className="w-64" />
      </div>
      <div className="w-64 min-w-[16rem] grid justify-center border-t-4 rounded border-[#22272B] py-2">
        <button
          className="min-w-max w-max px-3 py-4 rounded-lg bg-[#22272B]"
          onClick={() => signIn()}
        >
          <p className="text-white tracking-wider">Sign In To Noteflix</p>
        </button>
      </div>
    </div>
  );
};

export default Login;
