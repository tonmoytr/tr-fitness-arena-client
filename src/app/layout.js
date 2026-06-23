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
      <body className="flex flex-col min-h-screen bg-brand-light text-brand-dark">
        <Providers>
          {/* Layout elements stay server-rendered wrappers */}
          <Navbar />
          <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
