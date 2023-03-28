import Logout from "@/components/Logout";
import LoginUser from "@/components/LoginUser";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Searchbar from "@/components/Searchbar";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex border-b border-gray-500 justify-between items-center px-4 py-2">
      <div className="flex gap-4 items-center justify-center">
        <img className="w-10" src="/aka.png" alt="logo" />
        <h1 className="font-bold text-xl text-[#E9E9E9]">Noteflix</h1>
      </div>

      <div className="md:flex gap-2 items-center justify-between rounded-md bg-[#525355] md:w-[31vw] px-2 py-4 hidden h-[3rem] md:-ml-6">
        <Searchbar />
      </div>
      <div>
        {session?.user ? <Logout image={session.user.image!} /> : <LoginUser />}
      </div>
    </div>
  );
};

export default Navbar;
