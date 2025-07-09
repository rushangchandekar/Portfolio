import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { useInView } from "react-intersection-observer";

const educationData = [
  {
    degree: "Bachelor of Technology in Computer Science",
    institution: "JD College of Engineering",
    year: "2023 - 2027",
    description: "Graduated with First Class Honors. Specialized in web development and Data Science.",
  },
  {
    degree: "Higher Secondary School",
    institution: "Dada Saheb Dhanvante Nagar Vidhyalaya",
    year: "2021 - 2023",
    description: "Science stream with focus on Mathematics and Computer Science.",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.6 } },
  exit: { opacity: 0, y: -50, transition: { ease: "easeIn", duration: 0.6 } },
};

export const EducationSection = () => {
  // ✅ Declare one hook call for each item — top-level, NOT in a loop!
  const inView0 = useInView({ threshold: 0.5, triggerOnce: false });
  const inView1 = useInView({ threshold: 0.5, triggerOnce: false });

  const inViews = [inView0, inView1];

  return (
    <section id="education" className="pb-16 lg:py-24">
      <div className="container">
        <SectionHeader 
          eyebrow="My Academic Journey"
          title="Education"
          description="Foundations that shaped my skills — from core concepts to practical applications."
        />
        <div className="relative max-w-3xl mx-auto mt-12">
          <div className="absolute left-1/2 top-0 w-1 h-full bg-gray-200 -translate-x-1/2 z-0" />
          <ul className="relative z-10">
            {educationData.map((edu, i) => {
              const [ref, inView] = inViews[i];

              return (
                <motion.li
                  ref={ref}
                  key={i}
                  className="flex mb-16 items-center w-full"
                  variants={itemVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "exit"}
                >
                  {i % 2 === 0 ? (
                    <>
                      <div className="w-1/2 flex justify-end pr-8">
                        <Card className="w-full max-w-sm p-6">
                          <h3 className="font-bold text-xl text-white mb-2">{edu.degree}</h3>
                          <p className="text-gray-400 text-sm mb-1">{edu.institution}</p>
                          <p className="text-gray-500 text-xs mb-2">{edu.year}</p>
                          <p className="text-gray-300 text-base">{edu.description}</p>
                        </Card>
                      </div>
                      <div className="w-0 flex flex-col items-center">
                        <span className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow" />
                      </div>
                      <div className="w-1/2" />
                    </>
                  ) : (
                    <>
                      <div className="w-1/2" />
                      <div className="w-0 flex flex-col items-center">
                        <span className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow" />
                      </div>
                      <div className="w-1/2 flex justify-start pl-8">
                        <Card className="w-full max-w-sm p-6">
                          <h3 className="font-bold text-xl text-white mb-2">{edu.degree}</h3>
                          <p className="text-gray-400 text-sm mb-1">{edu.institution}</p>
                          <p className="text-gray-500 text-xs mb-2">{edu.year}</p>
                          <p className="text-gray-300 text-base">{edu.description}</p>
                        </Card>
                      </div>
                    </>
                  )}
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
