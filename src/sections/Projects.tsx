import FeastFinder from "@/assets/images/feastfinder.png";
import SpamLite from "@/assets/images/spamlite.png";
import RareDx from "@/assets/images/raredx.png";
import Image from "next/image";
import Link from "next/link";
import CheckCircleIcon from '@/assets/icons/check-circle.svg';
import ArrowUpIcon from '@/assets/icons/arrow-up-right.svg';
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";

const portfolioProjects = [
  {
    company: "FestFinder",
    year: "2024",
    title: "Recipe Finder App",
    results: [
      { title: "Built with HTML, CSS & JavaScript using MealDB API" },
      { title: "Enabled ingredient-based search for over 200+ recipes" },
      { title: "Enhanced user engagement through simple and intuitive UI" },
    ],
    link: "https://feast-finder-pnwx.vercel.app/",
    image: FeastFinder,
  },
  {
    company: "Spamlite",
    year: "2021",
    title: "SMS Spam Detection",
    results: [
      { title: "Trained ML model using Scikit-learn with 95% accuracy" },
      { title: "Used Streamlit to deploy an interactive web app" },
      { title: "Processed 5,000+ SMS samples for real-time classification" },
    ],
    link: "https://sms-spam-detection-ksroffnutzevqpuhrywbah.streamlit.app/",
    image: SpamLite,
  },
  {
    company: "RareDx",
    year: "2023",
    title: "Rare Disease Diagnostic Tool",
    results: [
      { title: "Designed AI system to assist in rare disease diagnosis" },
      { title: "Analyzed symptoms, history & lab reports for prediction" },
      { title: "Aimed to support doctors with data-driven decisions" },
    ],
    link: "https://rxai.vercel.app/",
    image: RareDx,
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="pb-16 lg:py-24">
      <div className="container">
        <SectionHeader 
          eyebrow="Real-world Results" 
          title="Featured Projects" 
          description="See how i transformed concepts into engaging digital experiences." 
        />
        
        <div className="mt-10 md:mt-20 flex flex-col gap-14">
          {portfolioProjects.map((project, projectIndex) => (
            <Card 
              key={project.title} 
              className="px-8 pt-8 pb-0 md:pt-12 md:px-10 lg:pt-16 lg:px-20 sticky"
              style={{
                top: `calc(64px + ${projectIndex * 40}px`,
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
                        <li key={result.title}className="flex gap-2 text-sm md:text-base text-white/50">
                          <CheckCircleIcon className="size-5 md:size-6" /> 
                          <span>{result.title}</span>
                        </li>
                      ))}
                    </ul>
                    <a href={project.link}>
                      <button 
                        className="bg-white text-gray-950 h-12 w-full md:w-auto px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8">
                          <span>Visit live Site</span>
                          <ArrowUpIcon 
                          className="size-4" />
                      </button>
                    </a>
                  </div>
                  <div className="relative ">
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
        <div className="flex justify-center mt-12">
          <Link href="/all-projects">
            <button 
              className="bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-950 h-12 px-8 rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
            >
              <span>View More Projects</span>
              <ArrowUpIcon className="size-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
