import Image from "next/image";
import Button from "./Button";

export default function Hero() {
  return (
    <section
      id="hero"
      className="flex flex-col lg:flex-row items-center justify-center py-16 px-10 bg-gradient-to-r from-[#fafbfd] via-[#fafbfe] to-white gap-10"
    >
      <div className="animate-fade-in-left">
        <p className="text-[#138d63] font-bold bg-green-100 rounded-lg px-4 py-1 mb-4 w-fit">
          Za privatne Iznajmljivače
        </p>
        <h1 className="text-4xl font-bold text-left text-black">
          Upravljajte svojim <br /> nekretninama{" "}
          <span className="text-[#138d63]">jednostavno.</span>
        </h1>
        <p className="mt-4 mb-6 text-lg text-left text-gray-700">
          Sve što vam treba za pračenje najma, stanara, troškova i održavanja{" "}
          <br />
          na jednom mjestu.
        </p>
        <Button />
      </div>
      <figure className="mb-8 animate-fade-in-right">
        <Image
          alt="Hero Image"
          src="/hero.png"
          width={1024}
          height={1024}
          className="w-full h-auto shadow-2xl rounded-lg"
          loading="eager"
        />
      </figure>
    </section>
  );
}
