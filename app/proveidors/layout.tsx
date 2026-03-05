import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proveïdors",
  description:
    "Coneix els nostres proveïdors locals i ecològics. Productors que comparteixen els nostres valors de sostenibilitat i justícia social.",
  openGraph: {
    title: "Proveïdors | La Igualitària",
    description:
      "Productors locals i ecològics que formen part de La Igualitària.",
    url: "/proveidors",
  },
  alternates: { canonical: "/proveidors" },
};

export default function ProveïdorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
