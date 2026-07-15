import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between w-full py-4 px-20 bg-white border-b-1 border-gray-200">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image
            alt="Logo"
            src="/logo.svg"
            width={1024}
            height={1024}
            className="w-16 h-auto"
          />
        </Link>
        <Link href="/">
          <h2 className="text-4xl font-bold">Domus</h2>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <NavLink href="#features">Značajke</NavLink>
        <NavLink href="#how-it-works">Kako radi</NavLink>
        <NavLink href="#about-us">O nama</NavLink>
      </div>
      <div className="flex items-center gap-4">
        <NavLink href="/login">Prijava</NavLink>
      </div>
    </nav>
  );
}
