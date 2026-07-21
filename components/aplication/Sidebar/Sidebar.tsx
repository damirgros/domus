"use client";

import {
  LuMenu,
  LuLayoutDashboard,
  LuHouse,
  LuUsers,
  LuFileText,
  LuWrench,
  LuReceipt,
  LuMessageCircle,
} from "react-icons/lu";
import SidebarLink from "./SidebarLink";
import { useState } from "react";
import { usePathname } from "next/navigation";

const pages = [
  {
    title: "Nadzorna ploča",
    href: "/dashboard",
    icon: (
      <LuLayoutDashboard
        className="w-10 h-10 text-[#99a7aa]"
        aria-hidden="true"
      />
    ),
  },
  {
    title: "Pregled svih nekretnina",
    href: "/overview",
    icon: <LuHouse className="w-10 h-10 text-[#99a7aa]" aria-hidden="true" />,
  },
  {
    title: "Stanari i ugovori",
    href: "/tenants",
    icon: <LuUsers className="w-10 h-10 text-[#99a7aa]" aria-hidden="true" />,
  },
  {
    title: "Praćenje najma",
    href: "/leases",
    icon: (
      <LuFileText className="w-10 h-10 text-[#99a7aa]" aria-hidden="true" />
    ),
  },
  {
    title: "Održavanje",
    href: "/maintanance",
    icon: <LuWrench className="w-10 h-10 text-[#99a7aa]" aria-hidden="true" />,
  },
  {
    title: "Troškovi i izvještaji",
    href: "/expanses",
    icon: <LuReceipt className="w-10 h-10 text-[#99a7aa]" aria-hidden="true" />,
  },
  {
    title: "Komunikacija sa stanarima",
    href: "/chat",
    icon: (
      <LuMessageCircle
        className="w-10 h-10 text-[#99a7aa]"
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
    <aside
      className={`
        bg-[#233b40] rounded-r-2xl overflow-hidden h-screen
        transition-[width] duration-300 ease-in-out 
        ${isOpen ? "w-100" : "w-30"}`}
    >
      <nav
        className={`
          flex flex-col p-5
          transition-all duration-300
          gap-5
        `}
      >
        <button
          onClick={handleClickMenu}
          className={`${!isOpen ? "flex items-center justify-center" : "ml-5"}`}
        >
          <LuMenu
            className={`
              w-10 h-10 text-[#99a7aa]
              transition-transform duration-300
              ${isOpen ? "rotate-90" : ""}
            `}
          />
        </button>
        <ul className="flex flex-col gap-5">
          {pages.map((page) => {
            return (
              <li
                key={page.title}
                className={`${pathname === page.href && "p-5 -m-5"}`}
              >
                <SidebarLink page={page} isOpen={isOpen} />
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
