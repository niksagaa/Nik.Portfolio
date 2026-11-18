'use client';

import { Terminal, CheckCircle2 } from 'lucide-react';
import { Skill } from '@/types';

interface SkillsSectionProps {
    skills: Skill[];
    isDarkMode: boolean;
}

export default function SkillsSection({ skills = [], isDarkMode }: SkillsSectionProps) {
    const skillCategories = skills && skills.length > 0
        ? Array.from(new Set(skills.map((s) => s.category)))
        : [];

    return (
        <section id="skills" className="py-20 sm:py-28 max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-12 border-b border-zinc-800/40">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#59B292]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#59B292]" />
                        <span>Competency Matrix</span>
                    </div>
                    <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-zinc-950'
                        }`}>
                        Technical Stack & Tools
                    </h2>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                    <CheckCircle2 className="w-4 h-4 text-[#59B292]" />
                    <span>Production-ready experience</span>
                </div>
            </div>

            {skills.length === 0 ? (
                <div className={`p-12 text-center rounded-2xl border border-dashed ${isDarkMode ? 'border-zinc-800 text-zinc-500' : 'border-zinc-300 text-zinc-400'
                    }`}>
                    <p className="text-sm font-mono">No technical competencies listed yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    {skillCategories.map((category) => {
                        const categorySkills = skills.filter((s) => s.category === category);

                        return (
                            <div
                                key={category}
                                className={`group relative p-6 sm:p-7 rounded-2xl border transition-all duration-300 ${isDarkMode
                                    ? 'bg-[#121215]/60 border-zinc-800/80 hover:border-[#59B292]/40 hover:bg-[#121215]'
                                    : 'bg-white border-zinc-200 hover:border-[#59B292]/50 shadow-sm hover:shadow-md'
                                    }`}
                            >
                                <div className="flex items-center justify-between pb-4 mb-5 border-b border-zinc-800/30">
                                    <h3 className={`text-xs font-mono uppercase tracking-widest font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'
                                        }`}>
                                        {category}
                                    </h3>
                                    <span className="text-[11px] font-mono text-zinc-500">
                                        {categorySkills.length} {categorySkills.length === 1 ? 'item' : 'items'}
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {categorySkills.map((skill) => (
                                        <div
                                            key={skill.id}
                                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-[13px] font-medium border transition-colors duration-200 ${isDarkMode
                                                ? 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:text-white hover:border-[#59B292]/50 hover:bg-zinc-900'
                                                : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:text-zinc-950 hover:border-[#59B292]/60 hover:bg-white'
                                                }`}
                                        >
                                            {skill.icon ? (
                                                <i className={`${skill.icon} text-sm text-[#59B292]`} />
                                            ) : (
                                                <Terminal className="w-3.5 h-3.5 text-[#59B292]/70" />
                                            )}
                                            <span className="tracking-tight">{skill.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}