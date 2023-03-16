import { signIn } from "next-auth/react";

const LoginUser = () => {
  return (
    <div className="flex justify-center items-center">
      <button
        className="px-4 py-2 text-gray-300 rounded-lg border border-1 border-[#575B5F] m-1 w-full bg-[#9f4040a7] transition-all duration-300 hover:bg-[#9f4040c7] hover:-translate-y-[1px]"
        onClick={() => signIn()}
      >
        Sign Out
      </button>
    </div>
  );
};

export default LoginUser;
