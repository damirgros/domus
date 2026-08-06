"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Demo() {
  const domus = ["D", "O", "M", "U", "S"];
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="flex min-h-screen w-full items-center justify-center overflow-hidden bg-white px-4 py-10 sm:px-6 lg:px-10">
      <div className="flex w-full max-w-6xl flex-col items-center justify-center gap-6 text-center md:flex-row md:gap-10 md:text-left">
        <motion.figure
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-shrink-0"
        >
          <Image
            src="/logo.svg"
            alt="Domus Logo"
            width={1024}
            height={1024}
            className="h-auto w-44 sm:w-56 md:w-64 lg:w-72 xl:w-80"
            loading="eager"
          />
        </motion.figure>

        <figcaption className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
          {domus.map((letter, index) => {
            return (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 + 0.15, duration: 0.6 }}
                className="p-1 text-5xl font-bold text-gray-800 sm:text-6xl md:text-7xl lg:text-[6rem]"
              >
                {letter}
              </motion.span>
            );
          })}
        </figcaption>
      </div>
    </div>
  );
}
