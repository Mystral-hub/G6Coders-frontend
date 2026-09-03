import About from "@/components/sections/About";
import Announcements from "@/components/sections/Announcements";
import ContactSection from "@/components/sections/ContactSection";
import FeatureCards from "@/components/sections/FeatureCards";
import Hero from "@/components/sections/Hero";
import Partners from "@/components/sections/Partners";
import Services from "@/components/sections/Services";
import Stats from "@/components/sections/Stats";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";

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
      <Announcements />
      <Testimonials />
      <ContactSection />
    </>
  );
}
