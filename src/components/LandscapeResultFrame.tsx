'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export interface BannerItem {
  src: string;
  alt: string;
}

// Any image added to public/images/banner can be listed here
const BANNER_LIST: BannerItem[] = [
  {
    src: '/images/banner/2022-2023.webp',
    alt: 'R.K. Coaching Star Achievers Announcement Balotra'
  }
];

export function LandscapeResultFrame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [imgError, setImgError] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = BANNER_LIST.length;
  const currentBanner = BANNER_LIST[currentIndex];

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto transition every 6 seconds if multiple banners exist
  useEffect(() => {
    if (isPaused || total <= 1) return;

    timerRef.current = setInterval(() => {
      handleNext();
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, handleNext, total]);

  if (!currentBanner || imgError) {
    return null;
  }

  return (
    <div className="w-full max-w-lg sm:max-w-xl mx-auto pt-6 pb-2">
      {/* Sleek Banner Frame Container (Compact & Proportional) */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl shadow-black/80 group"
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentBanner.src}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            drag={total > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, { offset }) => {
              if (total > 1) {
                if (offset.x < -30) handleNext();
                if (offset.x > 30) handlePrev();
              }
            }}
            className="relative w-full h-full flex items-center justify-center select-none"
          >
            {/* Ambient Blurred Backdrop */}
            <Image
              src={currentBanner.src}
              alt=""
              fill
              sizes="640px"
              aria-hidden="true"
              className="object-cover blur-2xl scale-110 opacity-35 pointer-events-none"
            />

            {/* Crisp Banner Image Displayed in Full (Never Cropped) */}
            <Image
              src={currentBanner.src}
              alt={currentBanner.alt}
              fill
              sizes="(max-width: 768px) 100vw, 640px"
              loading="lazy"
              className="relative object-contain z-10 p-2 sm:p-3"
              onError={() => setImgError(true)}
            />
          </motion.div>
        </AnimatePresence>

        {/* Minimal Subtle Navigation Arrows (Only if multiple banners) */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              title="Previous"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-950/40 hover:bg-slate-900/90 border border-white/10 hover:border-white/30 text-white/70 hover:text-white backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-xl cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              title="Next"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-950/40 hover:bg-slate-900/90 border border-white/10 hover:border-white/30 text-white/70 hover:text-white backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-xl cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Minimal Dot Indicators */}
            <div className="absolute bottom-2 inset-x-0 z-20 flex items-center justify-center gap-1.5">
              {BANNER_LIST.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex
                      ? 'w-5 bg-indigo-500 shadow-sm shadow-indigo-500/50'
                      : 'w-1.5 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
