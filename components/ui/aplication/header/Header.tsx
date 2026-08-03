import Link from "next/link";

type HeaderProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonHref?: string;
};

export default function Header({
  title,
  description,
  buttonText,
  buttonHref,
}: HeaderProps) {
  return (
    <header className="flex w-full flex-col gap-4 p-4 sm:p-6 lg:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
          <p className="text-sm font-bold text-gray-500 sm:text-lg">
            {description}
          </p>
        </div>
        <div className="flex w-full md:w-auto">
          {buttonHref ? (
            <Link
              href={buttonHref}
              className="inline-flex w-full items-center justify-center rounded-lg bg-[#138d63] px-5 py-3 text-sm font-bold text-white transition-colors duration-400 hover:text-black md:w-auto md:text-lg"
            >
              + {buttonText}
            </Link>
          ) : (
            <button className="inline-flex w-full items-center justify-center rounded-lg bg-[#138d63] px-5 py-3 text-sm font-bold text-white transition-colors duration-400 hover:text-black md:w-auto md:text-lg">
              + {buttonText}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
