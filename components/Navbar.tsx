"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Inici", href: "/" },
    { name: "Qui Som", href: "/qui-som" },

    { name: "Comunitat", href: "/comunitat" },
    { name: "Proveïdors", href: "/proveidors" },
  ];

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="bg-primary/95 shadow-sm fixed top-0 w-full z-50 backdrop-blur-md ">
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <div className="flex w-full items-center justify-between py-1">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-3"
              aria-label="La Igualitària - Pàgina d'inici"
            >
              <img
                src="/logoCircle.webp"
                alt="Logotip de La Igualitària"
                className="h-20"
              />

              <img
                src="/laIgualitariaTextBlanc.webp"
                alt="Logotip de La Igualitària"
                className="h-12"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6 ">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isActive(item.href)
                    ? "text-white underline-offset-4 font-semibold"
                    : "text-gray-50  font-semibold"
                } px-3 py-2 font-glass-antigua transition-colors focus:outline-none focus:ring-2 focus:ring-primary hover:scale-110 hover:transition focus:ring-offset-2 rounded-md`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/fer-se-soci"
              className="ml-4 inline-flex items-center rounded-md bg-pink-600 px-4 py-2 text-md font-medium text-white shadow-sm hover:bg-pink-600-dark focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-colors hover:scale-110 hover:transition "
            >
              Fes-te sòcia
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white focus:outline-none ring-2 ring-gray-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">
                {isMenuOpen ? "Tanca el menú" : "Obre el menú"}
              </span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden" id="mobile-menu">
            <div className="bg-gray-100  rounded-sm space-y-1 px-2 pb-3 pt-2 mb-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    isActive(item.href)
                      ? "border-primary border-2 font-medium italic"
                      : " hover:bg-gray-200"
                  } block px-3 py-2 rounded-md text-base text-primary font-glass-antigua focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/fer-se-soci"
                className={`${
                  isActive("/fer-se-soci")
                    ? "border-pink-600 border-2 text-pink-600 font-medium italic"
                    : "bg-pink-600 text-white"
                } block px-3 py-2 rounded-md text-md text-primary font-glass-antigua focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                Fes-te soci/a
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
