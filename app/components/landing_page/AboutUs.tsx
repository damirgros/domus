"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";

const recommendations = [
  {
    name: "Marko Marković, vlasnik 5 stanova u Zagrebu",
    recommendation:
      "Domus mi je uštedio puno vremena i olakšao upravljanje mojim stanovima. Preporučujem ga svima!",
  },
  {
    name: "Ivana Ivanković, vlasnica 3 stana u Osijeku",
    recommendation:
      "Korištenje Domusa je jednostavno i intuitivno. Sada mogu pratiti sve svoje stanove na jednom mjestu.",
  },
  {
    name: "Petar Petrović, vlasnik 2 stana u Splitu",
    recommendation:
      "Domus mi je omogućio da bolje organiziram svoje poslovanje i povećam profitabilnost.",
  },
];

export default function AboutUs() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === recommendations.length - 1 ? 0 : prev + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <section id="about-us">
      <div className="flex flex-col items-center justify-center gap-4 my-20 text-center">
        <h2 className="text-lg font-bold text-[#138d63]">
          ŠTO KAŽU NAŠI KORISNICI
        </h2>
        <figure className="p-6" aria-live="polite">
          <blockquote className="text-2xl font-bold mt-4">
            &quot;{recommendations[currentIndex].recommendation}&quot;
          </blockquote>
          <figcaption className="text-md text-gray-500">
            — {recommendations[currentIndex].name}
          </figcaption>
        </figure>
        <div className="flex gap-10">
          {recommendations.map((rec, index) => (
            <button
              key={rec.name}
              aria-label={`Prikaži preporuku ${index + 1}`}
              aria-current={index === currentIndex}
              className={clsx(
                "w-5 h-5 rounded-full",
                index === currentIndex ? "bg-[#138d63]" : "bg-gray-500",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
