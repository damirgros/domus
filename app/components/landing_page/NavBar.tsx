import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";

export default function NavBar() {
  return (
    <nav className="sticky top-0 flex items-center justify-between w-full py-4 px-20 bg-white border-b-1 border-gray-200">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image
            alt="Domus Logo"
            src="/logo.svg"
            width={1024}
            height={1024}
            className="w-16 h-auto"
          />
        </Link>
        <Link href="/" className="text-4xl font-bold">
          Domus
        </Link>
      </div>
      <ul className="flex items-center gap-4">
        <li>
          <NavLink href="#features">Značajke</NavLink>
        </li>
        <li>
          <NavLink href="#how-it-works">Kako radi</NavLink>
        </li>
        <li>
          <NavLink href="#about-us">O nama</NavLink>
        </li>
      </ul>
      <div className="flex items-center gap-4">
        <NavLink href="/demo">Demo aplikacija</NavLink>
      </div>
    </nav>
  );
}
