import { SectionHeader } from "@/components/SectionHeader";
import OrbitingSkills from "@/components/ui/orbiting-skills";

export const TechStackSection = () => {
  return (
    <section id="techstack" className="py-12 lg:py-20">
      <div className="container relative z-10">
        <SectionHeader
          eyebrow="My Foundation"
          title="Tech Stack"
          description="A visual orbit of the technologies and languages I work with every day to build beautiful web apps and robust solutions."
        />
        <div className="flex justify-center mt-8 md:mt-12">
          <OrbitingSkills />
        </div>
      </div>
    </section>
  );
};
