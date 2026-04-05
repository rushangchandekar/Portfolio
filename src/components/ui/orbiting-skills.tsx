"use client"
import React, { useEffect, useState, memo } from 'react';

// --- Type Definitions ---
type IconType = 'html' | 'css' | 'javascript' | 'react' | 'nextjs' | 'tailwind' | 'python' | 'mongodb' | 'nodejs';

type GlowColor = 'emerald' | 'sky';

interface SkillIconProps {
  type: IconType;
}

interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  iconType: IconType;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
}

interface OrbitingSkillProps {
  config: SkillConfig;
  angle: number;
}

interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: GlowColor;
  animationDelay?: number;
}

// --- Improved SVG Icon Components ---
const iconComponents: Record<IconType, { component: () => React.JSX.Element; color: string }> = {
  html: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26"/>
      </svg>
    ),
    color: '#E34F26'
  },
  css: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.751L12 19.351l5.379-1.443.744-8.157z" fill="#1572B6"/>
      </svg>
    ),
    color: '#1572B6'
  },
  javascript: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <rect width="24" height="24" fill="#F7DF1E"/>
        <path d="M22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" fill="#323330"/>
      </svg>
    ),
    color: '#F7DF1E'
  },
  react: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <circle cx="12" cy="12" r="2.05" fill="#61DAFB"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)"/>
        </g>
      </svg>
    ),
    color: '#61DAFB'
  },
  nextjs: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" fill="#ffffff"/>
      </svg>
    ),
    color: '#ffffff'
  },
  tailwind: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="#06B6D4"/>
      </svg>
    ),
    color: '#06B6D4'
  },
  python: {
    component: () => (
      <svg viewBox="0 0 256 255" className="w-full h-full">
        <defs>
          <linearGradient id="pyA" x1="12.959%" y1="12.039%" x2="79.639%" y2="78.201%">
            <stop offset="0%" stopColor="#387EB8"/>
            <stop offset="100%" stopColor="#366994"/>
          </linearGradient>
          <linearGradient id="pyB" x1="19.128%" y1="20.579%" x2="90.742%" y2="88.429%">
            <stop offset="0%" stopColor="#FFC836"/>
            <stop offset="100%" stopColor="#FFD43B"/>
          </linearGradient>
        </defs>
        <path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072ZM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13Z" fill="url(#pyA)"/>
        <path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897Zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13Z" fill="url(#pyB)"/>
      </svg>
    ),
    color: '#3776AB'
  },
  mongodb: {
    component: () => (
      <svg viewBox="0 0 256 549" className="w-full h-full">
        <path d="M175.622 61.108C152.612 33.807 132.797 6.078 128.749.32a1.03 1.03 0 0 0-1.492 0c-4.048 5.759-23.863 33.487-46.874 60.788-197.507 251.896 31.108 421.89 31.108 421.89l1.917 1.28c1.172 26.14 5.21 64.238 5.21 64.238h17.372s4.037-38.098 5.21-64.237l1.917-1.28s228.615-169.995 31.108-421.891h-.002l-2.503.001ZM128 486.904s-15.632-14.352-18.944-22.244l18.944-165.78 18.944 165.78c-3.312 7.892-18.944 22.244-18.944 22.244Z" fill="#47A248"/>
      </svg>
    ),
    color: '#47A248'
  },
  nodejs: {
    component: () => (
      <svg viewBox="0 0 256 289" className="w-full h-full">
        <path d="M128 288.464c-3.975 0-7.685-1.06-11.13-2.915l-35.247-20.936c-5.3-2.915-2.65-3.975-1.06-4.505 7.155-2.385 8.48-2.915 15.9-7.155.796-.53 1.856-.265 2.65.265l27.032 16.166c1.06.53 2.385.53 3.18 0l105.74-61.217c1.06-.53 1.59-1.59 1.59-2.915V83.08c0-1.325-.53-2.385-1.59-2.915L129.325 19.213c-1.06-.53-2.385-.53-3.18 0L20.405 80.166c-1.06.53-1.59 1.855-1.59 2.915v122.17c0 1.06.53 2.385 1.59 2.915l28.887 16.695c15.636 7.95 25.442-1.325 25.442-10.6V93.68c0-1.59 1.325-3.18 3.18-3.18h13.516c1.59 0 3.18 1.325 3.18 3.18v120.58c0 20.936-11.396 33.127-31.272 33.127-6.095 0-10.865 0-24.382-6.625l-27.827-15.9C4.24 220.623 0 213.203 0 205.253V83.08c0-7.95 4.24-15.37 11.13-19.345L116.87 2.518c6.625-3.71 15.635-3.71 22.26 0l105.74 61.217C251.76 67.71 256 75.13 256 83.08v122.17c0 7.95-4.24 15.37-11.13 19.345l-105.74 61.217c-3.445 1.59-7.42 2.65-11.13 2.65Zm32.597-84.135c-46.377 0-55.917-21.2-55.917-39.221 0-1.59 1.325-3.18 3.18-3.18h13.78c1.59 0 2.915 1.06 2.915 2.65 2.12 14.045 8.215 20.936 36.307 20.936 22.26 0 31.802-5.035 31.802-16.96 0-6.891-2.65-11.926-37.367-15.37-28.887-2.916-46.907-9.276-46.907-32.332 0-21.466 18.02-34.187 48.232-34.187 33.922 0 50.617 11.66 52.737 37.102 0 .795-.265 1.59-.795 2.385-.53.53-1.325 1.06-2.12 1.06h-13.78c-1.325 0-2.65-1.06-2.916-2.385-3.18-14.575-11.395-19.345-33.126-19.345-24.382 0-27.297 8.48-27.297 14.84 0 7.685 3.445 10.07 36.307 14.31 32.597 4.24 47.967 10.335 47.967 33.127-.265 23.321-19.345 36.572-53.002 36.572v-.002Z" fill="#339933"/>
      </svg>
    ),
    color: '#339933'
  }
};

// --- Memoized Icon Component ---
const SkillIcon = memo(({ type }: SkillIconProps) => {
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = 'SkillIcon';

// --- Configuration for the Orbiting Skills ---
const skillsConfig: SkillConfig[] = [
  // Inner Orbit
  { 
    id: 'html',
    orbitRadius: 100, 
    size: 40, 
    speed: 1, 
    iconType: 'html', 
    phaseShift: 0, 
    glowColor: 'emerald',
    label: 'HTML5'
  },
  { 
    id: 'css',
    orbitRadius: 100, 
    size: 45, 
    speed: 1, 
    iconType: 'css', 
    phaseShift: (2 * Math.PI) / 3, 
    glowColor: 'emerald',
    label: 'CSS3'
  },
  { 
    id: 'javascript',
    orbitRadius: 100, 
    size: 40, 
    speed: 1, 
    iconType: 'javascript', 
    phaseShift: (4 * Math.PI) / 3, 
    glowColor: 'emerald',
    label: 'JavaScript'
  },
  // Outer Orbit
  { 
    id: 'react',
    orbitRadius: 180, 
    size: 50, 
    speed: -0.6, 
    iconType: 'react', 
    phaseShift: 0, 
    glowColor: 'sky',
    label: 'React'
  },
  { 
    id: 'nextjs',
    orbitRadius: 180, 
    size: 45, 
    speed: -0.6, 
    iconType: 'nextjs', 
    phaseShift: (2 * Math.PI) / 3, 
    glowColor: 'sky',
    label: 'Next.js'
  },
  { 
    id: 'tailwind',
    orbitRadius: 180, 
    size: 40, 
    speed: -0.6, 
    iconType: 'tailwind', 
    phaseShift: (4 * Math.PI) / 3, 
    glowColor: 'sky',
    label: 'Tailwind CSS'
  },
  // Data / Third Orbit
  { 
    id: 'python',
    orbitRadius: 260, 
    size: 50, 
    speed: 0.4, 
    iconType: 'python', 
    phaseShift: 0, 
    glowColor: 'emerald',
    label: 'Python'
  },
  { 
    id: 'mongodb',
    orbitRadius: 260, 
    size: 45, 
    speed: 0.4, 
    iconType: 'mongodb', 
    phaseShift: (2 * Math.PI) / 3, 
    glowColor: 'emerald',
    label: 'MongoDB'
  },
  { 
    id: 'nodejs',
    orbitRadius: 260, 
    size: 45, 
    speed: 0.4, 
    iconType: 'nodejs', 
    phaseShift: (4 * Math.PI) / 3, 
    glowColor: 'emerald',
    label: 'Node.js'
  },
];

// --- Memoized Orbiting Skill Component ---
const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { orbitRadius, size, iconType, label } = config;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use precisely rounded coordinates to guarantee node/browser mismatch is avoided
  const x = mounted ? Number((Math.cos(angle) * orbitRadius).toFixed(3)) : Number((Math.cos(config.phaseShift || 0) * orbitRadius).toFixed(3));
  const y = mounted ? Number((Math.sin(angle) * orbitRadius).toFixed(3)) : Number((Math.sin(config.phaseShift || 0) * orbitRadius).toFixed(3));

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      suppressHydrationWarning
    >
      <div
        className={`
          relative w-full h-full p-2 bg-gray-900/80 border border-white/10 backdrop-blur-md
          rounded-full flex items-center justify-center
          transition-all duration-300 cursor-pointer
          ${isHovered ? 'scale-125 shadow-2xl' : 'shadow-lg hover:shadow-xl'}
        `}
        style={{
          boxShadow: isHovered
            ? `0 0 30px ${iconComponents[iconType]?.color}60, 0 0 60px ${iconComponents[iconType]?.color}30`
            : undefined
        }}
      >
        <SkillIcon type={iconType} />
        {isHovered && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 border border-white/10 backdrop-blur-md rounded text-xs text-white whitespace-nowrap pointer-events-none">
            {label}
          </div>
        )}
      </div>
    </div>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';

// --- Optimized Orbit Path Component ---
const GlowingOrbitPath = memo(({ radius, glowColor = 'emerald', animationDelay = 0 }: GlowingOrbitPathProps) => {
  const glowColors = {
    emerald: {
      primary: 'rgba(52, 211, 153, 0.4)',
      secondary: 'rgba(52, 211, 153, 0.1)',
      border: 'rgba(52, 211, 153, 0.2)'
    },
    sky: {
      primary: 'rgba(56, 189, 248, 0.4)',
      secondary: 'rgba(56, 189, 248, 0.1)',
      border: 'rgba(56, 189, 248, 0.2)'
    }
  };

  const colors = glowColors[glowColor] || glowColors.emerald;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        animationDelay: `${animationDelay}s`,
      }}
    >
      {/* Glowing background */}
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle, transparent 30%, ${colors.secondary} 70%, ${colors.primary} 100%)`,
          boxShadow: `0 0 60px ${colors.primary}, inset 0 0 60px ${colors.secondary}`,
          animation: 'pulse 4s ease-in-out infinite',
          animationDelay: `${animationDelay}s`,
        }}
      />

      {/* Static ring for depth */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid ${colors.border}`,
          boxShadow: `inset 0 0 20px ${colors.secondary}`,
        }}
      />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

