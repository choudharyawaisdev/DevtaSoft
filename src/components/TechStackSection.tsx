import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Code2, Smartphone, Cpu } from 'lucide-react';

interface TechItem {
  name: string;
  category: string;
  icon: React.ReactNode;
}

const frontendStack: TechItem[] = [
  {
    name: 'React',
    category: 'frontend',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="8" fill="#00D8FF" />
        <ellipse cx="50" cy="50" rx="38" ry="14" stroke="#00D8FF" strokeWidth="3.5" transform="rotate(0 50 50)" />
        <ellipse cx="50" cy="50" rx="38" ry="14" stroke="#00D8FF" strokeWidth="3.5" transform="rotate(60 50 50)" />
        <ellipse cx="50" cy="50" rx="38" ry="14" stroke="#00D8FF" strokeWidth="3.5" transform="rotate(120 50 50)" />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    category: 'frontend',
    icon: (
      <svg className="w-12 h-9" viewBox="0 0 120 40" fill="none">
        <text x="0" y="28" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="26" fill="#000000" letterSpacing="-1">
          N<tspan fill="#000000">EXT</tspan><tspan fontSize="16" dy="-2">.js</tspan>
        </text>
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    icon: (
      <div className="w-9 h-9 rounded-md bg-[#3178C6] flex items-center justify-center text-white font-extrabold text-xs tracking-tighter shadow-xs">
        <span className="translate-y-[1px]">TS</span>
      </div>
    ),
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none">
        <path
          d="M26 40C29.5 33 34.5 29.5 41 29.5C49 29.5 52.5 37 57.5 37C61 37 63.5 34.5 65.5 30C62 37 57 40.5 50.5 40.5C42.5 40.5 39 33 34 33C30.5 33 28 35.5 26 40ZM26 60C29.5 53 34.5 49.5 41 49.5C49 49.5 52.5 57 57.5 57C61 57 63.5 54.5 65.5 50C62 57 57 60.5 50.5 60.5C42.5 60.5 39 53 34 53C30.5 53 28 55.5 26 60Z"
          fill="#38BDF8"
        />
      </svg>
    ),
  },
  {
    name: 'Framer Motion',
    category: 'frontend',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none">
        <path d="M20 20H80V50H50L20 20Z" fill="#F08" />
        <path d="M20 50H50L80 80H20V50Z" fill="#FF0055" />
        <path d="M50 50L80 80V50H50Z" fill="#00E5FF" />
      </svg>
    ),
  },
  {
    name: 'JavaScript',
    category: 'frontend',
    icon: (
      <div className="w-9 h-9 rounded-md bg-[#F7DF1E] flex items-end justify-end p-1 text-black font-extrabold text-xs shadow-xs">
        <span className="leading-none tracking-tighter">JS</span>
      </div>
    ),
  },
];

