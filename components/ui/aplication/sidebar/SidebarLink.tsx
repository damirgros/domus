"use client";

import Link from "next/link";
import type { Page } from "@/types/page";
import { usePathname } from "next/navigation";

export default function SidebarLink({
  page,
  isOpen,
}: {
  page: Page;
  isOpen: boolean;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={page.href}
      className={`block w-full p-5 ${pathname === page.href && "bg-[#1b6a54] rounded-xl"}`}
    >
      <figure
        className={`flex items-center text-[#99a7aa] ${
          isOpen ? "justify-start gap-5" : "justify-center"
        }`}
      >
        {page.icon}
        <figcaption
          className={`
            flex items-center justify-center
            text-[#99a7aa] font-bold
            whitespace-nowrap overflow-hidden
            transition-all duration-300
            ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"}`}
        >
          {isOpen && page.title}
        </figcaption>
      </figure>
    </Link>
  );
}
