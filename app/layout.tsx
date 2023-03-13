import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  style: "normal",
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Noteflix",
  description: "An Anime theme Notes Application.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins`}>{children}</body>
    </html>
  );
}
