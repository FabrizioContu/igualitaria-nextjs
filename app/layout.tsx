import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "La Igualitària - Economat Cooperatiu del Poble-sec",
    template: "%s | La Igualitària",
  },
  description:
    "Cooperativa de consum autogestionada i participativa que ofereix productes de proximitat, de temporada i agroecològics al veïnat del Poble-sec.",
  keywords: [
    "cooperativa",
    "Poble-sec",
    "Barcelona",
    "alimentació ecològica",
    "productes locals",
    "economia social",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ca">
      <body className="font-poppins">
        <div className="flex flex-col min-h-screen w-full">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-primary focus:font-semibold focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Salta al contingut principal
          </a>
          <Navbar />

          <main className="grow pt-20" id="main-content">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
