import memojiAvatar1 from "@/assets/images/memoji-avatar-1.png";
import memojiAvatar2 from "@/assets/images/memoji-avatar-2.png";
import memojiAvatar3 from "@/assets/images/memoji-avatar-3.png";
import memojiAvatar4 from "@/assets/images/memoji-avatar-4.png";
import memojiAvatar5 from "@/assets/images/memoji-avatar-5.png";
import { SectionHeader } from "@/components/SectionHeader";
import Image from "next/image";
import { Card } from "@/components/Card";
import { Fragment } from "react";

const achievements = [
  {
    name: "GDG Solution Challenge 2025",
    position: "Google Developers Group • Top 105 Nationwide",
    text: "Shortlisted among the top 105 teams globally in Google Developers Group Solution Challenge 2025. Ranked out of 10,000+ participating teams worldwide.",
    avatar: memojiAvatar1,
  },
  {
    name: "Google Cloud Agentic AI Day",
    position: "Google Cloud • Top 50 Student Teams",
    text: "Selected among the top 50 student teams for the Google Cloud Agentic AI Day in-person hackathon in Bangalore, India out of 500+ participants.",
    avatar: memojiAvatar2,
  },
];

export const TestimonialsSection = () => {
  return (
    <div className="py-16 lg:py-24" id="achievements">
      <div className="container">
        <SectionHeader 
          eyebrow="My Achievements" 
          title="Milestones & Recognitions" 
          description="Highlights of my competitive achievements, hackathon selections, and global recognitions." 
        />
        <div className="mt-12 lg:mt-20 flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-4 -my-4">
          <div className="flex gap-8 pr-8 flex-none animate-move-left [animation-duration:30s] hover:[animation-play-state:paused]">
            {[...new Array(4)].fill(0).map((_, index) => (
              <Fragment key={index}>
                {achievements.map(achievement => (
                  <Card key={achievement.name} className="max-w-xs md:max-w-md p-6 md:p-8 hover:-rotate-3 transition duration-300">
                    <div className="flex gap-4 items-center">
                      <div className="size-14 bg-gray-700 inline-flex items-center justify-center rounded-full flex-shrink-0">
                        <Image 
                        src={achievement.avatar} 
                        alt={achievement.name} 
                        className="max-h-full"
                        />
                      </div>
                      <div>
                        <div className="font-semibold">{achievement.name}</div>
                        <div className="text-sm text-white/40">{achievement.position}</div>
                      </div>
                    </div>
                    <p className="mt-4 md:mt-6 text-sm md:text-base">{achievement.text}</p>
                  </Card>
                ))}
              </Fragment>
            ))} 
          </div>
        </div>
      </div>
    </div>
  );
};