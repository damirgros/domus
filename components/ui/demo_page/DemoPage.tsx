"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Demo() {
  const domus = ["D", "O", "M", "U", "S"];
  return (
    <div className="flex flex-row items-center justify-center w-screen h-screen gap-10">
      <motion.figure
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/logo.svg"
          alt="Domus Logo"
          width={1024}
          height={1024}
          className="w-70 h-auto"
          loading="eager"
        />
      </motion.figure>
      <figcaption>
        {domus.map((letter, index) => {
          return (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.25 + 0.25, duration: 1 }}
              className="text-[6rem] text-gray-800 font-bold p-3"
            >
              {letter}
            </motion.span>
          );
        })}
      </figcaption>
    </div>
  );
}
