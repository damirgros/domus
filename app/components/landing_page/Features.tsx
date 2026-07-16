import {
  LuHouse,
  LuUsers,
  LuFileText,
  LuWrench,
  LuReceipt,
  LuMessageCircle,
} from "react-icons/lu";

const features = [
  {
    title: "Pregled svih nekretnina",
    description:
      "Dodajte svoje stanove i pratite sve informacije na jednom mjestu.",
    icon: <LuHouse className="w-10 h-10 text-[#138d63]" aria-hidden="true" />,
  },
  {
    title: "Stanari i ugovori",
    description: "Vodite evidenciju o stanarima i ugovorima.",
    icon: <LuUsers className="w-10 h-10 text-[#138d63]" aria-hidden="true" />,
  },
  {
    title: "Praćenje najma",
    description: "Bilježite uplate, šaljite podsjetnike i pratite dugovanja.",
    icon: (
      <LuFileText className="w-10 h-10 text-[#138d63]" aria-hidden="true" />
    ),
  },
  {
    title: "Održavanje",
    description: "Zaprimajte zahtjeve stanara i pratite statuse radova.",
    icon: <LuWrench className="w-10 h-10 text-[#138d63]" aria-hidden="true" />,
  },
  {
    title: "Troškovi i izvještaji",
    description: "Evidentirajte troškove i generirajte izvještaje.",
    icon: <LuReceipt className="w-10 h-10 text-[#138d63]" aria-hidden="true" />,
  },
  {
    title: "Komunikacija sa stanarima",
    description:
      "Komunicirajte sa stanarima putem aplikacije i šaljite obavijesti.",
    icon: (
      <LuMessageCircle
        className="w-10 h-10 text-[#138d63]"
        aria-hidden="true"
      />
    ),
  },
];

export default function Features() {
  return (
    <section id="features">
      <div className="flex flex-col items-center justify-center gap-4 my-20 text-center">
        <h2 className="text-lg font-bold text-[#138d63]">ZAŠTO DOMUS?</h2>
        <h3 className="text-4xl font-bold">
          Sve što vam treba za upravljanje stanovima.
        </h3>
        <p className="text-lg text-gray-500">
          Domus je napravljen za privatne iznajmljivače koji žele uštedjeti
          vrijeme,
          <br /> imati bolji pregled i efikasnije upravljati svojim
          nekretninama.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-20">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="flex w-full flex-row items-center justify-start gap-4 mb-5"
          >
            <div className="bg-green-50 p-4 rounded-lg">{feature.icon}</div>
            <div>
              <h3 className="text-xl font-bold text-left">{feature.title}</h3>
              <p className="text-gray-500 text-left">{feature.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
