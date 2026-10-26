'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Check,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { getAcademicSession } from '@/data/landingData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EnrollModal({ isOpen, onClose }: EnrollModalProps) {
  const [formData, setFormData] = useState({
    studentName: '',
    parentPhone: '',
    targetClass: 'Class 10th (CBSE / RBSE Board Batch)',
    subjectFocus: 'Complete Foundation (Maths + Science)',
    schoolName: '',
    referenceDetail: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [validationError, setValidationError] = useState('');
  const academicSession = useMemo(() => getAcademicSession(), []);

  // Close on Escape key press & prevent background scroll
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // 1. Bot trap: reject silently if honeypot was filled
    if (honeypot) return;

    if (!formData.studentName.trim() || !formData.parentPhone.trim()) {
      setValidationError('Please enter both student name and WhatsApp number.');
      return;
    }

    // 2. Strict 10-digit Indian phone validation (must start with 6, 7, 8, or 9)
    const cleanPhone = formData.parentPhone.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setValidationError('Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.');
      return;
    }

    // 3. Rate limiting: 30-second cooldown via sessionStorage
    if (typeof window !== 'undefined') {
      const lastEnrollTime = sessionStorage.getItem('last_enroll_time');
      const now = Date.now();
      if (lastEnrollTime && now - parseInt(lastEnrollTime, 10) < 30000) {
        const remainingSeconds = Math.ceil((30000 - (now - parseInt(lastEnrollTime, 10))) / 1000);
        setValidationError(`Please wait ${remainingSeconds}s before submitting another application.`);
        return;
      }
      sessionStorage.setItem('last_enroll_time', now.toString());
    }

    const message =
      `*Offline Classroom Admission Application*\n` +
      `👤 *Student Name:* ${formData.studentName.trim()}\n` +
      `📞 *Parent Contact:* ${cleanPhone}\n` +
      `🏫 *Target Class:* ${formData.targetClass}\n` +
      `📚 *Subjects:* ${formData.subjectFocus}\n` +
      `🏢 *Current School:* ${formData.schoolName.trim() || 'Balotra'}\n` +
      `🤝 *Reference Detail:* ${formData.referenceDetail.trim() || 'Direct / None'}\n\n` +
      `_Submitted via R.K Coaching Platform (rkcoachingrajasthan.in)_`;

    window.open(
      `https://api.whatsapp.com/send?phone=919414668795&text=${encodeURIComponent(message)}`,
      '_blank'
    );
    setFormSubmitted(true);
  };

  const handleReset = () => {
    setFormSubmitted(false);
    setHoneypot('');
    setValidationError('');
    setFormData({
      studentName: '',
      parentPhone: '',
      targetClass: 'Class 10th (CBSE / RBSE Board Batch)',
      subjectFocus: 'Complete Foundation (Maths + Science)',
      schoolName: '',
      referenceDetail: ''
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* Backdrop Overlay with ambient depth */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
          />

          {/* Modal Card - Cool Ultra-Premium Glass Surface */}
          {/* Modal Card - Clean Minimalist Surface */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="relative w-full max-w-md bg-gradient-to-b from-slate-900/98 to-slate-950/98 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] p-4 sm:p-6 z-10 my-auto text-left overflow-hidden ring-1 ring-white/5"
          >
            {/* Ambient Multi-Color Glow Spheres */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Glowing Top Hairline Accent */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 via-emerald-400 to-transparent pointer-events-none" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-slate-400 hover:text-white border border-white/10 transition-all z-20 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 sm:py-8 space-y-3.5"
              >
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                  <Check className="w-7 h-7 stroke-[2.5]" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    Application Sent
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                    Opening WhatsApp...
                  </h3>
                  <p className="text-slate-300 text-xs max-w-sm mx-auto leading-relaxed">
                    Details are pre-filled directly for <strong>Rakesh Sir (+91 9414668795)</strong> for demo class allocation in Balotra.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-3.5 py-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-all border border-slate-700 cursor-pointer"
                  >
                    Send Another
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/30 cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            ) : (
              <div>
                {/* Minimal Header */}
                <div className="pb-3 border-b border-slate-800/80 pr-7 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-[10px] font-bold tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Admissions Open {academicSession}</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                      • 15–20 seats/batch
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                    Classroom Batch Enrollment
                  </h3>
                  <p className="text-slate-400 text-xs">
                    Direct 1-step offline admission inquiry to faculty mentors.
                  </p>
                </div>

                {/* Minimal Form */}
                <form onSubmit={handleEnrollSubmit} className="space-y-3 pt-3">
                  {/* Honeypot Input for Bot Protection */}
                  <input
                    type="text"
                    name="website_url_check"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {/* Validation Error Banner */}
                  {validationError && (
                    <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-shake">
                      <span>⚠️ {validationError}</span>
                    </div>
                  )}

                  {/* Student Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">
                      Student Full Name <span className="text-pink-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  {/* WhatsApp Contact with +91 Country Pill */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">
                      WhatsApp Contact <span className="text-pink-400">*</span>
                    </label>
                    <div className="flex items-center rounded-xl bg-slate-950/70 border border-slate-800 focus-within:border-emerald-500 overflow-hidden">
                      <span className="pl-3 pr-2 text-xs font-bold font-mono text-emerald-400/90 select-none border-r border-slate-800/80 py-1">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="98765 43210"
                        value={formData.parentPhone}
                        onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                        className="w-full px-2.5 py-2 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  {/* Target Standard / Class */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">
                      Target Standard / Class <span className="text-pink-400">*</span>
                    </label>
                    <div className="relative flex items-center rounded-xl bg-slate-950/70 border border-slate-800 focus-within:border-indigo-500 overflow-hidden">
                      <select
                        value={formData.targetClass}
                        onChange={(e) => setFormData({ ...formData, targetClass: e.target.value })}
                        className="w-full px-3 py-2 bg-transparent text-xs sm:text-sm text-white focus:outline-none appearance-none cursor-pointer pr-9"
                      >
                        <option value="Class 10th (CBSE / RBSE Board Batch)" className="bg-slate-900 text-white">Class 10th — CBSE / RBSE Board Batch</option>
                        <option value="Class 10th (Class IX Topper Scholarship - Flat 10% Off)" className="bg-slate-900 text-amber-300">Class 10th — Class IX Topper Scholarship (Flat 10% Off)</option>
                        <option value="Class 9th (CBSE / RBSE Foundation)" className="bg-slate-900 text-white">Class 9th — Foundation Batch</option>
                        <option value="Class 8th (CBSE / RBSE Foundation)" className="bg-slate-900 text-white">Class 8th — Foundation Batch</option>
                        <option value="Class 6th–7th Foundation" className="bg-slate-900 text-white">Class 6th &amp; 7th — Foundation Batch</option>
                        <option value="Primary Foundation (Playgroup to Class 5th)" className="bg-slate-900 text-white">Primary Foundation (Playgroup to 5th)</option>
                      </select>
                      <div className="absolute right-3 pointer-events-none text-slate-400">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-white" />
                      <span>Submit Application via WhatsApp</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Minimal 1-Line Reassurance */}
                  <p className="text-[11px] text-center text-slate-400 pt-1">
                    Direct message to Rakesh Sir • Offline Center, Balotra
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
