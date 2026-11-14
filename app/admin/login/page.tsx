'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sun, Moon, ArrowLeft, Eye, EyeOff, ShieldCheck, Terminal, Command, Mail, Lock } from 'lucide-react';
import { login } from '@/services/profileServices/login';
import { createClient } from '@/utils/supabase/client';

export default function AdminLogin() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(true); // Sariling state para sa theme toggle
  const [emailInput, setEmailInput] = useState('sgnickk@gmail.com');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient()
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  
  useEffect(() => {
    const checkActiveSession = async () => {
      const {data: {session}} = await supabase.auth.getSession()
      if(session){
        router.replace('admin/dashboard')
      }else{
        setIsCheckingSession(false)
      }
    }
    checkActiveSession()

    const {data: {subscription}} = supabase.auth.onAuthStateChange((event, session) => {
      if(session){
        router.replace('admin/dashboard')
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  },[router,supabase])

  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center font-mono text-xs">
        // Verifying session state...
      </div>
    );
  }
  
  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    const success = await login(emailInput, passwordInput);

    setIsLoading(false);

    if (success) {
      router.push('/admin/dashboard');
      router.refresh();
    } else {
      setErrorMessage('[AUTH_ERROR] Incorrect credentials.');
    }
  };

  return (
    <div className={`min-h-screen grid grid-cols-1 lg:grid-cols-12 select-none transition-colors duration-300 font-sans ${
      isDarkMode ? 'bg-[#09090b] text-neutral-100' : 'bg-[#fafafa] text-neutral-900'
    }`}>

      {/* LEFT BRANDING PANEL */}
      <div className={`hidden lg:flex lg:col-span-5 flex-col justify-between p-12 relative overflow-hidden border-r ${
        isDarkMode ? 'bg-[#0d0d11] border-neutral-800/80' : 'bg-white border-neutral-200/80'
      }`}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size[24px_24px] pointer-events-none" />

        <div className="flex items-center gap-2.5 relative z-10">
          <div className="p-2 rounded-xl bg-[#59B292]/10 border border-[#59B292]/20 text-[#59B292]">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="font-mono text-xs font-bold tracking-widest uppercase">
            nik<span className="text-[#59B292]">.dev</span>
          </span>
        </div>

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

        <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <span>auth_gate_v2.0</span>
          <span className="flex items-center gap-1.5">
            <Command className="w-3 h-3 text-[#59B292]" />
            session_encrypted
          </span>
        </div>
      </div>

      {/* RIGHT LOGIN FORM PANEL */}
      <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-12 relative">

        <div className="flex items-center justify-between w-full max-w-md mx-auto lg:max-w-none">
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

        <div className="w-full max-w-sm mx-auto my-auto py-10 space-y-6">
          <div className="space-y-1.5 text-left">
            <h1 className="text-2xl font-bold tracking-tight">
              Admin Access
            </h1>
            <p className={`text-xs ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Enter administrator email and password to manage portfolio data.
            </p>
          </div>

          <form onSubmit={onSubmitForm} className="space-y-4">

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
                  placeholder="sgnickk@gmail.com"
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

            {/* PASSWORD FIELD */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <label className={`uppercase tracking-wider font-semibold ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  Password
                </label>
              </div>

              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-neutral-400 pointer-events-none">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPin ? "text" : "password"}
                  placeholder="••••••••"
                  maxLength={50}
                  required
                  autoFocus
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm font-mono tracking-widest outline-none transition-all duration-150 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden ${
                    errorMessage 
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

              {errorMessage && (
                <p className="text-[11px] text-red-500 font-mono pt-1">
                  {errorMessage}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[#59B292] text-neutral-950 font-bold text-xs uppercase tracking-wider font-mono hover:bg-[#4ea082] active:scale-[0.99] transition-all duration-150 flex items-center justify-center gap-2 outline-none shadow-sm disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isLoading ? 'Authenticating...' : 'Authenticate Session'}</span>
            </button>
          </form>
        </div>

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