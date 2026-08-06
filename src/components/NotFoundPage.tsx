import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  ArrowRight, 
  Grid2X2, 
  Briefcase, 
  Box, 
  User, 
  Phone, 
  ChevronRight 
} from 'lucide-react';

/* ─── CUSTOM 404 ASTRONAUT & PORTAL VECTOR ILLUSTRATION ─────────────── */

const Vector404Illustration: React.FC = () => (
  <div className="relative w-full max-w-[540px] mx-auto flex items-center justify-center select-none py-4">
    {/* Background Dot Matrix (Top Left) */}
    <div className="absolute top-2 left-4 sm:left-8 opacity-40 pointer-events-none">
      <div className="grid grid-cols-5 gap-2.5">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        ))}
      </div>
    </div>

    {/* Subtle Ambient Background Aura */}
    <div className="absolute w-[300px] h-[300px] bg-orange-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />

    <svg viewBox="0 0 600 420" fill="none" className="w-full h-auto drop-shadow-xl">
      <defs>
        {/* Gradients for 3D Dark Navy Numerals */}
        <linearGradient id="numeralDarkFront" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="numeralDarkSide" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
        <linearGradient id="numeralDarkTop" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>

        {/* Gradients for Orange Arch Doorway */}
        <linearGradient id="archFront" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF9827" />
          <stop offset="100%" stopColor="#EE6E00" />
        </linearGradient>
        <linearGradient id="archSide" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF8706" />
          <stop offset="100%" stopColor="#C95A00" />
        </linearGradient>
        <linearGradient id="archInner" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9C4400" />
          <stop offset="100%" stopColor="#5E2700" />
        </linearGradient>

        {/* Portal Sky Horizon Gradient */}
        <linearGradient id="portalSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="50%" stopColor="#F0F9FF" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>

        {/* Astronaut Suit Gradients */}
        <linearGradient id="suitWhite" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
        <linearGradient id="suitShadow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
        <linearGradient id="visorGlass" x1="20%" y1="10%" x2="80%" y2="90%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="45%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>

        {/* Drop Shadows */}
        <filter id="softShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#0F172A" floodOpacity="0.08" />
        </filter>
        <filter id="doorShadow" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="-8" dy="16" stdDeviation="12" floodColor="#0F172A" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Ground Horizon Curve & Dotted Path */}
      <path
        d="M 80 340 Q 220 310 300 320 T 520 330"
        stroke="#E2E8F0"
        strokeWidth="2"
        strokeDasharray="6 6"
        fill="none"
      />
      <path
        d="M 300 280 C 260 290 200 300 180 320"
        stroke="#CBD5E1"
        strokeWidth="2.5"
        strokeDasharray="4 6"
        fill="none"
      />

      {/* Ground Spheres / Pebbles */}
      <circle cx="95" cy="335" r="7" fill="#E2E8F0" filter="url(#softShadow)" />
      <circle cx="140" cy="345" r="4.5" fill="#CBD5E1" />
      <circle cx="440" cy="338" r="8" fill="#E2E8F0" filter="url(#softShadow)" />
      <circle cx="510" cy="348" r="5" fill="#CBD5E1" />
      <circle cx="215" cy="350" r="3.5" fill="#CBD5E1" />

      {/* ─── 1. LEFT "4" (3D Navy Solid Numeral) ────────────────────── */}
      <g id="left-four" filter="url(#softShadow)">
        {/* Side/Depth extruded 3D facets */}
        <path d="M 60 280 L 140 100 L 175 100 L 175 235 L 210 235 L 210 280 L 175 280 L 175 305 L 130 305 L 130 280 Z" fill="url(#numeralDarkSide)" opacity="0.3" />
        
        {/* Main 3D Shape Facets */}
        {/* Vertical Right Pillar */}
        <rect x="135" y="90" width="45" height="215" rx="6" fill="url(#numeralDarkFront)" />
        <rect x="135" y="90" width="45" height="12" rx="4" fill="url(#numeralDarkTop)" />

        {/* Diagonal Stem */}
        <path d="M 60 255 L 145 90 L 175 90 L 90 255 Z" fill="url(#numeralDarkFront)" />

        {/* Horizontal Bar */}
        <rect x="50" y="215" width="145" height="42" rx="6" fill="url(#numeralDarkFront)" />
        <path d="M 50 215 L 195 215 L 195 222 L 50 222 Z" fill="url(#numeralDarkTop)" />
      </g>


      {/* ─── 2. CENTER "0" ARCHWAY PORTAL (Orange 3D Structure) ──────── */}
      <g id="center-zero-portal" filter="url(#doorShadow)">
        {/* Outer 3D Extrusion Shadow / Base */}
        <rect x="250" y="80" width="130" height="230" rx="65" fill="#B34B00" />
        <rect x="258" y="80" width="122" height="225" rx="61" fill="url(#archSide)" />

        {/* Main Front Orange Arch */}
        <rect x="250" y="70" width="125" height="235" rx="62.5" fill="url(#archFront)" />

        {/* Inner Arch Cutout / Door Frame Inner Depth */}
        <rect x="278" y="112" width="69" height="193" rx="34.5" fill="url(#archInner)" />

        {/* Sky Portal Background inside Open Door */}
        <rect x="282" y="115" width="61" height="190" rx="30.5" fill="url(#portalSky)" />

        {/* Open Door Panel (Swung open to the right with 3D perspective) */}
        <g id="open-door-panel" transform="translate(343, 115)">
          {/* Door panel extruded side */}
          <path d="M 0 0 L 22 -15 L 22 175 L 0 190 Z" fill="#D65F00" />
          {/* Door panel front face */}
          <path d="M 0 0 L 18 -12 L 18 178 L 0 190 Z" fill="#FF8706" stroke="#FFA947" strokeWidth="1.5" />
          {/* Door Handle */}
          <circle cx="5" cy="95" r="3.5" fill="#FFE5C4" />
          <rect x="2" y="94" width="8" height="2" rx="1" fill="#FFFFFF" />
        </g>
      </g>

      {/* ─── 3. RIGHT "4" (3D Navy Solid Numeral) ───────────────────── */}
      <g id="right-four" filter="url(#softShadow)">
        {/* Vertical Right Pillar */}
        <rect x="440" y="90" width="45" height="215" rx="6" fill="url(#numeralDarkFront)" />
        <rect x="440" y="90" width="45" height="12" rx="4" fill="url(#numeralDarkTop)" />

        {/* Diagonal Stem */}
        <path d="M 365 255 L 450 90 L 480 90 L 395 255 Z" fill="url(#numeralDarkFront)" />

        {/* Horizontal Bar */}
        <rect x="355" y="215" width="145" height="42" rx="6" fill="url(#numeralDarkFront)" />
        <path d="M 355 215 L 500 215 L 500 222 L 355 222 Z" fill="url(#numeralDarkTop)" />
      </g>
    </svg>
  </div>
);

