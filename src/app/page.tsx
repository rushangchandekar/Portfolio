"use client";
import { useState } from "react";
import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { ContactSection } from "@/sections/Contact";
import { ContactModal } from "@/components/ContactModal";
import { EducationSection } from "@/sections/Education";
import { ProjectsSection } from "@/sections/Projects";
import { TapeSection } from "@/sections/Tape";
import { TestimonialsSection } from "@/sections/Testimonials";
import { AboutSection } from "@/sections/About";
import { Footer } from "@/sections/Footer";

export default function Home() {
  const [showContact, setShowContact] = useState(false);

  return (
    <>
      <Header onContactClick={() => setShowContact(true)} />
      <HeroSection onContactClick={() => setShowContact(true)} />
      <EducationSection />
      <ProjectsSection />
      <TapeSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection onContactClick={() => setShowContact(true)} />
      <Footer />
      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
    </>
  );
}