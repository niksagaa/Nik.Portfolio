'use client';

import React, { useState } from 'react';
import { Folder, Plus, Trash2 } from 'lucide-react';
import { ExtendedProject } from '@/types';

interface ProjectsEditorProps {
    projects: ExtendedProject[];
    setProjects: React.Dispatch<React.SetStateAction<ExtendedProject[]>>;
    showToast: (msg: string) => void;
    isDarkMode: boolean;
}

export default function ProjectsEditor({ projects, setProjects, showToast, isDarkMode }: ProjectsEditorProps) {
    const [newProjTitle, setNewProjTitle] = useState('');
    const [newProjCategory, setNewProjCategory] = useState('Frontend');
    const [newProjSummary, setNewProjSummary] = useState('');
    const [newProjTags, setNewProjTags] = useState('');
    const [newProjLiveUrl, setNewProjLiveUrl] = useState('');
    const [newProjGithubUrl, setNewProjGithubUrl] = useState('');
    const [newProjProblem, setNewProjProblem] = useState('');
    const [newProjSolutions, setNewProjSolutions] = useState('');
    const [newProjImpact, setNewProjImpact] = useState('');

    const handleAddProject = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProjTitle.trim()) return;

        const newProject: ExtendedProject = {
            id: "p_" + Date.now(),
            title: newProjTitle,
            category: newProjCategory,
            summary: newProjSummary,
            tags: newProjTags.split(',').map(t => t.trim()).filter(Boolean),
            liveUrl: newProjLiveUrl,
            githubUrl: newProjGithubUrl,
            featured: true,
            problemStatement: newProjProblem,
            solutionHighlights: newProjSolutions.split(',').map(s => s.trim()).filter(Boolean),
            measuredImpact: newProjImpact
        };

        const updated = [newProject, ...projects];
        setProjects(updated);
        localStorage.setItem('app_projects', JSON.stringify(updated));

        setNewProjTitle('');
        setNewProjSummary('');
        setNewProjTags('');
        setNewProjLiveUrl('');
        setNewProjGithubUrl('');
        setNewProjProblem('');
        setNewProjSolutions('');
        setNewProjImpact('');
        showToast("Project case study added to portfolio!");
    };

    const handleDeleteProject = (id: string) => {
        const updated = projects.filter(p => p.id !== id);
        setProjects(updated);
        localStorage.setItem('app_projects', JSON.stringify(updated));
        showToast("Project deleted.");
    };

    return (
        <section className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
                <Folder className="text-[#59B292]" /> Project Case Studies Manager
            </h2>

            <form onSubmit={handleAddProject} className={`p-6 rounded-2xl border space-y-4 ${isDarkMode ? 'bg-[#121212] border-[#222222]' : 'bg-gray-50 border-gray-200'}`}>
                <h3 className="font-bold text-sm text-[#59B292] uppercase">Add New Project Case Study</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Project Title" value={newProjTitle} onChange={(e) => setNewProjTitle(e.target.value)} className={`w-full px-4 py-2 rounded-xl border text-sm outline-none ${isDarkMode ? 'bg-black border-[#222222] text-white' : 'bg-white border-gray-300 text-black'}`} />
                    <input type="text" placeholder="Category (e.g. Full Stack, Frontend)" value={newProjCategory} onChange={(e) => setNewProjCategory(e.target.value)} className={`w-full px-4 py-2 rounded-xl border text-sm outline-none ${isDarkMode ? 'bg-black border-[#222222] text-white' : 'bg-white border-gray-300 text-black'}`} />
                    <input type="text" placeholder="Tags (comma separated: React, TypeScript)" value={newProjTags} onChange={(e) => setNewProjTags(e.target.value)} className={`w-full px-4 py-2 rounded-xl border text-sm outline-none ${isDarkMode ? 'bg-black border-[#222222] text-white' : 'bg-white border-gray-300 text-black'}`} />
                    <input type="text" placeholder="Live Demo URL" value={newProjLiveUrl} onChange={(e) => setNewProjLiveUrl(e.target.value)} className={`w-full px-4 py-2 rounded-xl border text-sm outline-none ${isDarkMode ? 'bg-black border-[#222222] text-white' : 'bg-white border-gray-300 text-black'}`} />
                </div>
                <input type="text" placeholder="GitHub Repository URL" value={newProjGithubUrl} onChange={(e) => setNewProjGithubUrl(e.target.value)} className={`w-full px-4 py-2 rounded-xl border text-sm outline-none ${isDarkMode ? 'bg-black border-[#222222] text-white' : 'bg-white border-gray-300 text-black'}`} />
                <textarea rows={2} placeholder="Project Overview / Summary" value={newProjSummary} onChange={(e) => setNewProjSummary(e.target.value)} className={`w-full px-4 py-2 rounded-xl border text-sm outline-none ${isDarkMode ? 'bg-black border-[#222222] text-white' : 'bg-white border-gray-300 text-black'}`} />
                <textarea rows={2} placeholder="Problem Statement" value={newProjProblem} onChange={(e) => setNewProjProblem(e.target.value)} className={`w-full px-4 py-2 rounded-xl border text-sm outline-none ${isDarkMode ? 'bg-black border-[#222222] text-white' : 'bg-white border-gray-300 text-black'}`} />
                <textarea rows={2} placeholder="Solution Highlights (comma separated items)" value={newProjSolutions} onChange={(e) => setNewProjSolutions(e.target.value)} className={`w-full px-4 py-2 rounded-xl border text-sm outline-none ${isDarkMode ? 'bg-black border-[#222222] text-white' : 'bg-white border-gray-300 text-black'}`} />
                <input type="text" placeholder="Measured Impact (e.g. Reduced load times by 40%)" value={newProjImpact} onChange={(e) => setNewProjImpact(e.target.value)} className={`w-full px-4 py-2 rounded-xl border text-sm outline-none ${isDarkMode ? 'bg-black border-[#222222] text-white' : 'bg-white border-gray-300 text-black'}`} />

                <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#59B292] text-black font-bold text-xs flex items-center gap-2 hover:opacity-90 transition">
                    <Plus className="w-4 h-4" /> Add Project Case Study
                </button>
            </form>

            <div className="space-y-4">
                {projects.map((p) => (
                    <div key={p.id} className={`p-4 rounded-xl border flex justify-between items-center ${isDarkMode ? 'bg-[#121212] border-[#222222]' : 'bg-gray-50 border-gray-200'}`}>
                        <div>
                            <p className="font-bold text-sm">{p.title} <span className="text-xs text-[#59B292] font-mono">({p.category})</span></p>
                            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{p.summary}</p>
                        </div>
                        <button onClick={() => handleDeleteProject(p.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}