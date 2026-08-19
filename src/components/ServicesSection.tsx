import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Code2,
  Bot,
  Globe,
  Smartphone,
  Palette,
  Cloud,
  Users,
  ShieldCheck,
  Zap,
  MessageSquare,
  X,
  CheckCircle2,
  Layers,
  Cpu,
  Database,
  GitBranch,
  Figma,
  MonitorSmartphone,
  Server,
  Lock,
  Rocket,
  Sparkles,
  Search,
  Brush,
  PenTool,
  BarChart3,
  ShoppingBag,
} from 'lucide-react';

interface ServicesSectionProps {
  onServiceClick?: (serviceName: string) => void;
  onContactClick?: () => void;
}

// ─── Detailed Modal Data ────────────────────────────────────────────────
const serviceDetails: Record<
  string,
  {
    tagline: string;
    longDesc: string;
    features: { icon: React.ElementType; title: string; desc: string }[];
    techStack: string[];
    stats: { value: string; label: string }[];
  }
> = {
  'Custom Software Development': {
    tagline: 'Architected for Scale. Built for Impact.',
    longDesc:
      'We build enterprise-grade, custom software from the ground up — designed around your workflows, not the other way around. Every system we deliver is scalable, maintainable, and production-hardened.',
    features: [
      { icon: Layers, title: 'Modular Architecture', desc: 'Clean, composable modules that scale independently as your business grows.' },
      { icon: Database, title: 'Database Design', desc: 'Optimized relational and NoSQL schemas for high-throughput data operations.' },
      { icon: Lock, title: 'Security First', desc: 'OWASP-compliant security layers, encryption at rest, and role-based access control.' },
      { icon: GitBranch, title: 'CI/CD Pipelines', desc: 'Automated testing, staging, and deployment workflows for zero-downtime releases.' },
    ],
    techStack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    stats: [
      { value: '50+', label: 'Custom Apps Built' },
      { value: '99.9%', label: 'Uptime SLA' },
      { value: '< 2s', label: 'Avg Load Time' },
    ],
  },
  'AI & Automation': {
    tagline: 'Intelligence That Works While You Sleep.',
    longDesc:
      'We design and deploy AI-powered systems that automate your most complex workflows — from intelligent document processing to predictive analytics and conversational agents.',
    features: [
      { icon: Cpu, title: 'Machine Learning Models', desc: 'Custom-trained models for classification, prediction, and anomaly detection.' },
      { icon: Bot, title: 'Conversational AI', desc: 'Context-aware chatbots and virtual assistants powered by LLMs and RAG pipelines.' },
      { icon: Zap, title: 'Workflow Automation', desc: 'End-to-end process automation that eliminates manual bottlenecks.' },
      { icon: Database, title: 'Data Pipelines', desc: 'Real-time ETL pipelines that clean, transform, and serve data at scale.' },
    ],
    techStack: ['Python', 'TensorFlow', 'OpenAI', 'LangChain', 'FastAPI', 'Redis'],
    stats: [
      { value: '85%', label: 'Cost Reduction' },
      { value: '10x', label: 'Faster Processing' },
      { value: '24/7', label: 'Autonomous Ops' },
    ],
  },
  'Web Development': {
    tagline: 'Pixel-Perfect. Lightning-Fast. SEO-Ready.',
    longDesc:
      'We craft high-performance web applications and marketing sites that load instantly, rank higher, and convert visitors into customers — built with modern frameworks and best practices.',
    features: [
      { icon: Globe, title: 'Full-Stack Apps', desc: 'End-to-end web applications with responsive frontends and robust backend APIs.' },
      { icon: Rocket, title: 'Performance Optimization', desc: 'Core Web Vitals tuning, lazy loading, and edge caching for sub-second loads.' },
      { icon: MonitorSmartphone, title: 'Responsive Design', desc: 'Fluid layouts that deliver flawless experiences across every device and screen.' },
      { icon: Lock, title: 'SEO & Accessibility', desc: 'Semantic HTML, structured data, and WCAG compliance baked into every build.' },
    ],
    techStack: ['Next.js', 'React', 'TailwindCSS', 'Node.js', 'Vercel', 'Prisma'],
    stats: [
      { value: '100', label: 'Lighthouse Score' },
      { value: '80+', label: 'Sites Delivered' },
      { value: '< 1s', label: 'First Contentful Paint' },
    ],
  },
  'Mobile App Development': {
    tagline: 'One Codebase. Every Platform. Zero Compromise.',
    longDesc:
      'We design and build native-quality mobile applications for iOS and Android using cross-platform and native frameworks — delivering smooth, performant apps from prototype to App Store.',
    features: [
      { icon: Smartphone, title: 'Cross-Platform', desc: 'React Native and Flutter apps with native performance and a single codebase.' },
      { icon: Layers, title: 'Offline-First', desc: 'Local data persistence and background sync for reliable offline experiences.' },
      { icon: Zap, title: 'Push & Real-Time', desc: 'Push notifications, WebSockets, and live data feeds for engaged users.' },
      { icon: Rocket, title: 'Store Deployment', desc: 'End-to-end submission, review handling, and CI/CD for App Store & Google Play.' },
    ],
    techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Expo'],
    stats: [
      { value: '4.9★', label: 'Avg Store Rating' },
      { value: '30+', label: 'Apps Published' },
      { value: '2M+', label: 'Total Downloads' },
    ],
  },
  'UI/UX Design': {
    tagline: 'Design That Feels Right. Every Time.',
    longDesc:
      'Our design team crafts intuitive, beautiful digital experiences grounded in user research, accessibility standards, and a relentless attention to detail — from wireframe to pixel-perfect handoff.',
    features: [
      { icon: Palette, title: 'Design Systems', desc: 'Reusable component libraries and design tokens for consistent brand expression.' },
      { icon: Users, title: 'User Research', desc: 'Interviews, surveys, and usability testing to validate every design decision.' },
      { icon: Figma, title: 'Prototyping', desc: 'High-fidelity interactive prototypes in Figma with developer-ready specs.' },
      { icon: Sparkles, title: 'Motion Design', desc: 'Micro-interactions and transitions that make interfaces feel alive and premium.' },
    ],
    techStack: ['Figma', 'Framer', 'Adobe XD', 'Principle', 'Lottie', 'Storybook'],
    stats: [
      { value: '200+', label: 'Screens Designed' },
      { value: '95%', label: 'Usability Score' },
      { value: '40+', label: 'Design Systems' },
    ],
  },
  'Cloud & DevOps': {
    tagline: 'Ship Faster. Scale Effortlessly. Sleep Better.',
    longDesc:
      'We architect resilient cloud infrastructure and implement DevOps best practices that accelerate your delivery pipeline, reduce costs, and ensure your systems are always available.',
    features: [
      { icon: Cloud, title: 'Cloud Architecture', desc: 'Multi-region, fault-tolerant infrastructure on AWS, GCP, or Azure.' },
      { icon: Server, title: 'Containerization', desc: 'Docker and Kubernetes orchestration for scalable, portable deployments.' },
      { icon: GitBranch, title: 'CI/CD Automation', desc: 'GitHub Actions, Jenkins, and ArgoCD pipelines for continuous delivery.' },
      { icon: ShieldCheck, title: 'Monitoring & Security', desc: 'Observability stacks with Grafana, Prometheus, and automated alerting.' },
    ],
    techStack: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Grafana'],
    stats: [
      { value: '99.99%', label: 'SLA Uptime' },
      { value: '60%', label: 'Cost Savings' },
      { value: '5 min', label: 'Deploy Time' },
    ],
  },
  SEO: {
    tagline: 'Rank Higher. Drive Organic Traffic. Outperform Competitors.',
    longDesc: 'We deliver comprehensive technical SEO, keyword research, on-page optimization, and authoritative backlink building strategies to ensure your brand dominates search engine results.',
    features: [
      { icon: Search, title: 'Technical SEO Audits', desc: 'Fix crawl errors, site architecture, and indexation bottlenecks.' },
      { icon: BarChart3, title: 'Keyword & Competitor Research', desc: 'Identify high-intent keywords and market opportunities.' },
      { icon: Layers, title: 'On-Page & Content Optimization', desc: 'Optimize meta tags, heading structures, and content relevance.' },
      { icon: Zap, title: 'Link Building & Authority', desc: 'Build high-authority backlink profiles to boost domain rank.' },
    ],
    techStack: ['Google Search Console', 'Ahrefs', 'SEMrush', 'Screaming Frog', 'Google Analytics 4', 'Schema.org'],
    stats: [{ value: '+300%', label: 'Organic Traffic Growth' }, { value: '#1', label: 'Page Search Ranks' }, { value: '99%', label: 'SEO Audit Score' }],
  },
  'WordPress Development': {
    tagline: 'Tailored WordPress & WooCommerce Solutions for Growing Brands.',
    longDesc: 'We build secure, ultra-fast custom WordPress sites, custom Gutenberg blocks, WooCommerce stores, and API integrations engineered for speed and ease of management.',
    features: [
      { icon: Globe, title: 'Custom Theme & Gutenberg Blocks', desc: 'Bespoke themes built from scratch with reusable editor blocks.' },
      { icon: ShoppingBag, title: 'WooCommerce E-Commerce', desc: 'Custom online shop setups with seamless cart & checkout.' },
      { icon: Zap, title: 'Speed & Core Web Vitals', desc: 'Caching, image compression, and database tuning for sub-second loads.' },
      { icon: Lock, title: 'Security & Maintenance', desc: 'Hardened security layers, automated backups, and 24/7 uptime monitoring.' },
    ],
    techStack: ['WordPress', 'PHP 8.3', 'WooCommerce', 'MySQL', 'Elementor', 'REST API'],
    stats: [{ value: '150+', label: 'WordPress Sites Built' }, { value: '99.9%', label: 'Uptime & Security' }, { value: '< 1s', label: 'Load Latency' }],
  },
  'Shopify Store Development': {
    tagline: 'Scalable E-Commerce Experiences Built on Shopify.',
    longDesc: 'We design and build custom Shopify and Shopify Plus e-commerce storefronts optimized for mobile conversion, seamless checkout, and scalable store growth.',
    features: [
      { icon: ShoppingBag, title: 'Custom Liquid Themes', desc: 'Pixel-perfect, conversion-driven storefronts built for your brand.' },
      { icon: Sparkles, title: 'Shopify Plus Enterprise', desc: 'Advanced automation, custom checkout scripts, and multi-currency.' },
      { icon: Zap, title: 'App & Gateway Integrations', desc: 'Connect ERPs, CRMs, inventory systems, and custom payment gateways.' },
      { icon: BarChart3, title: 'Conversion Rate Tuning', desc: 'A/B testing, cart abandonment triggers, and mobile checkout optimization.' },
    ],
    techStack: ['Shopify Plus', 'Liquid', 'GraphQL Admin API', 'React / Hydrogen', 'Storefront API', 'Stripe'],
    stats: [{ value: '$10M+', label: 'Client Revenue Processed' }, { value: '99.9%', label: 'Checkout Uptime' }, { value: '+45%', label: 'Avg Conversion Boost' }],
  },
};

