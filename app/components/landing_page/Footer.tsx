import Button from "./Button";

export default function Footer() {
  return (
    <footer className="flex flex-row items-center justify-center gap-40 bg-[#233b40] p-10">
      <div className="flex flex-col gap-5">
        <h2 className="text-white font-bold text-3xl">
          Spremni za jednostavnije <br /> upravljanje nekretninama?
        </h2>
        <p className="text-white font-thin text-sm">
          Pridružite se iznajmljivačima koji već štede vijeme i novac.
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <Button />
        <p className="text-white font-thin text-xs">
          Nema kreditne kartice{" "}
          <span
            aria-hidden="true"
            className="inline-block w-1 h-1 rounded-full bg-white mb-0.5 mx-1 "
          ></span>{" "}
          Otkažite kad god želite
        </p>
      </div>
    </footer>
  );
}
