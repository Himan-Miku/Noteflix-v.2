import "./globals.css";
import { Poppins } from "next/font/google";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Landing from "./Landing";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { SessionProvider } from "@/components/SessionProvider";
import { ModalContextProvider } from "@/context/ModalContext";
import { SidebarContextProvider } from "@/context/SidebarContext";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  style: "normal",
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Noteflix",
  description: "An Anime Theme Notes Application.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  console.log("Session from layout component: ", session);

  return (
    <html className="overflow-x-hidden overflow-y-auto" lang="en">
      <body className={`${poppins.variable} font-poppins bg-[#202124]`}>
        <SessionProvider session={session}>
          <ModalContextProvider>
            {session?.user ? (
              <>
                <SidebarContextProvider>
                  <Navbar />
                  <div className="flex">
                    <div>
                      <Sidebar />
                    </div>
                    <div className="flex-1">{children}</div>
                  </div>
                </SidebarContextProvider>
              </>
            ) : (
              <>
                <Landing />
              </>
            )}
          </ModalContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
