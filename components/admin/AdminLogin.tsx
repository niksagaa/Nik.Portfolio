'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sun, Moon, ArrowLeft, Eye, EyeOff, ShieldCheck, Terminal, Command, Mail, Lock } from 'lucide-react';

interface AdminLoginProps {
  pinInput: string;
  setPinInput: (val: string) => void;
  handleLogin: (e: React.FormEvent) => void;
  pinError: boolean;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export default function AdminLogin({
  pinInput,
  setPinInput,
  handleLogin,
  pinError,
  isDarkMode,
  setIsDarkMode,
}: AdminLoginProps) {
  const router = useRouter();
  const [emailInput, setEmailInput] = useState('admin@nik.dev');
  const [showPin, setShowPin] = useState(false);

  return (
    <div className={`min-h-screen grid grid-cols-1 lg:grid-cols-12 select-none transition-colors duration-300 font-sans ${
      isDarkMode ? 'bg-[#09090b] text-neutral-100' : 'bg-[#fafafa] text-neutral-900'
    }`}>
      
      {/* 1. LEFT BRANDING / CONSOLE PANEL (Desktop Only) */}
      <div className={`hidden lg:flex lg:col-span-5 flex-col justify-between p-12 relative overflow-hidden border-r ${
        isDarkMode 
          ? 'bg-[#0d0d11] border-neutral-800/80' 
          : 'bg-white border-neutral-200/80'
      }`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Top Branding */}
        <div className="flex items-center gap-2.5 relative z-10">
          <div className="p-2 rounded-xl bg-[#59B292]/10 border border-[#59B292]/20 text-[#59B292]">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="font-mono text-xs font-bold tracking-widest uppercase">
            nik<span className="text-[#59B292]">.dev</span>
          </span>
        </div>

        {/* Center Content Showcase */}
        <div className="relative z-10 space-y-4 my-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-medium border bg-[#59B292]/10 border-[#59B292]/20 text-[#59B292]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#59B292]" />
            Restricted Admin Studio
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
            Elevated Access <br />& Control Studio.
          </h2>
          <p className={`text-xs font-mono leading-relaxed max-w-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
            // Authenticate session to configure live portfolio assets, project repositories, and system variables.
          </p>
        </div>

        {/* Bottom Status Indicator */}
        <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <span>auth_gate_v2.0</span>
          <span className="flex items-center gap-1.5">
            <Command className="w-3 h-3 text-[#59B292]" />
            session_encrypted
          </span>
        </div>
      </div>

      {/* 2. RIGHT LOGIN FORM PANEL */}
      <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-12 relative">
        
        {/* Top Actions Bar */}
        <div className="flex items-center justify-between w-full max-w-md mx-auto lg:max-w-none">
          {/* Mobile Only Brand Label */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#59B292]" />
            <span className="font-mono text-xs font-bold tracking-wider uppercase">
              nik.dev
            </span>
          </div>

          <div className="ml-auto">
            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2.5 rounded-xl border transition-all duration-150 outline-none ${
                isDarkMode 
                  ? 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white' 
                  : 'border-neutral-200 bg-white text-neutral-600 hover:text-black shadow-sm'
              }`}
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Main Form Center */}
        <div className="w-full max-w-sm mx-auto my-auto py-10 space-y-6">
          <div className="space-y-1.5 text-left">
            <h1 className="text-2xl font-bold tracking-tight">
              Admin Access
            </h1>
            <p className={`text-xs ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Enter administrator email and passkey to manage portfolio data.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* EMAIL FIELD */}
            <div className="space-y-1.5">
              <label className={`text-[11px] font-mono uppercase tracking-wider font-semibold block ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Administrator Email
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-neutral-400 pointer-events-none">
                  <Mail className="w-4 h-4" />
                </span>
                <input 
                  type="email"
                  placeholder="admin@nik.dev"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-mono outline-none transition-all duration-150 ${
                    isDarkMode 
                      ? 'bg-[#121216] border-neutral-800 text-white placeholder-neutral-700 focus:border-[#59B292] focus:ring-1 focus:ring-[#59B292]' 
                      : 'bg-white border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-[#59B292] focus:ring-1 focus:ring-[#59B292] shadow-sm'
                  }`}
                />
              </div>
            </div>

            {/* SECURITY PIN FIELD */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <label className={`uppercase tracking-wider font-semibold ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  Security PIN
                </label>
                <span className="text-[#59B292] font-mono text-[10px]">Hint: 1234</span>
              </div>

              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-neutral-400 pointer-events-none">
                  <Lock className="w-4 h-4" />
                </span>
                <input 
                  type={showPin ? "text" : "password"}
                  placeholder="••••"
                  maxLength={10}
                  autoFocus
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm font-mono tracking-widest outline-none transition-all duration-150 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden ${
                    pinError 
                      ? 'border-red-500 bg-red-500/5' 
                      : isDarkMode 
                        ? 'bg-[#121216] border-neutral-800 text-white placeholder-neutral-700 focus:border-[#59B292] focus:ring-1 focus:ring-[#59B292]' 
                        : 'bg-white border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-[#59B292] focus:ring-1 focus:ring-[#59B292] shadow-sm'
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3.5 text-neutral-400 hover:text-neutral-200 transition-colors p-1 outline-none"
                  tabIndex={-1}
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {pinError && (
                <p className="text-[11px] text-red-500 font-mono pt-1">
                  [AUTH_ERROR] Incorrect PIN sequence.
                </p>
              )}
            </div>

            <button 
              type="submit" 
              className="w-full py-3 rounded-xl bg-[#59B292] text-neutral-950 font-bold text-xs uppercase tracking-wider font-mono hover:bg-[#4ea082] active:scale-[0.99] transition-all duration-150 flex items-center justify-center gap-2 outline-none shadow-sm"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Authenticate Session</span>
            </button>
          </form>
        </div>

        {/* Footer Navigation */}
        <div className="w-full max-w-sm mx-auto text-center">
          <button 
            type="button"
            onClick={() => router.push('/')} 
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-[#59B292] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> 
            <span>Back to portfolio</span>
          </button>
        </div>

      </div>
    </div>
  );
}