"use client";
import { useState, useEffect } from "react";
import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { ContactSection } from "@/sections/Contact";
import { ContactModal } from "@/components/ContactModal";
import { EducationSection } from "@/sections/Education";
import { ProjectsSection } from "@/sections/Projects";
import { TapeSection } from "@/sections/Tape";
import { TestimonialsSection } from "@/sections/Testimonials";
import { AboutSection } from "@/sections/About";
import { TechStackSection } from "@/sections/TechStack";
import { Footer } from "@/sections/Footer";
import Lenis from "lenis";

export default function Home() {
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.1,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Header onContactClick={() => setShowContact(true)} />
      <HeroSection onContactClick={() => setShowContact(true)} />
      <AboutSection />
      <TechStackSection />
      <EducationSection />
      <ProjectsSection />
      <TapeSection />
      <TestimonialsSection />
      <ContactSection onContactClick={() => setShowContact(true)} />
      <Footer />
      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
    </>
  );
}