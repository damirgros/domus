"use client";

import {
  LuArrowLeft,
  LuArrowRight,
  LuLayoutDashboard,
  LuHouse,
  LuUsers,
  LuFileText,
  LuWrench,
  LuReceipt,
  LuMenu,
  LuX,
} from "react-icons/lu";
import SidebarLink from "./SidebarLink";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const pages = [
  {
    title: "Nadzorna ploča",
    href: "/dashboard",
    icon: (
      <LuLayoutDashboard
        className="h-7 w-7 text-[#99a7aa] sm:h-8 sm:w-8"
        aria-hidden="true"
      />
    ),
  },
  {
    title: "Nekretnine",
    href: "/properties",
    icon: (
      <LuHouse
        className="h-7 w-7 text-[#99a7aa] sm:h-8 sm:w-8"
        aria-hidden="true"
      />
    ),
  },
  {
    title: "Stanari",
    href: "/tenants",
    icon: (
      <LuUsers
        className="h-7 w-7 text-[#99a7aa] sm:h-8 sm:w-8"
        aria-hidden="true"
      />
    ),
  },
  {
    title: "Najmovi",
    href: "/leases",
    icon: (
      <LuFileText
        className="h-7 w-7 text-[#99a7aa] sm:h-8 sm:w-8"
        aria-hidden="true"
      />
    ),
  },
  {
    title: "Održavanje",
    href: "/maintenance",
    icon: (
      <LuWrench
        className="h-7 w-7 text-[#99a7aa] sm:h-8 sm:w-8"
        aria-hidden="true"
      />
    ),
  },
  {
    title: "Troškovi",
    href: "/expenses",
    icon: (
      <LuReceipt
        className="h-7 w-7 text-[#99a7aa] sm:h-8 sm:w-8"
        aria-hidden="true"
      />
    ),
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleClickMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClickMenu}
        className="fixed right-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#233b40] text-[#99a7aa] shadow-lg transition hover:opacity-90 md:hidden"
        aria-label={isOpen ? "Zatvori navigaciju" : "Otvori navigaciju"}
      >
        {isOpen ? <LuX className="h-6 w-6" /> : <LuMenu className="h-6 w-6" />}
      </button>

      {isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 md:hidden"
          aria-label="Zatvori navigaciju"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen flex-col overflow-hidden rounded-r-2xl bg-[#233b40] transition-all duration-300 ${
          isOpen ? "w-72 translate-x-0" : "-translate-x-full"
        } md:static md:translate-x-0 md:w-30 ${isOpen ? "md:w-72" : "md:w-30"}`}
      >
        <nav className="flex h-full flex-col p-4 sm:p-5">
          <div className="flex items-center gap-2 md:ml-2">
            <Image
              alt="Domus Logo"
              src="/logo.svg"
              width={1024}
              height={1024}
              className="h-auto w-14 sm:w-16"
            />

            <span
              className={`text-2xl font-bold text-[#99a7aa] transition-all duration-300 sm:text-3xl ${
                isOpen ? "opacity-100" : "hidden"
              }`}
            >
              Domus
            </span>
          </div>

          <hr className="my-4 border-gray-200/70" />

          <ul className="flex flex-1 flex-col gap-2">
            {pages.map((page) => (
              <li
                key={page.title}
                className={
                  pathname === page.href ? "rounded-xl bg-[#1b6a54]" : undefined
                }
              >
                <SidebarLink
                  page={page}
                  isOpen={isOpen}
                  onNavigate={() => setIsOpen(false)}
                />
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={handleClickMenu}
            className="mt-4 hidden items-center justify-center rounded-xl border border-white/10 p-2 text-[#99a7aa] transition hover:bg-white/10 md:flex"
          >
            {isOpen ? (
              <LuArrowLeft className="h-8 w-8" />
            ) : (
              <LuArrowRight className="h-8 w-8" />
            )}
          </button>
        </nav>
      </aside>
    </>
  );
}
