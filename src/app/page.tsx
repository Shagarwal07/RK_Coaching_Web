'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  Compass,
  CheckCircle,
  Zap,
  Phone,
  Mail,
  MapPin,
  Youtube,
  Instagram,
  User,
  Trophy,
  GraduationCap,
  Calendar,
  Flame,
  Menu,
  X,
  Heart,
  Star,
  Bot,
  ChevronDown,
  Send,
  Loader2,
  ExternalLink,
  Laptop,
  HelpCircle,
  FileText,
  MessageSquare,
  ShoppingBag,
  Tag,
  Percent
} from 'lucide-react';

import { Topper, batchResultsData } from '@/data/batchResults';
import { MEMORIES_DATA, TESTIMONIALS_DATA, INSTITUTE_CONTACT, FAQS_DATA, getAcademicSession } from '@/data/landingData';
import { WhyChooseWheel } from '@/components/WhyChooseWheel';
import { EnrollModal } from '@/components/EnrollModal';
import { LearnStudioLogo } from '@/components/LearnStudioLogo';
import { LandscapeResultFrame } from '@/components/LandscapeResultFrame';
import { AchieverCard } from '@/components/AchieverCard';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

const fadeUp: any = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const GlowingSectionDivider = () => (
  <div className="relative w-full h-px flex items-center justify-center pointer-events-none select-none">
    {/* Soft diffused glow */}
    <div className="absolute w-full max-w-6xl h-3 bg-gradient-to-r from-transparent via-indigo-500/35 via-blue-500/30 to-transparent blur-sm" />

    {/* Luminous beam line matching the reference */}
    <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500/80 via-blue-400/75 to-transparent blur-[1px]" />

    {/* Crisp laser core line */}
    <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-300 via-blue-100 to-transparent opacity-90" />

    {/* Center high-intensity laser spark */}
    <div className="absolute w-1/3 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent blur-[0.5px]" />
  </div>
);

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.02 }
  }
};

function TopperCard({ topper, year }: { topper: Topper; year: string }) {
  const availableMarks: { label: string; value: string }[] = [];
  if (topper.englishMarks && topper.englishMarks !== 'N/A') availableMarks.push({ label: 'English', value: topper.englishMarks });
  if (topper.scienceMarks && topper.scienceMarks !== 'N/A') availableMarks.push({ label: 'Science', value: topper.scienceMarks });
  if (topper.mathMarks && topper.mathMarks !== 'N/A') availableMarks.push({ label: 'Maths', value: topper.mathMarks });

  return (
    <AchieverCard
      photo={topper.image}
      name={topper.name}
      rank={topper.rankText}
      boardScore={topper.score}
      subjects={availableMarks}
      year={year}
      className="w-[78vw] max-w-[280px] sm:w-auto sm:max-w-none shrink-0 snap-center"
    />
  );
}

function MemoryCard({ defaultText, angle, imageSrc }: { defaultText: string; angle: string; imageSrc: string }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.05, zIndex: 30, rotate: "0deg" }}
      className="bg-slate-900/90 text-slate-100 p-3 pb-6 rounded-2xl border border-slate-800 shadow-2xl flex flex-col gap-3 w-44 sm:w-52 shrink-0 select-none cursor-pointer transition-transform duration-200"
      style={{ transform: `rotate(${angle})` }}
    >
      <div className="relative aspect-[4/3] w-full bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
        {!imgError ? (
          <Image
            src={imageSrc}
            alt={defaultText}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            style={{ objectFit: 'cover' }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500 text-xs font-medium">
            Memory Photo
          </div>
        )}
      </div>
      <span className="font-mono text-xs text-center text-slate-400 truncate block">
        {defaultText}
      </span>
    </motion.div>
  );
}

