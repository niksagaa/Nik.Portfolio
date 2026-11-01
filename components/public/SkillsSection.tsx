'use client';

import React from 'react';
import { Cpu } from 'lucide-react';
import { Skill } from '@/types';

interface SkillsSectionProps {
    skills: Skill[];
    isDarkMode: boolean;
}

export default function SkillsSection({ skills, isDarkMode }: SkillsSectionProps) {
    const skillCategories = Array.from(new Set(skills.map(s => s.category)));

    return (
        <section id="skills" className="space-y-6 sm:space-y-8 pt-6 sm:pt-10">
            <div>
                <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                    <Cpu className="text-[#59B292] shrink-0" /> Technical Competencies
                </h2>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mt-1`}>Grouped by domain expertise for concise evaluation.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {skillCategories.map((category) => (
                    <div key={category} className={`p-5 sm:p-6 rounded-2xl border space-y-4 ${isDarkMode ? 'bg-[#121212] border-[#222222]' : 'bg-gray-50 border-gray-200'}`}>
                        <h3 className="font-bold text-xs uppercase tracking-wider text-[#59B292]">{category}</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.filter(s => s.category === category).map((skill) => (
                                <div key={skill.id} className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium border flex items-center gap-2 ${isDarkMode ? 'bg-black border-[#222222] text-gray-200' : 'bg-white border-gray-300 text-gray-800'}`}>
                                    <div className="w-2 h-2 rounded-full bg-[#59B292] shrink-0"></div>
                                    <span>{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}