// --- Main App Component ---
export default function OrbitingSkills() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setTime(prevTime => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const orbitConfigs: Array<{ radius: number; glowColor: GlowColor; delay: number }> = [
    { radius: 100, glowColor: 'emerald', delay: 0 },
    { radius: 180, glowColor: 'sky', delay: 1.5 },
    { radius: 260, glowColor: 'emerald', delay: 3 }
  ];

  return (
    <div className="w-full flex items-center justify-center overflow-visible relative pb-0">

      <div 
        className="relative w-[calc(100vw-40px)] h-[calc(100vw-40px)] md:w-[600px] md:h-[600px] flex items-center justify-center transform scale-50 sm:scale-75 md:scale-90 lg:scale-100"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        {/* Central "Code" Icon with enhanced glow */}
        <div className="w-20 h-20 bg-gray-900 border border-white/10 rounded-full flex items-center justify-center z-10 relative shadow-[0_0_20px_rgba(52,211,153,0.2)]">
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse"></div>
          <div className="absolute inset-0 rounded-full bg-sky-500/20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#34d399" /> {/* emerald-400 */}
                  <stop offset="100%" stopColor="#38bdf8" /> {/* sky-400 */}
                </linearGradient>
              </defs>
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          </div>
        </div>

        {/* Render glowing orbit paths */}
        {orbitConfigs.map((config) => (
          <GlowingOrbitPath
            key={`path-${config.radius}`}
            radius={config.radius}
            glowColor={config.glowColor}
            animationDelay={config.delay}
          />
        ))}

        {/* Render orbiting skill icons */}
        {skillsConfig.map((config) => {
          const angle = time * config.speed + (config.phaseShift || 0);
          return (
            <OrbitingSkill
              key={config.id}
              config={config}
              angle={angle}
            />
          );
        })}
      </div>
    </div>
  );
}
