"use client";

import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div className="flex flex-col items-center h-screen justify-center gap-y-8">
      <button
        className="min-w-max w-max px-3 py-4 rounded-lg "
        onClick={() => signIn()}
      >
        <p className="text-white">Sign In With Google</p>
      </button>
      <button
        className="min-w-max w-max px-3 py-4 rounded-lg bg-[#22272B]"
        onClick={() => signIn()}
      >
        <p className="text-white">Sign In With Github</p>
      </button>
    </div>
  );
};

export default Login;
