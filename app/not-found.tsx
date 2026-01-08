import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-primary-light">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-8">
          Ho sentim, no hem trobat aquesta pàgina
        </p>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          La pàgina que estàs cercant podria haver estat eliminada, haver
          canviat de nom o estar temporalment no disponible.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
        >
          Tornar a l&apos;inici
        </Link>
      </div>
    </div>
  );
}