// ─── Service Card Data ──────────────────────────────────────────────────
const servicesData = [
  {
    num: '01',
    title: 'Custom Software Development',
    desc: 'Transform your ideas into powerful digital solutions with our custom software development services. From concept and planning to development, deployment, and ongoing maintenance, we deliver reliable software that aligns with your business goals and evolves with your needs',
    icon: Code2,
    accentColor: '#FF8706',
    bgColor: '#FFEFE5',
    badgeText: '01',
    illustration: (
      <img
        src="/editor.png"
        alt="Editor Mockup"
        loading="lazy"
        decoding="async"
        className="w-24 h-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
        referrerPolicy="no-referrer"
      />
    ),
  },
  {
    num: '02',
    title: 'AI & Automation',
    desc: 'Empower your business with intelligent AI automation solutions designed to streamline operations, reduce manual effort, and increase efficiency. We develop AI-powered systems that automate repetitive tasks, optimise workflows, and enable data-driven decision-making.',
    icon: Bot,
    accentColor: '#53E5E7',
    bgColor: '#E6F8F9',
    badgeText: '02',
    illustration: (
      <img
        src="/robotai.png"
        alt="AI & Automation Robot Mockup"
        loading="lazy"
        decoding="async"
        className="w-24 h-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
        referrerPolicy="no-referrer"
      />
    ),
  },
  {
    num: '03',
    title: 'Web Development',
    desc: 'Modern, responsive, and high-performance websites designed to strengthen your brand and drive results. We develop innovative web solutions that combine cutting-edge technology with intuitive design to help businesses succeed in the digital landscape.',
    icon: Globe,
    accentColor: '#2A285F',
    bgColor: '#EEF2FF',
    badgeText: '03',
    illustration: (
      <img
        src="/webpc.png"
        alt="Web Development PC Mockup"
        loading="lazy"
        decoding="async"
        className="w-24 h-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
        referrerPolicy="no-referrer"
      />
    ),
  },
  {
    num: '04',
    title: 'Mobile App Development',
    desc: 'design and build high-performance, user-friendly mobile applications for iOS, Android, and cross-platform environments. From concept and UI/UX design to development, testing, deployment, and ongoing support, we deliver secure, scalable, and feature-rich mobile solutions',
    icon: Smartphone,
    accentColor: '#53E5E7',
    bgColor: '#E6F8F9',
    badgeText: '04',
    illustration: (
      <img
        src="/mobileapp.png"
        alt="Mobile App Development Mockup"
        loading="lazy"
        decoding="async"
        className="w-24 h-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
        referrerPolicy="no-referrer"
      />
    ),
  },
  {
    num: '05',
    title: 'UI/UX Design',
    desc: 'Great products begin with great user experiences. Our UI/UX design team combines creativity, strategy, and user research to create intuitive, accessible, and aesthetically refined digital interfaces. From user journey mapping and interactive prototypes to responsive interface designs.',
    icon: Palette,
    accentColor: '#FF8706',
    bgColor: '#FFEFE5',
    badgeText: '05',
    illustration: (
      <img
        src="/uiux.png"
        alt="UI/UX Design Mockup"
        loading="lazy"
        decoding="async"
        className="w-24 h-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
        referrerPolicy="no-referrer"
      />
    ),
  },
  {
    num: '06',
    title: 'Cloud & DevOps',
    desc: 'Optimise your software delivery lifecycle with our comprehensive Cloud and DevOps services. We design resilient cloud architectures, automate infrastructure, and implement DevOps best practices to enhance collaboration, accelerate deployments, and ensure operational excellence.',
    icon: Cloud,
    accentColor: '#53E5E7',
    bgColor: '#E6F8F9',
    badgeText: '06',
    illustration: (
      <img
        src="/devops.png"
        alt="Cloud & DevOps Mockup"
        loading="lazy"
        decoding="async"
        className="w-24 h-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
        referrerPolicy="no-referrer"
      />
    ),
  },
  {
    num: '07',
    title: 'SEO',
    desc: 'Dominate search engine rankings and expand your online reach with data-driven SEO strategies. From comprehensive technical audits and keyword research to on-page optimization, content relevance, and backlink authority building, we drive sustainable organic traffic that converts.',
    icon: Search,
    accentColor: '#10B981',
    bgColor: '#ECFDF5',
    badgeText: '07',
    illustration: (
      <img
        src="/seo.png"
        alt="SEO Mockup"
        loading="lazy"
        decoding="async"
        className="w-24 h-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
        referrerPolicy="no-referrer"
      />
    ),
  },
  {
    num: '08',
    title: 'WordPress Development',
    desc: 'Empower your content and commerce with custom WordPress solutions built for speed, security, and effortless management. We build bespoke Gutenberg themes, high-converting WooCommerce stores, custom plugin integrations, and scalable headless CMS architectures.',
    icon: Globe,
    accentColor: '#21759B',
    bgColor: '#F0F7FA',
    badgeText: '08',
    illustration: (
      <img
        src="/wp.png"
        alt="WordPress Development Mockup"
        loading="lazy"
        decoding="async"
        className="w-24 h-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
        referrerPolicy="no-referrer"
      />
    ),
  },
  {
    num: '09',
    title: 'Shopify Store Development',
    desc: 'Accelerate your e-commerce growth with high-converting Shopify and Shopify Plus storefronts. We craft pixel-perfect custom Liquid themes, headless React/Hydrogen shopping experiences, custom payment app integrations, and conversion rate optimization tailored to scale your brand.',
    icon: ShoppingBag,
    accentColor: '#96BF48',
    bgColor: '#F6F9F0',
    badgeText: '09',
    illustration: (
      <img
        src="/shopify.png"
        alt="Shopify Store Development Mockup"
        loading="lazy"
        decoding="async"
        className="w-24 h-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
        referrerPolicy="no-referrer"
      />
    ),
  },
];

