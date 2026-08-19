import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useInView, animate } from 'motion/react';
import { ArrowRight, ArrowUpRight, Cpu, Users, Rocket, X, CheckCircle2, Clock, BarChart3 } from 'lucide-react';
import { DotGrid } from './DotGrid';
import { dataService, PortfolioItem } from '../services/dataService';

interface CountUpProps {
  target: number;
  suffix?: string;
  duration?: number;
}

const CountUp: React.FC<CountUpProps> = ({ target, suffix = '', duration = 2 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, target, {
        duration,
        ease: 'easeOut',
        onUpdate: (latest) => {
          setCount(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  badgeText: string;
  badgeBg: string;
  badgeTextColor: string;
  subtitleColor: string;
  image: string;
  websiteUrl: string;
}

const projectsData: Project[] = [
  {
    id: 'quikeat-com',
    title: 'quikeat.com',
    subtitle: 'Restaurant Ordering & Dining Platform',
    description: 'Online restaurant ordering, automated kitchen order dispatching, and dining table reservation website.',
    category: 'Web Development',
    badgeText: 'Web Development',
    badgeBg: 'bg-[#E6F8F9]',
    badgeTextColor: 'text-[#14B8B0]',
    subtitleColor: 'text-[#14B8B0]',
    image: '/quik.png',
    websiteUrl: 'https://quikeat.com',
  },
  {
    id: 'nexcojapan-com',
    title: 'nexcojapan.com',
    subtitle: 'Japanese Vehicle Export Platform',
    description: 'Global Japanese vehicle sourcing & auction portal with real-time bidding system and container shipping tracking.',
    category: 'Web Development',
    badgeText: 'Web Development',
    badgeBg: 'bg-[#E6F8F9]',
    badgeTextColor: 'text-[#14B8B0]',
    subtitleColor: 'text-[#14B8B0]',
    image: '/nexcoj.png',
    websiteUrl: 'https://nexcojapan.com',
  },
  {
    id: 'logistics-fleet-management',
    title: 'Logistics Fleet Management',
    subtitle: 'Enterprise Supply Chain & GPS Tracking',
    description: 'Real-time fleet tracking, automated route dispatching, driver telemetry, and fuel consumption analytics software.',
    category: 'Custom Software Development',
    badgeText: 'Custom Software Development',
    badgeBg: 'bg-[#FFEFE5]',
    badgeTextColor: 'text-[#FF8706]',
    subtitleColor: 'text-[#FF8706]',
    image: '/lfm.png',
    websiteUrl: 'https://fleet-management.devtasoft.com',
  },
];

// ─── Case Study Details ─────────────────────────────────────────────────
const caseStudyDetails: Record<string, {
  tagline: string;
  challenge: string;
  solution: string;
  results: { value: string; label: string }[];
  techStack: string[];
  timeline: string;
  features: { title: string; desc: string }[];
  color: string;
  bgColor: string;
}> = {
  'quikeat-com': {
    tagline: 'End-to-End Online Restaurant Ordering & Table Booking Platform',
    challenge: 'High-volume restaurant chains struggled with sluggish legacy PDF menus, lost phone orders during peak dining hours, and uncoordinated kitchen ticket queues.',
    solution: 'We engineered a high-velocity digital ordering portal featuring interactive visual menus, automated dining table booking, sub-second kitchen ticket WebSockets dispatch, and contactless payments.',
    results: [
      { value: '3.8x', label: 'Digital Orders' },
      { value: '-45%', label: 'Kitchen Prep Delay' },
      { value: '< 450ms', label: 'Page Load Speed' },
    ],
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Stripe'],
    timeline: '6 Weeks',
    features: [
      { title: 'Interactive Food Menu', desc: 'High-res dietary filterable food menu with item customizers, allergen tags, and real-time stock levels.' },
      { title: 'Kitchen Order Dispatch', desc: 'Instant WebSockets order transmission directly to kitchen display screens with active prep timers.' },
      { title: 'Table Reservation Engine', desc: 'Real-time dining room table booking calendar with instant SMS and email confirmations.' },
      { title: 'Contactless One-Tap Checkout', desc: 'Frictionless checkout supporting Apple Pay, Google Pay, credit cards, and saved loyalty balances.' },
    ],
    color: '#FF8706',
    bgColor: '#FFEFE5',
  },
  'nexcojapan-com': {
    tagline: 'Real-Time Japanese Automobile Bidding & Global Shipping Export Portal',
    challenge: 'Overseeing cross-border vehicle exports from Japanese auto auctions was hindered by slow manual currency conversions, translation delays, and unverified shipping schedules.',
    solution: 'We developed a unified automotive portal featuring live Japanese auction API feeds, multi-currency bidding calculators, automated export documentation, and real-time cargo ship tracking.',
    results: [
      { value: '50K+', label: 'Monthly Bids' },
      { value: '+185%', label: 'Overseas Buyers' },
      { value: '< 800ms', label: 'Search Latency' },
    ],
    techStack: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    timeline: '8 Weeks',
    features: [
      { title: 'Live Auction Feed Sync', desc: 'Real-time vehicle auction bidding engine with auto-translated inspection sheets and HD galleries.' },
      { title: 'Port-to-Port Freight Tracker', desc: 'Interactive vessel shipment tracker monitoring cargo ships from Yokohama to destination ports worldwide.' },
      { title: 'Multi-Currency Exchange Engine', desc: 'Live dynamic currency conversion for USD, JPY, EUR, and AED invoicing.' },
      { title: 'Buyer Document Vault', desc: 'Automated export certificates, bill of lading generation, and custom duty tracking.' },
    ],
    color: '#14B8B0',
    bgColor: '#E6F8F9',
  },
  'logistics-fleet-management': {
    tagline: 'Real-Time GPS Tracking & Automated Supply Chain Dispatch System',
    challenge: 'Managing a haulage fleet of over 500 commercial transport trucks without live telemetry caused high fuel waste, unexpected engine breakdowns, and delayed deliveries.',
    solution: 'We architected a central fleet command dashboard integrating IoT vehicle telematics, AI route optimization, automated maintenance forecasting, and driver safety scoring.',
    results: [
      { value: '500+', label: 'Monitored Trucks' },
      { value: '-28%', label: 'Fuel Costs' },
      { value: '99.99%', label: 'System Uptime' },
    ],
    techStack: ['TypeScript', 'React', 'Python', 'FastAPI', 'PostgreSQL', 'Redis'],
    timeline: '10 Weeks',
    features: [
      { title: 'Live IoT Telemetry', desc: 'Sub-second GPS vehicle location tracking with instant geofence arrival and departure triggers.' },
      { title: 'AI Route Optimization', desc: 'Dynamic routing algorithm bypassing severe traffic congestion and road hazards automatically.' },
      { title: 'Driver Safety Scorecards', desc: 'Monitors acceleration spikes, harsh braking incidents, and excessive engine idling times.' },
      { title: 'Automated Maintenance Alerts', desc: 'Engine diagnostic telemetry triggering predictive oil, brake, and tire service reminders.' },
    ],
    color: '#FF8706',
    bgColor: '#FFEFE5',
  },
  'cosme-store': {
    tagline: 'Luxury Cosmetics, Makeup & Skincare Storefront for Cosme.store',
    challenge: 'Cosme.store required an ultra-fast, premium e-commerce storefront capable of matching customers with personalized makeup shades while sustaining sub-second mobile page loads.',
    solution: 'We built a custom Shopify storefront featuring an interactive AI shade finder quiz, dynamic mix-and-match product bundling, multi-currency payments, and fast mobile navigation.',
    results: [
      { value: '3.5x', label: 'Conversion Rate' },
      { value: '< 500ms', label: 'Mobile Page Load' },
      { value: '99.9%', label: 'Store Uptime' },
    ],
    techStack: ['Shopify', 'Liquid', 'Tailwind CSS', 'JavaScript', 'Klaviyo'],
    timeline: '5 Weeks',
    features: [
      { title: 'AI Shade Matcher Quiz', desc: 'Interactive visual quiz recommending exact foundation and concealer shades based on skin undertones.' },
      { title: 'Mix-and-Match Bundle Builder', desc: 'Dynamic bundle creator allowing customers to build custom skincare routines at discounted rates.' },
      { title: 'Fragrance Scent Visualizer', desc: 'Interactive scent pyramid detailing top, heart, and base perfume notes.' },
      { title: 'Frictionless Mobile Checkout', desc: 'Optimized one-page checkout supporting Apple Pay, Shop Pay, and instant order tracking.' },
    ],
    color: '#14B8B0',
    bgColor: '#E6F8F9',
  },
  'greendoors-com': {
    tagline: 'Eco-Friendly Home Marketplace & Energy Efficiency Rating Engine',
    challenge: 'Homebuyers seeking eco-friendly housing lacked a specialized portal that aggregated verified energy efficiency certificates, solar specs, and green building scores.',
    solution: 'We designed a modern property listing platform incorporating interactive energy rating filters, 360-degree virtual home tours, and automated mortgage calculator tools.',
    results: [
      { value: '4.1x', label: 'Property Inquiries' },
      { value: '< 600ms', label: 'Map Search Speed' },
      { value: '12K+', label: 'Listed Green Homes' },
    ],
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    timeline: '7 Weeks',
    features: [
      { title: 'Energy Efficiency Index', desc: 'Verified property ratings detailing solar capacity, insulation quality, and estimated utility savings.' },
      { title: 'Interactive Map Search', desc: 'High-performance spatial property search with neighborhood walkability and transit filters.' },
      { title: '360° Virtual Home Tours', desc: 'Seamless immersive 3D walkthroughs embedded directly inside property listing pages.' },
      { title: 'Instant Tour Scheduling', desc: 'One-tap agent tour booking calendar with automated SMS appointment reminders.' },
    ],
    color: '#14B8B0',
    bgColor: '#E6F8F9',
  },
  'lms-software': {
    tagline: 'Enterprise Online Learning, Virtual Classrooms & Assessment Suite',
    challenge: 'Corporate training teams and universities struggled with fragmented tools for video lectures, assignment grading, and student certification tracking.',
    solution: 'We engineered a unified Learning Management System featuring HD WebRTC live classrooms, automated quiz grading, progress analytics, and instant certificate issuance.',
    results: [
      { value: '50K+', label: 'Active Students' },
      { value: '< 400ms', label: 'API Latency' },
      { value: '99.99%', label: 'System Uptime' },
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'WebRTC', 'Tailwind CSS'],
    timeline: '9 Weeks',
    features: [
      { title: 'Modular Course Creator', desc: 'Drag-and-drop course builder supporting HD video streams, interactive slides, and downloadable resources.' },
      { title: 'Live WebRTC Classrooms', desc: 'Integrated HD video broadcasting with live student Q&A, chat, and virtual whiteboards.' },
      { title: 'Automated Assessment Engine', desc: 'Instant grading for multiple-choice and code submission tests with immediate feedback.' },
      { title: 'Verifiable Digital Certificates', desc: 'Automated cryptographic certificate generation issued instantly upon course completion.' },
    ],
    color: '#FF8706',
    bgColor: '#FFEFE5',
  },
  'plservices-co': {
    tagline: 'On-Demand Handyman, Repair & Home Maintenance Booking Platform',
    challenge: 'PL Services needed a unified web portal to streamline home repair inquiries, offer instant pricing estimates, and dispatch certified handymen online.',
    solution: 'We built a high-converting web application featuring a multi-service job calculator, online scheduling calendar, technician dispatch management, and automated SMS updates.',
    results: [
      { value: '3.9x', label: 'Quote Requests' },
      { value: '< 550ms', label: 'Page Load Speed' },
      { value: '99.9%', label: 'Service Uptime' },
    ],
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    timeline: '6 Weeks',
    features: [
      { title: 'Multi-Service Job Calculator', desc: 'Instant cost estimator for electrical, carpentry, plumbing, and home repairs.' },
      { title: 'Online Scheduling Engine', desc: 'Seamless appointment booking calendar with automated time-slot reservations.' },
      { title: 'Technician Dispatch Manager', desc: 'Real-time assignment and status tracking for dispatching local repair experts.' },
      { title: 'Transparent Customer Vault', desc: 'Digital invoices, service history, and online payment processing.' },
    ],
    color: '#14B8B0',
    bgColor: '#E6F8F9',
  },
  'nexflow-com': {
    tagline: '24/7 Commercial Plumbing & Emergency Dispatch Platform for NexFlow',
    challenge: 'NexFlow needed a responsive digital platform to handle emergency plumbing dispatches, online service booking, transparent pricing estimates, and customer reviews.',
    solution: 'We engineered an intuitive web platform featuring an automated service booking engine, real-time technician dispatch tracker, plumbing cost calculator, and emergency hotline.',
    results: [
      { value: '4.2x', label: 'Online Bookings' },
      { value: '< 500ms', label: 'Search Latency' },
      { value: '99.9%', label: 'Platform Uptime' },
    ],
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    timeline: '6 Weeks',
    features: [
      { title: 'Online Service Booking', desc: 'Instant appointment scheduling for residential and commercial plumbing services.' },
      { title: 'Emergency Dispatch Tracker', desc: 'Real-time GPS tracking and SMS notification system for 24/7 emergency dispatches.' },
      { title: 'Plumbing Cost Estimator', desc: 'Transparent upfront cost calculation tool for common piping and repair jobs.' },
      { title: 'Verified Customer Reviews', desc: 'Integrated client rating, testimonial showcase, and warranty tracking.' },
    ],
    color: '#14B8B0',
    bgColor: '#E6F8F9',
  },
  'ironclad-co': {
    tagline: 'Residential & Commercial Roofing Inspection & Lead Generation Platform',
    challenge: 'Ironclad Roofing needed a high-performance web platform to generate residential and commercial leads, offer instant cost estimations, and streamline inspection requests.',
    solution: 'We engineered a modern, responsive website featuring an automated roofing calculator, online inspection scheduling, interactive project showcase, and emergency service dispatch.',
    results: [
      { value: '4.5x', label: 'Inbound Leads' },
      { value: '< 500ms', label: 'Page Load Speed' },
      { value: '99.9%', label: 'Platform Uptime' },
    ],
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    timeline: '5 Weeks',
    features: [
      { title: 'Instant Roof Cost Estimator', desc: 'Interactive roof replacement and repair cost estimation tool for homeowners.' },
      { title: 'Inspection Scheduling', desc: 'Direct online booking calendar for complimentary on-site roofing inspections.' },
      { title: 'Storm Damage Hotline', desc: 'Priority emergency dispatch interface for urgent storm and leak repairs.' },
      { title: 'Project Portfolio Gallery', desc: 'High-res gallery showcasing completed residential and commercial roofing projects.' },
    ],
    color: '#FF8706',
    bgColor: '#FFEFE5',
  },
};

const getCaseStudyDetails = (project: Project) => {
  const details = caseStudyDetails[project.id];
  if (details) return details;

  return {
    tagline: project.subtitle || project.title,
    challenge: `Developing a high-performance, scalable web solution for ${project.title} requiring seamless user experience and modern architecture.`,
    solution: `We engineered a custom digital platform featuring responsive design, fast page loads, automated workflows, and robust security protocols.`,
    results: [
      { value: '4.2x', label: 'Performance Lift' },
      { value: '< 500ms', label: 'Load Latency' },
      { value: '99.9%', label: 'Uptime SLA' },
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Vercel'],
    timeline: '4 Weeks',
    features: [
      { title: 'Responsive Design System', desc: 'Flawless layout across mobile, tablet, and desktop devices.' },
      { title: 'Sub-Second Loading Speed', desc: 'Optimized media assets and code-splitting for high velocity.' },
      { title: 'Interactive User Experience', desc: 'Fluid motion transitions and modern interface elements.' },
      { title: 'SEO & Analytics Integration', desc: 'Pre-configured search metadata and performance telemetry.' },
    ],
    color: '#FF8706',
    bgColor: '#FFEFE5',
  };
};

// ─── Case Study Modal ───────────────────────────────────────────────────
const CaseStudyModal: React.FC<{
  project: Project | null;
  onClose: () => void;
  onStartProject?: () => void;
}> = ({ project, onClose, onStartProject }) => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    if (project) {
      setActiveProject(project);
    }
  }, [project]);

  const isOpen = Boolean(project);
  const details = activeProject ? getCaseStudyDetails(activeProject) : null;

  return (
    <AnimatePresence>
      {isOpen && activeProject && details && (
        <>
          <motion.div
            className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 lg:p-8 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-[28px] w-full max-w-[900px] max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-100 pointer-events-auto"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="overflow-y-auto w-full h-full custom-scrollbar rounded-[28px]">
                {/* Executive Case Study Text Header Banner (No Image Picture) */}
                <div className="relative p-8 sm:p-10 pb-8 border-b border-slate-100 bg-gradient-to-br from-[#0B132B] via-[#0D152A] to-[#162244] text-white rounded-t-[28px] overflow-hidden">
                  {/* Ambient Radial Background Glow */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#FF8706]/20 via-[#14B8B0]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

                  {/* Modal Close Button */}
                  <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 z-20 cursor-pointer shadow-lg border border-white/20"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>

                  {/* Badges Row */}
                  <div className="flex items-center gap-3 mb-4 flex-wrap z-10 relative">
                    <span className="bg-[#FF8706] text-white font-black text-xs px-4 py-1.5 rounded-full shadow-md uppercase tracking-wider">
                      {activeProject.badgeText || activeProject.category}
                    </span>
                    <span className="bg-white/10 text-white font-bold text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-white/15 backdrop-blur-md">
                      <Clock className="w-3.5 h-3.5 text-[#14B8B0]" />
                      <span>{details.timeline || 'Verified Case Study'}</span>
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white leading-tight mb-2 z-10 relative">
                    {activeProject.title}
                  </h2>
                  <p className="font-display font-extrabold text-base sm:text-lg text-[#14B8B0] z-10 relative">
                    {details.tagline || activeProject.subtitle}
                  </p>
                </div>

                {/* Results */}
                <div className="px-8 sm:px-10 py-6">
                  <div className="grid grid-cols-3 gap-4">
                    {details.results.map((stat) => (
                      <div key={stat.label} className="rounded-2xl p-4 text-center border border-slate-100" style={{ backgroundColor: details.bgColor }}>
                        <span className="font-display font-extrabold text-2xl sm:text-3xl block mb-1" style={{ color: details.color }}>{stat.value}</span>
                        <span className="text-[#667085] font-semibold text-xs sm:text-sm">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Challenge & Solution */}
                <div className="px-8 sm:px-10 pb-6 space-y-5">
                  <div>
                    <h3 className="font-display font-extrabold text-base text-[#0D152A] mb-2 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" style={{ color: details.color }} /> The Challenge
                    </h3>
                    <p className="text-[#667085] font-medium text-sm leading-relaxed">{details.challenge}</p>
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-base text-[#0D152A] mb-2 flex items-center gap-2">
                      <Rocket className="w-4 h-4" style={{ color: details.color }} /> Our Solution
                    </h3>
                    <p className="text-[#667085] font-medium text-sm leading-relaxed">{details.solution}</p>
                  </div>
                </div>

                {/* Key Features */}
                <div className="px-8 sm:px-10 pb-6">
                  <h3 className="font-display font-extrabold text-lg text-[#0D152A] mb-5">Key Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {details.features.map((feat, i) => (
                      <motion.div key={feat.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                        className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg hover:border-slate-200 transition-all duration-300 hover:-translate-y-0.5">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: details.bgColor }}>
                            <CheckCircle2 className="w-4 h-4" style={{ color: details.color }} />
                          </div>
                          <div>
                            <h4 className="font-display font-extrabold text-sm text-[#0D152A] mb-1">{feat.title}</h4>
                            <p className="text-[#667085] font-medium text-xs leading-relaxed">{feat.desc}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="px-8 sm:px-10 pb-6">
                  <h3 className="font-display font-extrabold text-lg text-[#0D152A] mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {details.techStack.map((tech) => (
                      <span key={tech} className="px-3.5 py-1.5 rounded-full font-extrabold text-xs" style={{ backgroundColor: details.bgColor, color: details.color }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-8 sm:px-10 py-6 bg-slate-50 rounded-b-[28px] border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  {activeProject.websiteUrl && activeProject.websiteUrl !== '#' ? (
                    <a href={activeProject.websiteUrl} target="_blank" rel="noreferrer" className="font-bold text-sm text-[#14B8B0] hover:underline flex items-center gap-1.5">
                      <span>Visit Live Website</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-2 text-slate-500 font-semibold text-xs">
                      <CheckCircle2 className="w-4 h-4 text-[#14B8B0]" />
                      <span>Verified Client Project</span>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      onClose();
                      if (onStartProject) onStartProject();
                    }}
                    className="bg-[#FF8706] hover:bg-[#E07200] text-white font-bold text-sm px-6 py-3 rounded-full shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    Start Your Project
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─── Animated Code Mockup (Typewriter Effect with Rotating Snippets) ────
interface CodeSnippet {
  filename: string;
  badge: string;
  lines: string[];
}

const CODE_SNIPPETS: CodeSnippet[] = [
  {
    filename: 'DevtaEngine.tsx',
    badge: 'BUILDING',
    lines: [
      "import { DevtaEngine, AI } from '@devtasoft/core';",
      "// Initialize high-performance digital engine",
      "const engine = new DevtaEngine({",
      "  mode: 'production',",
      "  scale: Infinity,",
      "  aiAccelerator: true,",
      "});",
      "",
      "await engine.deploy({ target: 'global' }); ✓",
    ],
  },
  {
    filename: 'ECommerceEngine.ts',
    badge: 'OPTIMIZING',
    lines: [
      "import { WooCommerce, Redis } from '@devtasoft/wp';",
      "// High-conversion e-commerce storefront",
      "const store = new WooCommerce({",
      "  domain: 'sarastore.pk',",
      "  instantSearch: true,",
      "  checkoutSpeed: '< 1.0s',",
      "});",
      "",
      "await store.launchSalesGrowth(); ✓",
    ],
  },
  {
    filename: 'MediaConverter.tsx',
    badge: 'COMPILING',
    lines: [
      "import { FFmpegWasm } from '@devtasoft/wasm';",
      "// In-browser WebAssembly media processing",
      "const converter = new FFmpegWasm({",
      "  clientSideOnly: true,",
      "  maxThreads: 8,",
      "  privacyFirst: true,",
      "});",
      "",
      "await converter.transcode('video.mp4'); ✓",
    ],
  },
  {
    filename: 'POSCloudSync.ts',
    badge: 'SYNCING',
    lines: [
      "import { POSCore, SQLiteSync } from '@devtasoft/pos';",
      "// Offline-first retail management system",
      "const pos = new POSCore({",
      "  offlineMode: true,",
      "  escPosPrinter: true,",
      "  multiBranchSync: 500,",
      "});",
      "",
      "await pos.syncOfflineTransactions(); ✓",
    ],
  },
  {
    filename: 'AiAutomation.py',
    badge: 'TRAINING',
    lines: [
      "from devtasoft.ai import AgenticPipeline",
      "# Autonomous workflow AI assistant",
      "agent = AgenticPipeline(",
      "    task='enterprise_automation',",
      "    memory_vector_db='pinecone',",
      "    speed='instant'",
      ")",
      "",
      "response = agent.run_autonomously() ✓",
    ],
  },
];

const renderHighlightedText = (text: string) => {
  if (!text) return null;

  if (text.trim().startsWith('//') || text.trim().startsWith('#')) {
    return <span className="text-slate-500">{text}</span>;
  }

  const regex = /(\/\/.*|#.*|'.*?'|".*?"|\b(?:import|from|const|let|var|await|new|true|false|Infinity|return|async|def)\b|\b(?:DevtaEngine|WooCommerce|FFmpegWasm|POSCore|AgenticPipeline|AI|Redis|SQLiteSync)\b|✓|[{}()\[\]=:,;])/g;

  const parts: { text: string; type: string }[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const start = match.index;
    if (start > lastIndex) {
      parts.push({ text: text.slice(lastIndex, start), type: 'plain' });
    }
    const val = match[0];
    let type = 'plain';

    if (val.startsWith('//') || val.startsWith('#')) {
      type = 'comment';
    } else if (val.startsWith("'") || val.startsWith('"')) {
      type = 'string';
    } else if (/^(import|from|const|let|var|await|new|true|false|Infinity|return|async|def)$/.test(val)) {
      type = 'keyword';
    } else if (/^(DevtaEngine|WooCommerce|FFmpegWasm|POSCore|AgenticPipeline|AI|Redis|SQLiteSync)$/.test(val)) {
      type = 'class';
    } else if (val === '✓') {
      type = 'check';
    } else if ('{}()[]'.includes(val)) {
      type = 'bracket';
    } else {
      type = 'symbol';
    }

    parts.push({ text: val, type });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), type: 'plain' });
  }

  return (
    <>
      {parts.map((part, i) => {
        switch (part.type) {
          case 'comment':
            return <span key={i} className="text-slate-500">{part.text}</span>;
          case 'string':
            return <span key={i} className="text-emerald-400">{part.text}</span>;
          case 'keyword':
            return <span key={i} className="text-[#FF6B00]">{part.text}</span>;
          case 'class':
            return <span key={i} className="text-[#14B8B0]">{part.text}</span>;
          case 'check':
            return <span key={i} className="text-emerald-500 font-bold">{part.text}</span>;
          case 'bracket':
            return <span key={i} className="text-purple-400">{part.text}</span>;
          default:
            return <span key={i} className="text-slate-300">{part.text}</span>;
        }
      })}
    </>
  );
};

const AnimatedCodeMockup: React.FC = () => {
  const [snippetIndex, setSnippetIndex] = useState(() => Math.floor(Math.random() * CODE_SNIPPETS.length));
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<'TYPING' | 'PAUSE' | 'DELETING'>('TYPING');

  const currentSnippet = CODE_SNIPPETS[snippetIndex];

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (phase === 'TYPING') {
      const currentLineText = currentSnippet.lines[lineIndex] || '';

      if (charIndex < currentLineText.length) {
        timer = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
        }, 28);
      } else {
        if (lineIndex < currentSnippet.lines.length - 1) {
          timer = setTimeout(() => {
            setLineIndex((prev) => prev + 1);
            setCharIndex(0);
          }, 35);
        } else {
          timer = setTimeout(() => {
            setPhase('PAUSE');
          }, 100);
        }
      }
    } else if (phase === 'PAUSE') {
      timer = setTimeout(() => {
        setPhase('DELETING');
      }, 3500);
    } else if (phase === 'DELETING') {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setCharIndex((prev) => prev - 1);
        }, 10);
      } else if (lineIndex > 0) {
        const prevLineText = currentSnippet.lines[lineIndex - 1] || '';
        timer = setTimeout(() => {
          setLineIndex((prev) => prev - 1);
          setCharIndex(prevLineText.length);
        }, 10);
      } else {
        timer = setTimeout(() => {
          setSnippetIndex((prev) => (prev + 1) % CODE_SNIPPETS.length);
          setLineIndex(0);
          setCharIndex(0);
          setPhase('TYPING');
        }, 300);
      }
    }

    return () => clearTimeout(timer);
  }, [phase, lineIndex, charIndex, snippetIndex, currentSnippet]);

  return (
    <motion.div
      className="relative z-10 bg-[#0D152A]/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:border-[#FF6B00]/40 w-full"
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="bg-[#090D16] px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block" />
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="text-[#14B8B0]">portfolio</span>
          <span>/</span>
          <span className="text-white font-medium transition-all duration-300">{currentSnippet.filename}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-[#14B8B0]/20 text-[#14B8B0] text-[10px] font-mono font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14B8B0] animate-pulse" />
            {currentSnippet.badge}
          </span>
        </div>
      </div>
      <div className="p-5 font-mono text-xs leading-relaxed text-slate-300 overflow-hidden font-semibold min-h-[250px] flex flex-col justify-start">
        {currentSnippet.lines.slice(0, lineIndex + 1).map((lineText, idx) => {
          const isCurrentLine = idx === lineIndex;
          const visibleText = isCurrentLine ? lineText.slice(0, charIndex) : lineText;

          return (
            <div key={idx} className="flex items-start gap-3 mt-1 first:mt-0 min-h-[1.4rem]">
              <span className="text-slate-600 select-none w-4 text-right shrink-0">{idx + 1}</span>
              <span className="flex-1 break-words whitespace-pre-wrap">
                {renderHighlightedText(visibleText)}
                {isCurrentLine && (
                  <span className="inline-block w-1.5 h-3.5 bg-[#FF6B00] ml-1 rounded-sm animate-pulse align-middle" />
                )}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

// ─── Main PortfolioSection Component ─────────────────────────────────────
export const PortfolioSection: React.FC<{
  onStartProjectClick?: () => void;
}> = ({ onStartProjectClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [dynamicProjects, setDynamicProjects] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    const updatePortfolio = () => {
      setDynamicProjects(dataService.getPortfolio());
    };
    updatePortfolio();
    return dataService.subscribe(updatePortfolio);
  }, []);

  const mappedDynamicProjects: Project[] = dynamicProjects
    .filter((p) => p.showOnLanding === true)
    .map((p) => ({
      id: p.id,
      title: p.name,
      subtitle: p.category ? `${p.category} Platform` : 'Custom Digital Product',
      description: p.description || `Custom project built by DevtaSoft for ${p.name}.`,
      category: p.category || 'Web Development',
      badgeText: p.category || 'Web Development',
      badgeBg: 'bg-[#E6F8F9]',
      badgeTextColor: 'text-[#14B8B0]',
      subtitleColor: 'text-[#14B8B0]',
      image: p.image,
      websiteUrl: p.domain.startsWith('http') ? p.domain : `https://${p.domain}`,
    }));

  const allProjectsCombined = mappedDynamicProjects.length > 0 ? mappedDynamicProjects : projectsData;

  return (
    <section id="portfolio" className="w-full bg-[#FCFDFE] py-20 sm:py-28 px-2 sm:px-4 lg:px-6 font-sans overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* TOP ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16">
          
          <div className="lg:col-span-6 flex flex-col justify-center pl-4 sm:pl-6 lg:pl-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#14B8B0] font-black text-xs sm:text-sm uppercase tracking-[0.2em]">OUR PORTFOLIO</span>
              <span className="h-[2px] w-12 bg-[#14B8B0] rounded-full inline-block" />
            </div>
            <motion.h2 
              className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[58px] xl:text-[66px] leading-[1.08] tracking-tight text-[#0D152A] mb-6"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Digital products <br />we're <span className="text-[#FF6B00]">proud of.</span>
            </motion.h2>
            <p className="mt-6 sm:mt-8 text-base sm:text-lg text-[#475569] max-w-[560px] leading-relaxed font-normal mb-8">
              Explore a selection of our work where design, technology, and strategy come together to create real impact.
            </p>
            <div className="flex items-center gap-4">
              {/* Start a Project Button */}
              <motion.button
                onClick={() => {
                  if (location.pathname !== '/') {
                    navigate('/');
                    setTimeout(() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  } else {
                    const contactElem = document.getElementById('contact');
                    if (contactElem) {
                      contactElem.scrollIntoView({ behavior: 'smooth' });
                    } else if (onStartProjectClick) {
                      onStartProjectClick();
                    }
                  }
                }}
                whileHover={{ y: -2, scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2.5 bg-[#FF8706] hover:bg-[#E07200] text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-md shadow-[#FF8706]/20 cursor-pointer group"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 text-white stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center items-center lg:items-end relative">
            <motion.div className="w-full max-w-[520px] relative mb-12 select-none" initial={{ opacity: 0, scale: 0.94, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}>
              <motion.div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#14B8B0]/25 via-[#FF6B00]/20 to-[#7C3AED]/20 blur-2xl pointer-events-none" animate={{ opacity: [0.5, 0.85, 0.5], scale: [0.98, 1.04, 0.98] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
              <AnimatedCodeMockup />
            </motion.div>

            <div className="w-full max-w-[520px] flex items-center justify-between px-4 sm:px-8 py-4 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-md shadow-slate-900/5 transition-all duration-300 hover:shadow-lg">
              {[
                { icon: Cpu, number: 250, suffix: '+', label: 'Projects', color: '#FF6B00' },
                { icon: Users, number: 100, suffix: '+', label: 'Clients', color: '#14B8B0' },
                { icon: Rocket, number: 98, suffix: '%', label: 'Satisfaction', color: '#FF6B00' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-1.5 group cursor-pointer">
                  <stat.icon className="w-5 h-5 mb-0.5 group-hover:scale-110 transition-transform duration-300" style={{ color: stat.color }} />
                  <span className="font-display font-extrabold text-[#0D152A] text-xl group-hover:scale-110 transition-transform duration-300">
                    <CountUp target={stat.number} suffix={stat.suffix} />
                  </span>
                  <span className="font-semibold text-[#6B7280] text-xs group-hover:text-[#0D152A] transition-colors">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3 Project Cards Grid (1 WordPress, 1 Web Dev, 1 Custom Software) */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-14" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}>
          {allProjectsCombined.slice(0, 3).map((project) => (
            <motion.div key={project.id} className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-[#0D152A]/10 transition-shadow duration-300 flex flex-col h-full group cursor-pointer"
              onClick={() => setActiveProject(project)}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } } }}
              whileHover={{ y: -8, scale: 1.015, transition: { type: 'spring', stiffness: 300, damping: 20 } }}>
              <div className="w-full h-[250px] sm:h-[270px] relative bg-[#F8FAFC] p-3 sm:p-4 overflow-hidden shrink-0 rounded-t-[32px] border-b border-slate-100 flex items-center justify-center">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain object-top rounded-xl shadow-xs transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 sm:p-10 flex flex-col flex-grow">
                <h3 className="font-display font-extrabold text-[#0D152A] text-2xl mb-1.5 tracking-tight group-hover:text-[#FF6B00] transition-colors duration-300">{project.title}</h3>
                <p className={`${project.subtitleColor} font-bold text-xs sm:text-sm uppercase tracking-wider mb-4`}>{project.subtitle}</p>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-8 flex-grow">{project.description}</p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                  <button onClick={(e) => { e.stopPropagation(); setActiveProject(project); }}
                    className="inline-flex items-center gap-2 font-bold text-[#0D152A] text-sm sm:text-base group-hover:text-[#FF6B00] transition-colors duration-300 group/btn cursor-pointer">
                    <span>View Case Study</span>
                    <ArrowRight className="w-4 h-4 text-[#FF6B00] transition-transform duration-300 group-hover:translate-x-1.5" />
                  </button>
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center transition-all duration-300 hover:bg-[#FF6B00] hover:text-white hover:rotate-45 text-[#6B7280] shadow-sm cursor-pointer"
                    title={`Visit ${project.title}`}
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects Button (Moved Downward below the cards) */}
        <div className="flex items-center justify-center mb-20">
          <motion.button
            onClick={() => navigate('/portfolio')}
            whileHover={{ y: -3, scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 bg-[#FF8706] hover:bg-[#E07200] text-white font-bold text-base sm:text-lg px-9 py-4 rounded-full shadow-lg shadow-[#FF8706]/25 cursor-pointer group shadow-md"
          >
            <span>View All Projects</span>
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <ArrowUpRight className="w-4 h-4 text-white stroke-[2.5]" />
            </div>
          </motion.button>
        </div>

        {/* Bottom CTA Banner */}
        <div className="relative">
          <div className="absolute top-1/2 left-[-20px] -translate-y-1/2 pointer-events-none hidden md:block"><DotGrid rows={3} cols={6} dotColor="#FF6B00" /></div>
          <div className="absolute top-1/2 right-[-20px] -translate-y-1/2 pointer-events-none hidden md:block"><DotGrid rows={3} cols={6} dotColor="#14B8B0" /></div>
          <div className="relative z-10 max-w-[960px] mx-auto bg-white rounded-[24px] border border-slate-100 shadow-md py-6 px-8 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="font-display font-black text-[#0D152A] text-xl sm:text-2xl mb-1.5 tracking-tight">Have a project in mind?</h4>
              <p className="text-[#6B7280] text-sm font-medium">Let's build something amazing together.</p>
            </div>
            <motion.button
              onClick={onStartProjectClick}
              whileHover={{ y: -2, scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2.5 bg-[#FF8706] hover:bg-[#E05B00] text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg shadow-[#FF8706]/20 cursor-pointer group"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </div>
        </div>

      </div>

      {/* Case Study Modal */}
      <CaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} onStartProject={onStartProjectClick} />
    </section>
  );
};
