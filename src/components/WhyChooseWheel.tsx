'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Calendar,
  BookOpenCheck,
  Award,
  Zap,
  CheckCircle
} from 'lucide-react';

export interface PillarItem {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  badge: string;
  description: string;
  icon: React.ElementType;
  color: string;
  accentBg: string;
  borderColor: string;
  highlights: string[];
}

export const PILLARS_DATA: PillarItem[] = [
  {
    id: 'tutors',
    title: 'Experienced Faculty',
    shortTitle: 'Expert Mentors',
    tagline: '15+ to 25+ Years of Dedicated Teaching Legacy',
    badge: 'Core Pedagogy',
    description: 'Learn directly under Rakesh Sir and Rekha Ma’am with zero proxy teachers or rotating tutors.',
    icon: Users,
    color: 'text-indigo-400',
    accentBg: 'bg-indigo-500/15',
    borderColor: 'border-indigo-500/30',
    highlights: [
      'Classes taught directly by founders (Rakesh Sir & Rekha Ma’am)',
      'Consistent mentoring throughout the year with no proxy staff',
      'Thorough coverage of both CBSE and RBSE board syllabi',
      'Patient concept explanation suited to each student’s pace'
    ]
  },
  {
    id: 'batches',
    title: 'Offline Small Batches',
    shortTitle: 'Small Cohorts',
    tagline: 'Strictly 15–20 Students per Classroom',
    badge: '15–20 Seats Max',
    description: 'Capped classroom batches in Balotra guarantee daily personal attention and prompt doubt resolution.',
    icon: Calendar,
    color: 'text-purple-400',
    accentBg: 'bg-purple-500/15',
    borderColor: 'border-purple-500/30',
    highlights: [
      'Class strength strictly limited to 15–20 students',
      'Direct personal attention during every classroom session',
      'Daily in-person doubt clearing before and after lectures',
      'Distraction-free, disciplined offline study environment'
    ]
  },
  {
    id: 'notes',
    title: 'Quality Concept Notes',
    shortTitle: 'Concept Notes',
    tagline: 'Curated Chapter Summaries & Formula Sheets',
    badge: 'Exam-Ready Material',
    description: 'Concise chapter summaries, step-by-step mathematical proofs, and verified board question banks.',
    icon: BookOpenCheck,
    color: 'text-blue-400',
    accentBg: 'bg-blue-500/15',
    borderColor: 'border-blue-500/30',
    highlights: [
      'Chapter-wise notes aligned with the current board syllabus',
      'Quick-reference formula sheets and derivation summaries',
      'Solved textbook questions for NCERT and state board',
      'Practice question sets curated from previous board papers'
    ]
  },
  {
    id: 'tests',
    title: 'Special Test Series',
    shortTitle: 'Test Series',
    tagline: 'Weekly Board Pattern Evaluations',
    badge: 'Weekly Assessments',
    description: 'Weekly evaluations simulating board exam conditions to build confidence and remove exam anxiety.',
    icon: Award,
    color: 'text-amber-400',
    accentBg: 'bg-amber-500/15',
    borderColor: 'border-amber-500/30',
    highlights: [
      'Weekly chapter tests based on official board patterns',
      'Full-syllabus mock tests ahead of board examinations',
      'Detailed paper checking highlighting common mistakes',
      'Regular test performance and attendance updates for parents'
    ]
  },
  {
    id: 'specialization',
    title: 'Maths & Science Focus',
    shortTitle: 'Signature Focus',
    tagline: 'Strong Foundation in Core Board Subjects',
    badge: 'Most Popular',
    description: 'Systematic approach to theoretical concepts, numericals, and step-by-step problem solving.',
    icon: Zap,
    color: 'text-pink-400',
    accentBg: 'bg-pink-500/15',
    borderColor: 'border-pink-500/30',
    highlights: [
      'Focused problem-solving practice in Mathematics and Science',
      'Emphasis on clear fundamentals rather than rote memorization',
      'Step-by-step answer writing guidance for board scoring',
      'Dedicated doubt sessions for complex numericals and formulas'
    ]
  }
];