const backendStack: TechItem[] = [
  {
    name: 'Node.js',
    category: 'backend',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none">
        <path d="M50 15L85 35V75L50 95L15 75V35L50 15Z" fill="#5FA04E" />
        <path d="M50 35L70 46.5V69.5L50 81L30 69.5V46.5L50 35Z" fill="white" opacity="0.3" />
      </svg>
    ),
  },
  {
    name: 'Laravel',
    category: 'backend',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none">
        <path d="M82 25L50 43V83L82 65V25Z" fill="#FF2D20" />
        <path d="M18 25L50 43V83L18 65V25Z" fill="#FF2D20" opacity="0.75" />
        <path d="M50 17L82 35L50 53L18 35L50 17Z" fill="#FF2D20" />
      </svg>
    ),
  },
  {
    name: 'PHP',
    category: 'backend',
    icon: (
      <div className="w-11 h-7 rounded-full bg-[#777BB4] flex items-center justify-center text-white font-extrabold text-[11px] tracking-tight shadow-xs">
        PHP
      </div>
    ),
  },
  {
    name: 'Python',
    category: 'backend',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none">
        <path
          d="M49 10C27 10 28 20 28 20V29H49V32H18C18 32 8 31 8 53C8 75 16 74 16 74H25V64C25 52 35 52 35 52H56C56 56 56 65 56 65H35C35 65 24 64 24 76C24 88 35 88 35 88H49C49 88 60 88 60 76V67H39V64H70C70 64 80 65 80 43C80 21 72 22 72 22H63V32C63 44 53 44 53 44H32V34C32 34 32 25 32 25H49Z"
          fill="url(#pyG)"
        />
        <defs>
          <linearGradient id="pyG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3776AB" />
            <stop offset="100%" stopColor="#FFD43B" />
          </linearGradient>
        </defs>
        <circle cx="37" cy="19" r="3" fill="white" />
        <circle cx="51" cy="79" r="3" fill="white" />
      </svg>
    ),
  },
  {
    name: 'FastAPI',
    category: 'backend',
    icon: (
      <div className="w-9 h-9 rounded-full bg-[#059669] flex items-center justify-center shadow-xs">
        <Zap className="w-5 h-5 text-white fill-white" />
      </div>
    ),
  },
  {
    name: 'MySQL',
    category: 'backend',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none">
        <path d="M45 22C30 22 20 35 20 50C20 65 30 78 45 78C60 78 70 68 73 58L63 55C61 61 54 68 45 68C32 68 28 58 28 50C28 42 32 32 45 32C53 32 60 38 63 44L73 40C69 30 59 22 45 22Z" fill="#00618A" />
        <path d="M58 42L73 62L88 42H78L73 50L68 42H58Z" fill="#E48E00" />
      </svg>
    ),
  },
  {
    name: 'MongoDB',
    category: 'backend',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none">
        <path d="M50 10C50 10 25 35 25 60C25 75 36 88 50 90C64 88 75 75 75 60C75 35 50 10 50 10Z" fill="#47A248" />
        <path d="M50 10V90C50 90 49 89 48 85V15C49 12 50 10 50 10Z" fill="#3F8B40" />
      </svg>
    ),
  },
  {
    name: 'Docker',
    category: 'backend',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none">
        <path d="M18 55H28V65H18V55ZM30 55H40V65H30V55ZM42 55H52V65H42V55ZM54 55H64V65H54V55ZM30 43H40V53H30V43ZM42 43H52V53H42V43ZM54 43H64V53H54V43ZM42 31H52V41H42V31Z" fill="#2496ED" />
        <path d="M10 65C10 65 15 85 50 85C85 85 90 65 90 65H10Z" fill="#2496ED" />
      </svg>
    ),
  },
  {
    name: 'Git',
    category: 'backend',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none">
        <rect x="15" y="15" width="70" height="70" rx="14" transform="rotate(45 50 50)" fill="#F05032" />
        <circle cx="35" cy="50" r="6" fill="white" />
        <circle cx="65" cy="35" r="6" fill="white" />
        <circle cx="65" cy="65" r="6" fill="white" />
        <path d="M35 50H65M65 35V65" stroke="white" strokeWidth="5" />
      </svg>
    ),
  },
  {
    name: 'AWS',
    category: 'backend',
    icon: (
      <svg className="w-11 h-7" viewBox="0 0 100 60" fill="none">
        <text x="2" y="32" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="26" fill="#232F3E">aws</text>
        <path d="M10 42 Q 45 58 85 40" stroke="#FF9900" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M80 37 L87 40 L82 46" fill="#FF9900" />
      </svg>
    ),
  },
];

