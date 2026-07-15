import NavBar from "./components/landing_page/NavBar";
import Features from "./components/landing_page/Features";
import HowItWorks from "./components/landing_page/HowItWorks";
import AboutUs from "./components/landing_page/AboutUs";
import Hero from "./components/landing_page/Hero";

export default function Home() {
  return (
    <main>
      <NavBar />
      <Hero />
      <Features />
      <HowItWorks />
      <AboutUs />
    </main>
  );
}
