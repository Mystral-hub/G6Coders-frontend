import About from "@/components/sections/About";
import ContactSection from "@/components/sections/ContactSection";
import FeatureCards from "@/components/sections/FeatureCards";
import Hero from "@/components/sections/Hero";
import Partners from "@/components/sections/Partners";
import Services from "@/components/sections/Services";
import Stats from "@/components/sections/Stats";
import Team from "@/components/sections/Team";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureCards />
      <Services />
      <About />
      <Stats />
      <Partners />
      <Team />
      <ContactSection />
    </>
  );
}
