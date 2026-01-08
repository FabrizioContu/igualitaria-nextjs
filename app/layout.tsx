import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "La Igualitària - Economat Cooperatiu del Poble-sec",
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
