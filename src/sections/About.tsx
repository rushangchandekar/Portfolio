"use client";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import bookImage from "@/assets/images/book-cover.png";
import Image from "next/image";
import mapImage from "@/assets/images/map.jpg";
import smileMemoji from "@/assets/images/memoji-smile.png";
import { CardHeader } from "@/components/CardHeader";
import { ToolboxItems } from "@/components/ToolboxItems";
import StarIcon from "@/assets/icons/star.svg";
import PythonIcon from "@/assets/icons/python.svg";
import DatabaseIcon from "@/assets/icons/database.svg";
import TableauIcon from "@/assets/icons/tableau.svg";
import PandasIcon from "@/assets/icons/pandas.svg";
import NumPyIcon from "@/assets/icons/numpy.svg";
import PowerBIIcon from "@/assets/icons/powerbi.svg";
import FileExcelIcon from "@/assets/icons/excel.svg";
import MatplotlibIcon from "@/assets/icons/matplotlib.svg";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const focusItems = [
  { title: 'Python', iconType: PythonIcon },
  { title: 'SQL', iconType: DatabaseIcon },
  { title: 'Tableau', iconType: TableauIcon },
  { title: 'Pandas', iconType: PandasIcon },
  { title: 'NumPy', iconType: NumPyIcon },
  { title: 'Power BI', iconType: PowerBIIcon },
  { title: 'Excel', iconType: FileExcelIcon },
  { title: 'Matplotlib', iconType: MatplotlibIcon },
];

const hoobies = [
  {
    title: 'Painting',
    emoji: '🎨',
    left: '5%',
    top: '5%',
  },
  {
    title: 'Photography',
    emoji: '📷',
    left: '50%',
    top: '5%',
  },
  {
    title: 'Gaming',
    emoji: '🎮',
    left: '10%',
    top: '35%',
  },
  {
    title: 'Travelling',
    emoji: '✈️',
    left: '35%',
    top: '40%',
  },
  {
    title: 'Music',
    emoji: '🎵',
    left: '70%',
    top: '45%',
  },
  {
    title: 'Fitness',
    emoji: '🏋️‍♀️',
    left: '5%',
    top: '65%',
  },
  {
    title: 'Reading',
    emoji: '📖',
    left: '45%',
    top: '70%',
  },
  {
    title: 'Hodophile',
    emoji: '🌍',
    left: '45%',
    top: '70%',
  },
]

export const AboutSection = () => {
  const constraintRef = useRef(null);
  const [hintVisible, setHintVisible] = useState(true);
  return (
  <div id="about" className="py-20 lg:py-28">
    <div className="container">
      <SectionHeader 
        eyebrow="About Me" 
        title="A Glimpse Into My World" 
        description="Learn more about who I am, what I do, and what inspires me."
      />
      <div className="mt-20 flex flex-col gap-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
          <Card className="h-[320px] col-span-2 lg:col-span-1">
            <CardHeader 
              title="My Journey" 
              description="Hi, I'm Rushang! I'm a CS student passionate about building data-driven tools and modern web apps. I thrive on solving complex problems, whether it's optimizing code, tackling LeetCode, or exploring the latest in AI and Data Analytics. Always curious, always learning." 
            />
            {/* <div className="w-40 mx-auto mt-2 md:mt-0">
              <Image src={bookImage} alt="Book Cover" />
            </div> */}
          </Card>
          <Card className="h-[320px] p-0 md:col-span-3 lg:col-span-2">
            <div className="flex flex-col p-6 md:py-8 md:px-10">
              <div className="inline-flex items-center gap-2">
                <StarIcon className="size-9 text-emerald-300"/>
                <h3 className="font-serif text-3xl">My Focus</h3>
                <div className="inline-flex items-center gap-1.5 ml-3 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-3 py-1">
                  <motion.div
                    className="size-2 rounded-full bg-emerald-400"
                    animate={{ opacity: [1, 0.3, 1], scale: [1, 0.85, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Now</span>
                </div>
              </div>
              <p className="text-sm lg:text-base max-wd-xs text-white/60 mt-2">Currently deep-diving into Data Analytics — turning raw data into actionable insights.</p>
            </div>
            {/* Row 1 — scrolls left */}
            <ToolboxItems items={focusItems} className="" itemsWrapperClassName="animate-move-left [animation-duration:30s]"/>
            {/* Row 2 — scrolls right */}
            <ToolboxItems items={focusItems} className="mt-6" itemsWrapperClassName="animate-move-right [animation-duration:15s]"/>
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 gap-8">
          <Card className="h-[320px] p-0 flex flex-col col-span-3 lg:col-span-2">
            <CardHeader 
              title="Beyond the Code" 
              description="Explore my interests and hobbies beyond the digital realm."
              className="px-6 py-6" 
            />
            <div className="relative flex-1 overflow-hidden" ref={constraintRef}>
              {/* Drag hint */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-end pb-3 pointer-events-none z-10 gap-1"
                animate={{ opacity: hintVisible ? 1 : 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.span
                  className="text-2xl select-none"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                >
                  👆
                </motion.span>
                <span className="text-xs font-medium text-gray-500 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                  Drag the bubbles!
                </span>
              </motion.div>
              {hoobies.map((hobby) => {
                const duration = randomBetween(1.8, 3.2);
                const rotAmt = randomBetween(4, 9);
                const xDrift = randomBetween(3, 7);
                const yDrift = randomBetween(3, 7);
                const delay = randomBetween(0, 1.5);
                return (
                  <motion.div 
                    key={hobby.title} 
                    className="inline-flex items-center gap-2 px-6 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full py-1.5 absolute cursor-grab active:cursor-grabbing"
                    onDragStart={() => setHintVisible(false)}
                    style={{
                      left: hobby.left,
                      top: hobby.top,
                    }}
                    animate={{
                      rotate: [0, rotAmt, -rotAmt, rotAmt * 0.5, -rotAmt * 0.5, 0],
                      x: [0, xDrift, -xDrift * 0.6, xDrift * 0.4, 0],
                      y: [0, -yDrift * 0.5, yDrift, -yDrift * 0.3, 0],
                    }}
                    transition={{
                      duration,
                      delay,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                    }}
                    drag
                    dragConstraints={constraintRef}
                    whileDrag={{ scale: 1.1, rotate: 0 }}
                  >
                    <span className="font-medium text-gray-950">
                      {hobby.title}
                    </span>
                    <span>{hobby.emoji}</span>
                  </motion.div>
                );
              })}
            </div>
          </Card>
          <Card className="h-[320px] p-0 relative md:col-span-2 lg:col-span-1">
            <Image 
              src={mapImage} 
              alt="Map" 
              className="h-full w-full object-cover object-left-top" 
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-gray-950/30">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-20 animate-ping [animation-duration:2s]"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-10"></div>
              <Image 
                src={smileMemoji} 
                alt="Memoji" 
                className="size-20"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
  );
};