export function WhyChooseWheel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const total = PILLARS_DATA.length;

  const STEP_ANGLE = 23;
  const RADIUS = 195;

  // Auto-rotate every 4.5 seconds unless hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered, total]);

  const activePillar = PILLARS_DATA[activeIndex];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-7xl mx-auto select-none"
    >
      {/* ======================================================== */}
      {/* DESKTOP VIEW: BORDERLESS ROTARY DIAL + MINIMALIST INFO   */}
      {/* ======================================================== */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-6 xl:gap-10 items-center min-h-[460px] relative">

        {/* LEFT COLUMN: SEAMLESS ROTARY ORBITAL STAGE */}
        <div className="lg:col-span-5 relative h-[460px] flex items-center justify-start overflow-hidden">

          {/* Subtle Ambient Glow */}
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-indigo-600/12 rounded-full blur-[80px] pointer-events-none" />

          {/* Concentric Orbital Rings (Centered at left-0, matching 195px radius) */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[440px] h-[440px] rounded-full border border-slate-800/70 pointer-events-none" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[390px] h-[390px] rounded-full border border-dashed border-indigo-500/25 pointer-events-none animate-[spin_90s_linear_infinite]" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[260px] h-[260px] rounded-full border border-slate-800/60 pointer-events-none" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[140px] h-[140px] rounded-full border border-indigo-500/15 pointer-events-none" />

          {/* Center Hub Indicator */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center pointer-events-none shadow-md shadow-indigo-500/20">
            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          </div>

          {/* ROTATING STAGE CONTAINER */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0">
            <motion.div
              className="relative w-0 h-0"
              animate={{
                rotate: -activeIndex * STEP_ANGLE
              }}
              transition={{ type: 'spring', stiffness: 130, damping: 20 }}
            >
              {PILLARS_DATA.map((item, idx) => {
                const ItemIcon = item.icon;
                const angle = idx * STEP_ANGLE;
                const rad = (angle * Math.PI) / 180;
                const x = RADIUS * Math.cos(rad);
                const y = RADIUS * Math.sin(rad);
                const isActive = idx === activeIndex;

                return (
                  <div
                    key={item.id}
                    className="absolute -translate-y-1/2 -translate-x-1/2"
                    style={{
                      left: `${x}px`,
                      top: `${y}px`
                    }}
                  >
                    {/* COUNTER-ROTATING NODE */}
                    <motion.button
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      animate={{
                        rotate: activeIndex * STEP_ANGLE,
                        scale: isActive ? 1.05 : 0.92
                      }}
                      transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                      className={`group relative flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl border transition-all duration-300 cursor-pointer text-left whitespace-nowrap ${isActive
                        ? 'bg-slate-900 border-indigo-500 shadow-xl shadow-indigo-500/35 ring-2 ring-indigo-500/35 z-30'
                        : 'bg-slate-950/90 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90 shadow-sm z-10'
                        }`}
                    >
                      {isActive && (
                        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500" />
                        </span>
                      )}

                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${isActive
                          ? `${item.accentBg} ${item.borderColor} ${item.color} shadow-inner`
                          : 'bg-slate-900 border-slate-800 text-slate-400 group-hover:text-slate-200'
                          }`}
                      >
                        <ItemIcon className="w-4.5 h-4.5" />
                      </div>

                      <div className="pr-1.5">
                        <span className={`text-xs font-bold block leading-tight ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                          }`}>
                          {item.shortTitle}
                        </span>
                        <span className="text-[9px] text-slate-500 font-mono block pt-0.5">
                          0{idx + 1}
                        </span>
                      </div>
                    </motion.button>
                  </div>
                );
              })}
            </motion.div>
          </div>

        </div>

        {/* RIGHT COLUMN: CLEAN, BORDERLESS PUNCHY DETAIL */}
        <div className="lg:col-span-7 relative">

          <div className="absolute top-1/2 -translate-y-1/2 left-10 w-[380px] h-[380px] bg-indigo-600/10 rounded-full blur-[110px] pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activePillar.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative p-2 sm:p-6 lg:p-8 space-y-6 text-left max-w-2xl"
            >
              {/* Pillar Badge */}
              <div>
                <span className={`px-3.5 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider border ${activePillar.accentBg} ${activePillar.borderColor} ${activePillar.color}`}>
                  {activePillar.badge}
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-1.5">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                  {activePillar.title}
                </h3>
                <p className="text-sm sm:text-base font-bold text-indigo-400">
                  {activePillar.tagline}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1 font-normal">
                  {activePillar.description}
                </p>
              </div>

              {/* 4 Highlights */}
              <div className="space-y-2.5 pt-1">
                {activePillar.highlights.map((point, pidx) => (
                  <div key={pidx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{point}</span>
                  </div>
                ))}
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* ======================================================== */}
      {/* MOBILE & TABLET VIEW (< 1024px)                          */}
      {/* ======================================================== */}
      <div className="block lg:hidden space-y-6">

        {/* Horizontal Pill Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 px-1 no-scrollbar">
          {PILLARS_DATA.map((item, idx) => {
            const ItemIcon = item.icon;
            const isActive = idx === activeIndex;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all shrink-0 cursor-pointer ${isActive
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
              >
                <ItemIcon className="w-4 h-4" />
                <span>{item.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Detail Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="p-4 space-y-4 text-left"
          >
            <div>
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border ${activePillar.accentBg} ${activePillar.borderColor} ${activePillar.color}`}>
                {activePillar.badge}
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-2xl font-black text-white">{activePillar.title}</h3>
              <p className="text-sm font-bold text-indigo-400">{activePillar.tagline}</p>
              <p className="text-sm text-slate-300 leading-relaxed pt-1">
                {activePillar.description}
              </p>
            </div>

            <div className="space-y-2.5 pt-1">
              {activePillar.highlights.map((point, pidx) => (
                <div key={pidx} className="flex items-center gap-2.5 text-sm text-slate-200">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
