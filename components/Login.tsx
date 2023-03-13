"use client";
import { UserAuth } from "@/context/AuthContext";

const Login = () => {
  // const { googleSignIn } = UserAuth()

  return (
    <>
      <button
        className="px-4 py-2 text-[#fff] rounded-lg border border-[#fff] m-1 w-full bg-[#9f4040ae]"
        // onClick={() => googleSignIn()}
      >
        Sign In With Google
      </button>
    </>
  );
};

export default Login;
