import { Inter, Space_Grotesk } from "next/font/google";
import "@/app/globals.css";
import Providers from "./Providers/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata = {
  title: "TR Fitness Arena | Elite Fitness & Gym Management Platform",
  description:
    "Discover training sessions, browse forums, and optimize your physical health metrics.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-[#1b2026] text-gray-100 min-h-screen flex flex-col antialiased">
        <Providers>
          {/* Dashboard and Public segments split beneath this clean window */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
