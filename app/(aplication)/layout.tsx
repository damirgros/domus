import type { Metadata } from "next";
import Sidebar from "@/components/ui/aplication/sidebar/Sidebar";

export const metadata: Metadata = {
  title: "Domus demo aplikacija",
  description:
    "Demo aplikacija za pračenje najma, stanara, troškova i održavanja na jednom mjestu",
};

export default function AplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <main className="w-full">{children}</main>
    </div>
  );
}
