'use client';

import React from 'react';
import { Copy } from 'lucide-react';
import { CVData } from '@/types';

interface HeroSectionProps {
  cvData: CVData;
  copyEmailToClipboard: () => void;
  isDarkMode: boolean;
}

export default function HeroSection({ cvData, copyEmailToClipboard, isDarkMode }: HeroSectionProps) {
  return (
    <section id="about" className="space-y-6 pt-4 sm:pt-10">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#59B292]/10 border border-[#59B292]/30 text-[#59B292] text-xs font-semibold max-w-full">
        <span className="w-2 h-2 rounded-full bg-[#59B292] animate-ping shrink-0"></span>
        <span className="truncate">Open for Roles & Contracts</span>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">{cvData.fullName}</h1>
        <p className="text-lg sm:text-2xl text-[#59B292] font-semibold">{cvData.title}</p>
      </div>

      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} max-w-2xl text-base sm:text-lg leading-relaxed`}>{cvData.summary}</p>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <a href="#projects" className="w-full sm:w-auto text-center px-6 py-3 rounded-xl bg-[#59B292] text-black font-bold hover:opacity-90 transition shadow-lg shadow-[#59B292]/20 text-sm">
          Explore Selected Work
        </a>
        <button 
          onClick={copyEmailToClipboard}
          className={`w-full sm:w-auto justify-center px-4 py-3 rounded-xl border text-sm font-semibold flex items-center gap-2 transition ${isDarkMode ? 'border-[#222222] bg-[#121212] hover:border-[#59B292]' : 'border-gray-300 bg-gray-50 hover:border-[#59B292]'}`}
        >
          <Copy className="w-4 h-4 text-[#59B292]" /> Copy Email
        </button>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <a 
            href={cvData.githubUrl || "https://github.com"}
            target="_blank" 
            rel="noreferrer"
            className={`flex-1 sm:flex-none p-3 rounded-xl border transition flex items-center justify-center ${isDarkMode ? 'border-[#222222] bg-[#121212] hover:border-[#59B292] text-gray-300' : 'border-gray-300 bg-gray-50 hover:border-[#59B292] text-gray-700'}`}
            title="GitHub Profile"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a 
            href={cvData.linkedinUrl || "https://www.linkedin.com/"}
            target="_blank" 
            rel="noreferrer"
            className={`flex-1 sm:flex-none p-3 rounded-xl border transition flex items-center justify-center ${isDarkMode ? 'border-[#222222] bg-[#121212] hover:border-[#59B292] text-gray-300' : 'border-gray-300 bg-gray-50 hover:border-[#59B292] text-gray-700'}`}
            title="LinkedIn Profile"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}