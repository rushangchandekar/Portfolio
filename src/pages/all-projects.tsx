import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import portfolioProjects from "@/data/portfolioProjects";
import ArrowUpIcon from '@/assets/icons/arrow-up-right.svg';
import CheckCircleIcon from '@/assets/icons/check-circle.svg';
import Image from "next/image";

const categories = [
  { key: "Web Development", label: "Web Development Projects" },
  { key: "Data Science", label: "Data Science Projects" },
  { key: "Hackathon", label: "Hackathon Projects" },
];

export default function AllProjectsPage() {
  return (
    <section className="pb-16 lg:py-24">
      <div className="container">
        <SectionHeader 
          eyebrow="All Projects"
          title="My Complete Project Portfolio"
          description="Browse through all the projects I’ve worked on."
        />
        {categories.map(category => (
          <div key={category.key} className="mt-16">
            <h2 className="text-2xl font-bold mb-8">{category.label}</h2>
            <div className="flex flex-col gap-14">
              {portfolioProjects
                .filter(project => project.category === category.key)
                .map((project, projectIndex) => (
                  <Card 
                    key={project.title} 
                    className="px-8 pt-8 pb-0 md:pt-12 md:px-10 lg:pt-16 lg:px-20 sticky"
                    style={{
                      top: `calc(64px + ${projectIndex * 40}px)`,
                    }}
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
                          {project.results.map(result => (
                            <li key={result.title} className="flex gap-2 text-sm md:text-base text-white/50">
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
                          className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none rounded-xl border border-gray-500" 
                        />
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
