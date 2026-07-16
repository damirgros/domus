import Link from "next/link";

export default function Button() {
  return (
    <Link
      href="/demo"
      className="text-lg font-bold text-white bg-[#138d63] px-5 py-3 mt-4 rounded-lg hover:text-black transition-colors duration-400"
    >
      Besplatno isprobaj demo
    </Link>
  );
}
