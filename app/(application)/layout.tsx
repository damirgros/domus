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
    <div className="flex min-h-screen flex-col bg-slate-50 md:flex-row">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">{children}</main>
    </div>
  );
}
