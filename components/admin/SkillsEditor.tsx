'use client';

import React, { useState } from 'react';
import { Cpu, Plus, Trash2 } from 'lucide-react';
import { Skill } from '@/types';

interface SkillsEditorProps {
    skills: Skill[];
    setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
    showToast: (msg: string) => void;
    isDarkMode: boolean;
}

export default function SkillsEditor({ skills, setSkills, showToast, isDarkMode }: SkillsEditorProps) {
    const [newSkillName, setNewSkillName] = useState('');
    const [newSkillCategory, setNewSkillCategory] = useState('Frontend Core');

    const handleAddSkill = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSkillName.trim()) return;

        const newSkill: Skill = {
            id: "s_" + Date.now(),
            name: newSkillName,
            category: newSkillCategory,
            level: 90
        };

        const updated = [...skills, newSkill];
        setSkills(updated);
        localStorage.setItem('app_skills', JSON.stringify(updated));
        setNewSkillName('');
        showToast("Skill added!");
    };

    const handleDeleteSkill = (id: string) => {
        const updated = skills.filter(s => s.id !== id);
        setSkills(updated);
        localStorage.setItem('app_skills', JSON.stringify(updated));
        showToast("Skill removed.");
    };

    return (
        <section className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
                <Cpu className="text-[#59B292]" /> Tech Stack & Competencies Manager
            </h2>

            <form onSubmit={handleAddSkill} className={`p-6 rounded-2xl border space-y-4 ${isDarkMode ? 'bg-[#121212] border-[#222222]' : 'bg-gray-50 border-gray-200'}`}>
                <h3 className="font-bold text-sm text-[#59B292] uppercase">Add New Skill</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Skill Name (e.g. React.js, Tailwind CSS)" value={newSkillName} onChange={(e) => setNewSkillName(e.target.value)} className={`w-full px-4 py-2 rounded-xl border text-sm outline-none ${isDarkMode ? 'bg-black border-[#222222] text-white' : 'bg-white border-gray-300 text-black'}`} />
                    <input type="text" placeholder="Category (e.g. Frontend Core, Backend & APIs)" value={newSkillCategory} onChange={(e) => setNewSkillCategory(e.target.value)} className={`w-full px-4 py-2 rounded-xl border text-sm outline-none ${isDarkMode ? 'bg-black border-[#222222] text-white' : 'bg-white border-gray-300 text-black'}`} />
                </div>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#59B292] text-black font-bold text-xs flex items-center gap-2 hover:opacity-90 transition">
                    <Plus className="w-4 h-4" /> Add Skill
                </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skills.map((s) => (
                    <div key={s.id} className={`p-3 rounded-xl border flex justify-between items-center ${isDarkMode ? 'bg-[#121212] border-[#222222]' : 'bg-gray-50 border-gray-200'}`}>
                        <div>
                            <p className="font-bold text-sm">{s.name}</p>
                            <p className="text-xs text-[#59B292]">{s.category}</p>
                        </div>
                        <button onClick={() => handleDeleteSkill(s.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}