'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface LearnStudioLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export function LearnStudioLogo({
  size = 'md',
  showTagline = true
}: LearnStudioLogoProps) {
  const isLarge = size === 'lg';
  const isSmall = size === 'sm';

  return (
    <div className="flex items-center gap-3.5 group select-none">
      {/* CREATIVE ICON EMBLEM: RK CREST + DIGITAL STUDIO PORTAL */}
      <div className="relative shrink-0">
        {/* Ambient Gradient Glow */}
        <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 opacity-60 blur-md group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />

        {/* Outer Studio Emblem Chamber */}
        <div
          className={`relative rounded-2xl bg-slate-950 border border-cyan-500/30 p-1 flex items-center justify-center shadow-2xl overflow-hidden backdrop-blur-xl ${
            isLarge
              ? 'w-14 h-14'
              : isSmall
              ? 'w-10 h-10'
              : 'w-12 h-12'
          }`}
        >
          {/* Subtle Radial Mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:8px_8px] opacity-20 pointer-events-none" />

          {/* SVG High-Tech Orbital Rings */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none animate-[spin_40s_linear_infinite]"
            viewBox="0 0 48 48"
            fill="none"
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              stroke="url(#ringGrad)"
              strokeWidth="1"
              strokeDasharray="2 3"
              className="opacity-70"
            />
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>

          {/* Core Official R.K Coaching Logo */}
          <div className="relative w-full h-full rounded-xl bg-white/5 flex items-center justify-center p-0.5 overflow-hidden">
            <Image
              src="/images/logo.webp"
              alt="R.K Coaching Classes Logo"
              width={40}
              height={40}
              loading="lazy"
              className="object-contain w-full h-full drop-shadow-[0_2px_8px_rgba(6,182,212,0.5)] group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Floating AI Star Overlay Badge */}
          <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 border border-white flex items-center justify-center shadow-md shadow-cyan-500/40">
            <Sparkles className="w-2.5 h-2.5 text-white fill-white" />
          </div>
        </div>
      </div>

      {/* TYPOGRAPHY LOCKUP */}
      <div className="text-left">
        <div className="flex items-center gap-2">
          <span
            className={`font-black text-white tracking-tight ${
              isLarge
                ? 'text-2xl'
                : isSmall
                ? 'text-base'
                : 'text-xl'
            }`}
          >
            Learn
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Studio
            </span>
          </span>

          <span className="text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded-md bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20">
            2.0
          </span>
        </div>

        {showTagline && (
          <p className="text-[10px] text-slate-400 font-semibold flex items-center gap-1.5 pt-0.5">
            <span className="text-slate-300">By R.K Coaching Classes</span>
            <span className="inline-block w-1 h-1 rounded-full bg-cyan-400" />
            <span className="text-cyan-400 font-medium">Digital LMS</span>
          </p>
        )}
      </div>
    </div>
  );
}
