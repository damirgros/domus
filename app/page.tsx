import NavBar from "../components/ui/landing_page/NavBar";
import Features from "../components/ui/landing_page/Features";
import HowItWorks from "../components/ui/landing_page/HowItWorks";
import AboutUs from "../components/ui/landing_page/AboutUs";
import Hero from "../components/ui/landing_page/Hero";
import Footer from "../components/ui/landing_page/Footer";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import seed from "@/utils/demo-seed";

export default async function Home() {
  const cookieStore = await cookies();
  const sessionId = await cookieStore.get("session")?.value;

  let workspace = await prisma.workspace.findUnique({
    where: {
      sessionId,
    },
  });

  if (!workspace && sessionId) {
    const workspace = await prisma.workspace.create({
      data: {
        id: crypto.randomUUID(),
        accessToken: crypto.randomUUID(),
        sessionId,
      },
    });
    if (workspace) {
      seed(workspace)
        .catch((error) => {
          console.error("Seeding failed:", error);
        })
        .finally(async () => {
          await prisma.$disconnect();
        });
    }
  }
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <AboutUs />
      </main>
      <Footer />
    </>
  );
}
