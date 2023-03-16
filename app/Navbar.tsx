import Login from "@/components/Login";
import Logout from "@/components/Logout";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex border-b border-gray-500 justify-between items-center px-4 py-2">
      <div className="flex gap-4 items-center justify-center">
        <img className="w-10" src="/aka.png" alt="logo" />
        <h1 className="font-bold text-xl text-[#E9E9E9]">Noteflix</h1>
      </div>

      <div className="md:flex gap-2 items-center justify-between rounded-md bg-[#525355] md:w-[31vw] px-2 py-4 hidden h-[3rem] md:-ml-6">
        <button className="btn btn-ghost btn-circle h-[2.5rem]">
          <svg
            focusable="false"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-[#e9e9e9]"
          >
            <path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path>
            <path d="M0,0h24v24H0V0z" fill="none"></path>
          </svg>
        </button>
        <input
          placeholder="Search . . ."
          className="w-full px-2 bg-[#525355] text-[#E9E9E9] placeholder-[#E9E9E9] outline-none"
          type="text"
        />
        <button className="btn btn-ghost btn-circle h-[2.5rem]">
          <svg
            focusable="false"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-[#E9E9E9]"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            <path d="M0 0h24v24H0z" fill="none"></path>
          </svg>
        </button>
      </div>
      <div>
        {session?.user ? <Logout image={session.user.image!} /> : <Login />}
        {/* <div>{user ? <Logout image={user.photoURL!} /> : <Login />}</div> */}
      </div>
    </div>
  );
};

export default Navbar;
