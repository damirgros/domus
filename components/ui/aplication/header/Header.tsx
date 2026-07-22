type HeaderProps = {
  title: string;
  description: string;
  buttonText: string;
};

export default function Header({
  title,
  description,
  buttonText,
}: HeaderProps) {
  return (
    <header className="flex flex-row justify-between p-10 w-full">
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-lg font-bold text-gray-500">{description}</p>
      </div>
      <div>
        <button className="text-lg font-bold text-white bg-[#138d63] px-5 py-3 mt-4 rounded-lg hover:text-black transition-colors duration-400">
          + {buttonText}
        </button>
      </div>
    </header>
  );
}
