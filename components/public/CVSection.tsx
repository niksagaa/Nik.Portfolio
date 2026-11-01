'use client';

import React from 'react';
import { FileText, Printer } from 'lucide-react';
import { CVData } from '@/types';

interface CVSectionProps {
    cvData: CVData;
    isDarkMode: boolean;
}

export default function CVSection({ cvData, isDarkMode }: CVSectionProps) {
    return (
        <section id="cv" className="space-y-6 sm:space-y-8 pt-6 sm:pt-10">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                        <FileText className="text-[#59B292] shrink-0" /> Curriculum Vitae
                    </h2>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mt-1`}>Quantifiable work history, education, and credentials.</p>
                </div>
                <button onClick={() => window.print()} className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl bg-[#59B292] text-black font-bold text-sm flex items-center gap-2 hover:opacity-90 transition shrink-0">
                    <Printer className="w-4 h-4" /> Print / Save PDF
                </button>
            </div>

            <div className={`p-5 sm:p-8 rounded-2xl border space-y-8 ${isDarkMode ? 'bg-[#121212] border-[#222222]' : 'bg-gray-50 border-gray-200 shadow-sm'}`}>
                <div className={`border-b pb-6 flex flex-col sm:flex-row justify-between items-start gap-4 ${isDarkMode ? 'border-[#222222]' : 'border-gray-200'}`}>
                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold">{cvData.fullName}</h3>
                        <p className="text-[#59B292] font-semibold text-sm">{cvData.title}</p>
                    </div>
                    <div className={`text-left sm:text-right text-xs space-y-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <p>{cvData.email}</p>
                        <p>{cvData.phone}</p>
                        <p>{cvData.location}</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#59B292]">Quantified Experience</h4>
                    {cvData.experience.map((exp, idx) => (
                        <div key={idx} className="space-y-2">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 text-sm">
                                <span className="font-bold">
                                    {exp.role} — <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{exp.company}</span>
                                </span>
                                <span className="text-xs text-[#59B292] font-mono font-semibold">{exp.period}</span>
                            </div>
                            <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{exp.details}</p>
                        </div>
                    ))}
                </div>

                <div className={`space-y-4 pt-6 border-t ${isDarkMode ? 'border-[#222222]' : 'border-gray-200'}`}>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#59B292]">Education</h4>
                    {cvData.education.map((edu, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 text-sm">
                            <div>
                                <p className="font-bold">{edu.degree}</p>
                                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{edu.school}</p>
                            </div>
                            <span className="text-xs text-[#59B292] font-mono font-semibold">{edu.period}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}