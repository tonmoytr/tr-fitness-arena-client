import { Inter, Space_Grotesk } from "next/font/google";
import "@/app/globals.css";
import Providers from "./Providers/Providers";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Configure Space Grotesk for bold, athletic layout styling
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
      <body className="">
        <Providers>
          {/* Layout elements stay server-rendered wrappers */}
          <Navbar />
          <main className="grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
