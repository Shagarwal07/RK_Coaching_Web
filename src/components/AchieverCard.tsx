'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Trophy, Award } from 'lucide-react';

export interface SubjectScore {
  label: string;
  value: string;
}

export interface AchieverCardProps {
  photo?: string | null;
  name: string;
  rank?: string;
  boardScore: string;
  subjects?: SubjectScore[];
  year?: string;
  className?: string;
}

export function AchieverCard({
  photo,
  name,
  rank = 'Board Achiever',
  boardScore,
  subjects = [],
  year,
  className = '',
}: AchieverCardProps) {
  const [imgError, setImgError] = useState(false);

  // Reset error status when photo source changes
  React.useEffect(() => {
    setImgError(false);
  }, [photo]);

  // Initials for avatar fallback (shown when photo is missing or fails to load)
  const initials = useMemo(() => {
    if (!name) return 'RK';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }, [name]);

  const getRankBadgeStyle = (rankText: string) => {
    const lower = rankText.toLowerCase();
    if (lower.includes('1st') || lower.includes('top')) {
      return 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-amber-500/30';
    }
    if (lower.includes('2nd')) {
      return 'bg-gradient-to-r from-slate-200 to-slate-400 text-slate-950 shadow-slate-400/20';
    }
    if (lower.includes('3rd')) {
      return 'bg-gradient-to-r from-amber-700 to-orange-600 text-white shadow-orange-600/20';
    }
    return 'bg-indigo-600 text-white shadow-indigo-600/30';
  };

  // Reusable Premium Fallback Component (shown when photo is missing or fails to load)
  const renderFallbackAvatar = () => (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950/60 to-slate-900 text-white p-5 select-none z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18)_0%,transparent_70%)]" />
      
      {/* Subtle Avatar Ring */}
      <div className="relative mb-2.5">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[2px] shadow-2xl shadow-indigo-500/30">
          <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center backdrop-blur-sm">
            <span className="text-xl sm:text-2xl font-black tracking-widest text-white drop-shadow">
              {initials}
            </span>
          </div>
        </div>
      </div>

      <span className="relative z-10 text-xs sm:text-sm font-extrabold text-slate-100 text-center tracking-tight line-clamp-1 max-w-[200px]">
        {name}
      </span>
      <span className="mt-1 text-[9px] font-bold text-indigo-300 uppercase tracking-widest bg-indigo-500/20 px-2.5 py-0.5 rounded-full border border-indigo-500/30">
        Board Topper
      </span>
    </div>
  );

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`group relative bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col ${className}`}
    >
      {/* ======================================================== */}
      {/* 1. BALANCED PORTRAIT CONTAINER (h-56 sm:h-64, 50% 18%)   */}
      {/* ======================================================== */}
      <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-slate-950 select-none">
        {(!photo || imgError) ? (
          renderFallbackAvatar()
        ) : (
          <div className="relative w-full h-full">
            <Image
              src={photo}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              className="object-cover transition-transform duration-500 group-hover:scale-105 z-10"
              style={{ objectPosition: '50% 18%' }}
              onError={() => setImgError(true)}
            />
          </div>
        )}

        {/* Smooth Bottom Gradient Fade */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent pointer-events-none z-20" />

        {/* High-Contrast Frosted Year Badge (Top-Right) */}
        {year && (
          <div className="absolute top-2.5 right-2.5 z-20 bg-slate-950/85 backdrop-blur-md text-[9px] font-bold px-2 py-0.5 rounded-full border border-white/20 text-white flex items-center gap-1 shadow-lg">
            <Trophy className="w-2.5 h-2.5 text-amber-400" />
            <span>{year}</span>
          </div>
        )}

        {/* High-Contrast RANK Badge (Bottom-Left of Image) */}
        {rank && (
          <div
            className={`absolute bottom-2 left-2 z-20 text-[10px] sm:text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-lg uppercase tracking-wider flex items-center gap-1 border border-white/15 ${getRankBadgeStyle(
              rank
            )}`}
          >
            <Award className="w-3 h-3" />
            <span>{rank}</span>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 2. COMPACT DETAILS: NAME, BOARD SCORE, SUBJECT BREAKDOWN  */}
      {/* ======================================================== */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between gap-2.5 text-left bg-slate-900/40">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
            Class 10th Board Achiever
          </span>
          <h4 className="font-extrabold text-white text-base sm:text-lg group-hover:text-indigo-400 transition-colors tracking-tight line-clamp-1">
            {name}
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1 flex items-baseline gap-1.5">
            <span>Board Score:</span>
            <strong className="text-emerald-400 font-black text-sm sm:text-base tracking-wide">
              {boardScore}
            </strong>
          </p>
        </div>

        {/* Subject Scores Pill Grid */}
        {subjects.length > 0 && (
          <div className="border-t border-slate-800/80 pt-2 flex items-center justify-between gap-1.5 text-xs">
            {subjects.map((sub) => (
              <div
                key={sub.label}
                className="flex-1 text-center bg-slate-950/70 px-2 py-1 rounded-lg border border-slate-800"
              >
                <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider">
                  {sub.label}
                </span>
                <span className="text-slate-200 font-extrabold text-xs block mt-0.5">
                  {sub.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
