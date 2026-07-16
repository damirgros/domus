import Image from "next/image";

import { LuUserPlus, LuHousePlus, LuClock } from "react-icons/lu";

const steps = [
  {
    number: 1,
    icon: (
      <LuUserPlus className="w-12 h-12 text-[#138d63]" aria-hidden="true" />
    ),
    title: "Kreirajte Račun",
    description: "Registrirajte se besplatno i postavite svoj profil.",
  },
  {
    number: 2,
    icon: (
      <LuHousePlus className="w-12 h-12 text-[#138d63]" aria-hidden="true" />
    ),
    title: "Dodajte svoje nekretnine",
    description: "Unesite svoje nekretnine, stanare i ugovore.",
  },
  {
    number: 3,
    icon: <LuClock className="w-12 h-12 text-[#138d63]" aria-hidden="true" />,
    title: "Uštedite vrijeme",
    description: "Sve je organizirano, a vi imate više vremena za sebe.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="flex flex-row items-center gap-10 my-20 pl-20 py-10 bg-[#f6fbfa]"
    >
      <div className="flex flex-col items-start gap-4">
        <h2 className="text-lg font-bold text-[#138d63]">KAKO RADI?</h2>
        <h3 className="text-2xl font-bold">
          Počnite za <br /> samo 3 koraka
        </h3>
        <Image
          alt="Strjelica"
          src="/arrow.png"
          width={109}
          height={71}
          className="w-full h-auto"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
        {steps.map((step) => (
          <article
            key={step.number}
            className="flex flex-col items-center text-center gap-4 mb-10 bg-white p-6 rounded-lg shadow-md"
          >
            <span className="text-2xl font-bold text-[#138d63] bg-[#138d63] text-white rounded-full w-12 h-12  flex items-center justify-center">
              {step.number}
            </span>
            {step.icon}
            <h3 className="text-xl font-bold">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </article>
        ))}
      </div>
      <div>
        <Image
          alt="Primjer nekretnine kojom se upravlja u Domusu"
          src="/apartment-building.webp"
          width={1000}
          height={750}
          className="w-150 h-auto shadow-2xl rounded-l-lg"
        />
      </div>
    </section>
  );
}
