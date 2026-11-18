'use client';

import React, { useEffect, useState } from 'react';
import { Cpu, Plus, Trash2, Sparkles, Layers, Terminal } from 'lucide-react';
import { Skill } from '@/types';
import { deleteSkills, getSkills, uploadSkills } from '@/services/profileServices/skill';

interface SkillsEditorProps {
    skills: Skill[];
    setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
    showToast: (msg: string) => void;
    isDarkMode: boolean;
}

const CATEGORY_OPTIONS = [
    'Frontend Development',
    'Backend & APIs',
    'Database & Cloud',
    'DevOps & Tools',
    'Architecture & State'
];

const PROFICIENCY_OPTIONS = ['Expert', 'Proficient', 'Familiar'];

export default function SkillsEditor({ skills, setSkills, showToast, isDarkMode }: SkillsEditorProps) {
    const [newSkillName, setNewSkillName] = useState('');
    const [newSkillCategory, setNewSkillCategory] = useState(CATEGORY_OPTIONS[0]);
    const [newSkillProficiency, setNewSkillProficiency] = useState('Proficient');
    const [newSkillIcon, setNewSkillIcon] = useState('');

    useEffect(() => {
        async function loadSkills() {
            try {
                const techStacks = await getSkills()
                if (techStacks) {
                    setSkills(techStacks)
                }
            } catch (error) {
                console.error(error)
            }
        }
        loadSkills()
    }, [])

    const handleAddSkill = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSkillName.trim()) return;

        const newSkillPayload = {
            name: newSkillName.trim(),
            category: newSkillCategory,
            proficiency: newSkillProficiency,
            icon: newSkillIcon.trim(),
            level: newSkillProficiency === 'Expert' ? 95 : newSkillProficiency === 'Proficient' ? 80 : 65
        };

        try {
            // Kunin ang binuong record mula sa Supabase kasama ang UUID nito
            const savedSkill = await uploadSkills(newSkillPayload);

            if (savedSkill) {
                setSkills(prev => [...prev, savedSkill]);
            }

            setNewSkillName('');
            setNewSkillIcon('');
            showToast("Tech stack competency added!");
        } catch (error) {
            showToast(`Error adding new skills: ${error}`);
            console.error(`Error adding new skills:`, error);
        }
    };

    const handleDeleteSkill = async (id?: string) => {
        try {
            if (!id) return;
            await deleteSkills(id)
            const updated = skills.filter(s => s.id !== id);
            setSkills(updated);
            localStorage.setItem('app_skills', JSON.stringify(updated));
            showToast("Skill removed.");
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <section className="space-y-8 max-w-5xl mx-auto pb-12">
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 ${isDarkMode ? 'border-gray-800/80' : 'border-gray-200'}`}>
                <div className="space-y-1">
                    <h2 className={`text-2xl font-extrabold flex items-center gap-3 tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        <div className="p-2.5 rounded-2xl bg-[#59B292]/15 text-[#59B292] shadow-sm">
                            <Cpu className="w-6 h-6" />
                        </div>
                        Tech Stack & Core Competencies
                    </h2>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Manage your tech stack competencies using FontAwesome icon classes.
                    </p>
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-2xl bg-[#59B292]/10 text-[#59B292] border border-[#59B292]/20 self-start sm:self-auto shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{skills?.length || 0} Skills Active</span>
                </div>
            </div>

            {/* FORM CONTAINER */}
            <form onSubmit={handleAddSkill} className={`p-6 sm:p-8 rounded-3xl border space-y-6 transition-all duration-300 shadow-xl ${isDarkMode ? 'bg-[#141414]/90 border-gray-800/80 shadow-black/40 backdrop-blur-md' : 'bg-white border-gray-200/80 shadow-gray-100'}`}>
                <div className="flex items-center gap-2.5 pb-3 border-b border-gray-500/10">
                    <div className="p-1.5 rounded-lg bg-[#59B292]/10 text-[#59B292]">
                        <Layers className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-xs text-[#59B292] uppercase tracking-wider">Add Tech Stack Item</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        <label className={`text-xs font-semibold block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Skill / Technology Name *</label>
                        <input
                            type="text"
                            placeholder="e.g. React.js, Node.js, PostgreSQL"
                            value={newSkillName}
                            onChange={(e) => setNewSkillName(e.target.value)}
                            className={`w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-all ${isDarkMode ? 'bg-black/50 border-gray-800 text-white focus:border-[#59B292] focus:ring-2 focus:ring-[#59B292]/20' : 'bg-gray-50/50 border-gray-200 text-gray-900 focus:border-[#59B292] focus:ring-2 focus:ring-[#59B292]/20'}`}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className={`text-xs font-semibold block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Category Group</label>
                        <select
                            value={newSkillCategory}
                            onChange={(e) => setNewSkillCategory(e.target.value)}
                            className={`w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-all ${isDarkMode ? 'bg-black/50 border-gray-800 text-white focus:border-[#59B292] focus:ring-2 focus:ring-[#59B292]/20' : 'bg-gray-50/50 border-gray-200 text-gray-900 focus:border-[#59B292] focus:ring-2 focus:ring-[#59B292]/20'}`}
                        >
                            {CATEGORY_OPTIONS.map((cat) => (
                                <option key={cat} value={cat} className={isDarkMode ? 'bg-[#141414]' : 'bg-white'}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className={`text-xs font-semibold block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Proficiency Tier</label>
                        <select
                            value={newSkillProficiency}
                            onChange={(e) => setNewSkillProficiency(e.target.value)}
                            className={`w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-all ${isDarkMode ? 'bg-black/50 border-gray-800 text-white focus:border-[#59B292] focus:ring-2 focus:ring-[#59B292]/20' : 'bg-gray-50/50 border-gray-200 text-gray-900 focus:border-[#59B292] focus:ring-2 focus:ring-[#59B292]/20'}`}
                        >
                            {PROFICIENCY_OPTIONS.map((prof) => (
                                <option key={prof} value={prof} className={isDarkMode ? 'bg-[#141414]' : 'bg-white'}>{prof}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className={`text-xs font-semibold block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>FontAwesome Class</label>
                        <input
                            type="text"
                            placeholder="e.g. fa-brands fa-react, fa-solid fa-database"
                            value={newSkillIcon}
                            onChange={(e) => setNewSkillIcon(e.target.value)}
                            className={`w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-all ${isDarkMode ? 'bg-black/50 border-gray-800 text-white focus:border-[#59B292] focus:ring-2 focus:ring-[#59B292]/20' : 'bg-gray-50/50 border-gray-200 text-gray-900 focus:border-[#59B292] focus:ring-2 focus:ring-[#59B292]/20'}`}
                        />
                    </div>
                </div>

                <button type="submit" className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#59B292] text-black font-bold text-xs tracking-wide uppercase flex items-center justify-center gap-2.5 hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-[#59B292]/25">
                    <Plus className="w-4 h-4 stroke-3" /> Add Skill Badge
                </button>
            </form>

            {/* LIST / DISPLAY SECTION */}
            <div className="space-y-6 pt-4">
                <div className="flex items-center justify-between px-1">
                    <h3 className={`font-bold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Competency Grid ({skills?.length || 0})
                    </h3>
                </div>

                {skills?.length === 0 ? (
                    <div className={`p-12 text-center rounded-3xl border border-dashed ${isDarkMode ? 'border-gray-800 text-gray-500 bg-[#141414]/40' : 'border-gray-300 text-gray-400 bg-gray-50/50'}`}>
                        <Cpu className="w-10 h-10 mx-auto mb-3 opacity-30 text-[#59B292]" />
                        <p className="text-sm font-semibold">No skills listed yet.</p>
                        <p className="text-xs mt-1 opacity-70">Add your core technical competencies above.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {skills.map((s) => (
                            <div
                                key={s.id || s.name}
                                className={`group relative p-5 rounded-2xl border flex flex-col justify-between gap-4 transition-all duration-300 hover:border-[#59B292]/60 hover:shadow-xl ${isDarkMode ? 'bg-[#141414] border-gray-800/80 shadow-black/30' : 'bg-white border-gray-200/80 shadow-md shadow-gray-100/50'}`}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${isDarkMode ? 'bg-black/60 border border-gray-800 text-[#59B292]' : 'bg-gray-100 border border-gray-200/60 text-[#59B292]'}`}>
                                            {s.icon ? (
                                                <i className={`${s.icon} text-xl`} />
                                            ) : (
                                                <Terminal className="w-5 h-5 text-gray-400" />
                                            )}
                                        </div>
                                        <div>
                                            <h4 className={`font-bold text-sm tracking-tight transition-colors ${isDarkMode ? 'text-white group-hover:text-[#59B292]' : 'text-gray-900 group-hover:text-[#59B292]'}`}>
                                                {s.name}
                                            </h4>
                                            <p className="text-[11px] font-mono text-[#59B292] mt-0.5">
                                                {s.category}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleDeleteSkill(s.id)}
                                        className="p-2 text-red-400 hover:text-white hover:bg-red-500 rounded-xl transition-all duration-200 border border-transparent hover:border-red-500 opacity-60 group-hover:opacity-100"
                                        title="Delete Skill"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Bottom Tier Badge */}
                                <div className="flex items-center justify-between pt-2 border-t border-gray-500/10 text-[11px]">
                                    <span className={`font-mono text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                        Proficiency
                                    </span>
                                    <span className={`font-semibold px-2.5 py-0.5 rounded-md ${s.proficiency === 'Expert'
                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                        : s.proficiency === 'Proficient'
                                            ? 'bg-[#59B292]/10 text-[#59B292] border border-[#59B292]/20'
                                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                        }`}>
                                        {s.proficiency || 'Proficient'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}