const mobileStack: TechItem[] = [
  {
    name: 'Flutter',
    category: 'mobile',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none">
        <path d="M55 10L15 50L28 63L80 10H55Z" fill="#47C5FB" />
        <path d="M42 63L28 77L55 104H80L55 79L42 63Z" fill="#02569B" />
        <path d="M55 79L42 63L55 50L68 63L55 79Z" fill="#0175C2" />
      </svg>
    ),
  },
  {
    name: 'React Native',
    category: 'mobile',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="8" fill="#00D8FF" />
        <ellipse cx="50" cy="50" rx="38" ry="14" stroke="#00D8FF" strokeWidth="3.5" transform="rotate(0 50 50)" />
        <ellipse cx="50" cy="50" rx="38" ry="14" stroke="#00D8FF" strokeWidth="3.5" transform="rotate(60 50 50)" />
        <ellipse cx="50" cy="50" rx="38" ry="14" stroke="#00D8FF" strokeWidth="3.5" transform="rotate(120 50 50)" />
      </svg>
    ),
  },
  {
    name: 'Kotlin',
    category: 'mobile',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none">
        <path d="M10 10H90L50 50L90 90H10V10Z" fill="url(#ktG)" />
        <defs>
          <linearGradient id="ktG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7F52FF" />
            <stop offset="50%" stopColor="#C811E7" />
            <stop offset="100%" stopColor="#E54857" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Swift',
    category: 'mobile',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none">
        <path d="M85 75C60 90 25 75 15 50C30 55 45 45 45 45C30 40 20 25 20 25C35 40 55 35 55 35C45 25 45 10 45 10C65 30 75 55 85 75Z" fill="#F05138" />
      </svg>
    ),
  },
  {
    name: 'Android',
    category: 'mobile',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none">
        <path d="M25 40V70C25 75 29 79 34 79H66C71 79 75 75 75 40H25Z" fill="#3DDC84" />
        <path d="M30 35C30 25 39 17 50 17C61 17 70 25 70 35H30Z" fill="#3DDC84" />
        <circle cx="40" cy="26" r="3" fill="white" />
        <circle cx="60" cy="26" r="3" fill="white" />
        <line x1="33" y1="18" x2="26" y2="9" stroke="#3DDC84" strokeWidth="3" strokeLinecap="round" />
        <line x1="67" y1="18" x2="74" y2="9" stroke="#3DDC84" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'iOS',
    category: 'mobile',
    icon: (
      <div className="w-10 h-8 flex flex-col items-center justify-center font-display font-extrabold text-slate-800 text-base leading-none tracking-tight">
        <span>iOS</span>
      </div>
    ),
  },
];

