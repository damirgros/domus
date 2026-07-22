import NavBar from "../components/ui/landing_page/NavBar";
import Features from "../components/ui/landing_page/Features";
import HowItWorks from "../components/ui/landing_page/HowItWorks";
import AboutUs from "../components/ui/landing_page/AboutUs";
import Hero from "../components/ui/landing_page/Hero";
import Footer from "../components/ui/landing_page/Footer";

export default function Home() {
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
