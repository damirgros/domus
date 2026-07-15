import Image from "next/image";

import { LuUserPlus, LuHousePlus, LuClock } from "react-icons/lu";

const steps = [
  {
    number: 1,
    image: <LuUserPlus className="w-12 h-12 text-[#138d63]" />,
    title: "Kreirajte Račun",
    description: "Registrirajte se besplatno i postavite svoj profil.",
  },
  {
    number: 2,
    image: <LuHousePlus className="w-12 h-12 text-[#138d63]" />,
    title: "Dodajte svoje nekretnine",
    description: "Unesite svoje nekretnine, stanare i ugovore.",
  },
  {
    number: 3,
    image: <LuClock className="w-12 h-12 text-[#138d63]" />,
    title: "Uštedite vrijeme",
    description: "Sve je organizirano, a vi imate više vremena za sebe.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="flex flex-row items-center justify-center gap-10 my-20 px-20 bg-[#f6fbfa]"
    >
      <div>
        <p>KAKO RADI?</p>
        <p>
          Počnite za <br /> samo 3 koraka
        </p>
        <Image
          alt="How it works"
          src="/arrow.png"
          width={109}
          height={71}
          className="w-full h-auto shadow-2xl rounded-lg"
        />
      </div>
      <div>
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex flex-row items-center text-center"
          >
            {step.image}
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
      <div></div>
    </section>
  );
}
