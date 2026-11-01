'use client';

import React from 'react';
import {
  Sun, Moon, PanelLeftClose, PanelLeftOpen,
  FolderGit2, Code2, FileText, Quote, Mail, User, Terminal
} from 'lucide-react';

interface PublicSidebarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (val: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export default function PublicSidebar({
  sidebarCollapsed,
  setSidebarCollapsed,
  activeTab,
  setActiveTab,
  isDarkMode,
  setIsDarkMode
}: PublicSidebarProps) {
  const navItems = [
    { id: 'about', label: 'Overview', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'skills', label: 'Tech Stack', icon: Code2 },
    { id: 'cv', label: 'Interactive Resume', icon: FileText },
    { id: 'testimonials', label: 'Feedback', icon: Quote },
    { id: 'contact', label: 'Connect', icon: Mail },
  ];

  const activeIndex = navItems.findIndex((item) => item.id === activeTab);

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      className={`
        hidden lg:flex fixed top-4 left-4 z-40 h-[calc(100vh-32px)] flex-col justify-between
        p-4 rounded-3xl transition-all duration-300 ease-in-out select-none
        backdrop-blur-2xl border shadow-2xl
        ${sidebarCollapsed ? 'w-20' : 'w-56'}
        ${isDarkMode
          ? 'bg-[#111114]/75 border-white/10 text-neutral-200 shadow-[0_20px_50px_rgba(0,0,0,0.6)]'
          : 'bg-white/70 border-white/40 text-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.08)]'}
      `}
    >
      {/* Header */}
      <div className="flex flex-col gap-6">
        <div className={`flex items-center px-2 ${sidebarCollapsed ? 'justify-center' : 'justify-start gap-2.5'}`}>
          <div className="p-1.5 rounded-xl bg-[#59B292]/10 text-[#59B292]">
            <Terminal className="w-4 h-4" />
          </div>
          {!sidebarCollapsed && (
            <span className="text-[10px] font-mono tracking-widest uppercase opacity-70 font-bold">
              Nik.<span className='text-[#59B292]'>dev</span>
            </span>
          )}
        </div>

        {/* Navigation List Container with Elevator */}
        <div className="relative">
          {activeIndex !== -1 && (
            <div
              className="absolute left-0 w-1 bg-[#59B292] rounded-r-full z-20 pointer-events-none will-change-transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_0_12px_rgba(89,178,146,0.6)]"
              style={{
                height: '40px',
                transform: `translate3d(0, ${activeIndex * 44}px, 0)`,
                top: '0px',
              }}
            />
          )}

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    relative w-full flex items-center group transition-all duration-200 rounded-md text-xs font-medium outline-none h-10
                    ${sidebarCollapsed ? 'justify-center p-3' : 'gap-3 px-3 py-2.5'}
                    ${isActive
                      ? isDarkMode
                        ? 'bg-white/15 text-white font-semibold shadow-inner'
                        : 'bg-black/5 text-neutral-900 font-semibold shadow-inner'
                      : isDarkMode
                        ? 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-black/5'}
                  `}
                >
                  <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-[#59B292]' : 'opacity-70 group-hover:opacity-100'}`} />

                  {!sidebarCollapsed && (
                    <span className="truncate tracking-tight">{item.label}</span>
                  )}

                  {sidebarCollapsed && (
                    <div className={`
                      absolute left-full ml-3 px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap
                      pointer-events-none opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0
                      transition-all duration-150 ease-out z-50 shadow-xl backdrop-blur-2xl border
                      ${isDarkMode ? 'bg-[#0a0a0c]/90 text-neutral-100 border-white/10' : 'bg-white/90 text-neutral-900 border-black/10'}
                    `}>
                      {item.label}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Controls */}
      <div className={`
        pt-3 border-t flex items-center gap-2 transition-colors duration-200 backdrop-blur-md
        ${isDarkMode ? 'border-white/10' : 'border-black/10'}
        ${sidebarCollapsed ? 'flex-col' : 'flex-row'}
      `}>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          aria-label="Toggle Theme"
          className={`
            p-2.5 rounded-md transition-all duration-150 flex items-center justify-center group relative outline-none
            ${sidebarCollapsed ? 'w-full' : 'flex-1'}
            ${isDarkMode
              ? 'bg-white/5 text-amber-400 hover:bg-white/10 border border-white/5'
              : 'bg-black/5 text-neutral-700 hover:bg-black/10 border border-black/5'}
          `}
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}

          {sidebarCollapsed && (
            <div className={`
              absolute left-full ml-3 px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap
              pointer-events-none opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0
              transition-all duration-150 ease-out z-50 shadow-xl backdrop-blur-2xl border
              ${isDarkMode ? 'bg-[#0a0a0c]/90 text-neutral-100 border-white/10' : 'bg-white/90 text-neutral-900 border-black/10'}
            `}>
              {isDarkMode ? 'Light' : 'Dark'}
            </div>
          )}
        </button>

        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          aria-label={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          className={`
            p-2.5 rounded-md transition-all duration-150 flex items-center justify-center group relative outline-none
            ${sidebarCollapsed ? 'w-full' : 'flex-1'}
            ${isDarkMode
              ? 'bg-white/5 text-neutral-400 hover:text-neutral-200 hover:bg-white/10 border border-white/5'
              : 'bg-black/5 text-neutral-600 hover:text-neutral-900 hover:bg-black/10 border border-black/5'}
          `}
        >
          {sidebarCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}

          {sidebarCollapsed && (
            <div className={`
              absolute left-full ml-3 px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap
              pointer-events-none opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0
              transition-all duration-150 ease-out z-50 shadow-xl backdrop-blur-2xl border
              ${isDarkMode ? 'bg-[#0a0a0c]/90 text-neutral-100 border-white/10' : 'bg-white/90 text-neutral-900 border-black/10'}
            `}>
              Expand
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}