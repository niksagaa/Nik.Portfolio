'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 sm:p-10 rounded-3xl border border-[#222222] bg-[#121212]/80 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        
        {/* Glow effect */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#59B292]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-16 h-16 rounded-2xl bg-[#59B292]/10 border border-[#59B292]/30 flex items-center justify-center mx-auto text-[#59B292] shadow-inner">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Page Not Found</h1>
          <p className="text-xs text-gray-400 leading-relaxed">
            The page you are looking for does not exist, was removed, or you typed the wrong URL.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#59B292] text-black font-bold text-sm hover:opacity-90 active:scale-[0.99] transition-all duration-200 shadow-lg shadow-[#59B292]/20"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Portfolio Home
        </Link>
      </div>
    </div>
  );
}