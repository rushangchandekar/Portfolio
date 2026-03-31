import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SectionHeader } from "@/components/SectionHeader";
import "./Education.css";

const educationData = [
  {
    degree: "B.Tech in Computer Science",
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
  const inView0 = useInView({ threshold: 0.2, triggerOnce: false });
  const inView1 = useInView({ threshold: 0.2, triggerOnce: false });

  const inViews = [inView0, inView1];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 50%"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div id="education" className="py-20 lg:py-28">
      <div className="container">

        <SectionHeader
          eyebrow="My Academic Journey"
          title="Education"
          description="Foundations that shaped my skills — from core concepts to practical applications."
        />

        <div className="career-info mt-20 md:mt-24" ref={containerRef}>
          <motion.div
            className="career-timeline"
            style={{ height: lineHeight }}
          >
            <div className="career-dot"></div>
          </motion.div>
          {educationData.map((edu, i) => {
            const [ref, inView] = inViews[i];

            return (
              <motion.div
                ref={ref}
                key={i}
                className="career-info-box"
                variants={itemVariants}
                initial="hidden"
                animate={inView ? "visible" : "exit"}
              >
                <div className="career-info-in w-full items-start">
                  <div className="career-role shrink-1">
                    <h4 className="font-serif text-2xl md:text-3xl text-white tracking-tight leading-tight">{edu.degree}</h4>
                    <h5 className="font-semibold uppercase tracking-wider text-emerald-400 mt-2">{edu.institution}</h5>
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl text-right shrink-0">{edu.year}</h3>
                </div>
                <p className="text-white/60 text-sm md:text-base leading-relaxed mt-4 md:mt-0">{edu.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

