import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function PublicMarketingLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Navbar will render exclusively across open marketing files */}
      <Navbar />

      <main className="grow w-full">{children}</main>

      {/* Footer is locked cleanly to public footprints only */}
      <Footer />
    </div>
  );
}