const valueItems = [
  {
    num: '01',
    title: 'Client Focused',
    desc: 'Delivering tailored solutions with a client-first approach.',
    icon: Users,
    iconColor: '#FF8706',
    bgColor: '#FFEFE5',
  },
  {
    num: '02',
    title: 'Quality First',
    desc: 'Quality is the foundation of every solution we create.',
    icon: ShieldCheck,
    iconColor: '#14B8B0',
    bgColor: '#E6F8F9',
  },
  {
    num: '03',
    title: 'Innovative Approach',
    desc: 'Creating future-ready solutions through continuous innovation.',
    icon: Zap,
    iconColor: '#FF8706',
    bgColor: '#FFEFE5',
  },
  {
    num: '04',
    title: 'Transparent Communication',
    desc: 'Building trust through open communication and consistent updates.',
    icon: MessageSquare,
    iconColor: '#14B8B0',
    bgColor: '#E6F8F9',
  },
];

// ─── Service Detail Modal Component ─────────────────────────────────────
const ServiceDetailModal: React.FC<{
  service: (typeof servicesData)[0] | null;
  onClose: () => void;
  onContactClick?: () => void;
}> = ({ service, onClose, onContactClick }) => {
  if (!service) return null;

  const details = serviceDetails[service.title];
  if (!details) return null;

  const IconComp = service.icon;
  const resolvedColor = service.accentColor === '#53E5E7' ? '#14B8B0' : service.accentColor;

  return (
    <AnimatePresence>
      {service && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 lg:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-[28px] w-full max-w-[860px] max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-100"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="overflow-y-auto w-full h-full custom-scrollbar rounded-[28px]">
                {/* ─── Header ─────────────────────────────────────────── */}
                <div className="relative p-8 sm:p-10 pb-0 overflow-hidden">
                  {/* Ambient Gradient Glow */}
                  <div
                    className="absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ backgroundColor: resolvedColor }}
                  />

                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all duration-200 hover:scale-110 z-10 cursor-pointer"
                  >
                    <X className="w-5 h-5 text-slate-500" />
                  </button>

                  {/* Icon + Badge Row */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-16 h-16 rounded-[20px] flex items-center justify-center shadow-md"
                      style={{ backgroundColor: service.bgColor }}
                    >
                      <IconComp className="w-8 h-8 stroke-[2]" style={{ color: resolvedColor }} />
                    </div>
                    <div>
                      <span
                        className="inline-flex items-center gap-1.5 text-[11px] font-extrabold px-3 py-1 rounded-full border mb-1.5"
                        style={{
                          backgroundColor: service.bgColor,
                          color: resolvedColor,
                          borderColor: `${resolvedColor}30`,
                        }}
                      >
                        Service {service.badgeText}
                      </span>
                      <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#2A285F] leading-tight">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  {/* Tagline */}
                  <p
                    className="font-display font-extrabold text-lg sm:text-xl leading-snug mb-3"
                    style={{ color: resolvedColor }}
                  >
                    {details.tagline}
                  </p>

                  {/* Long Description */}
                  <p className="text-[#667085] font-medium text-sm sm:text-base leading-relaxed max-w-2xl">
                    {details.longDesc}
                  </p>
                </div>


                {/* ─── Features Grid ──────────────────────────────────── */}
                <div className="px-8 sm:px-10 pb-6">
                  <h3 className="font-display font-extrabold text-lg text-[#2A285F] mb-5">
                    What's Included
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {details.features.map((feat, i) => {
                      const FeatIcon = feat.icon;
                      return (
                        <motion.div
                          key={feat.title}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                          className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg hover:border-slate-200 transition-all duration-300 hover:-translate-y-0.5"
                        >
                          <div className="flex items-start gap-3.5">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                              style={{ backgroundColor: service.bgColor }}
                            >
                              <FeatIcon
                                className="w-5 h-5 stroke-[2.5]"
                                style={{ color: resolvedColor }}
                              />
                            </div>
                            <div>
                              <h4 className="font-display font-extrabold text-sm text-[#2A285F] mb-1">
                                {feat.title}
                              </h4>
                              <p className="text-[#667085] font-medium text-xs sm:text-sm leading-relaxed">
                                {feat.desc}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* ─── Tech Stack ──────────────────────────────────────── */}
                <div className="px-8 sm:px-10 pb-6">
                  <h3 className="font-display font-extrabold text-lg text-[#2A285F] mb-4">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {details.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs border transition-all duration-200 hover:scale-105 cursor-default"
                        style={{
                          backgroundColor: service.bgColor,
                          color: resolvedColor,
                          borderColor: `${resolvedColor}30`,
                        }}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ─── Footer CTA ─────────────────────────────────────── */}
                <div className="px-8 sm:px-10 pb-8 sm:pb-10 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-[#667085] font-medium text-sm text-center sm:text-left">
                    Ready to get started? Let's discuss your project.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onContactClick?.();
                    }}
                    className="inline-flex items-center gap-2.5 bg-[#FF8706] hover:bg-[#E07200] text-white font-bold text-sm px-7 py-3.5 rounded-2xl shadow-lg shadow-[#FF8706]/25 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] active:scale-[0.97] cursor-pointer shrink-0"
                  >
                    <span>Start a Project</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
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

// ─── 3D Floating Cube Signature Illustration Component ──────────────────────
const Services3DCubeIllustration: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const cubeRef = React.useRef<HTMLDivElement>(null);

  // High-performance rotation & interaction refs (prevents 60-120fps React re-renders)
  const rotXRef = React.useRef(20);
  const rotYRef = React.useRef(30);
  const targetRotXRef = React.useRef(20);
  const targetRotYRef = React.useRef(30);

  const isHoveredRef = React.useRef(false);
  const isDraggingRef = React.useRef(false);
  const isVisibleRef = React.useRef(false);

  const pointerStartRef = React.useRef<{ x: number; y: number; startRotX: number; startRotY: number }>({
    x: 0,
    y: 0,
    startRotX: 20,
    startRotY: 30,
  });

  // Direct DOM style transform updater (zero React re-renders for buttery smooth performance)
  const updateCubeTransform = () => {
    if (cubeRef.current) {
      cubeRef.current.style.transform = `rotateX(${rotXRef.current}deg) rotateY(${rotYRef.current}deg)`;
    }
  };

  // Setup Viewport IntersectionObserver and GPU-optimized animation loop
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    let animationFrameId: number;
    let lastTime = performance.now();

    const animateSpin = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Only perform transform calculations when element is visible in viewport
      if (isVisibleRef.current) {
        if (!isHoveredRef.current && !isDraggingRef.current) {
          rotYRef.current = (rotYRef.current + delta * 20) % 360;
          rotXRef.current += (targetRotXRef.current - rotXRef.current) * 0.05;
        } else if (!isDraggingRef.current) {
          // Smooth interpolation when hovering
          rotXRef.current += (targetRotXRef.current - rotXRef.current) * 0.08;
          rotYRef.current += (targetRotYRef.current - rotYRef.current) * 0.08;
        }
        updateCubeTransform();
      }

      animationFrameId = requestAnimationFrame(animateSpin);
    };

    animationFrameId = requestAnimationFrame(animateSpin);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Mouse move handler for hover tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);

    targetRotXRef.current = 20 - normY * 35;
    targetRotYRef.current = rotYRef.current + normX * 1.5;
  };

  // Drag interaction handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    pointerStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startRotX: rotXRef.current,
      startRotY: rotYRef.current,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - pointerStartRef.current.x;
    const dy = e.clientY - pointerStartRef.current.y;

    rotYRef.current = pointerStartRef.current.startRotY + dx * 0.75;
    rotXRef.current = Math.max(-80, Math.min(80, pointerStartRef.current.startRotX - dy * 0.75));
    updateCubeTransform();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    targetRotXRef.current = 20;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        targetRotXRef.current = 20;
      }}
      className="relative w-full max-w-[480px] lg:max-w-none h-[400px] sm:h-[420px] mx-auto flex items-center justify-center select-none px-2"
    >
      {/* Background Ambient Radial Glow Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(255,135,6,0.15)_0%,rgba(20,184,176,0.1)_50%,transparent_70%)] rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-[#14B8B0]/20 rounded-full animate-ping opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[85vw] max-w-[384px] max-h-[384px] border border-[#FF8706]/15 rounded-full pointer-events-none">
        {/* Small Glowing Floating Particles Symmetrically Placed Exactly On The Circular Ring */}
        <span className="absolute top-[14.6%] left-[14.6%] -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FF8706] animate-ping opacity-75" />
        <span className="absolute top-[14.6%] left-[14.6%] -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FF8706]" />

        <span className="absolute top-[85.4%] left-[85.4%] -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#14B8B0] animate-pulse" />

        <span className="absolute top-[14.6%] left-[85.4%] -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse" />

        <span className="absolute top-[85.4%] left-[14.6%] -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FF8706] animate-ping opacity-60" />
        <span className="absolute top-[85.4%] left-[14.6%] -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FF8706]" />
      </div>

      {/* Interactive Cursor Indicator Badge */}
      <div className="absolute bottom-1 z-40 bg-slate-900/95 backdrop-blur-sm text-white/90 border border-white/10 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-extrabold tracking-wide shadow-lg flex items-center gap-2 pointer-events-none">
        <Sparkles className="w-3.5 h-3.5 text-[#FF8706] animate-pulse" />
        <span>Move cursor or drag to spin 3D Cube</span>
      </div>

      {/* Orbiting Service Satellite Cards (6 Icons Around Cube - Layered ON TOP with z-30) */}
      {/* 1. API */}
      <motion.div
        className="absolute top-2 sm:top-6 left-1 sm:left-6 z-30 bg-white/95 border border-slate-200/90 shadow-lg px-2 sm:px-3.5 py-1 sm:py-2 rounded-2xl flex items-center gap-1.5 sm:gap-2 pointer-events-none"
        animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-xl bg-[#FFEFE5] flex items-center justify-center text-[#FF8706]">
          <Code2 className="w-3 h-3 sm:w-4 sm:h-4" />
        </div>
        <span className="font-display font-extrabold text-[10px] sm:text-xs text-[#0D152A]">API</span>
      </motion.div>

      {/* 2. Database */}
      <motion.div
        className="absolute top-2 sm:top-12 right-1 sm:right-6 z-30 bg-white/95 border border-slate-200/90 shadow-lg px-2 sm:px-3.5 py-1 sm:py-2 rounded-2xl flex items-center gap-1.5 sm:gap-2 pointer-events-none"
        animate={{ y: [0, 8, 0], x: [0, -4, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      >
        <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-xl bg-[#E6F8F9] flex items-center justify-center text-[#14B8B0]">
          <Database className="w-3 h-3 sm:w-4 sm:h-4" />
        </div>
        <span className="font-display font-extrabold text-[10px] sm:text-xs text-[#0D152A]">Database</span>
      </motion.div>

      {/* 3. Mobile */}
      <motion.div
        className="absolute bottom-10 sm:bottom-12 right-1 sm:right-6 z-30 bg-white/95 border border-slate-200/90 shadow-lg px-2 sm:px-3.5 py-1 sm:py-2 rounded-2xl flex items-center gap-1.5 sm:gap-2 pointer-events-none"
        animate={{ y: [0, -7, 0], x: [0, -5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      >
        <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-xl bg-[#FFEFE5] flex items-center justify-center text-[#FF8706]">
          <Smartphone className="w-3 h-3 sm:w-4 sm:h-4" />
        </div>
        <span className="font-display font-extrabold text-[10px] sm:text-xs text-[#0D152A]">Mobile</span>
      </motion.div>

      {/* 4. Cloud */}
      <motion.div
        className="absolute bottom-10 sm:bottom-8 left-1 sm:left-6 z-30 bg-white/95 border border-slate-200/90 shadow-lg px-2 sm:px-3.5 py-1 sm:py-2 rounded-2xl flex items-center gap-1.5 sm:gap-2 pointer-events-none"
        animate={{ y: [0, 7, 0], x: [0, 5, 0] }}
        transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      >
        <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-xl bg-[#E6F8F9] flex items-center justify-center text-[#14B8B0]">
          <Cloud className="w-3 h-3 sm:w-4 sm:h-4" />
        </div>
        <span className="font-display font-extrabold text-[10px] sm:text-xs text-[#0D152A]">Cloud</span>
      </motion.div>

      {/* 5. AI */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 right-[-24px] min-[360px]:right-[-16px] min-[400px]:right-[-6px] min-[480px]:right-0 sm:right-2 z-30 bg-white/95 border border-slate-200/90 shadow-lg px-2 sm:px-3.5 py-1 sm:py-2 rounded-2xl flex items-center gap-1.5 sm:gap-2 pointer-events-none"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      >
        <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-xl bg-[#F0ECFF] flex items-center justify-center text-[#7C3AED]">
          <Bot className="w-3 h-3 sm:w-4 sm:h-4" />
        </div>
        <span className="font-display font-extrabold text-[10px] sm:text-xs text-[#0D152A]">AI</span>
      </motion.div>

      {/* 6. Design */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 left-[-24px] min-[360px]:left-[-16px] min-[400px]:left-[-6px] min-[480px]:left-0 sm:left-2 z-30 bg-white/95 border border-slate-200/90 shadow-lg px-2 sm:px-3.5 py-1 sm:py-2 rounded-2xl flex items-center gap-1.5 sm:gap-2 pointer-events-none"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 1.0 }}
      >
        <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-xl bg-[#FFF0F5] flex items-center justify-center text-[#FF0055]">
          <Palette className="w-3 h-3 sm:w-4 sm:h-4" />
        </div>
        <span className="font-display font-extrabold text-[10px] sm:text-xs text-[#0D152A]">Design</span>
      </motion.div>


      {/* ─── 3D PERSPECTIVE STAGE WITH CURSOR DRAG & MOVE INTERACTION ───────────────────────────────────── */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="perspective-[1000px] w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center cursor-grab active:cursor-grabbing z-10 scale-[0.76] min-[360px]:scale-[0.82] min-[400px]:scale-[0.88] sm:scale-100 transition-transform duration-300"
      >
        {/* 3D INTERACTIVE ROTATING CUBE CONTAINER */}
        <div
          ref={cubeRef}
          className="relative w-40 h-40 sm:w-44 sm:h-44 [transform-style:preserve-3d] will-change-transform transition-transform duration-75 ease-out"
          style={{ transform: 'rotateX(20deg) rotateY(30deg)' }}
        >
          {/* CUBE FACE 1: FRONT (WEB) */}
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#0D152A] via-[#142347] to-[#0A1224] border-2 border-[#14B8B0]/80 shadow-[0_0_20px_rgba(20,184,176,0.25)] flex flex-col items-center justify-center p-4 text-white [backface-visibility:hidden]"
            style={{ transform: 'translateZ(88px)' }}
          >
            <div className="w-11 h-11 rounded-2xl bg-[#14B8B0]/20 border border-[#14B8B0]/50 flex items-center justify-center mb-2 shadow-inner">
              <Globe className="w-6 h-6 text-[#14B8B0]" />
            </div>
            <span className="font-display font-black text-base tracking-wider text-white">WEB</span>
            <span className="text-[10px] font-bold text-[#14B8B0] uppercase tracking-widest mt-0.5">Development</span>
          </div>

          {/* CUBE FACE 2: BACK (DESIGN) */}
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#0D152A] via-[#241432] to-[#0A1224] border-2 border-[#FF0055]/80 shadow-[0_0_20px_rgba(255,0,85,0.25)] flex flex-col items-center justify-center p-4 text-white [backface-visibility:hidden]"
            style={{ transform: 'rotateY(180deg) translateZ(88px)' }}
          >
            <div className="w-11 h-11 rounded-2xl bg-[#FF0055]/20 border border-[#FF0055]/50 flex items-center justify-center mb-2 shadow-inner">
              <Palette className="w-6 h-6 text-[#FF0055]" />
            </div>
            <span className="font-display font-black text-base tracking-wider text-white">DESIGN</span>
            <span className="text-[10px] font-bold text-[#FF0055] uppercase tracking-widest mt-0.5">UI/UX</span>
          </div>

          {/* CUBE FACE 3: RIGHT (MOBILE) */}
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#0D152A] via-[#1D1438] to-[#0A1224] border-2 border-[#7C3AED]/80 shadow-[0_0_20px_rgba(124,58,237,0.25)] flex flex-col items-center justify-center p-4 text-white [backface-visibility:hidden]"
            style={{ transform: 'rotateY(90deg) translateZ(88px)' }}
          >
            <div className="w-11 h-11 rounded-2xl bg-[#7C3AED]/20 border border-[#7C3AED]/50 flex items-center justify-center mb-2 shadow-inner">
              <Smartphone className="w-6 h-6 text-[#7C3AED]" />
            </div>
            <span className="font-display font-black text-base tracking-wider text-white">MOBILE</span>
            <span className="text-[10px] font-bold text-[#7C3AED] uppercase tracking-widest mt-0.5">Apps</span>
          </div>

          {/* CUBE FACE 4: LEFT (CLOUD) */}
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#0D152A] via-[#122A3A] to-[#0A1224] border-2 border-[#00E5FF]/80 shadow-[0_0_20px_rgba(0,229,255,0.25)] flex flex-col items-center justify-center p-4 text-white [backface-visibility:hidden]"
            style={{ transform: 'rotateY(-90deg) translateZ(88px)' }}
          >
            <div className="w-11 h-11 rounded-2xl bg-[#00E5FF]/20 border border-[#00E5FF]/50 flex items-center justify-center mb-2 shadow-inner">
              <Cloud className="w-6 h-6 text-[#00E5FF]" />
            </div>
            <span className="font-display font-black text-base tracking-wider text-white">CLOUD</span>
            <span className="text-[10px] font-bold text-[#00E5FF] uppercase tracking-widest mt-0.5">DevOps</span>
          </div>

          {/* CUBE FACE 5: TOP (AI) */}
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#0D152A] via-[#331E0F] to-[#0A1224] border-2 border-[#FF8706]/90 shadow-[0_0_25px_rgba(255,135,6,0.3)] flex flex-col items-center justify-center p-4 text-white [backface-visibility:hidden]"
            style={{ transform: 'rotateX(90deg) translateZ(88px)' }}
          >
            <div className="w-11 h-11 rounded-2xl bg-[#FF8706]/20 border border-[#FF8706]/50 flex items-center justify-center mb-2 shadow-inner">
              <Cpu className="w-6 h-6 text-[#FF8706]" />
            </div>
            <span className="font-display font-black text-base tracking-wider text-white">AI</span>
            <span className="text-[10px] font-bold text-[#FF8706] uppercase tracking-widest mt-0.5">Automation</span>
          </div>

          {/* CUBE FACE 6: BOTTOM (CUSTOM) */}
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#0D152A] via-[#1B2A4A] to-[#0A1224] border-2 border-[#FFBD2E]/80 shadow-[0_0_20px_rgba(255,189,46,0.25)] flex flex-col items-center justify-center p-4 text-white [backface-visibility:hidden]"
            style={{ transform: 'rotateX(-90deg) translateZ(88px)' }}
          >
            <div className="w-11 h-11 rounded-2xl bg-[#FFBD2E]/20 border border-[#FFBD2E]/50 flex items-center justify-center mb-2 shadow-inner">
              <Code2 className="w-6 h-6 text-[#FFBD2E]" />
            </div>
            <span className="font-display font-black text-base tracking-wider text-white">CUSTOM</span>
            <span className="text-[10px] font-bold text-[#FFBD2E] uppercase tracking-widest mt-0.5">Software</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main ServicesSection Component ──────────────────────────────────────
export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onServiceClick,
  onContactClick,
}) => {
  const [activeService, setActiveService] = useState<(typeof servicesData)[0] | null>(null);
  const navigate = useNavigate();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeService]);

  return (
    <section id="services" className="w-full bg-white py-24 sm:py-32 px-4 sm:px-6 lg:px-10 font-sans overflow-hidden border-t border-slate-100">
      <div className="max-w-[1400px] mx-auto">
        
        {/* SECTION HEADER WITH 3D CUBE SIGNATURE ILLUSTRATION ON RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center mb-16 sm:mb-24">
          
          {/* Left Column: Text & Headings (6 cols) */}
          <motion.div
            className="lg:col-span-6 flex flex-col items-start text-left pl-4 sm:pl-6 lg:pl-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          >
            {/* Top Label */}
            <div className="flex flex-col items-start gap-1.5 mb-4">
              <span className="text-[#14B8B0] font-extrabold text-xs sm:text-sm uppercase tracking-[0.2em]">
                OUR SERVICES
              </span>
              <span className="h-[2.5px] w-10 bg-[#14B8B0] rounded-full inline-block" />
            </div>

            {/* Large Bold Headline */}
            <motion.h2 
              className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[46px] text-[#2A285F] leading-[1.14] tracking-tight mb-6"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Solutions we build <br />
              to move your business <span className="text-[#FF8706]">forward.</span>
            </motion.h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#475569] max-w-[540px] leading-relaxed font-normal mb-8">
              We combine technology, creativity, and strategy to build scalable digital solutions that create real business impact.
            </p>

            {/* Quick Feature Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 bg-[#FFEFE5] text-[#FF8706] font-bold text-xs px-3.5 py-2 rounded-full border border-[#FF8706]/20">
                <CheckCircle2 className="w-4 h-4" />
                <span>Custom Architecture</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-[#E6F8F9] text-[#14B8B0] font-bold text-xs px-3.5 py-2 rounded-full border border-[#14B8B0]/20">
                <CheckCircle2 className="w-4 h-4" />
                <span>24/7 Reliability</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-[#F0ECFF] text-[#7C3AED] font-bold text-xs px-3.5 py-2 rounded-full border border-[#7C3AED]/20">
                <CheckCircle2 className="w-4 h-4" />
                <span>End-to-End Scale</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Floating Cube Signature Illustration (6 cols) */}
          <div className="lg:col-span-6 w-full">
            <Services3DCubeIllustration />
          </div>

        </div>

        {/* SERVICES GRID (3-column × 2-row layout) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 sm:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          {servicesData.slice(0, 6).map((service) => {
            const ServiceIcon = service.icon;
            return (
              <motion.div
                key={service.title}
                className="group relative bg-white rounded-[24px] border border-[#ECECEC] p-8 sm:p-9 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] hover:border-[#FF8706]/40 transition-shadow duration-300 flex flex-col justify-between h-full cursor-pointer overflow-hidden"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } },
                }}
                whileHover={{ y: -8, scale: 1.015, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              >
                <div>
                  {/* Top Bar: Icon Badge on Left, Numbered Badge on Right */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-14 h-14 rounded-[18px] flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: service.bgColor }}
                    >
                      <ServiceIcon className="w-7 h-7 stroke-[2]" style={{ color: service.accentColor === '#53E5E7' ? '#14B8B0' : service.accentColor }} />
                    </div>

                    <span className="font-display font-extrabold text-sm tracking-wider text-slate-400 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full">
                      {service.badgeText}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#2A285F] mb-3 group-hover:text-[#FF8706] transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#667085] font-medium text-sm sm:text-base leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>

                {/* Bottom Row: Illustration & Learn More Link */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-auto">
                  {/* Small Orange Learn More Link */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveService(service);
                    }}
                    className="inline-flex items-center gap-2 font-bold text-sm text-[#FF8706] group-hover:translate-x-1 transition-transform duration-300 -mt-1 cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </div>

                  {/* Custom Illustration Graphic */}
                  <div className="shrink-0 opacity-90 group-hover:opacity-100 transition-opacity">
                    {service.illustration}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* VIEW MORE SERVICES BUTTON */}
        <motion.div
          className="flex justify-center -mt-10 mb-20 sm:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.button
            onClick={() => navigate('/services')}
            whileHover={{ y: -3, scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-3 bg-[#FF8706] hover:bg-[#E07200] text-white font-bold text-base px-8 py-4 rounded-2xl shadow-lg shadow-[#FF8706]/25 cursor-pointer shadow-md"
          >
            <span>View More</span>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
            </div>
          </motion.button>
        </motion.div>

      </div>

      {/* BOTTOM VALUE STRIP (Mobile 2-in-1 Layout, Desktop 4-in-1 Layout with Divider Lines) */}
      <div className="max-w-[1560px] mx-auto px-3 sm:px-6 lg:px-10">
        <motion.div
          className="w-full lg:bg-white lg:rounded-[28px] lg:border lg:border-slate-300 lg:shadow-[0_20px_50px_rgba(0,0,0,0.04)] lg:hover:shadow-[0_25px_65px_rgba(0,0,0,0.07)] transition-all duration-400 lg:overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x lg:divide-slate-300">
            {valueItems.map((item) => {
              const ValueIcon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white border border-slate-200/85 rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.015)] p-4 sm:p-7 lg:p-10 lg:bg-transparent lg:border-none lg:rounded-none lg:shadow-none flex flex-col items-start"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3.5 mb-2.5 sm:mb-4">
                    <div
                      className="w-10 h-10 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xs shrink-0"
                      style={{ backgroundColor: item.bgColor }}
                    >
                      <ValueIcon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" style={{ color: item.iconColor }} />
                    </div>
                    <span className="font-display font-black text-[11px] sm:text-xs tracking-wider text-[#FF8706]">
                      {item.num}
                    </span>
                  </div>

                  <h4 className="font-display font-extrabold text-sm sm:text-xl text-[#2A285F] mb-1 sm:mb-2">
                    {item.title}
                  </h4>
                  <p className="text-[#667085] font-medium text-xs sm:text-base leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* SERVICE DETAIL MODAL */}
      <ServiceDetailModal
        service={activeService}
        onClose={() => setActiveService(null)}
        onContactClick={onContactClick}
      />
    </section>
  );
};
