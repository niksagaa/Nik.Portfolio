'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ExtendedProject, Skill, CVData, Testimonial } from '@/types';
import { CheckCircle, Menu, X, Sun, Moon } from 'lucide-react';
import PublicSidebar from '@/components/public/PublicSidebar';
import HeroSection from '@/components/public/HeroSection';
import ProjectsSection from '@/components/public/ProjectsSection';
import SkillsSection from '@/components/public/SkillsSection';
import CVSection from '@/components/public/CVSection';
import TestimonialsSection from '@/components/public/TestimonialsSection';
import ContactSection from '@/components/public/ContactSection';
import {
  getProfileFromDB,
  getSkills,
  getEducationFromDB,
  getExperienceFromDB,
  getProjectInfoFromDB
} from '@/services/publicdata/personalinfo';
import {
  comment,
  getApprovedComments
} from '@/services/publicdata/testimonials'

export default function PublicPortfolio() {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('about');
  const [toast, setToast] = useState<string | null>(null);

  const [projects, setProjects] = useState<ExtendedProject[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const [cvData, setCvData] = useState<CVData | null>(null);

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newRating, setNewRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('portfolio_theme');
      if (savedTheme !== null) {
        return JSON.parse(savedTheme);
      }
    }
    return true;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_theme', JSON.stringify(isDarkMode));
    }
  }, [isDarkMode]);

  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebar_collapsed');
      if (saved !== null) {
        return JSON.parse(saved);
      }
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebar_collapsed', JSON.stringify(sidebarCollapsed));
    }
  }, [sidebarCollapsed]);

  useEffect(() => {
    setMounted(true);

    async function loadPortfolioData() {
      try {
        const profile = await getProfileFromDB();
        if (profile) {
          setCvData({
            fullName: profile.full_name || '',
            title: profile.job_title || '',
            email: profile.email || '',
            phone: profile.phone || '',
            summary: profile.bio || '',
            githubUrl: profile.github_url || '',
            linkedinUrl: profile.linkedin_url || '',
            experience: await getExperienceFromDB() || [],
            education: await getEducationFromDB() || []
          });
        }

        const fetchedSkills = await getSkills();
        if (fetchedSkills && fetchedSkills.length > 0) {
          setSkills(fetchedSkills);
        }

        const fetchedProjects = await getProjectInfoFromDB();
        if (fetchedProjects && fetchedProjects.length > 0) {
          setProjects(fetchedProjects);
        }

        const fetchedTestimonials = await getApprovedComments();
        if (fetchedTestimonials && fetchedTestimonials.length > 0) {
          setTestimonials(fetchedTestimonials);
        } else {
          const savedTestimonials = localStorage.getItem('app_testimonials');
          if (savedTestimonials) {
            setTestimonials(JSON.parse(savedTestimonials));
          }
        }

      } catch (error: any) {
        console.error("Error loading portfolio data from DB:", error?.message || error);
        const savedProj = localStorage.getItem('app_projects');
        const savedSkills = localStorage.getItem('app_skills');
        const savedTestimonials = localStorage.getItem('app_testimonials');
        if (savedProj) setProjects(JSON.parse(savedProj));
        if (savedSkills) setSkills(JSON.parse(savedSkills));
        if (savedTestimonials) setTestimonials(JSON.parse(savedTestimonials));
      }
    }

    loadPortfolioData();
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('app_testimonials', JSON.stringify(testimonials));
    }
  }, [testimonials, mounted]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

        e.preventDefault();
        router.push('/admin/login');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const copyEmailToClipboard = () => {
    if (cvData?.email) {
      navigator.clipboard.writeText(cvData.email);
      showToast("Email address copied to clipboard!");
    }
  };

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newMessage.trim() || !newRole.trim()) return;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    const newEntry: Testimonial = {
      id: "t_" + Date.now(),
      name: newName,
      role: newRole || "Client / Colleague",
      message: newMessage,
      rating: newRating,
      date: formattedDate
    };
    try {
      await comment(newEntry);
      setTestimonials([newEntry, ...testimonials]);
      setNewName('');
      setNewRole('');
      setNewMessage('');
      setNewRating(5);
      showToast("Testimonial submitted successfully!");
    } catch (error: any) {
      console.error("Error submitting testimonial:", error);
      showToast("Failed to submit testimonial.");
    }
  };

  const currentYear = mounted ? new Date().getFullYear() : 2026;

  if (!mounted || !cvData) return null;

  return (
    <div className={`min-h-screen relative transition-colors duration-400 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-[#59B292] text-black font-semibold px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 text-sm max-w-[90vw]">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* MOBILE TOP BAR */}
      <header className={`lg:hidden fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md flex items-center justify-between px-4 py-3 ${isDarkMode ? 'bg-black/80 border-[#222222]' : 'bg-white/80 border-gray-200'}`}>
        <div className="flex items-center gap-3 group cursor-pointer select-none">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-gray-200 dark:border-[#333333] shadow-xs">
            <img
              src="/path-to-your-image.jpg"
              alt="Profile"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#59B292] border-2 border-white dark:border-[#121212]" />
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-xs tracking-tight">{cvData.fullName}</span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400">{cvData.title}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2.5 rounded-xl border transition flex items-center justify-center ${isDarkMode
              ? 'border-[#222222] text-yellow-400 hover:bg-white/5'
              : 'border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 stroke-[1.5]" /> : <Moon className="w-4 h-4 stroke-[1.5]" />}
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`p-2 rounded-lg transition ${isDarkMode ? 'bg-[#222222] text-white' : 'bg-gray-200 text-black'}`}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* MOBILE DROPDOWN MENU */}
      {mobileMenuOpen && (
        <div className={`lg:hidden fixed inset-x-0 top-14.25 z-40 border-b p-4 space-y-2 shadow-2xl ${isDarkMode ? 'bg-[#121212] border-[#222222]' : 'bg-gray-100 border-gray-200'}`}>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>About</a>
          <a href="#projects" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Projects</a>
          <a href="#skills" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tech Stack</a>
          <a href="#cv" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>CV Inspector</a>
          <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Testimonials</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Contact</a>
        </div>
      )}

      {/* FLOATING PUBLIC SIDEBAR */}
      <div className="hidden lg:block fixed left-4 top-4 z-40">
        <PublicSidebar
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
      </div>

      {/* MAIN CONTAINER */}
      <main className="min-h-screen overflow-y-auto p-4 sm:p-8 pt-20 lg:pt-8 pl-6 lg:pl-28 flex justify-center">
        <div className="w-full max-w-5xl space-y-16 sm:space-y-20">

          <HeroSection
            cvData={cvData}
            copyEmailToClipboard={copyEmailToClipboard}
            isDarkMode={isDarkMode}
          />

          <ProjectsSection
            projects={projects}
            isDarkMode={isDarkMode}
          />

          <SkillsSection
            skills={skills}
            isDarkMode={isDarkMode}
          />

          <CVSection
            cvData={cvData}
            isDarkMode={isDarkMode}
          />

          <TestimonialsSection
            testimonials={testimonials}
            newName={newName}
            setNewName={setNewName}
            newRole={newRole}
            setNewRole={setNewRole}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            newRating={newRating}
            setNewRating={setNewRating}
            hoverRating={hoverRating}
            setHoverRating={setHoverRating}
            handleAddTestimonial={handleAddTestimonial}
            isDarkMode={isDarkMode}
          />

          <ContactSection
            isDarkMode={isDarkMode}
            showToast={showToast}
          />

          <footer className={`py-8 border-t text-center text-xs ${isDarkMode ? 'border-[#222222] text-gray-500' : 'border-gray-200 text-gray-500'}`}>
            <p
              className="cursor-pointer select-none hover:opacity-80"
              onClick={(e) => {
                if (e.detail === 3) {
                  router.push('/admin');
                }
              }}
              title="Triple-click here to access Admin Studio"
            >
              © {currentYear} {cvData.fullName}. All rights reserved.
            </p>
          </footer>

        </div>
      </main>
    </div>
  );
}