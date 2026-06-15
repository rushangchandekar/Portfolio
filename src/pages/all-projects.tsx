import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import portfolioProjects from "@/data/portfolioProjects";
import ArrowUpIcon from '@/assets/icons/arrow-up-right.svg';
import CheckCircleIcon from '@/assets/icons/check-circle.svg';
import Image from "next/image";
import Head from "next/head";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { ContactModal } from "@/components/ContactModal";
import { useState } from "react";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";

const categories = [
  { key: "Web Development", label: "Web Development" },
  { key: "Data Science", label: "Data Analytics" },
  { key: "Hackathon", label: "Hackathon" },
];

export default function AllProjectsPage() {
    const [showContact, setShowContact] = useState(false);

  return (
    <>
      <Head>
        <title>Rushang Chandekar | Projects</title>
      </Head>

      <Header onContactClick={() => setShowContact(true)} isSubPage={true} />

      <section className="pt-32 pb-16 lg:pt-36 lg:pb-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <SectionHeader 
            eyebrow="The Library"
            title="Explore My Projects"
            description="A curated journey through my work in Web Development, Data Analytics, and Hackathons."
          />

          <div className="mt-20 space-y-24">
            {categories.map((category, categoryIndex) => (
              <div key={category.key} className="relative">
                {/* Category heading - sticky while cards stack */}
                <div className="sticky top-[64px] z-10 py-4 bg-gray-900/95 backdrop-blur-sm mb-8">
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-sky-400">
                    {category.label}
                  </h2>
                </div>
                
                <ScrollStack className="mt-8">
                  {portfolioProjects
                    .filter(project => project.category === category.key)
                    .map((project, projectIndex) => (
                      <ScrollStackItem key={`${project.title}-${projectIndex}`}>
                        <Card 
                          className="px-8 pt-8 pb-0 md:pt-12 md:px-10 lg:pt-16 lg:px-20"
                        >
                          <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                            <div className="lg:pb-16">
                              <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text">
                                <span>{project.company}</span>
                                <span>&bull;</span>
                                <span>{project.year}</span>
                              </div>
                              <h3 className="font-serif text-2xl mt-2 md:mt-5 md:text-4xl">{project.title}</h3>
                              <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />
                              <ul className="flex flex-col gap-4 mt-4 md:mt-5">
                                {project.results.map((result, idx) => (
                                  <li key={`${result.title}-${idx}`} className="flex gap-2 text-sm md:text-base text-white/50">
                                    <CheckCircleIcon className="size-5 md:size-6" /> 
                                    <span>{result.title}</span>
                                  </li>
                                ))}
                              </ul>
                              <a href={project.link} target="_blank" rel="noopener noreferrer">
                                <button 
                                  className="bg-white text-gray-950 h-12 w-full md:w-auto px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8">
                                    <span>Visit live Site</span>
                                    <ArrowUpIcon className="size-4" />
                                </button>
                              </a>
                            </div>
                            <div className="relative">
                              <Image 
                                src={project.image} 
                                alt={project.title} 
                                priority={projectIndex === 0 && categoryIndex === 0}
                                className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none rounded-xl border border-gray-500" 
                              />
                            </div>
                          </div>
                        </Card>
                      </ScrollStackItem>
                    ))}
                </ScrollStack>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
      <div className="relative z-[1000]">
        <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
      </div>
    </>
  );
}