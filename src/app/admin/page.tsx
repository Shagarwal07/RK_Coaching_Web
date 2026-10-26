'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Upload, CheckCircle2, AlertTriangle, Crop, RotateCcw, ArrowLeft } from 'lucide-react';

export default function AdminPage() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [originalDims, setOriginalDims] = useState<{ width: number; height: number } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [croppedPreview, setCroppedPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const minWidth = 400;
  const minHeight = 500;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    setCroppedPreview(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const src = readerEvent.target?.result as string;
      const img = new Image();
      img.onload = () => {
        if (img.width < minWidth || img.height < minHeight) {
          setErrorMessage(
            `Image resolution (${img.width}×${img.height}px) is too low. Required minimum resolution is ${minWidth}×${minHeight}px.`
          );
          setSelectedFile(null);
          setOriginalDims(null);
          return;
        }

        setSelectedFile(src);
        setOriginalDims({ width: img.width, height: img.height });
        autoCrop4by5(img);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const autoCrop4by5 = (img: HTMLImageElement) => {
    const canvas = document.createElement('canvas');
    const targetAspect = 4 / 5;
    const imageAspect = img.width / img.height;

    let cropWidth = img.width;
    let cropHeight = img.height;
    let cropX = 0;
    let cropY = 0;

    if (imageAspect > targetAspect) {
      cropWidth = Math.round(img.height * targetAspect);
      cropX = Math.round((img.width - cropWidth) / 2);
    } else {
      cropHeight = Math.round(img.width / targetAspect);
      cropY = Math.round((img.height - cropHeight) * 0.15);
      if (cropY < 0) cropY = 0;
      if (cropY + cropHeight > img.height) {
        cropY = img.height - cropHeight;
      }
    }

    const exportWidth = Math.max(cropWidth, 800);
    const exportHeight = Math.round(exportWidth * (5 / 4));
    canvas.width = exportWidth;
    canvas.height = exportHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(
      img,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      exportWidth,
      exportHeight
    );

    const croppedData = canvas.toDataURL('image/jpeg', 0.92);
    setCroppedPreview(croppedData);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setOriginalDims(null);
    setCroppedPreview(null);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 sm:p-12">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to RK Coaching Balotra</span>
          </Link>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            Internal Utility
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h1 className="text-lg font-bold flex items-center gap-2 text-white">
                <Crop className="w-5 h-5 text-indigo-400" />
                <span>Achiever Photo Cropper (4:5 Ratio)</span>
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Upload student portraits to automatically apply 4:5 top-focused cropping.
              </p>
            </div>
            {selectedFile && (
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />

          {!selectedFile && (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-10 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors bg-slate-950/40 hover:bg-slate-950/70 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Upload className="w-7 h-7" />
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">
                  Click to select student photo
                </span>
                <span className="text-xs text-slate-400 block mt-1">
                  PNG, JPG, or WebP • Min resolution {minWidth}×{minHeight}px
                </span>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {croppedPreview && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Cropped to 4:5 Ratio</span>
                </span>
                {originalDims && (
                  <span className="text-[11px] text-slate-400 font-mono">
                    Source: {originalDims.width}×{originalDims.height}px
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-5 items-center bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <div className="w-36 aspect-[4/5] rounded-xl overflow-hidden bg-slate-950 border border-slate-700 relative shadow-xl shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={croppedPreview}
                    alt="4:5 Cropped Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0f172a] to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2 text-[9px] font-bold text-white bg-indigo-600 px-2 py-0.5 rounded">
                    4:5 Cropped
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <p className="text-slate-300 leading-relaxed">
                    Portrait is cropped with top 15% focal alignment to protect forehead and hair margins.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={croppedPreview}
                      download="student-achiever-4x5.jpg"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-lg shadow-indigo-600/30 inline-block"
                    >
                      Download Cropped JPG
                    </a>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      Upload Different Photo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
