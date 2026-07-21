import Link from "next/link";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="text-lg font-bold relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full"
    >
      {children}
    </Link>
  );
}
