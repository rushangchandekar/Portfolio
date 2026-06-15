import FeastFinder from "@/assets/images/FeastFinder.png";
import PhonePe from "@/assets/images/PhonePe.png";
import RareDx from "@/assets/images/raredx.png";
import Image from "next/image";
import Link from "next/link";
import CheckCircleIcon from '@/assets/icons/check-circle.svg';
import ArrowUpIcon from '@/assets/icons/arrow-up-right.svg';
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack'

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
    company: "PhonePe",
    year: "2024",
    title: "UPI Payment Interface Clone",
    results: [
      { title: "Built a secure payment interface simulating PhonePe UPI transactions and wallet flows" },
      { title: "Implemented real-time transaction history tracking and payment status dashboard" },
      { title: "Integrated robust verification checks for money transfers and UPI payments" },
    ],
    link: "https://app.fabric.microsoft.com/links/OHdSwlZmMZ?ctid=4517da72-c8f7-4cec-b2fc-fda9fe4354f9&pbi_source=linkShare",
    image: PhonePe,
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
        <ScrollStack className="mt-10 md:mt-20">
          {portfolioProjects.map((project) => (
            <ScrollStackItem key={project.title}>
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
                      {project.results.map(result => (
                        <li key={result.title} className="flex gap-2 text-sm md:text-base text-white/50">
                          <CheckCircleIcon className="size-5 md:size-6" />
                          <span>{result.title}</span>
                        </li>
                      ))}
                    </ul>
                    <a href={project.link}>
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
                      priority
                      quality={100}
                      draggable={false}
                      className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none rounded-xl ring-1 ring-white/10 will-change-transform [backface-visibility:hidden] [transform:translateZ(0)]"
                    />
                  </div>
                </div>
              </Card>
            </ScrollStackItem>
          ))}
        </ScrollStack>
        <div className="flex justify-center mt-12 relative z-30">
          <Link href="/all-projects">
            <button
              className="bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-950 h-12 px-8 rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg transition-transform duration-300 will-change-transform hover:scale-[1.03]"
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