const aiStack: TechItem[] = [
  {
    name: 'OpenAI',
    category: 'ai',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="28" stroke="#10A37F" strokeWidth="6" fill="none" />
        <path d="M48 15 C52 13, 58 15, 61 19 L72 38 C75 43, 73 50, 68 53 L58 59 V46 L65 42 L58 30 L45 38 V26 L48 15 Z" fill="#10A37F" />
        <path d="M35 25 C37 20, 43 18, 48 20 L68 31 C73 34, 75 41, 72 46 L62 52 L56 41 L61 32 L49 25 L43 35 L35 25 Z" fill="#10A37F" />
      </svg>
    ),
  },
  {
    name: 'LangChain',
    category: 'ai',
    icon: (
      <div className="w-9 h-9 flex items-center justify-center text-lg gap-0.5 select-none">
        🦜🔗
      </div>
    ),
  },
  {
    name: 'LangGraph',
    category: 'ai',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none">
        <circle cx="30" cy="30" r="9" fill="#1D4ED8" />
        <circle cx="70" cy="30" r="9" fill="#0D9488" />
        <circle cx="30" cy="70" r="9" fill="#0D9488" />
        <circle cx="70" cy="70" r="9" fill="#1D4ED8" />
        <line x1="30" y1="30" x2="70" y2="30" stroke="#0D152A" strokeWidth="4" />
        <line x1="30" y1="30" x2="30" y2="70" stroke="#0D152A" strokeWidth="4" />
        <line x1="70" y1="30" x2="70" y2="70" stroke="#0D152A" strokeWidth="4" />
        <line x1="30" y1="70" x2="70" y2="70" stroke="#0D152A" strokeWidth="4" />
        <line x1="30" y1="30" x2="70" y2="70" stroke="#0D152A" strokeWidth="3" />
      </svg>
    ),
  },
  {
    name: 'Python',
    category: 'ai',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none">
        <path
          d="M49 10C27 10 28 20 28 20V29H49V32H18C18 32 8 31 8 53C8 75 16 74 16 74H25V64C25 52 35 52 35 52H56C56 56 56 65 56 65H35C35 65 24 64 24 76C24 88 35 88 35 88H49C49 88 60 88 60 76V67H39V64H70C70 64 80 65 80 43C80 21 72 22 72 22H63V32C63 44 53 44 53 44H32V34C32 34 32 25 32 25H49Z"
          fill="url(#pyG3)"
        />
        <defs>
          <linearGradient id="pyG3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3776AB" />
            <stop offset="100%" stopColor="#FFD43B" />
          </linearGradient>
        </defs>
        <circle cx="37" cy="19" r="3" fill="white" />
        <circle cx="51" cy="79" r="3" fill="white" />
      </svg>
    ),
  },
  {
    name: 'RAG',
    category: 'ai',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none">
        <ellipse cx="50" cy="25" rx="28" ry="10" stroke="#00D8FF" strokeWidth="4" fill="none" />
        <ellipse cx="50" cy="50" rx="28" ry="10" stroke="#00D8FF" strokeWidth="4" fill="none" />
        <ellipse cx="50" cy="75" rx="28" ry="10" stroke="#00D8FF" strokeWidth="4" fill="none" />
        <path d="M22 25V75M78 25V75" stroke="#00D8FF" strokeWidth="4" />
      </svg>
    ),
  },
  {
    name: 'n8n',
    category: 'ai',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none">
        <circle cx="25" cy="50" r="9" fill="#EA4B71" />
        <circle cx="50" cy="30" r="9" fill="#EA4B71" />
        <circle cx="50" cy="70" r="9" fill="#EA4B71" />
        <circle cx="75" cy="50" r="9" fill="#EA4B71" />
        <line x1="25" y1="50" x2="50" y2="30" stroke="#EA4B71" strokeWidth="4" />
        <line x1="25" y1="50" x2="50" y2="70" stroke="#EA4B71" strokeWidth="4" />
        <line x1="50" y1="30" x2="75" y2="50" stroke="#EA4B71" strokeWidth="4" />
        <line x1="50" y1="70" x2="75" y2="50" stroke="#EA4B71" strokeWidth="4" />
      </svg>
    ),
  },
];

