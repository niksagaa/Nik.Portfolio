'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ExtendedProject, Skill, CVData, Testimonial } from '@/types';
import { CheckCircle, Menu, X, Sun, Moon } from 'lucide-react';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ProfileEditor from '@/components/admin/ProfileEditor';
import ProjectsEditor from '@/components/admin/ProjectsEditor';
import SkillsEditor from '@/components/admin/SkillsEditor';
import TestimonialsEditor from '@/components/admin/TestimonialsEditor';
import Link from 'next/link';

export default function AdminStudio() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);

  const [mounted, setMounted] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [toast, setToast] = useState<string | null>(null);

  const [cvData, setCvData] = useState<CVData>({
    fullName: "Dominic",
    title: "Jr Website Developer",
    email: "sgnickk@gmail.com",
    phone: "+63 977 777 7777",
    summary: "Frontend-focused Engineer with 3+ years of hands-on experience building fast, accessible, and maintainable web applications.",
    experience: [],
    education: []
  });

  const [projects, setProjects] = useState<ExtendedProject[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    setMounted(true);
    const authStatus = sessionStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }

    const savedProj = localStorage.getItem('app_projects');
    const savedSkills = localStorage.getItem('app_skills');
    const savedTestimonials = localStorage.getItem('app_testimonials');

    if (savedProj) setProjects(JSON.parse(savedProj));
    if (savedSkills) setSkills(JSON.parse(savedSkills));
    if (savedTestimonials) setTestimonials(JSON.parse(savedTestimonials));
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

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
      const saved = localStorage.getItem('admin_sidebar_collapsed');
      if (saved !== null) {
        return JSON.parse(saved);
      }
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_sidebar_collapsed', JSON.stringify(sidebarCollapsed));
    }
  }, [sidebarCollapsed]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setPinError(false);
      showToast("Welcome to Admin Studio!");
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    router.push('/');
  };

  if (!mounted) return null;

  if (!isAuthenticated) {
    return (
      <AdminLogin
        pinInput={pinInput}
        setPinInput={setPinInput}
        handleLogin={handleLogin}
        pinError={pinError}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
    );
  }

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
            <span className="font-bold text-xs tracking-tight">Dominic Saga</span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400">Website Developer</span>
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
        <div className={`lg:hidden fixed inset-x-0 top-[57px] z-40 border-b p-4 space-y-2 shadow-2xl ${isDarkMode ? 'bg-[#121212] border-[#222222]' : 'bg-gray-100 border-gray-200'}`}>
          <button onClick={() => { setActiveTab('profile'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold">Profile & CV</button>
          <button onClick={() => { setActiveTab('projects'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold">Manage Projects</button>
          <button onClick={() => { setActiveTab('skills'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold">Manage Skills</button>
          <button onClick={() => { setActiveTab('testimonials'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold">Testimonials</button>
          <button onClick={handleLogout} className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-red-500">Exit to Portfolio</button>
        </div>
      )}

      {/* FLOATING SIDEBAR */}
      <div className="hidden lg:block fixed left-4 top-4 z-40">
        <AdminSidebar
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onLogout={handleLogout}
        />
      </div>

      {/* MAIN CONTAINER */}
      <main className="min-h-screen overflow-y-auto p-4 sm:p-8 pt-20 lg:pt-8 pl-6 lg:pl-28 flex justify-center">
        <div className="w-full max-w-4xl space-y-12">

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b pb-4 border-[#222222]/30">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Admin Content Studio</h1>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Manage and upload information live to your public portfolio.</p>
            </div>
           <Link
  href="/"
  className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl bg-[#59B292] text-black font-bold text-xs flex items-center gap-2 hover:opacity-90 transition shrink-0 shadow-lg shadow-[#59B292]/10"
>
  View Live Website
</Link>
          </div>

          {activeTab === 'profile' && (
            <ProfileEditor
              cvData={cvData}
              setCvData={setCvData}
              showToast={showToast}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsEditor
              projects={projects}
              setProjects={setProjects}
              showToast={showToast}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === 'skills' && (
            <SkillsEditor
              skills={skills}
              setSkills={setSkills}
              showToast={showToast}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === 'testimonials' && (
            <TestimonialsEditor
              testimonials={testimonials}
              setTestimonials={setTestimonials}
              showToast={showToast}
              isDarkMode={isDarkMode}
            />
          )}

        </div>
      </main>
    </div>
  );
}