/* ─── QUICK NAVIGATION LINK ITEMS FOR POPULAR SECTIONS ────────────────── */

interface QuickSectionItem {
  name: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

const quickSections: QuickSectionItem[] = [
  {
    name: 'Services',
    description: 'What we offer',
    path: '/services',
    icon: <Grid2X2 className="w-5 h-5" />,
    iconBg: '#FFF3E6',
    iconColor: '#FF8706',
  },
  {
    name: 'Portfolio',
    description: 'Our recent work',
    path: '/portfolio',
    icon: <Briefcase className="w-5 h-5" />,
    iconBg: '#E6F8F9',
    iconColor: '#14B8B0',
  },
  {
    name: 'Products',
    description: 'Our digital products',
    path: '/products',
    icon: <Box className="w-5 h-5" />,
    iconBg: '#F0ECFF',
    iconColor: '#7C3AED',
  },
  {
    name: 'About Us',
    description: 'Know more about us',
    path: '/about',
    icon: <User className="w-5 h-5" />,
    iconBg: '#FFF3E6',
    iconColor: '#FF8706',
  },
  {
    name: 'Contact Us',
    description: 'Get in touch',
    path: '/contact',
    icon: <Phone className="w-5 h-5" />,
    iconBg: '#E6F8F9',
    iconColor: '#14B8B0',
  },
];

/* ─── MAIN 404 ERROR PAGE COMPONENT ──────────────────────────────────── */

interface NotFoundPageProps {
  onContactClick?: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onContactClick }) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FCFDFE] text-[#0D152A] flex flex-col justify-between font-sans relative overflow-hidden">

      {/* Background Decorative Rings (Top Right & Left ambient blur) */}
      <div className="absolute top-10 right-10 pointer-events-none opacity-20">
        <div className="w-[320px] h-[320px] rounded-full border border-orange-200/80" />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        <div className="max-w-[1240px] w-full mx-auto">
          
          {/* Top Grid: 404 Vector Illustration (Left) + Text & Actions (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14 sm:mb-20">
            
            {/* Left 7 Cols: 404 Vector Graphic */}
            <motion.div
              className="lg:col-span-7 flex justify-center"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <Vector404Illustration />
            </motion.div>

            {/* Right 5 Cols: Text, Headline & Action Buttons */}
            <motion.div
              className="lg:col-span-5 flex flex-col items-start text-left"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#FF8706] font-extrabold text-xs sm:text-sm uppercase tracking-[0.2em]">
                  OOPS!
                </span>
                <span className="h-[2px] w-8 bg-[#FF8706] rounded-full inline-block" />
              </div>

              {/* Main Headline */}
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[56px] text-[#0D152A] leading-[1.08] tracking-tight mb-5">
                Page <span className="text-[#FF8706]">Not</span> Found
              </h1>

              {/* Description Body */}
              <p className="text-[#475569] text-base sm:text-lg leading-relaxed max-w-[460px] mb-8 font-normal">
                The page you're looking for seems to have wandered off into space. Don't worry, let's get you back on track.
              </p>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-4 mb-7 w-full sm:w-auto">
                {/* Back to Home Button (Primary Orange Pill) */}
                <button
                  onClick={() => handleNavigate('/')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#FF8706] hover:bg-[#E5700A] text-white font-extrabold text-sm sm:text-base rounded-2xl transition-all duration-300 shadow-[0_10px_25px_rgba(255,135,6,0.3)] hover:shadow-[0_15px_30px_rgba(255,135,6,0.4)] hover:-translate-y-0.5 cursor-pointer group"
                >
                  <Home className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  <span>Back to Home</span>
                </button>

                {/* Explore Services Button (Secondary White Pill with Border) */}
                <button
                  onClick={() => handleNavigate('/services')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-white border-2 border-slate-200 hover:border-[#0D152A] text-[#0D152A] font-extrabold text-sm sm:text-base rounded-2xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer group"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="w-5 h-5 text-[#0D152A] transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>

              {/* Support Text Link */}
              <div className="flex items-center gap-1.5 text-sm sm:text-base text-[#475569]">
                <span>Need help?</span>
                <button
                  onClick={() => {
                    if (onContactClick) {
                      onContactClick();
                    } else {
                      handleNavigate('/contact');
                    }
                  }}
                  className="text-[#14B8B0] hover:text-[#0D9488] font-bold inline-flex items-center gap-1 transition-colors cursor-pointer bg-transparent border-none p-0 group"
                >
                  <span>Contact our support team</span>
                  <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* ─── Bottom Section: Explore Popular Sections Strip ───────── */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Section Header Title */}
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-[#0D152A] text-center mb-6 tracking-tight">
              Explore popular sections
            </h2>

            {/* Popular Sections White Card Container */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_15px_45px_rgba(0,0,0,0.04)] p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-0 lg:divide-x divide-slate-100">
                {quickSections.map((section, idx) => (
                  <button
                    key={section.name}
                    onClick={() => {
                      if (section.path === '/contact' && onContactClick) {
                        onContactClick();
                      } else {
                        handleNavigate(section.path);
                      }
                    }}
                    className={`flex items-center gap-4 p-4 lg:px-6 rounded-2xl lg:rounded-none transition-all duration-300 text-left cursor-pointer group hover:bg-slate-50/70 w-full ${
                      idx !== 0 ? 'lg:pl-6' : ''
                    }`}
                  >
                    {/* Icon Badge */}
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: section.iconBg, color: section.iconColor }}
                    >
                      {section.icon}
                    </div>

                    {/* Text Details */}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display font-extrabold text-base text-[#0D152A] group-hover:text-[#FF8706] transition-colors tracking-tight leading-tight truncate">
                        {section.name}
                      </h3>
                      <p className="text-[#667085] text-xs font-medium mt-0.5 truncate">
                        {section.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </main>

    </div>
  );
};