export const TechStackSection: React.FC = () => {
  return (
    <section id="techstack" className="w-full bg-[#FCFDFE] py-24 sm:py-32 px-4 sm:px-6 lg:px-10 font-sans relative overflow-hidden border-t border-slate-100">
      
      {/* Background Decorative Rings (Top Right) */}
      <div className="absolute -top-20 -right-20 pointer-events-none opacity-40">
        <div className="w-[360px] h-[360px] rounded-full border border-orange-200/60 flex items-center justify-center">
          <div className="w-[280px] h-[280px] rounded-full border border-teal-200/60 flex items-center justify-center">
            <div className="w-[200px] h-[200px] rounded-full border border-orange-100" />
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* ─── SECTION HEADER (CENTERED) ─────────────────────────────────── */}
        <motion.div
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
        >
          {/* Top Pill Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-[#FF8706] rounded-full inline-block" />
            <span className="text-[#FF8706] font-extrabold text-xs sm:text-sm uppercase tracking-[0.22em]">
              TECH STACK
            </span>
            <span className="h-[2px] w-8 bg-[#FF8706] rounded-full inline-block" />
          </div>

          {/* Headline */}
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[58px] text-[#0D152A] leading-[1.08] tracking-tight mb-6">
            Technologies We Use
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#475569] max-w-[620px] leading-relaxed font-normal">
            We leverage modern, industry-leading technologies to build fast, secure, and scalable digital products.
          </p>
        </motion.div>

        {/* ─── FRONTEND CATEGORY ROW ────────────────────────────────────── */}
        <motion.div
          className="mb-14 sm:mb-16 pl-4 sm:pl-6 lg:pl-8"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Category Eyebrow Title */}
          <div className="flex items-center gap-3 mb-8">
            <span className="w-1.5 h-7 bg-[#FF8706] rounded-full inline-block" />
            <h3 className="font-display font-extrabold text-2xl text-[#0D152A] tracking-tight">
              Frontend
            </h3>
          </div>

          {/* Frontend Tech Cards Grid */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {frontendStack.map((tech) => (
              <motion.div
                key={tech.name}
                whileHover={{ y: -4, scale: 1.03 }}
                className="bg-white rounded-[22px] shadow-none hover:shadow-xs transition-all duration-300 px-6 sm:px-8 py-5 sm:py-6 flex flex-col items-center justify-center gap-3 min-w-[140px] sm:min-w-[160px] flex-1 sm:flex-initial cursor-pointer group"
              >
                <div className="h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <span className="font-display font-extrabold text-sm sm:text-base text-[#0D152A] text-center tracking-tight group-hover:text-[#FF8706] transition-colors">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── BACKEND CATEGORY ROW ─────────────────────────────────────── */}
        <motion.div
          className="mb-14 sm:mb-16 pl-4 sm:pl-6 lg:pl-8"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Category Eyebrow Title */}
          <div className="flex items-center gap-3 mb-8">
            <span className="w-1.5 h-7 bg-[#14B8B0] rounded-full inline-block" />
            <h3 className="font-display font-extrabold text-2xl text-[#0D152A] tracking-tight">
              Backend
            </h3>
          </div>

          {/* Backend Tech Cards Grid */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {backendStack.map((tech) => (
              <motion.div
                key={tech.name}
                whileHover={{ y: -4, scale: 1.03 }}
                className="bg-white rounded-[22px] shadow-none hover:shadow-xs transition-all duration-300 px-5 sm:px-7 py-5 sm:py-6 flex flex-col items-center justify-center gap-3 min-w-[130px] sm:min-w-[150px] flex-1 sm:flex-initial cursor-pointer group"
              >
                <div className="h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <span className="font-display font-extrabold text-sm sm:text-base text-[#0D152A] text-center tracking-tight group-hover:text-[#14B8B0] transition-colors">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── DOTTED DIVIDER WITH CENTER CONCENTRIC TARGET PULSE ───────── */}
        <div className="my-14 sm:my-18 flex items-center justify-center w-full max-w-[1200px] mx-auto px-4">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF8706] shrink-0" />
          <div className="h-[2px] flex-1 mx-2 bg-[repeating-linear-gradient(90deg,#FF8706_0_4px,transparent_4px_10px)] opacity-60" />
          <div className="w-8 h-8 rounded-full border-2 border-[#14B8B0] flex items-center justify-center bg-white shadow-xs shrink-0 mx-2 relative">
            <div className="w-3 h-3 rounded-full bg-[#FF8706]" />
            <div className="absolute inset-0 rounded-full border border-[#14B8B0]/40 animate-ping opacity-40" />
          </div>
          <div className="h-[2px] flex-1 mx-2 bg-[repeating-linear-gradient(90deg,#14B8B0_0_4px,transparent_4px_10px)] opacity-60" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#14B8B0] shrink-0" />
        </div>

        {/* ─── MOBILE DEVELOPMENT & AI & AUTOMATION ROW (SIDE BY SIDE) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 mb-20 sm:mb-24 pl-4 sm:pl-6 lg:pl-8">
          
          {/* MOBILE DEVELOPMENT CATEGORY */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            {/* Category Eyebrow Title with Smartphone Icon */}
            <div className="flex items-center gap-3 mb-8">
              <span className="w-1.5 h-7 bg-[#FF8706] rounded-full inline-block" />
              <div className="w-9 h-9 rounded-full bg-[#FFEFE5] flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5 text-[#FF8706] stroke-[2.5]" />
              </div>
              <h3 className="font-display font-extrabold text-2xl text-[#0D152A] tracking-tight">
                Mobile Development
              </h3>
            </div>

            {/* Mobile Tech Cards Grid */}
            <div className="flex flex-wrap items-center gap-4">
              {mobileStack.map((tech) => (
                <motion.div
                  key={tech.name}
                  whileHover={{ y: -4, scale: 1.03 }}
                  className="bg-white rounded-[22px] shadow-none hover:shadow-xs transition-all duration-300 px-5 py-5 flex flex-col items-center justify-center gap-3 min-w-[125px] sm:min-w-[135px] flex-1 sm:flex-initial cursor-pointer group"
                >
                  <div className="h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <span className="font-display font-extrabold text-xs sm:text-sm text-[#0D152A] text-center tracking-tight group-hover:text-[#FF8706] transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI & AUTOMATION CATEGORY */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Category Eyebrow Title with Brain Icon */}
            <div className="flex items-center gap-3 mb-8">
              <span className="w-1.5 h-7 bg-[#14B8B0] rounded-full inline-block" />
              <div className="w-9 h-9 rounded-full bg-[#E6F8F9] flex items-center justify-center shrink-0">
                <Cpu className="w-5 h-5 text-[#14B8B0] stroke-[2.5]" />
              </div>
              <h3 className="font-display font-extrabold text-2xl text-[#0D152A] tracking-tight">
                AI & Automation
              </h3>
            </div>

            {/* AI Tech Cards Grid */}
            <div className="flex flex-wrap items-center gap-4">
              {aiStack.map((tech) => (
                <motion.div
                  key={tech.name}
                  whileHover={{ y: -4, scale: 1.03 }}
                  className="bg-white rounded-[22px] shadow-none hover:shadow-xs transition-all duration-300 px-5 py-5 flex flex-col items-center justify-center gap-3 min-w-[125px] sm:min-w-[135px] flex-1 sm:flex-initial cursor-pointer group"
                >
                  <div className="h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <span className="font-display font-extrabold text-xs sm:text-sm text-[#0D152A] text-center tracking-tight group-hover:text-[#14B8B0] transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* ─── BOTTOM VALUE FEATURE STRIP (3 Items) ────────────────────── */}
        <motion.div
          className="w-full max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0 bg-white rounded-3xl shadow-[0_15px_45px_rgba(0,0,0,0.04)] p-6 sm:p-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          {/* Item 1 */}
          <div className="flex items-center gap-4 px-4 py-3 sm:py-0 w-full sm:w-auto justify-start">
            <div className="w-12 h-12 rounded-full bg-[#FFEFE5] flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-[#FF8706] stroke-[2.5]" />
            </div>
            <div>
              <h4 className="font-display font-extrabold text-base text-[#0D152A] tracking-tight">
                Fast Development
              </h4>
              <p className="text-[#667085] text-xs font-medium mt-0.5">
                Build and ship products rapidly
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-center gap-4 px-4 py-3 sm:py-0 w-full sm:w-auto justify-start">
            <div className="w-12 h-12 rounded-full bg-[#E6F8F9] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#14B8B0] stroke-[2.5]" />
            </div>
            <div>
              <h4 className="font-display font-extrabold text-base text-[#0D152A] tracking-tight">
                Scalable Architecture
              </h4>
              <p className="text-[#667085] text-xs font-medium mt-0.5">
                Designed for growth and scale
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-center gap-4 px-4 py-3 sm:py-0 w-full sm:w-auto justify-start">
            <div className="w-12 h-12 rounded-full bg-[#F0ECFF] flex items-center justify-center shrink-0">
              <Code2 className="w-6 h-6 text-[#7C3AED] stroke-[2.5]" />
            </div>
            <div>
              <h4 className="font-display font-extrabold text-base text-[#0D152A] tracking-tight">
                Modern Technologies
              </h4>
              <p className="text-[#667085] text-xs font-medium mt-0.5">
                Using the best tools, always
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