export default function Home() {
  const [selectedBatch, setSelectedBatch] = useState<string>('2025-26');
  const [scrolled, setScrolled] = useState(false);
  const [navHovered, setNavHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeBatch = batchResultsData[selectedBatch];
  const showExpandedNav = !scrolled || navHovered;
  const academicSession = useMemo(() => getAcademicSession(), []);
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const reduce = useReducedMotion();

  // Products Swipe Scroll Tracking
  const productsRef = useRef<HTMLDivElement>(null);
  const [productIdx, setProductIdx] = useState(0);
  const onProductsScroll = () => {
    const el = productsRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (el && card) setProductIdx(Math.round(el.scrollLeft / (card.offsetWidth + 14)));
  };

  const [aiTestInput, setAiTestInput] = useState('');
  const [aiTestResponse, setAiTestResponse] = useState<string | null>(null);
  const [aiTestLoading, setAiTestLoading] = useState(false);

  // Offline Enrollment & Requirements Modal State
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isRequirementsModalOpen, setIsRequirementsModalOpen] = useState(false);
  const [isBookDepotComingSoonOpen, setIsBookDepotComingSoonOpen] = useState(false);

  // FAQ Accordion State (first item open by default, wrap to 2 on mobile)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const handleAiTest = (sampleQ?: string) => {
    const question = sampleQ || aiTestInput;
    if (!question.trim()) return;
    setAiTestInput(question);
    setAiTestLoading(true);
    setAiTestResponse(null);

    setTimeout(() => {
      if (question.toLowerCase().includes('pythagoras') || question.toLowerCase().includes('triangle')) {
        setAiTestResponse("In a right-angled triangle, the square of the hypotenuse is equal to the sum of squares of the other two sides (a² + b² = c²).");
      } else if (question.toLowerCase().includes('ohm') || question.toLowerCase().includes('current') || question.toLowerCase().includes('voltage')) {
        setAiTestResponse("Ohm's Law states that current through a conductor between two points is directly proportional to the voltage across the two points (V = IR).");
      } else {
        setAiTestResponse(`Great question! Our Charlie AI analyses concepts step-by-step to help you master "${question}"! Experience complete AI learning inside LearnStudio 2.0.`);
      }
      setAiTestLoading(false);
    }, 700);
  };

  useEffect(() => {
    let ticking = false;
    let lastScrolled = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isOver = window.scrollY > 25;
          if (isOver !== lastScrolled) {
            lastScrolled = isOver;
            setScrolled(isOver);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      
      {/* Subtle Dark Grid Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none z-0" />

      {/* Ambient Radial Glows (Hidden on mobile to save GPU rasterization) */}
      <div className="hidden md:block absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[60px] md:blur-[120px] pointer-events-none z-0" />
      <div className="hidden md:block absolute top-1/3 right-10 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[60px] md:blur-[130px] pointer-events-none z-0" />

      {/* DYNAMIC ISLAND NAVBAR */}
      <motion.div 
        layout
        className="fixed left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none"
        animate={{
          top: scrolled ? "12px" : "20px",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
      >
        <motion.header 
          layout
          onMouseEnter={() => setNavHovered(true)}
          onMouseLeave={() => setNavHovered(false)}
          transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.9 }}
          className={`pointer-events-auto rounded-full flex items-center justify-between transition-all duration-500 overflow-hidden ${
            showExpandedNav
              ? 'w-full max-w-5xl h-14 sm:h-[64px] px-5 sm:px-8 bg-[#0F172A]/80 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(37,99,235,0.18)] ring-1 ring-indigo-500/25'
              : 'w-auto max-w-fit h-11 sm:h-[50px] px-4 sm:px-6 bg-[#0F172A]/95 backdrop-blur-2xl border border-indigo-500/50 shadow-[0_10px_35px_rgba(124,58,235,0.25)] ring-2 ring-indigo-500/30 hover:border-indigo-400 cursor-pointer'
          }`}
        >
          {/* Brand Logo & Title */}
          <a href="#home" onClick={() => setNavHovered(true)} className="flex items-center gap-2 sm:gap-2.5 group shrink-0 select-none">
            <motion.div 
              layout
              className="relative w-7 h-7 sm:w-[34px] sm:h-[34px] rounded-full overflow-hidden border border-slate-700/80 shrink-0 group-hover:scale-105 transition-transform shadow-inner"
              animate={{
                width: showExpandedNav ? 34 : 28,
                height: showExpandedNav ? 34 : 28,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              <Image src="/images/logo.webp" alt="R.K Coaching Logo" fill sizes="36px" priority style={{ objectFit: 'cover' }} />
            </motion.div>

            <motion.div layout className="flex items-center">
              <span className="font-extrabold text-xs sm:text-sm tracking-tight text-white group-hover:text-indigo-400 transition-colors whitespace-nowrap">
                R.K Coaching Classes
              </span>
              <AnimatePresence mode="wait">
                {showExpandedNav ? (
                  <motion.span 
                    key="balotra-badge"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="text-[9px] text-indigo-400 font-bold uppercase tracking-widest leading-none hidden sm:inline ml-1 whitespace-nowrap"
                  >
                    Balotra
                  </motion.span>
                ) : (
                  <motion.div
                    key="collapsed-pulse"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="flex items-center gap-1.5 ml-1 pl-2 border-l border-indigo-500/30 text-indigo-400 font-bold text-[10px] uppercase tracking-wider select-none"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="hidden sm:inline text-[10px] text-slate-400 font-medium">Menu</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </a>

          {/* Desktop Navigation Links */}
          <AnimatePresence>
            {showExpandedNav && (
              <motion.nav 
                initial={{ opacity: 0, width: 0, scale: 0.95, filter: "blur(4px)" }}
                animate={{ opacity: 1, width: "auto", scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, width: 0, scale: 0.95, filter: "blur(4px)" }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="hidden md:flex items-center gap-1 text-xs font-semibold text-slate-300 overflow-hidden shrink-0 ml-4 lg:ml-6"
              >
                {[
                  { label: 'Results', href: '#results' },
                  { label: 'Why RK', href: '#why-choose' },
                  { label: 'Products', href: '#products' },
                  { label: 'How to Apply', href: '#how-to-apply' },
                  { label: 'Contact', href: '#contact' },
                ].map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    className="px-3.5 py-1.5 rounded-full border border-transparent hover:border-indigo-500/40 hover:bg-indigo-500/15 hover:text-white hover:shadow-sm hover:shadow-indigo-500/15 transition-all duration-200 whitespace-nowrap"
                  >
                    {link.label}
                  </a>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>

          {/* Desktop Action Buttons */}
          <AnimatePresence>
            {showExpandedNav && (
              <motion.div 
                initial={{ opacity: 0, width: 0, scale: 0.9, filter: "blur(4px)" }}
                animate={{ opacity: 1, width: "auto", scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, width: 0, scale: 0.9, filter: "blur(4px)" }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="hidden md:flex items-center gap-2 shrink-0 py-1 ml-2 lg:ml-3"
              >
                <button
                  type="button"
                  onClick={() => setIsEnrollModalOpen(true)}
                  className="group relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 hover:from-violet-500 hover:via-fuchsia-500 hover:to-indigo-500 text-white font-extrabold text-xs rounded-full shadow-[0_0_20px_rgba(168,85,247,0.45)] hover:shadow-[0_0_30px_rgba(217,70,239,0.7)] border border-white/30 transition-all duration-300 hover:scale-[1.04] active:scale-95 cursor-pointer overflow-hidden select-none"
                >
                  {/* Radiant Shimmer Light Beam */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer pointer-events-none"
                  />

                  {/* Pulsing Admissions Beacon Dot */}
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  </span>

                  {/* Main Catchy Copy */}
                  <span className="relative tracking-wide font-black">Enroll for Batch</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Hamburger */}
          <button
            onClick={() => {
              if (!showExpandedNav) setNavHovered(true);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="block md:hidden p-2 ml-2 text-slate-300 hover:text-white focus:outline-none rounded-full hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.header>
      </motion.div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 bg-slate-900/95 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-2xl p-6 md:hidden z-40 flex flex-col gap-4 text-sm font-semibold"
          >
            <a href="#results" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-1">Results</a>
            <a href="#why-choose" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-1">Why RK</a>
            <a href="#products" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-1">Products</a>
            <a href="#how-to-apply" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-1">How to Apply</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-1">Contact</a>
            
            <div className="border-t border-slate-800 pt-4 flex flex-col gap-2.5">
              <button 
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsEnrollModalOpen(true);
                }} 
                className="w-full py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white text-center rounded-xl font-bold text-xs cursor-pointer"
              >
                Enroll for Offline Batch
              </button>
              <a 
                href="https://api.whatsapp.com/send?phone=919414668795" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)} 
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-center rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>WhatsApp Admissions</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        
        {/* HERO BANNER */}
        <section id="home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative w-full rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-slate-900/95 via-indigo-950/40 to-slate-900/90 border border-slate-800/80 px-5 py-8 sm:p-10 lg:p-14 shadow-2xl overflow-hidden backdrop-blur-xl group hover:border-slate-700/80 transition-all duration-300"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/15 rounded-full blur-[60px] md:blur-[100px] pointer-events-none overflow-hidden" />
            <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-purple-500/15 rounded-full blur-[60px] md:blur-[100px] pointer-events-none overflow-hidden" />
            <div className="absolute inset-0 bg-[radial-gradient(#475569_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none rounded-[28px] sm:rounded-[36px] overflow-hidden" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-6">
              
              {/* Left Content Area */}
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex-1 w-full space-y-5 text-center lg:text-left max-w-2xl"
              >
                <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 rounded-full text-xs font-bold tracking-wide shadow-inner">
                  <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>Confused to Confident in CBSE & RBSE Mastery</span>
                </motion.div>

                {/* Instant Social Trust Ribbon */}
                <motion.div variants={fadeUp} className="flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3 bg-slate-950/80 backdrop-blur-md border border-slate-800/80 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full w-fit mx-auto lg:mx-0 shadow-lg">
                  <div className="flex -space-x-2 overflow-hidden shrink-0">
                    <Image
                      src="/images/STUDENT_PNG/Purva.webp"
                      alt="Purva Gehlot - Class Topper RK Coaching Balotra"
                      width={24}
                      height={24}
                      priority
                      className="w-6 h-6 rounded-full object-cover border-2 border-slate-900"
                    />
                    <Image
                      src="/images/STUDENT_PNG/GunjanSalecha.webp"
                      alt="Gunjan Salecha - Class Topper RK Coaching Balotra"
                      width={24}
                      height={24}
                      priority
                      className="w-6 h-6 rounded-full object-cover border-2 border-slate-900"
                    />
                    <Image
                      src="/images/STUDENT_PNG/hardik.webp"
                      alt="Hardik Lunker - Class Topper RK Coaching Balotra"
                      width={24}
                      height={24}
                      priority
                      className="w-6 h-6 rounded-full object-cover border-2 border-slate-900"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs whitespace-nowrap">
                    <div className="flex text-amber-400 shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    </div>
                    <span className="font-bold text-white text-[11px] sm:text-xs">4.9/5 Rating</span>
                    <span className="text-slate-500 hidden sm:inline">•</span>
                    <span className="text-slate-400 text-[11px] hidden sm:inline">Balotra's 15+ Yr Legacy</span>
                  </div>
                </motion.div>

                {/* Animated Dynamic Heading */}
                <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.18]">
                  Balotra's Premier Coaching Classes{' '}
                  <br className="hidden sm:inline" />
                  <span className="text-slate-200">for </span>
                  <span className="whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
                    CBSE &amp; RBSE
                  </span>
                  <br />
                  <span className="text-slate-300 font-extrabold text-2xl sm:text-3xl lg:text-4xl">
                    Specializing in{' '}
                  </span>
                  <span className="whitespace-nowrap text-amber-400 font-black underline decoration-indigo-500/40 decoration-wavy text-2xl sm:text-3xl lg:text-4xl">
                    Maths &amp; Science
                  </span>
                </motion.h1>

                <motion.p variants={fadeUp} className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                  Comprehensive offline classroom coaching across Playgroup to Class 10th for CBSE & RBSE boards, with signature specialization and renowned concept mastery in Mathematics and Science.
                </motion.p>

                {/* Action CTA Buttons */}
                <motion.div variants={fadeUp} className="pt-2 grid grid-cols-2 sm:flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setIsEnrollModalOpen(true)}
                    className="w-full sm:w-auto min-h-[44px] h-12 px-3 sm:px-8 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-[length:200%_auto] hover:bg-right text-white font-bold rounded-xl shadow-lg shadow-indigo-500/35 border border-white/20 transition-all text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 hover:scale-[1.03] active:scale-95 cursor-pointer"
                  >
                    <span>Enroll for Batch</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <a
                    href="#products"
                    className="w-full sm:w-auto min-h-[44px] h-12 px-3 sm:px-8 py-3 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-slate-200 rounded-xl transition-all text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 sm:gap-2"
                  >
                    <Laptop className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400" />
                    <span className="sm:hidden">Digital Apps</span>
                    <span className="hidden sm:inline">Our Digital Apps</span>
                  </a>
                </motion.div>

                {/* Interactive Mini-Widget: Try Charlie AI (Live on Mobile & Desktop) */}
                <motion.div variants={fadeUp} id="charlie-ai-test" className="pt-3 sm:pt-4 max-w-xl mx-auto lg:mx-0 w-full">
                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-950/90 border border-indigo-500/30 shadow-xl relative overflow-hidden">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-extrabold text-indigo-400 flex items-center gap-1.5 text-xs sm:text-sm">
                        <Bot className="w-4 h-4 text-indigo-400" />
                        <span>Try Charlie AI Tutor Live:</span>
                      </span>
                      <span className="text-[10px] sm:text-xs text-emerald-400 font-mono flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Online 24/7
                      </span>
                    </div>
                    <div className="flex gap-2 mb-2.5 overflow-x-auto pb-1 text-[11px] no-scrollbar">
                      <button 
                        type="button"
                        onClick={() => handleAiTest("Explain Pythagoras Theorem")}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-indigo-600/30 border border-slate-800 hover:border-indigo-500/50 rounded-lg text-slate-300 hover:text-white transition-colors whitespace-nowrap cursor-pointer inline-flex items-center gap-1.5 active:scale-95"
                      >
                        <Compass className="w-3 h-3 text-indigo-400" />
                        <span>Pythagoras Theorem</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleAiTest("What is Ohm's Law? (V = IR)")}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-indigo-600/30 border border-slate-800 hover:border-indigo-500/50 rounded-lg text-slate-300 hover:text-white transition-colors whitespace-nowrap cursor-pointer inline-flex items-center gap-1.5 active:scale-95"
                      >
                        <Zap className="w-3 h-3 text-amber-400" />
                        <span>Ohm's Law</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={aiTestInput}
                        onChange={(e) => setAiTestInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAiTest()}
                        placeholder="Ask any concept question right here..."
                        className="flex-1 px-3.5 py-2 sm:py-2.5 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => handleAiTest()}
                        disabled={aiTestLoading}
                        aria-label="Send question"
                        className="p-2 sm:p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 shrink-0 cursor-pointer"
                      >
                        {aiTestLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      </button>
                    </div>
                    {aiTestResponse && (
                      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-3 p-3 bg-indigo-950/60 border border-indigo-500/30 rounded-xl text-xs text-slate-200 text-left leading-relaxed font-normal flex items-start gap-2 shadow-lg">
                        <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <p>{aiTestResponse}</p>
                          <a href="#products" className="inline-block mt-1.5 font-extrabold text-indigo-400 hover:text-indigo-300 underline text-[11px]">
                            Explore Charlie AI on LearnStudio 2.0 ➔
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Visual Area */}
              <div className="hidden lg:flex relative w-full max-w-[420px] h-[400px] items-end justify-center shrink-0 select-none">
                
                {/* Floating Badge 1: Charlie AI */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                  className="absolute -left-4 top-4 bg-slate-900/95 backdrop-blur-md border border-indigo-500/40 rounded-2xl p-3 shadow-2xl flex items-center gap-2.5 z-30 pointer-events-auto hover:scale-105 transition-transform"
                >
                  <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shrink-0">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <h4 className="text-xs font-bold text-white">Charlie AI Mentor</h4>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium">Active 24/7 for Doubts</p>
                  </div>
                </motion.div>

                {/* Floating Badge 2: Math Mastery */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.8 }}
                  className="absolute -right-4 top-[45%] -translate-y-1/2 bg-slate-900/95 backdrop-blur-md border border-purple-500/40 rounded-2xl p-3 shadow-2xl flex items-center gap-2.5 z-30 pointer-events-auto hover:scale-105 transition-transform"
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-md shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-white">10th Board Toppers</h4>
                    <p className="text-[10px] text-emerald-400 font-mono">92%+ Highest Score</p>
                  </div>
                </motion.div>

                {/* Mascot Image */}
                <div className="relative w-full h-full z-20 filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)] flex items-end justify-center">
                  <Image
                    src="/images/Cutouts/charlie-ai.webp"
                    alt="Charlie AI Study Mentor"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: 'contain', objectPosition: 'bottom center' }}
                    loading="lazy"
                  />
                </div>

                <div className="absolute bottom-0 w-3/4 h-5 bg-black/60 blur-md rounded-full pointer-events-none z-10" />
              </div>

            </div>

            {/* Seamless Micro-Stats Strip (Single Line on Mobile & Laptop) */}
            <div className="relative z-10 mt-6 sm:mt-12 pt-5 sm:pt-8 border-t border-slate-800/80 grid grid-cols-4 gap-1 sm:gap-6 text-center">
              {[
                { metric: '93.67%', shortLabel: 'Top Score', label: 'Highest Board Score' },
                { metric: '15+ Years', shortLabel: 'Legacy', label: 'Balotra Track Record' },
                { metric: '100/100', shortLabel: 'Maths & Sci', label: 'Maths & Science Focus' },
                { metric: '15-20', shortLabel: 'Small Batch', label: 'Limited Batch Cohort' }
              ].map((s, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center py-1 sm:py-2 text-center group">
                  <strong className="text-[15px] sm:text-2xl lg:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-300 tracking-tight transition-transform group-hover:scale-105 whitespace-nowrap">
                    {s.metric}
                  </strong>
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-400 mt-0.5 sm:mt-1.5 tracking-wide leading-tight whitespace-nowrap">
                    <span className="sm:hidden">{s.shortLabel}</span>
                    <span className="hidden sm:inline">{s.label}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-60 group-hover:opacity-100 transition-opacity rounded-b-[28px] sm:rounded-b-[36px] overflow-hidden" />
          </motion.div>
        </section>

        {/* TOPPERS BANNER */}
        <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-8 sm:py-14 md:py-20 space-y-8 lg:space-y-12">
          <div className="grid grid-cols-12 gap-3 sm:gap-6 lg:gap-10 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="col-span-7 sm:col-span-7 lg:col-span-7 space-y-2 sm:space-y-4 text-left"
            >
              <motion.span variants={fadeUp} className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider sm:tracking-widest text-purple-400 bg-purple-500/10 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-purple-500/20 inline-block">
                Proven Track Record
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-base sm:text-2xl md:text-3xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Igniting Minds &amp; <br className="hidden sm:inline" />
                Building Strong Fundamentals
              </motion.h2>
              <motion.p variants={fadeUp} className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-xl line-clamp-3 sm:line-clamp-none">
                For more than 15 years, RK Coaching Classes has stood as a hallmark of student success in Balotra. We nurture academic curiosity and analytical skills for CBSE and RBSE students from playgroup up to Grade X, with specialized focus in Mathematics and Science. We teach concepts, not just formulas.
              </motion.p>
              <motion.div variants={fadeUp} className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-1.5 sm:gap-3 w-full sm:w-auto">
                <a href="#enroll" className="w-full sm:w-auto text-center px-3 sm:px-6 py-2 sm:py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg sm:rounded-xl text-[10.5px] sm:text-sm uppercase tracking-wider transition-colors shadow-sm min-h-[38px] sm:min-h-[44px] flex items-center justify-center">
                  Join Batch Today
                </a>
                <a href="#instructors" className="hidden sm:flex w-full sm:w-auto text-center px-6 py-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors min-h-[44px] items-center justify-center">
                  Meet Mentors
                </a>
              </motion.div>
            </motion.div>

            <div className="col-span-5 sm:col-span-5 lg:col-span-5 grid grid-cols-2 gap-1.5 sm:gap-3 items-stretch justify-center relative w-full mx-auto">
              <motion.div whileHover={{ y: -4 }} className="w-full bg-slate-900/80 border border-slate-800 rounded-lg sm:rounded-xl p-1.5 sm:p-2.5 shadow-xl space-y-0.5 sm:space-y-1.5 text-left">
                <div className="relative aspect-[3/4] w-full rounded-md sm:rounded-lg overflow-hidden bg-slate-950">
                  <Image
                    src="/images/STUDENT_PNG/GunjanSalecha.webp"
                    alt="Gunjan Salecha"
                    fill
                    sizes="(max-width: 640px) 25vw, (max-width: 1024px) 30vw, 20vw"
                    loading="lazy"
                    style={{ objectFit: 'cover', objectPosition: '50% 15%' }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-8 sm:h-12 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
                  <div className="absolute top-1 left-1 sm:top-1.5 sm:left-1.5 bg-amber-500 text-[7px] sm:text-[9px] font-black text-slate-950 px-1 sm:px-1.5 py-0.5 rounded-full uppercase shadow">
                    92.0%
                  </div>
                </div>
                <h4 className="text-[10px] sm:text-sm font-bold text-white px-0.5 truncate">Gunjan Salecha</h4>
                <p className="text-[8px] sm:text-[10px] text-indigo-400 font-bold px-0.5 uppercase truncate">1st Rank • 10th</p>
              </motion.div>

              <motion.div whileHover={{ y: -4 }} className="w-full bg-slate-900 border border-indigo-500/40 rounded-lg sm:rounded-xl p-1.5 sm:p-2.5 shadow-xl shadow-indigo-500/10 space-y-0.5 sm:space-y-1.5 text-left sm:-mt-2">
                <div className="relative aspect-[3/4] w-full rounded-md sm:rounded-lg overflow-hidden bg-slate-950">
                  <Image
                    src="/images/STUDENT_PNG/YashviJain.webp"
                    alt="Yashvi Jain"
                    fill
                    sizes="(max-width: 640px) 25vw, (max-width: 1024px) 30vw, 20vw"
                    loading="lazy"
                    style={{ objectFit: 'cover', objectPosition: '50% 15%' }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-8 sm:h-12 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
                  <div className="absolute top-1 left-1 sm:top-1.5 sm:left-1.5 bg-indigo-600 text-[7px] sm:text-[9px] font-black text-white px-1 sm:px-1.5 py-0.5 rounded-full uppercase shadow">
                    90.0%
                  </div>
                </div>
                <div className="flex items-center justify-between px-0.5">
                  <h4 className="text-[10px] sm:text-sm font-extrabold text-white truncate">Yashvi Jain</h4>
                  <Trophy className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-indigo-400 shrink-0" />
                </div>
                <p className="text-[8px] sm:text-[10px] text-emerald-400 font-bold px-0.5 uppercase truncate">2nd Rank • 10th</p>
              </motion.div>
            </div>
          </div>

          {/* CREATIVE CARD-FREE SCHOLARSHIP SHOWCASE */}
          <div className="relative pt-6 sm:pt-8 border-t border-slate-800/80">
            {/* Ambient atmospheric glow aligned with theme */}
            <div className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-2xl md:blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-indigo-500/15 rounded-full blur-2xl md:blur-3xl pointer-events-none" />

            <div className="grid grid-cols-12 gap-3 sm:gap-6 lg:gap-12 items-center relative z-10">
              {/* Left Column: Student Cutout with Glowing Neon Halo (side by side in mobile too) */}
              <div className="col-span-5 sm:col-span-5 lg:col-span-5 flex justify-center items-center relative">
                {/* Concentric Neon Cyan/Indigo Rings */}
                <div className="absolute w-40 sm:w-64 lg:w-84 h-40 sm:h-64 lg:h-84 rounded-full border border-cyan-400/25 shadow-[0_0_35px_rgba(6,182,212,0.25)] pointer-events-none animate-pulse" />
                <div className="absolute w-32 sm:w-52 lg:w-68 h-32 sm:h-52 lg:h-68 rounded-full border border-indigo-400/40 shadow-[0_0_20px_rgba(99,102,241,0.35)] pointer-events-none" />
                
                {/* Student Cutout */}
                <div className="relative w-full max-w-[170px] sm:max-w-[280px] lg:max-w-[360px] h-60 sm:h-88 lg:h-[420px] scale-[1.06] sm:scale-100 origin-bottom z-10">
                  <Image
                    src="/images/Cutouts/scholarship-student-cutout.webp"
                    alt="Class IX Merit Scholarship Student - RK Coaching"
                    fill
                    sizes="(max-width: 640px) 48vw, (max-width: 1024px) 40vw, 33vw"
                    className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
                    loading="lazy"
                  />
                  {/* Subtle fade at the bottom base */}
                  <div className="absolute inset-x-0 bottom-0 h-6 sm:h-8 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />
                </div>

                {/* Floating Emblem Pill */}
                <div className="hidden sm:flex absolute bottom-2 -right-1 sm:bottom-4 sm:right-4 z-20 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-cyan-400/30 text-[9px] sm:text-[10px] font-bold text-cyan-300 shadow-xl items-center gap-1.5 whitespace-nowrap">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>Inspire • Learn • Achieve</span>
                </div>
              </div>

              {/* Right Column: Theme-Aligned Typography & Details */}
              <div className="col-span-7 sm:col-span-7 lg:col-span-7 space-y-2 sm:space-y-4 text-left">
                {/* Eyebrow Pill */}
                <div className="flex items-center justify-start">
                  <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider sm:tracking-widest text-purple-400 bg-purple-500/10 px-2.5 sm:px-3 py-1 rounded-full border border-purple-500/20 inline-flex items-center gap-1 sm:gap-1.5">
                    <GraduationCap className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-purple-400 shrink-0" />
                    <span>Academic Merit • {academicSession}</span>
                  </span>
                </div>

                {/* Hero Typographic Statement */}
                <div className="space-y-0.5 sm:space-y-2">
                  <h2 className="text-base sm:text-2xl md:text-3xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                    Flat 10% Scholarship for <br className="hidden sm:inline" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300">
                      Class IX Toppers
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-indigo-300 tracking-wide uppercase">
                    For High Scorers Entering Class X
                  </p>
                </div>

                {/* Narrative */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl line-clamp-3 sm:line-clamp-none">
                  Recognizing academic excellence in Balotra. Students with school ranks or 85%+ in Class IX receive an immediate 10% tuition concession across all CBSE &amp; RBSE Class X Foundation Batches.
                </p>

                {/* Inline Feature Badges (Hidden on mobile) */}
                <div className="hidden sm:flex flex-wrap items-center justify-start gap-1 sm:gap-2 sm:gap-3 pt-0.5 sm:pt-1">
                  <span className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg bg-slate-900/80 border border-slate-800 text-[10px] sm:text-xs text-slate-300 flex items-center gap-1 sm:gap-1.5 font-medium shadow-sm">
                    <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-400 shrink-0" />
                    <span>Report Card Verified</span>
                  </span>
                  <span className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg bg-slate-900/80 border border-slate-800 text-[10px] sm:text-xs text-slate-300 flex items-center gap-1 sm:gap-1.5 font-medium shadow-sm">
                    <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-400 shrink-0" />
                    <span>CBSE &amp; RBSE</span>
                  </span>
                  <span className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg bg-slate-900/80 border border-slate-800 text-[10px] sm:text-xs text-slate-300 flex items-center gap-1 sm:gap-1.5 font-medium shadow-sm">
                    <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-400 shrink-0" />
                    <span>Limited Seats</span>
                  </span>
                </div>

                {/* Actions */}
                <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-1.5 sm:gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setIsEnrollModalOpen(true)}
                    className="w-full sm:w-auto min-h-[38px] sm:min-h-[44px] h-9 sm:h-12 px-3 sm:px-7 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:bg-right text-white font-bold text-[10.5px] sm:text-xs uppercase tracking-wider rounded-lg sm:rounded-xl transition-all shadow-md shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 group cursor-pointer border border-white/15 flex items-center justify-center gap-1.5 sm:gap-2"
                  >
                    <span>Apply for 10% Scholarship</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform shrink-0" />
                  </button>

                  <a
                    href="https://api.whatsapp.com/send?phone=919414668795&text=Hello%20R.K%20Coaching%20Classes,%20I%20would%20like%20to%20apply%20for%20the%20Class%20IX%20Topper%20Flat%2010%25%20Scholarship."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:flex w-full sm:w-auto min-h-[38px] sm:min-h-[44px] px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 items-center justify-center gap-1 sm:gap-1.5 text-[10.5px] sm:text-xs font-bold text-slate-300 hover:text-indigo-400 transition-colors cursor-pointer group"
                  >
                    <span>Inquire on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 group-hover:text-indigo-400 transition-all shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <GlowingSectionDivider />

        {/* WHY CHOOSE SECTION (INTERACTIVE ROTATING ORBIT WHEEL) */}
        <section id="why-choose" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 space-y-10 sm:space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-500/20 inline-block">
              Institutional Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Why Choose RK Coaching?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Discover the structured classroom advantages that give your child a competitive edge in CBSE &amp; RBSE board exams. Rotate the dial to explore our pedagogical pillars.
            </p>
          </div>

          <WhyChooseWheel />
        </section>

        <GlowingSectionDivider />

        {/* RESULTS TAB SECTION */}
        <section id="results" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 space-y-7">
          <div className="text-center space-y-2.5 max-w-xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 inline-block">Results Showcase</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">Our Board Exam Achievers</h2>
            <p className="text-slate-300 text-sm sm:text-base">Meet our high-performing students who demonstrated conceptual clarity and earned top ranks.</p>
          </div>

          {/* Batch Selector */}
          <div className="flex justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-1 px-4 -mx-4 sm:mx-0">
            {Object.keys(batchResultsData).map((year) => (
              <button
                key={year}
                onClick={() => setSelectedBatch(year)}
                className={`relative px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedBatch === year ? 'text-white bg-indigo-600 shadow-md shadow-indigo-600/20' : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-850 border border-slate-800'
                }`}
              >
                Batch {year}
              </button>
            ))}
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto text-center">
            <div className="bg-slate-900/60 p-2.5 sm:p-3 rounded-xl border border-slate-800 space-y-0.5">
              <span className="text-[10.5px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Top Students</span>
              <h3 className="text-lg sm:text-xl font-black text-white">{activeBatch.studentCount}</h3>
            </div>
            <div className="bg-slate-900/60 p-2.5 sm:p-3 rounded-xl border border-slate-800 space-y-0.5">
              <span className="text-[10.5px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">Batch Average Score</span>
              <h3 className="text-lg sm:text-xl font-black text-indigo-400">{activeBatch.avgScore}</h3>
            </div>
          </div>

          {/* Toppers Cards (Horizontal swipe on mobile, 2/3-col grid on desktop) */}
          <motion.div 
            key={selectedBatch}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 max-w-4xl mx-auto pt-1 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-auto sm:px-0 pb-3"
          >
            {activeBatch.toppers.map((topper) => (
              <TopperCard key={`${selectedBatch}-${topper.name}`} topper={topper} year={selectedBatch} />
            ))}
          </motion.div>

          {/* INSTITUTE BANNER FRAME */}
          <LandscapeResultFrame />
        </section>

        <GlowingSectionDivider />

        {/* ======================================================== */}
        {/* NEW SECTION: OUR DIGITAL PRODUCTS & ECOSYSTEM */}
        {/* ======================================================== */}
        <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 space-y-10">
          <div className="text-center space-y-2.5 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-500/20 inline-block">
              Student Ecosystem &amp; Store
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Our Student Learning Suite &amp; Store
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              In addition to intensive offline tutoring in Balotra, R.K Coaching provides 24/7 AI mentoring, curated video hubs, and our upcoming dedicated student store for books, printed notes &amp; stationery.
            </p>
          </div>

          {/* HORIZONTAL FLOW ON MOBILE, 3-COLUMN CENTERED GRID ON TABLET & DESKTOP */}
          <div
            ref={productsRef}
            onScroll={onProductsScroll}
            className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto items-stretch overflow-x-auto pb-4 pt-1 px-4 sm:px-6 md:px-0 -mx-4 sm:mx-auto snap-x snap-mandatory no-scrollbar justify-start md:justify-center"
          >
              
              {/* COMPACT PRODUCT 1: LearnStudio 2.0 */}
              <motion.div
                whileHover={{ y: -4 }}
                className="w-[78vw] max-w-[290px] md:w-auto md:max-w-none shrink-0 snap-center relative rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 border border-indigo-500/25 p-3 sm:p-3.5 shadow-xl flex flex-col justify-between overflow-hidden group text-left"
              >
                <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="space-y-2 relative z-10">
                  {/* Header: Redesigned LearnStudio Logo */}
                  <div className="flex items-center justify-between gap-2">
                    <LearnStudioLogo size="sm" />
                    <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Smart LMS
                    </span>
                  </div>

                  {/* Browser Preview Screenshot */}
                  <div className="relative rounded-lg bg-slate-950 border border-slate-800/90 overflow-hidden shadow-md group/preview">
                    <div className="px-2 py-1 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="font-mono text-[9px] sm:text-[10px] text-slate-400 px-1.5 py-0.5 bg-slate-950/70 rounded border border-slate-800/80 truncate">
                        learnstudio.rkcoachingrajasthan.in
                      </span>
                      <div className="w-3" />
                    </div>

                    <div className="relative h-24 sm:h-28 w-full overflow-hidden bg-slate-950">
                      <Image
                        src="/images/preview/learnstudio-preview.webp"
                        alt="LearnStudio 2.0 Web Platform"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                        className="object-cover object-top group-hover/preview:scale-[1.03] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                      <span className="absolute bottom-1.5 left-1.5 text-[9px] sm:text-[10px] font-bold text-white bg-slate-950/85 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
                        <Bot className="w-2.5 h-2.5 text-indigo-400" />
                        <span>AI Student Portal</span>
                      </span>
                    </div>
                  </div>

                  {/* Description & Features */}
                  <div className="space-y-1.5 text-left">
                    <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-normal">
                      Full AI Learning Management System built for CBSE &amp; RBSE school and board students with automated doubt solving.
                    </p>

                    <div className="space-y-1 pt-0.5">
                      {[
                        '24/7 Charlie AI Tutor for concept doubts',
                        'Interactive video syllabus & checkpoints',
                        'Downloadable teacher-verified PDF notes'
                      ].map((feat, fidx) => (
                        <div key={fidx} className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-300">
                          <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-2 border-t border-slate-800/80 mt-2 flex items-center justify-between gap-2 relative z-10">
                  <span className="text-[10.5px] sm:text-xs font-semibold text-slate-400">
                    Class 6th–10th
                  </span>
                  <a
                    href="https://learnstudio.rkcoachingrajasthan.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:bg-right text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.03] active:scale-95"
                  >
                    <span>Launch</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>

              {/* COMPACT PRODUCT 2: RK WORKSPACE (POWERED BY STUDYBUDDY) */}
              <motion.div
                whileHover={{ y: -4 }}
                className="w-[78vw] max-w-[290px] md:w-auto md:max-w-none shrink-0 snap-center relative rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-900 via-rose-950/30 to-slate-900 border border-red-500/25 p-3 sm:p-3.5 shadow-xl flex flex-col justify-between overflow-hidden group text-left"
              >
                <div className="absolute top-0 right-0 w-36 h-36 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="space-y-2 relative z-10">
                  {/* Header: RK Workspace & StudyBuddy Tag */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <div className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-red-600 via-rose-600 to-orange-500 opacity-50 blur-sm group-hover:opacity-90 transition-opacity" />
                        <div className="relative w-7 h-7 rounded-lg bg-gradient-to-br from-red-500 to-rose-700 border border-red-400/40 p-1 flex items-center justify-center shadow-md shadow-red-500/30">
                          <span className="font-mono font-black text-xs text-white tracking-tighter">
                            &lt;/&gt;
                          </span>
                        </div>
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs sm:text-sm font-black text-white tracking-tight">
                            RK <span className="text-red-400">Workspace</span>
                          </span>
                          <span className="text-[9px] font-mono font-extrabold px-1 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40">
                            StudyBuddy
                          </span>
                        </div>
                        <p className="text-[9.5px] sm:text-[10px] text-red-400/80 font-mono tracking-wider font-semibold">
                          Videos · Notes · Roadmaps
                        </p>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-red-500/20 text-red-300 border border-red-500/30 shrink-0 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                      Curated Hub
                    </span>
                  </div>

                  {/* Browser Preview Screenshot */}
                  <div className="relative rounded-lg bg-slate-950 border border-slate-800/90 overflow-hidden shadow-md group/preview">
                    <div className="px-2 py-1 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="font-mono text-[9px] sm:text-[10px] text-slate-400 px-1.5 py-0.5 bg-slate-950/70 rounded border border-slate-800/80 truncate">
                        studybuddy.rkcoachingrajasthan.in
                      </span>
                      <div className="w-3" />
                    </div>

                    <div className="relative h-24 sm:h-28 w-full overflow-hidden bg-slate-950">
                      <Image
                        src="/images/preview/studybuddy-preview.webp"
                        alt="RK Workspace Platform"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                        className="object-cover object-top group-hover/preview:scale-[1.03] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                      <span className="absolute bottom-1.5 left-1.5 text-[9px] sm:text-[10px] font-bold text-white bg-slate-950/85 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
                        <BookOpen className="w-2.5 h-2.5 text-red-400" />
                        <span>Curated Concept Hub</span>
                      </span>
                    </div>
                  </div>

                  {/* Description & Features */}
                  <div className="space-y-1.5 text-left">
                    <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-normal">
                      Dedicated study workspace where teachers upload curated video playlists, chapter notes, and concept roadmaps to build deep understanding.
                    </p>

                    <div className="space-y-1 pt-0.5">
                      {[
                        'Curated video playlists for crystal-clear concepts',
                        'Chapter-wise digital notes, formula sheets & roadmaps',
                        'Upskill Track: Foundational coding & logic starter'
                      ].map((feat, fidx) => (
                        <div key={fidx} className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-300">
                          <CheckCircle className="w-3 h-3 text-red-400 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-2 border-t border-slate-800/80 mt-2 flex items-center justify-between gap-2 relative z-10">
                  <span className="text-[10.5px] sm:text-xs font-semibold text-slate-400">
                    Class 6th–12th &amp; Upskill
                  </span>
                  <a
                    href="https://studybuddy.rkcoachingrajasthan.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:bg-right text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-red-600/30 transition-all hover:scale-[1.03] active:scale-95"
                  >
                    <span>Open</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>

              {/* PRODUCT 3: RK BOOK DEPOT & STUDENT STATIONERY (TAGGED: COMING SOON) */}
              <motion.div
                whileHover={{ y: -4 }}
                className="w-[78vw] max-w-[290px] md:w-auto md:max-w-none shrink-0 snap-center relative rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-900 via-amber-950/25 to-slate-900 border border-amber-500/30 p-3 sm:p-3.5 shadow-xl flex flex-col justify-between overflow-hidden group text-left"
              >
                <div className="absolute top-0 right-0 w-36 h-36 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="space-y-2 relative z-10">
                  {/* Header: RK Book Depot Brand & Coming Soon Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <div className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 opacity-60 blur-sm group-hover:opacity-90 transition-opacity" />
                        <div className="relative w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-700 border border-amber-400/50 p-1 flex items-center justify-center shadow-md shadow-amber-500/30 text-white">
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs sm:text-sm font-black text-white tracking-tight">
                            RK <span className="text-amber-400">Book Depot</span>
                          </span>
                        </div>
                        <p className="text-[9.5px] sm:text-[10px] text-amber-400/90 font-mono tracking-wider font-semibold">
                          Stationery · Books · Notes
                        </p>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 shrink-0 flex items-center gap-1 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                      Coming Soon
                    </span>
                  </div>

                  {/* Browser Preview Screenshot */}
                  <div className="relative rounded-lg bg-slate-950 border border-slate-800/90 overflow-hidden shadow-md group/preview">
                    <div className="px-2 py-1 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="font-mono text-[9px] sm:text-[10px] text-slate-400 px-1.5 py-0.5 bg-slate-950/70 rounded border border-slate-800/80 truncate">
                        bookdepot.rkcoachingrajasthan.in
                      </span>
                      <div className="w-3" />
                    </div>

                    <div className="relative h-24 sm:h-28 w-full overflow-hidden bg-slate-950">
                      <Image
                        src="/images/preview/rk-store-preview.webp"
                        alt="RK Book Depot &amp; Stationery Store Platform"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                        className="object-cover object-top group-hover/preview:scale-[1.03] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                      <span className="absolute bottom-1.5 left-1.5 text-[9px] sm:text-[10px] font-bold text-white bg-slate-950/85 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5 text-amber-400" />
                        <span>Official Store &amp; Depot</span>
                      </span>
                    </div>
                  </div>

                  {/* Special Discount Banner for RK Students (Compact) */}
                  <div className="rounded-md bg-amber-500/10 border border-amber-500/25 py-1 px-2 flex items-center gap-1.5 shadow-sm">
                    <Percent className="w-3 h-3 text-amber-400 shrink-0 stroke-[2.5]" />
                    <p className="text-[10.5px] sm:text-xs font-bold text-amber-300">
                      Special Discount for RK Students!
                    </p>
                  </div>

                  {/* Description & Features */}
                  <div className="space-y-1.5 text-left">
                    <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-normal">
                      Official printed board exam notes, textbooks, verified question banks, and premium student stationery kits.
                    </p>

                    <div className="space-y-1 pt-0.5">
                      {[
                        'Printed concept notes & formula handbooks',
                        'Class 10th & 12th board mock papers & banks',
                        'Quick counter pickup at Balotra center'
                      ].map((feat, fidx) => (
                        <div key={fidx} className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-300">
                          <CheckCircle className="w-3 h-3 text-amber-400 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-2 border-t border-slate-800/80 mt-2 flex items-center justify-between gap-2 relative z-10">
                  <span className="text-[10.5px] sm:text-xs font-semibold text-amber-400/90 font-mono flex items-center gap-1">
                    <span>Launching Soon</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsBookDepotComingSoonOpen(true)}
                    className="px-3 py-1.5 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 hover:bg-right text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-amber-600/30 transition-all hover:scale-[1.03] active:scale-95 cursor-pointer"
                  >
                    <span>Reserve Notes</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>

          </div>

          {/* Mobile Swipe Cue Indicator */}
          <div className="flex md:hidden items-center justify-center gap-1.5 pt-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  productIdx === i ? 'w-4 bg-indigo-400' : 'w-1.5 bg-slate-700'
                }`}
              />
            ))}
          </div>
        </section>

        <GlowingSectionDivider />

        {/* INSTRUCTORS / MENTORS SECTION */}
        <section id="instructors" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 md:py-20 space-y-8 md:space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-extrabold uppercase tracking-widest shadow-sm">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Academic Leadership &amp; Mentorship</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight font-serif">
              Our Core Faculty
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              Learn from dedicated pedagogical experts in Balotra who build fundamental concept mastery with patience, structure, and personal care.
            </p>
          </div>

          {/* 3-Column Clean Mentor Cards (Horizontal swipe on mobile, 3-column grid on desktop) */}
          <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 md:mx-auto md:px-0 md:max-w-5xl pb-3">
            {[
              {
                name: 'Rakesh Agarwal',
                honorific: 'Rakesh Sir',
                role: 'Founder & Head Mathematics Faculty',
                cohort: 'Classes VI – X',
                experience: '17+ Yrs Exp.',
                badge: 'Founder',
                image: '/images/mentors/rakesh-agarwal.webp',
                qualifications: ['Foundational Math Expert', 'Pedagogy Lead'],
                bio: 'Pioneered Balotra\'s concept-first teaching model over 17 years ago. Renowned for breaking down complex mathematical proofs and theorems into intuitive, memorable steps.'
              },
              {
                name: 'Rekha Agarwal',
                honorific: 'Rekha Ma\'am',
                role: 'Co-Founder & Foundational Lead',
                cohort: 'Playgroup – Class V',
                experience: '25+ Yrs Exp.',
                badge: 'Co-Founder',
                image: '/images/mentors/rekha-agarwal.webp',
                qualifications: ['M.Com', 'B.Ed', 'Early Childhood'],
                bio: 'With over 25 years of educational devotion, she instills lifelong discipline, handwriting, mental math agility, and unwavering confidence in young foundational learners.'
              },
              {
                name: 'Harsh Agarwal',
                honorific: 'Harsh Sir',
                role: 'Secondary Maths & Science Specialist',
                cohort: 'Classes VI – X (Board)',
                experience: '6+ Yrs Exp.',
                badge: 'Board Specialist',
                image: '/images/mentors/harsh-agarwal.webp',
                website: 'https://harsh.rkcoachingrajasthan.in/',
                qualifications: ['B.Sc', 'B.Ed', 'CTET & REET Qualified'],
                bio: 'An energetic secondary educator known for structured chapter summaries, board exam blueprints, and intensive problem sessions that consistently deliver 90%+ scores.'
              }
            ].map((inst, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="group bg-slate-900/60 hover:bg-slate-900/95 border border-slate-800 hover:border-indigo-500/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-lg backdrop-blur-md w-[82vw] max-w-[320px] md:w-auto md:max-w-none shrink-0 snap-center"
              >
                {/* Mentor Photo Container (Centered Headshot Portrait) */}
                <div className="relative w-full aspect-[4/3.2] sm:aspect-[4/3.5] md:aspect-[4/3.8] bg-slate-950 overflow-hidden">
                  <Image
                    src={inst.image}
                    alt={`${inst.name} - ${inst.role}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle clean bottom edge fade */}
                  <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-slate-900/90 to-transparent pointer-events-none" />

                  {/* Floating Top Role Badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/15 text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{inst.badge}</span>
                  </div>
                </div>

                {/* Mentor Information Body */}
                <div className="p-5 space-y-3 text-left flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    {/* Name, Role & Experience Info */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        {inst.website ? (
                          <a
                            href={inst.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 hover:text-indigo-400 transition-colors group/name"
                          >
                            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight font-serif group-hover/name:text-indigo-300">
                              {inst.name}
                            </h3>
                            <ExternalLink className="w-3.5 h-3.5 text-indigo-400/80 group-hover/name:text-indigo-300 transition-colors" />
                          </a>
                        ) : (
                          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight font-serif">
                            {inst.name}
                          </h3>
                        )}
                        <p className="text-xs sm:text-sm text-indigo-300 font-semibold mt-0.5">
                          {inst.role}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-extrabold text-indigo-400 font-mono block">
                          {inst.honorific}
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-bold text-slate-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 mt-1 inline-block shadow-sm">
                          {inst.experience}
                        </span>
                      </div>
                    </div>

                    {/* Cohort & Qualifications Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      <span className="text-[10px] sm:text-[11px] font-bold text-purple-300 bg-purple-950/70 px-2.5 py-0.5 rounded border border-purple-800/60">
                        {inst.cohort}
                      </span>
                      {inst.qualifications.map((q, qidx) => (
                        <span
                          key={qidx}
                          className="text-[10px] sm:text-[11px] font-semibold text-slate-400 bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800"
                        >
                          {q}
                        </span>
                      ))}
                    </div>

                    {/* Bio Description (Compact) */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal pt-0.5 line-clamp-3 md:line-clamp-none">
                      {inst.bio}
                    </p>
                  </div>

                  {/* Optional Faculty Personal Website Link */}
                  {inst.website && (
                    <div className="pt-2.5 border-t border-slate-800/80 mt-1">
                      <a
                        href={inst.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between w-full px-3 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/25 hover:border-indigo-500/40 rounded-lg text-xs font-bold text-indigo-300 hover:text-indigo-200 transition-all group/btn cursor-pointer"
                      >
                        <span>Know More About Harsh Sir</span>
                        <ExternalLink className="w-3.5 h-3.5 text-indigo-400 group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <GlowingSectionDivider />

        {/* MEMORIES CAROUSEL SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 space-y-8 md:space-y-10 overflow-hidden">
          <div className="text-center space-y-2.5 max-w-xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-500/20 inline-block">Life at RK</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">Classroom Memories &amp; Smiles</h2>
          </div>

          <div className="w-full overflow-x-auto py-4 px-2 flex justify-start lg:justify-center items-center gap-5 no-scrollbar">
            {MEMORIES_DATA.map((mem) => (
              <MemoryCard key={mem.id} defaultText={mem.defaultText} angle={mem.angle} imageSrc={mem.imageSrc} />
            ))}
          </div>
        </section>

        <GlowingSectionDivider />

        {/* TRUST & REVIEWS WITH GOOGLE LINK (2-ROW OPPOSITE MARQUEE WITH SMOKE FADE) */}
        <section id="reviews" className="w-full py-10 sm:py-16 md:py-20 space-y-8 md:space-y-10 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold text-slate-300 shadow-sm backdrop-blur-sm">
              <span>Everyone</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0 drop-shadow-[0_1px_4px_rgba(244,63,94,0.4)]" />
              <span className="text-white font-bold">RK Coaching Classes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Trusted by Parents &amp; Students
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Hear firsthand testimonials from families in Balotra who experienced our concept-first teaching and personal academic mentorship.
            </p>
          </div>

          {/* 2-ROW INFINITE MARQUEE WITH SMOKEY VIGNETTE ON BOTH SIDES */}
          <div className="relative w-full overflow-hidden space-y-4 sm:space-y-5">
            {/* Left Smoke Vignette Mask */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-32 md:w-48 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-20" />
            
            {/* Right Smoke Vignette Mask */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-32 md:w-48 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent z-20" />

            {/* ROW 1: RIGHT-TO-LEFT MARQUEE (4 REVIEWS DUPLICATED FOR INFINITE SEAMLESS LOOP) */}
            <div className="flex overflow-hidden select-none">
              <motion.div
                className="flex gap-4 sm:gap-5 shrink-0"
                animate={reduce ? undefined : { x: ['0%', '-50%'] }}
                transition={{
                  repeat: Infinity,
                  ease: 'linear',
                  duration: 35
                }}
              >
                {[...TESTIMONIALS_DATA.slice(0, 4), ...TESTIMONIALS_DATA.slice(0, 4)].map((rev, idx) => (
                  <div
                    key={`row1-${idx}`}
                    className="w-[280px] sm:w-[350px] shrink-0 bg-slate-900/60 hover:bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 p-5 rounded-2xl flex flex-col justify-between gap-4 text-left transition-all duration-300 shadow-md backdrop-blur-sm"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-slate-800/90 border border-slate-700/80 flex items-center justify-center text-slate-300 shrink-0 shadow-inner">
                            <User className="w-4 h-4 text-slate-300" />
                          </div>
                          <div>
                            <span className="text-xs font-extrabold text-white block">
                              Verified Review
                            </span>
                            <span className="text-[11px] text-slate-400 block">
                              Balotra Center
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {Array.from({ length: rev.stars }).map((_, sidx) => (
                            <Star key={sidx} className="w-3.5 h-3.5 fill-amber-400 shrink-0" />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed font-normal line-clamp-4">
                        "{rev.text}"
                      </p>
                    </div>
                    <div className="border-t border-slate-800/80 pt-2.5 flex items-center justify-between text-xs">
                      <span className="font-extrabold text-indigo-400 uppercase tracking-wider">{rev.role}</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        CBSE / RBSE
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ROW 2: LEFT-TO-RIGHT MARQUEE (OPPOSITE DIRECTION) */}
            <div className="flex overflow-hidden select-none">
              <motion.div
                className="flex gap-4 sm:gap-5 shrink-0"
                animate={reduce ? undefined : { x: ['-50%', '0%'] }}
                transition={{
                  repeat: Infinity,
                  ease: 'linear',
                  duration: 35
                }}
              >
                {[...TESTIMONIALS_DATA.slice(4, 8), ...TESTIMONIALS_DATA.slice(4, 8)].map((rev, idx) => (
                  <div
                    key={`row2-${idx}`}
                    className="w-[280px] sm:w-[350px] shrink-0 bg-slate-900/60 hover:bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 p-5 rounded-2xl flex flex-col justify-between gap-4 text-left transition-all duration-300 shadow-md backdrop-blur-sm"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-slate-800/90 border border-slate-700/80 flex items-center justify-center text-slate-300 shrink-0 shadow-inner">
                            <User className="w-4 h-4 text-slate-300" />
                          </div>
                          <div>
                            <span className="text-xs font-extrabold text-white block">
                              Verified Review
                            </span>
                            <span className="text-[10px] text-slate-400 block">
                              Balotra Center
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {Array.from({ length: rev.stars }).map((_, sidx) => (
                            <Star key={sidx} className="w-3.5 h-3.5 fill-amber-400 shrink-0" />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed font-normal line-clamp-4">
                        "{rev.text}"
                      </p>
                    </div>
                    <div className="border-t border-slate-800/80 pt-2.5 flex items-center justify-between text-xs">
                      <span className="font-extrabold text-purple-400 uppercase tracking-wider">{rev.role}</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        CBSE / RBSE
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Google Reviews Verification CTA Button */}
          <div className="pt-2 text-center">
            <a
              href={INSTITUTE_CONTACT.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700/80 text-xs sm:text-sm font-bold text-white transition-all hover:scale-[1.02] shadow-lg w-full sm:w-auto min-h-[44px]"
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>Read Verified Reviews on Google</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </section>

        <GlowingSectionDivider />

        {/* ========================================================= */}
        {/* 1) HOW TO APPLY? (ADMISSION PROCESS - EDITORIAL LAYOUT)   */}
        {/* ========================================================= */}
        <section id="how-to-apply" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-20 pb-10 sm:pb-16 space-y-10 sm:space-y-14">
          {/* Centered Serif Header matching reference photo */}
          <div className="text-center space-y-3.5 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-white tracking-tight font-serif leading-tight">
              How to Apply?
            </h2>
            <div className="flex items-center justify-center gap-2 pt-0.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block shadow-[0_0_8px_rgba(244,63,94,0.7)]" />
              <button
                type="button"
                onClick={() => setIsRequirementsModalOpen(true)}
                className="text-xs sm:text-sm font-semibold text-rose-400 hover:text-rose-300 underline underline-offset-4 decoration-rose-500/70 hover:decoration-rose-400 transition-colors cursor-pointer"
              >
                View All Requirements
              </button>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* 3 Text Columns (Editorial typography with symmetrical vertical dividing hairlines) */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800 text-left">
              {/* Column 1: You Apply */}
              <div className="pb-8 md:pb-0 md:pr-10 lg:pr-12 space-y-4 group">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 stroke-[1.8] text-slate-200 group-hover:text-indigo-400 transition-colors shrink-0" />
                  <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-white tracking-tight font-serif">
                    You Apply
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  Tell us a little about yourself and we'll help with the rest. Our convenient online inquiry takes only 2 minutes to complete.
                </p>
              </div>

              {/* Column 2: We Connect */}
              <div className="py-8 md:py-0 md:px-10 lg:px-12 space-y-4 group">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 stroke-[1.8] text-slate-200 group-hover:text-purple-400 transition-colors shrink-0" />
                  <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-white tracking-tight font-serif">
                    We Connect
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  After you submit your inquiry, our mentoring faculty will contact you directly to discuss batch timings, baseline assessment, and syllabus goals.
                </p>
              </div>

              {/* Column 3: You Get Ready */}
              <div className="pt-8 md:pt-0 md:pl-10 lg:pl-12 space-y-4 group">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 stroke-[1.8] text-slate-200 group-hover:text-pink-400 transition-colors shrink-0" />
                  <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-white tracking-tight font-serif">
                    You Get Ready
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  Once you've connected with our faculty and finalized your schedule, you're ready to collect your concept study materials and begin learning.
                </p>
              </div>
            </div>

            {/* Horizontal dividing hairline as seen at the bottom of the photo */}
            <div className="mt-14 sm:mt-16 border-b border-slate-800/80" />
          </div>
        </section>

        <GlowingSectionDivider />

        {/* ========================================================= */}
        {/* 2) FAQ QUESTIONS (FREQUENTLY ASKED QUESTIONS ACCORDION)   */}
        {/* ========================================================= */}
        <section id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 space-y-10 sm:space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-extrabold uppercase tracking-widest shadow-sm">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
              <span>Got Questions? We Have Answers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight font-serif">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg mx-auto">
              Everything you need to know about our classroom batches, conceptual teaching methodology, CBSE &amp; RBSE syllabus, and enrollment.
            </p>
          </div>

          {/* FAQ Accordion List */}
          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-3.5">
            {FAQS_DATA.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              const isHiddenOnMobile = !showAllFaqs && idx >= 2;
              return (
                <div
                  key={faq.id}
                  className={`${isHiddenOnMobile ? 'hidden sm:block' : 'block'} border rounded-2xl transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-indigo-500/50 bg-slate-900/80 shadow-[0_4px_24px_rgba(99,102,241,0.12)]'
                      : 'border-slate-800/80 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-4 sm:px-6 py-3.5 sm:py-5 flex items-center justify-between gap-3 sm:gap-4 text-left cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3.5 pr-1 sm:pr-2">
                      <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg text-[11px] sm:text-xs font-extrabold flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-indigo-500/25 border border-indigo-400/40 text-indigo-300'
                          : 'bg-slate-800 border border-slate-700/80 text-slate-400'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                        {faq.question}
                      </span>
                    </div>
                    <div
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                        isOpen
                          ? 'border-indigo-500/50 bg-indigo-600/20 text-indigo-300 rotate-180'
                          : 'border-slate-800 bg-slate-850 text-slate-400'
                      }`}
                    >
                      <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 font-normal">
                          <p>{faq.answer}</p>
                          <div className="mt-2.5 sm:mt-3 flex items-center gap-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                              {faq.category}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Mobile Toggle Button: Show 1-2 by default, tap to expand all */}
            <div className="sm:hidden pt-2 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllFaqs((prev) => !prev)}
                className="w-full max-w-xs py-2.5 px-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/40 text-xs sm:text-sm font-bold text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>{showAllFaqs ? 'Show Less Questions' : `View All Questions (${FAQS_DATA.length})`}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-indigo-400 transition-transform duration-300 ${showAllFaqs ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 3) ARE YOU READY TO TAKE THE NEXT STEP TOWARD FUTURE CAREER */}
          {/* ========================================================= */}
          <div id="apply-cta" className="max-w-5xl mx-auto pt-10 border-t border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 text-left">
            {/* Left Serif Question Headline */}
            <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-normal text-white font-serif leading-snug max-w-xl">
              Are you ready to take the next step toward your{' '}
              <span className="text-indigo-400 font-medium">future career</span>?
            </h3>

            {/* Right Action Block */}
            <div className="flex flex-col items-center md:items-end gap-3 w-full sm:w-auto shrink-0">
              {/* Application Form Button */}
              <button
                type="button"
                onClick={() => setIsEnrollModalOpen(true)}
                className="w-full sm:w-auto min-w-[240px] px-8 py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:bg-right text-white font-bold text-sm sm:text-base rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-500/25 hover:scale-[1.02] active:scale-95 group cursor-pointer border border-white/15"
              >
                <span className="tracking-wide">Application Form</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Request Info | Visit links */}
              <div className="flex items-center justify-center md:justify-end gap-5 text-sm font-bold text-slate-300 tracking-wide w-full sm:w-auto">
                <a
                  href="https://api.whatsapp.com/send?phone=919414668795&text=Hello%20R.K%20Coaching%20Classes,%20I%20would%20like%20to%20request%20more%20information%20about%20admissions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-indigo-400 transition-colors cursor-pointer group"
                >
                  <span>Request Info</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 group-hover:text-indigo-400 transition-all" />
                </a>

                <span className="w-px h-3.5 bg-slate-800 inline-block" />

                <a
                  href={INSTITUTE_CONTACT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-indigo-400 transition-colors cursor-pointer group"
                >
                  <span>Visit</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 group-hover:text-indigo-400 transition-all" />
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* GLOWING THEME BEAM DIVISION (CYAN & INDIGO) */}
      <GlowingSectionDivider />

      {/* FOOTER */}
      <footer id="contact" className="bg-slate-950 pt-16 pb-24 sm:pb-20 md:pb-12 relative z-10 text-slate-400 overflow-hidden">
        {/* Subtle Constellation Geometric Wireframe (Top-Right Accent) */}
        <svg className="absolute -top-12 -right-12 w-96 h-96 opacity-[0.08] pointer-events-none stroke-cyan-400" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="0.75" />
          <line x1="200" y1="20" x2="200" y2="380" stroke="currentColor" strokeWidth="0.75" />
          <line x1="20" y1="200" x2="380" y2="200" stroke="currentColor" strokeWidth="0.75" />
          <line x1="60" y1="60" x2="340" y2="340" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
          <line x1="60" y1="340" x2="340" y2="60" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
          <circle cx="340" cy="60" r="3.5" fill="#38bdf8" />
          <circle cx="200" cy="20" r="3.5" fill="#818cf8" />
          <circle cx="60" cy="60" r="2.5" fill="#38bdf8" />
          <circle cx="340" cy="340" r="2.5" fill="#818cf8" />
        </svg>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-6">
            
            {/* COLUMN 1: BRAND & INSTITUTION */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-extrabold uppercase tracking-widest shadow-sm">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                <span>CBSE &amp; RBSE Conceptual Coaching</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-850 bg-slate-900 shrink-0">
                  <Image src="/images/logo.webp" alt="R.K Coaching" fill sizes="32px" loading="lazy" className="object-contain" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
                  R.K Coaching Classes
                </h3>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-md font-normal">
                Balotra's premier conceptual tutoring institution for over 15 years, founded by Rakesh Sir and Rekha Ma'am. Dedicated to building crystal-clear basics in Mathematics and Science for school and board examinations.
              </p>

              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400 pt-0.5">
                <span className="inline-flex items-center gap-1.5 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                  Balotra, Rajasthan
                </span>
                <span className="text-slate-600">•</span>
                <span>15+ Years Academic Legacy</span>
                <span className="text-slate-600">•</span>
                <span>100% Board Pass Rate</span>
              </div>

              <div className="pt-1">
                <a
                  href={INSTITUTE_CONTACT.googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 py-2 bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/40 rounded-xl text-xs font-black text-white uppercase tracking-wider shadow-lg shadow-black/40 transition-all hover:scale-[1.02] active:scale-98 group cursor-pointer"
                >
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>View Verified Google Reviews</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-white transition-all" />
                </a>
              </div>
            </div>

            {/* WRAPPER FOR COLUMNS 2 & 3: SIDE-BY-SIDE (LEFT & RIGHT) ON MOBILE */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-7 lg:gap-8">
              {/* COLUMN 2: CONTACT INFORMATION (LEFT) */}
              <div className="col-span-1 lg:col-span-4 space-y-3 sm:space-y-4 text-left">
                <h4 className="font-black text-white uppercase tracking-wider text-xs sm:text-sm">
                  <span className="hidden sm:inline">Contact Information</span>
                  <span className="sm:hidden">Contact Info</span>
                </h4>
                <div className="space-y-2.5 sm:space-y-3 text-[11px] sm:text-sm text-slate-300 font-medium">
                  <a href={`mailto:${INSTITUTE_CONTACT.email}`} className="flex items-center gap-1.5 sm:gap-2.5 hover:text-white transition-colors group">
                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400 shrink-0 group-hover:text-indigo-300" />
                    <span className="truncate">{INSTITUTE_CONTACT.email}</span>
                  </a>
                  <a href={`tel:${INSTITUTE_CONTACT.phone}`} className="flex items-center gap-1.5 sm:gap-2.5 hover:text-white transition-colors group">
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400 shrink-0 group-hover:text-indigo-300" />
                    <span>{INSTITUTE_CONTACT.phoneFormatted}</span>
                  </a>
                  <a
                    href={INSTITUTE_CONTACT.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-1.5 sm:gap-2.5 leading-snug sm:leading-relaxed text-slate-300 hover:text-white transition-colors group text-[10.5px] sm:text-xs"
                  >
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400 shrink-0 mt-0.5 group-hover:text-indigo-300 transition-colors" />
                    <span className="line-clamp-3 sm:line-clamp-none">65 Agrawal colony, Near Vardhman School, Balotra, Rajasthan - 344022</span>
                  </a>
                </div>
              </div>

              {/* COLUMN 3: LEARNING NETWORK / STUDENT COMMUNITY (RIGHT) */}
              <div className="col-span-1 lg:col-span-3 space-y-3 sm:space-y-4 text-left">
                <h4 className="font-black text-white uppercase tracking-wider text-xs sm:text-sm">
                  <span className="hidden sm:inline">Student Community</span>
                  <span className="sm:hidden">Community</span>
                </h4>
                <ul className="space-y-2.5 sm:space-y-3 text-[11px] sm:text-sm text-slate-300 font-medium">
                  <li>
                    <a
                      href="https://youtube.com/@rkcoachingclasses?si=KfYdwL2LGWjAbTTm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between hover:text-white transition-colors group gap-1"
                    >
                      <span className="flex items-center gap-1.5 sm:gap-2 truncate">
                        <Youtube className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span className="truncate"><span className="hidden sm:inline">RK Coaching </span>YouTube</span>
                      </span>
                      <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300 transition-colors shrink-0" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/rk.coachings20?igsh=ajl5am10cTlyaGw5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between hover:text-white transition-colors group gap-1"
                    >
                      <span className="flex items-center gap-1.5 sm:gap-2 truncate">
                        <Instagram className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                        <span className="truncate"><span className="hidden sm:inline">@rk.coachings20</span><span className="sm:hidden">Instagram</span></span>
                      </span>
                      <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300 transition-colors shrink-0" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://harsh.rkcoachingrajasthan.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between hover:text-white transition-colors group gap-1"
                    >
                      <span className="flex items-center gap-1.5 sm:gap-2 truncate">
                        <User className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span className="truncate"><span className="hidden sm:inline">Know More About </span>Harsh Sir</span>
                      </span>
                      <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300 transition-colors shrink-0" />
                    </a>
                  </li>
                </ul>
                <p className="text-[10px] sm:text-xs text-slate-400 leading-snug sm:leading-relaxed pt-1 line-clamp-3 sm:line-clamp-none">
                  Providing Balotra students with concept-clarity videos, weekly board test series, and structured classroom mentorship.
                </p>
              </div>
            </div>
          </div>

          {/* GLOWING SUB-FOOTER DIVISION LINE */}
          <div className="relative w-full overflow-hidden flex items-center justify-center my-2">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700/80 via-indigo-500/50 via-cyan-400/40 to-transparent" />
            <div className="absolute w-2/3 h-[2px] bg-gradient-to-r from-transparent via-indigo-400/20 via-cyan-400/20 to-transparent blur-sm pointer-events-none" />
          </div>

          {/* BOTTOM COPYRIGHT BAR */}
          <div className="pt-2 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-xs text-slate-400 text-center md:text-left">
            {/* Left: Institute brand */}
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-1 sm:gap-2">
              <div className="flex items-center gap-2">
                <div className="relative w-5 h-5 rounded overflow-hidden border border-slate-800 bg-slate-900 shrink-0">
                  <Image src="/images/logo.webp" alt="R.K Logo" fill sizes="20px" loading="lazy" className="object-contain" />
                </div>
                <span className="font-bold text-white text-xs sm:text-sm">R.K Coaching Classes</span>
              </div>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span className="text-slate-400 text-[11px] whitespace-nowrap">Class 1st–10th (CBSE &amp; RBSE) • Balotra</span>
            </div>

            {/* Right: Shubham Agrawal Copyright & Credit */}
            <div className="space-y-0.5 text-center md:text-right">
              <p className="text-slate-300 font-medium text-xs">
                © {currentYear} <strong className="text-white font-bold">Shubham Agrawal</strong>. All rights reserved.
              </p>
              <p className="text-[11px] text-slate-500 flex items-center justify-center md:justify-end gap-1">
                <span>Made with</span>
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline-block" />
                <span>for students &amp; ambitious learners</span>
              </p>
            </div>
          </div>

        </div>
      </footer>

      {/* FLOATING QUICK WHATSAPP INQUIRY BADGE (DESKTOP ONLY) */}
      <div className="hidden md:block fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40">
        <a
          href="https://api.whatsapp.com/send?phone=919414668795&text=Hello%20R.K%20Coaching%20Classes,%20I%20would%20like%20to%20inquire%20about%20offline%20classroom%20admissions."
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-full shadow-2xl shadow-emerald-500/40 border border-white/20 transition-all hover:scale-105 active:scale-95"
        >
          <WhatsAppIcon className="w-4 h-4 text-white" />
          <span className="hidden sm:inline">Inquire on WhatsApp</span>
        </a>
      </div>

      {/* MOBILE STICKY BOTTOM ACTION BAR */}
      <div
        className={`md:hidden fixed bottom-0 inset-x-0 z-40 flex items-center gap-2.5 px-3 pt-6 pb-[max(12px,env(safe-area-inset-bottom))] bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent transition-transform duration-300 ${
          scrolled && !isEnrollModalOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <button
          type="button"
          onClick={() => setIsEnrollModalOpen(true)}
          className="flex-1 min-h-[48px] rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
        >
          <span>Enroll for Batch</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <a
          href="https://api.whatsapp.com/send?phone=919414668795"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="w-12 min-h-[48px] rounded-xl bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-600/30 active:scale-95 cursor-pointer shrink-0"
        >
          <WhatsAppIcon className="w-6 h-6 text-white" />
        </a>
      </div>

      {/* ENROLLMENT POPUP MODAL */}
      <EnrollModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
      />

      {/* RK BOOK DEPOT COMING SOON MODAL */}
      <AnimatePresence>
        {isBookDepotComingSoonOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookDepotComingSoonOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="relative w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl p-6 sm:p-7 z-10 my-auto text-center overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500" />
              
              <button
                type="button"
                onClick={() => setIsBookDepotComingSoonOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30 mb-3.5">
                <ShoppingBag className="w-7 h-7" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-extrabold uppercase tracking-wider mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                <span>Launching Soon</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                RK Book Depot Online Store
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mt-1.5">
                Our online ordering &amp; home delivery platform is currently under active development.
              </p>

              <div className="my-4 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-left space-y-1.5">
                <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>Offline Counter Pickup Active:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Printed concept formula handbooks and board mock paper sets are available right now for direct pickup at:
                </p>
                <p className="text-xs sm:text-sm text-white font-bold">
                  65 Agrawal Colony, Near Vardhman School, Balotra
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
                <a
                  href="https://api.whatsapp.com/send?phone=919414668795&text=Hello%20R.K%20Coaching,%20I%20would%20like%20to%20inquire%20about%20reserving%20offline%20printed%20study%20notes%20and%20formula%20books%20from%20RK%20Book%20Depot."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Reserve via WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsBookDepotComingSoonOpen(false)}
                  className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADMISSION REQUIREMENTS POPUP MODAL */}
      <AnimatePresence>
        {isRequirementsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRequirementsModalOpen(false)}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden z-10 my-auto text-left"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsRequirementsModalOpen(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700/80 transition-colors z-20 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-extrabold uppercase tracking-widest mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                    <span>Admission Checklist</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif tracking-tight">
                    Admission Requirements
                  </h3>
                  <p className="text-sm text-slate-300 mt-1">
                    Everything you need to complete offline classroom enrollment at R.K Coaching Classes, Balotra.
                  </p>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  {[
                    { title: 'Academic Eligibility', desc: 'Students entering Classes 6th through 10th (CBSE or RBSE State Board).' },
                    { title: 'Previous Marksheet Copy', desc: 'Self-attested photocopy of the student\'s previous year school progress card.' },
                    { title: 'Passport Size Photographs', desc: 'Two recent passport-sized color photographs of the student.' },
                    { title: 'Identity Verification', desc: 'Photocopy of student or parent Aadhar Card / school identity card.' },
                    { title: 'Baseline Assessment', desc: 'Informal 15-minute concept orientation with Rakesh Sir or Rekha Ma\'am.' }
                  ].map((req, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-white text-xs sm:text-sm">{req.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-300 mt-0.5">{req.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsRequirementsModalOpen(false);
                      setIsEnrollModalOpen(true);
                    }}
                    className="w-full sm:w-auto flex-1 py-3 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:bg-right text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsRequirementsModalOpen(false)}
                    className="w-full sm:w-auto py-3 px-5 bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
