import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Code2, Smartphone, Cpu, Palette } from 'lucide-react';

interface TechItem {
  name: string;
  category: string;
  icon: React.ReactNode;
}

const uiuxStack: TechItem[] = [
  {
    name: 'Figma',
    category: 'uiux',
    icon: <img src="/Figma.png" alt="Figma" className="h-13 sm:h-15 w-auto max-w-[68px] object-contain" />,
  },
  {
    name: 'Framer',
    category: 'uiux',
    icon: <img src="/framerr.png" alt="Framer" className="h-13 sm:h-15 w-auto max-w-[68px] object-contain" />,
  },
  {
    name: 'Adobe XD',
    category: 'uiux',
    icon: <img src="/Adobe XD.png" alt="Adobe XD" className="h-13 sm:h-15 w-auto max-w-[68px] object-contain" />,
  },
  {
    name: 'Sketch',
    category: 'uiux',
    icon: <img src="/Sketch.png" alt="Sketch" className="h-13 sm:h-15 w-auto max-w-[68px] object-contain" />,
  },
];

const frontendStack: TechItem[] = [
  {
    name: 'React',
    category: 'frontend',
    icon: (
      <svg className="w-13 h-13 sm:w-15 sm:h-15" viewBox="0 0 100 100" fill="none">
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
    icon: <img src="/Next.js.png" alt="Next.js" className="h-13 sm:h-15 w-auto max-w-[68px] object-contain" />,
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    icon: <img src="/TypeScript.png" alt="TypeScript" className="h-13 sm:h-15 w-auto max-w-[68px] object-contain" />,
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    icon: <img src="/Tailwind CSS.png" alt="Tailwind CSS" className="h-13 sm:h-15 w-auto max-w-[68px] object-contain" />,
  },
  {
    name: 'Framer Motion',
    category: 'frontend',
    icon: <img src="/framer.png" alt="Framer Motion" className="h-13 sm:h-15 w-auto max-w-[68px] object-contain" />,
  },
  {
    name: 'JavaScript',
    category: 'frontend',
    icon: <img src="/JavaScript.png" alt="JavaScript" className="h-13 sm:h-15 w-auto max-w-[68px] object-contain" />,
  },
];

const backendStack: TechItem[] = [
  {
    name: 'Node.js',
    category: 'backend',
    icon: <img src="/Node.js.png" alt="Node.js" className="h-13 sm:h-15 w-auto max-w-[68px] object-contain" />,
  },
  {
    name: 'Laravel',
    category: 'backend',
    icon: <img src="/Laravel.png" alt="Laravel" className="h-13 sm:h-15 w-auto max-w-[68px] object-contain" />,
  },
  {
    name: 'PHP',
    category: 'backend',
    icon: <img src="/PHP.png" alt="PHP" className="h-13 sm:h-15 w-auto max-w-[68px] object-contain" />,
  },
  {
    name: 'Python',
    category: 'backend',
    icon: <img src="/Python.png" alt="Python" className="h-13 sm:h-15 w-auto max-w-[68px] object-contain" />,
  },
  {
    name: 'FastAPI',
    category: 'backend',
    icon: <img src="/FastAPI.png" alt="FastAPI" className="h-13 sm:h-15 w-auto max-w-[68px] object-contain" />,
  },
  {
    name: 'MySQL',
    category: 'backend',
    icon: <img src="/MySQL.png" alt="MySQL" className="h-13 sm:h-15 w-auto max-w-[68px] object-contain" />,
  },
  {
    name: 'MongoDB',
    category: 'backend',
    icon: <img src="/MongoDB.png" alt="MongoDB" className="h-13 sm:h-15 w-auto max-w-[68px] object-contain" />,
  },
  {
    name: 'Docker',
    category: 'backend',
    icon: <img src="/Docker.png" alt="Docker" className="h-13 sm:h-15 w-auto max-w-[68px] object-contain" />,
  },
  {
    name: 'Git',
    category: 'backend',
    icon: <img src="/Git.png" alt="Git" className="h-13 sm:h-15 w-auto max-w-[68px] object-contain" />,
  },
  {
    name: 'AWS',
    category: 'backend',
    icon: <img src="/AWS.png" alt="AWS" className="h-13 sm:h-15 w-auto max-w-[68px] object-contain" />,
  },
];

const mobileStack: TechItem[] = [
  {
    name: 'Flutter',
    category: 'mobile',
    icon: <img src="/Flutter.png" alt="Flutter" className="h-13 sm:h-15 w-auto max-w-[68px] object-contain" />,
  },
  {
    name: 'React Native',
    category: 'mobile',
    icon: (
      <svg className="w-13 h-13 sm:w-15 sm:h-15" viewBox="0 0 100 100" fill="none">
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
    icon: <img src="/Kotlin.png" alt="Kotlin" className="h-13 sm:h-15 w-auto max-w-[68px] object-contain" />,
  },
  {
    name: 'Swift',
    category: 'mobile',
    icon: <img src="/Swift.png" alt="Swift" className="h-13 sm:h-15 w-auto max-w-[68px] object-contain" />,
  },
  {
    name: 'Android',
    category: 'mobile',
    icon: <img src="/Android.png" alt="Android" className="h-13 sm:h-15 w-auto max-w-[68px] object-contain" />,
  },
  {
    name: 'iOS',
    category: 'mobile',
    icon: <img src="/ios.png" alt="iOS" className="h-13 sm:h-15 w-auto max-w-[68px] object-contain" />,
  },
];

const aiStack: TechItem[] = [
  {
    name: 'OpenAI',
    category: 'ai',
    icon: <img src="/openai.png" alt="OpenAI" className="w-13 h-13 sm:w-15 sm:h-15 object-contain" />,
  },
  {
    name: 'LangChain',
    category: 'ai',
    icon: <img src="/langchain.png" alt="LangChain" className="h-13 sm:h-15 w-auto max-w-[68px] object-contain" />,
  },
  {
    name: 'LangGraph',
    category: 'ai',
    icon: <img src="/langgraph.png" alt="LangGraph" className="h-13 sm:h-15 w-auto max-w-[68px] object-contain" />,
  },
  {
    name: 'Python',
    category: 'ai',
    icon: <img src="/Python.png" alt="Python" className="h-13 sm:h-15 w-auto max-w-[68px] object-contain" />,
  },
  {
    name: 'RAG',
    category: 'ai',
    icon: (
      <svg className="w-13 h-13 sm:w-15 sm:h-15" viewBox="0 0 100 100" fill="none">
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
    icon: <img src="/n8n.png" alt="n8n" className="h-13 sm:h-15 w-auto max-w-[68px] object-contain" />,
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
                className="bg-white rounded-[24px] shadow-none hover:shadow-xs transition-all duration-300 px-6 sm:px-9 py-6 sm:py-7 flex flex-col items-center justify-center gap-3 min-w-[150px] sm:min-w-[175px] flex-1 sm:flex-initial cursor-pointer group"
              >
                <div className="h-14 sm:h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
                className="bg-white rounded-[24px] shadow-none hover:shadow-xs transition-all duration-300 px-5 sm:px-8 py-6 sm:py-7 flex flex-col items-center justify-center gap-3 min-w-[140px] sm:min-w-[165px] flex-1 sm:flex-initial cursor-pointer group"
              >
                <div className="h-14 sm:h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <span className="font-display font-extrabold text-sm sm:text-base text-[#0D152A] text-center tracking-tight group-hover:text-[#14B8B0] transition-colors">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── UI/UX DESIGN CATEGORY ROW ─────────────────────────────────── */}
        <motion.div
          className="mb-14 sm:mb-16 pl-4 sm:pl-6 lg:pl-8"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Category Eyebrow Title */}
          <div className="flex items-center gap-3 mb-8">
            <span className="w-1.5 h-7 bg-[#7C3AED] rounded-full inline-block" />
            <div className="w-9 h-9 rounded-full bg-[#F0ECFF] flex items-center justify-center shrink-0">
              <Palette className="w-5 h-5 text-[#7C3AED] stroke-[2.5]" />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#0D152A] tracking-tight">
              UI/UX Design
            </h3>
          </div>

          {/* UI/UX Tech Cards Grid */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {uiuxStack.map((tech) => (
              <motion.div
                key={tech.name}
                whileHover={{ y: -4, scale: 1.03 }}
                className="bg-white rounded-[24px] shadow-none hover:shadow-xs transition-all duration-300 px-6 sm:px-9 py-6 sm:py-7 flex flex-col items-center justify-center gap-3 min-w-[150px] sm:min-w-[175px] flex-1 sm:flex-initial cursor-pointer group"
              >
                <div className="h-14 sm:h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <span className="font-display font-extrabold text-sm sm:text-base text-[#0D152A] text-center tracking-tight group-hover:text-[#7C3AED] transition-colors">
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
                  className="bg-white rounded-[24px] shadow-none hover:shadow-xs transition-all duration-300 px-5 sm:px-6 py-6 sm:py-7 flex flex-col items-center justify-center gap-3 min-w-[135px] sm:min-w-[145px] flex-1 sm:flex-initial cursor-pointer group"
                >
                  <div className="h-14 sm:h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
                  className="bg-white rounded-[24px] shadow-none hover:shadow-xs transition-all duration-300 px-5 sm:px-6 py-6 sm:py-7 flex flex-col items-center justify-center gap-3 min-w-[135px] sm:min-w-[145px] flex-1 sm:flex-initial cursor-pointer group"
                >
                  <div className="h-14 sm:h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
