'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import {
  Folder, Plus, Trash2, ExternalLink, CheckCircle2,
  AlertCircle, Award, Sparkles, Terminal, Globe,
  ChevronDown, Layers, Search, Filter, Lightbulb,
  Save
} from 'lucide-react';
import { ExtendedProject } from '@/types';
import { updateProject, saveProjectFromDB, getProjectInfoFromDB, deleteProjectFromDB } from '@/services/profileServices/project';

interface ProjectsEditorProps {
  projects: ExtendedProject[];
  setProjects: React.Dispatch<React.SetStateAction<ExtendedProject[]>>;
  showToast: (msg: string) => void;
  isDarkMode: boolean;
}

export default function ProjectsEditor({ projects, setProjects, showToast, isDarkMode }: ProjectsEditorProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Record<string, 'overview' | 'case-study'>>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Form States
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjCategory, setNewProjCategory] = useState('Full Stack');
  const [newProjSummary, setNewProjSummary] = useState('');
  const [newProjTags, setNewProjTags] = useState('');
  const [newProjLiveUrl, setNewProjLiveUrl] = useState('');
  const [newProjGithubUrl, setNewProjGithubUrl] = useState('');
  const [newProjProblem, setNewProjProblem] = useState('');
  const [newProjSolutions, setNewProjSolutions] = useState('');
  const [newProjImpact, setNewProjImpact] = useState('');
  const [projectID, setprojectID] = useState<'' | 0>('');

  useEffect(() => {
    async function loadData() {
      try {
        const dbProjects = await getProjectInfoFromDB();
        if (dbProjects) {
          setProjects(dbProjects);
        }
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    }
    loadData();
  }, [setProjects]);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjTitle.trim()) return;

    const newProject: ExtendedProject = {
      title: newProjTitle,
      category: newProjCategory,
      summary: newProjSummary,
      tags: typeof newProjTags === 'string' ? newProjTags.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
      liveUrl: newProjLiveUrl,
      githubUrl: newProjGithubUrl,
      featured: true,
      problemStatement: newProjProblem,
      solutionHighlights: typeof newProjSolutions === 'string' ? newProjSolutions.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
      measuredImpact: newProjImpact
    };

    try {
      await saveProjectFromDB(newProject);
      const dbProjects = await getProjectInfoFromDB();
      if (dbProjects) {
        setProjects(dbProjects);
      }

      resetForm();
      showToast("Project case study successfully published!");
    } catch (error: any) {
      console.error(error);
      showToast(`Error: ${error.message || error}`);
    }
  };

  const handleUpdateSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const updatedProject = {
        title: newProjTitle,
        category: newProjCategory,
        summary: newProjSummary,
        tags: typeof newProjTags === 'string' ? newProjTags.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
        liveUrl: newProjLiveUrl,
        githubUrl: newProjGithubUrl,
        featured: true,
        problemStatement: newProjProblem,
        solutionHighlights: typeof newProjSolutions === 'string' ? newProjSolutions.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
        measuredImpact: newProjImpact
      };

      await updateProject({ project: updatedProject, id: projectID });
      const dbProjects = await getProjectInfoFromDB();
      if (dbProjects) {
        setProjects(dbProjects);
      }

      resetForm();
      showToast("Project case study successfully updated!");
    } catch (error: any) {
      console.error(error);
      showToast(`Error updating project: ${error.message || error}`);
    }
  };

  const resetForm = () => {
    setNewProjTitle('');
    setNewProjCategory('Full Stack');
    setNewProjSummary('');
    setNewProjTags('');
    setNewProjLiveUrl('');
    setNewProjGithubUrl('');
    setNewProjProblem('');
    setNewProjSolutions('');
    setNewProjImpact('');
    setprojectID('');
    setIsFormOpen(false);
  };

  const handleDeleteProject = async (id?: string | number) => {
    if (!id) return;
    try {
      await deleteProjectFromDB(String(id));
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      showToast("Project removed from showcase.");
    } catch (error: any) {
      console.error("Error deleting project:", error);
      showToast(`Error deleting project: ${error.message || error}`);
    }
  };

  const editProject = (project: any) => {
    setNewProjTitle(project.title || '');
    setNewProjCategory(project.category || 'Full Stack');
    setNewProjSummary(project.summary || '');

    setNewProjTags(Array.isArray(project.tags) ? project.tags.join(', ') : (project.tags || ''));

    setNewProjLiveUrl(project.live_demo_url || project.liveUrl || '');
    setNewProjGithubUrl(project.github_url || project.githubUrl || '');
    setNewProjProblem(project.problem || project.problemStatement || '');

    const solutions = project.solution || project.solutionHighlights;
    setNewProjSolutions(Array.isArray(solutions) ? solutions.join(', ') : (typeof solutions === 'string' ? solutions : ''));

    setNewProjImpact(project.impact || project.measuredImpact || '');
    setprojectID(project.id);
    setIsFormOpen(true);
  };

  const filteredProjects = projects?.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  return (
    <section className="space-y-8 max-w-5xl mx-auto pb-16 font-sans">
      <div className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 border transition-all ${isDarkMode
        ? 'bg-linear-to-br from-[#121212] via-[#161616] to-[#1a1a1a] border-gray-800'
        : 'bg-linear-to-br from-gray-50 via-white to-gray-100 border-gray-200'
        }`}>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#59B292]/10 text-[#59B292] border border-[#59B292]/20">
              <Sparkles className="w-3.5 h-3.5" /> Portfolio Studio
            </div>
            <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Featured Case Studies
            </h2>
            <p className={`text-xs sm:text-sm max-w-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Manage your engineering projects, metrics, and architecture highlights in an organized showcase.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (isFormOpen) {
                  resetForm();
                } else {
                  setIsFormOpen(true);
                }
              }}
              className="px-5 py-3 rounded-2xl bg-[#59B292] hover:bg-[#4ea283] text-black font-semibold text-xs tracking-wider uppercase flex items-center gap-2 transition-all shadow-lg shadow-[#59B292]/20 active:scale-95"
            >
              <Plus className={`w-4 h-4 transition-transform duration-300 ${isFormOpen ? 'rotate-45' : ''}`} />
              {isFormOpen ? 'Close Builder' : 'New Case Study'}
            </button>
          </div>
        </div>
      </div>

      {/* Collapsible Form Section */}
      {isFormOpen && (
        <form
          onSubmit={projectID === "" ? handleAddProject : handleUpdateSubmit}
          className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 space-y-6 shadow-2xl animate-in fade-in slide-in-from-top-4 ${isDarkMode
            ? 'bg-[#121212] border-[#59B292]/30 shadow-black/60'
            : 'bg-white border-[#59B292]/40 shadow-gray-200/50'
            }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-gray-500/10">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#59B292]/10 text-[#59B292]">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#59B292]">
                {projectID === "" ? "New Project Metadata" : `Editing Project (ID: ${projectID})`}
              </h3>
            </div>
            <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Required fields</span>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Project Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Payroll Hours Validator"
                value={newProjTitle}
                onChange={(e) => setNewProjTitle(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm outline-none transition-all ${isDarkMode
                  ? 'bg-[#181818] border-gray-800 text-white focus:border-[#59B292] focus:ring-1 focus:ring-[#59B292]'
                  : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#59B292] focus:ring-1 focus:ring-[#59B292]'
                  }`}
              />
            </div>

            <div className="space-y-1.5">
              <label className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Category</label>
              <input
                type="text"
                placeholder="e.g. Full Stack, Internal Tool"
                value={newProjCategory}
                onChange={(e) => setNewProjCategory(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm outline-none transition-all ${isDarkMode
                  ? 'bg-[#181818] border-gray-800 text-white focus:border-[#59B292] focus:ring-1 focus:ring-[#59B292]'
                  : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#59B292] focus:ring-1 focus:ring-[#59B292]'
                  }`}
              />
            </div>

            <div className="space-y-1.5">
              <label className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tech Stack (comma separated)</label>
              <input
                type="text"
                placeholder="React, TypeScript, Next.js, Supabase"
                value={newProjTags}
                onChange={(e) => setNewProjTags(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm outline-none transition-all ${isDarkMode
                  ? 'bg-[#181818] border-gray-800 text-white focus:border-[#59B292] focus:ring-1 focus:ring-[#59B292]'
                  : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#59B292] focus:ring-1 focus:ring-[#59B292]'
                  }`}
              />
            </div>

            <div className="space-y-1.5">
              <label className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Live Demo URL</label>
              <input
                type="url"
                placeholder="https://myproject.com"
                value={newProjLiveUrl}
                onChange={(e) => setNewProjLiveUrl(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm outline-none transition-all ${isDarkMode
                  ? 'bg-[#181818] border-gray-800 text-white focus:border-[#59B292] focus:ring-1 focus:ring-[#59B292]'
                  : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#59B292] focus:ring-1 focus:ring-[#59B292]'
                  }`}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>GitHub Repository URL</label>
            <input
              type="url"
              placeholder="https://github.com/username/repo"
              value={newProjGithubUrl}
              onChange={(e) => setNewProjGithubUrl(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm outline-none transition-all ${isDarkMode
                ? 'bg-[#181818] border-gray-800 text-white focus:border-[#59B292] focus:ring-1 focus:ring-[#59B292]'
                : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#59B292] focus:ring-1 focus:ring-[#59B292]'
                }`}
            />
          </div>

          <div className="space-y-1.5">
            <label className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Summary & Overview</label>
            <textarea
              rows={2}
              placeholder="Brief description of what this project does and why it matters..."
              value={newProjSummary}
              onChange={(e) => setNewProjSummary(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm outline-none transition-all ${isDarkMode
                ? 'bg-[#181818] border-gray-800 text-white focus:border-[#59B292] focus:ring-1 focus:ring-[#59B292]'
                : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#59B292] focus:ring-1 focus:ring-[#59B292]'
                }`}
            />
          </div>

          {/* Extended Case Study Section */}
          <div className="pt-2 border-t border-gray-500/10 space-y-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#59B292]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#59B292]">Case Study Breakdown</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Problem Statement</label>
                <textarea
                  rows={2}
                  placeholder="What friction or challenge were you solving?"
                  value={newProjProblem}
                  onChange={(e) => setNewProjProblem(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm outline-none transition-all ${isDarkMode
                    ? 'bg-[#181818] border-gray-800 text-white focus:border-[#59B292] focus:ring-1 focus:ring-[#59B292]'
                    : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#59B292] focus:ring-1 focus:ring-[#59B292]'
                    }`}
                />
              </div>

              <div className="space-y-1.5">
                <label className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Solution Highlights (comma separated)</label>
                <textarea
                  rows={2}
                  placeholder="Automated CSV parsing, Built custom React components"
                  value={newProjSolutions}
                  onChange={(e) => setNewProjSolutions(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm outline-none transition-all ${isDarkMode
                    ? 'bg-[#181818] border-gray-800 text-white focus:border-[#59B292] focus:ring-1 focus:ring-[#59B292]'
                    : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#59B292] focus:ring-1 focus:ring-[#59B292]'
                    }`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Measured Impact / Key Outcome</label>
              <input
                type="text"
                placeholder="e.g. Reduced manual auditing time by 80% across operations"
                value={newProjImpact}
                onChange={(e) => setNewProjImpact(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm outline-none transition-all ${isDarkMode
                  ? 'bg-[#181818] border-gray-800 text-white focus:border-[#59B292] focus:ring-1 focus:ring-[#59B292]'
                  : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#59B292] focus:ring-1 focus:ring-[#59B292]'
                  }`}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            {projectID !== "" && (
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-3 rounded-xl border border-gray-700 text-gray-400 hover:text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                Cancel
              </button>
            )}

            {projectID === "" ? (
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#59B292] hover:bg-[#4ea283] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-[#59B292]/20 active:scale-95"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" /> Publish Case Study
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#59B292] hover:bg-[#4ea283] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-[#59B292]/20 active:scale-95"
              >
                <Save className="w-4 h-4 stroke-[2.5]" /> Update Case Study
              </button>
            )}
          </div>
        </form>
      )}

      {/* Control Toolbar (Search & Stats Bar) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Search projects or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs border outline-none transition-all ${isDarkMode
              ? 'bg-[#141414] border-gray-800 text-white focus:border-[#59B292]'
              : 'bg-white border-gray-200 text-gray-900 focus:border-[#59B292]'
              }`}
          />
        </div>

        <div className={`text-xs font-mono font-medium px-3.5 py-1.5 rounded-xl border ${isDarkMode ? 'bg-[#141414] border-gray-800 text-gray-400' : 'bg-white border-gray-200 text-gray-600'
          }`}>
          Showing <span className="text-[#59B292] font-bold">{filteredProjects.length}</span> of {projects?.length || 0} projects
        </div>
      </div>

      {/* Case Studies Card Showcase */}
      {filteredProjects.length === 0 ? (
        <div className={`p-12 text-center rounded-3xl border border-dashed ${isDarkMode ? 'border-gray-800 text-gray-500 bg-[#121212]/50' : 'border-gray-300 text-gray-400 bg-gray-50/50'
          }`}>
          <Folder className="w-10 h-10 mx-auto mb-3 opacity-30 text-[#59B292]" />
          <p className="text-sm font-semibold">No case studies found.</p>
          <p className="text-xs mt-1 opacity-70">Create a new project entry using the button above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredProjects.map((p, index) => {
            const projId = p.id || String(index);
            const currentTab = activeTab[projId] || 'overview';

            return (
              <div
                key={projId}
                className={`group rounded-3xl border transition-all duration-300 overflow-hidden ${isDarkMode
                  ? 'bg-[#141414] border-gray-800 hover:border-[#59B292]/50 shadow-lg shadow-black/40'
                  : 'bg-white border-gray-200 hover:border-[#59B292]/50 shadow-md shadow-gray-100'
                  }`}
              >
                <div className={`p-5 sm:px-7 sm:pt-6 flex items-center justify-between gap-4 border-b ${isDarkMode ? 'border-gray-800/80' : 'border-gray-100'
                  }`}>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs px-3 py-1 rounded-full bg-[#59B292]/10 text-[#59B292] font-mono font-semibold border border-[#59B292]/20">
                      {p.category || 'Case Study'}
                    </span>
                    {p.measuredImpact && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 font-medium">
                        <Award className="w-3 h-3" /> Impact Measured
                      </span>
                    )}
                  </div>

                  {/* Navigation Sub-Tabs & Actions */}
                  <div className="flex items-center gap-2">
                    <div className={`flex p-1 rounded-xl border text-[11px] font-medium ${isDarkMode ? 'bg-black/40 border-gray-800' : 'bg-gray-100 border-gray-200'
                      }`}>
                      <button
                        onClick={() => setActiveTab(prev => ({ ...prev, [projId]: 'overview' }))}
                        className={`px-3 py-1 rounded-lg transition-all ${currentTab === 'overview'
                          ? 'bg-[#59B292] text-black font-semibold'
                          : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                          }`}
                      >
                        Overview
                      </button>
                      <button
                        onClick={() => setActiveTab(prev => ({ ...prev, [projId]: 'case-study' }))}
                        className={`px-3 py-1 rounded-lg transition-all ${currentTab === 'case-study'
                          ? 'bg-[#59B292] text-black font-semibold'
                          : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                          }`}
                      >
                        Architecture & Impact
                      </button>
                    </div>
                    <div className='flex flex-row gap-1'>
                      <button
                        onClick={() => handleDeleteProject(p.id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => editProject(p)}
                        className="p-2 text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition-all"
                        title="Update Project"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card Body Content */}
                <div className="p-5 sm:p-7 space-y-5">
                  {/* Title & Tech Badges */}
                  <div className="space-y-3">
                    <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {p.title}
                    </h3>

                    {p.tags && p.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {p.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className={`text-[11px] px-2.5 py-1 rounded-lg font-mono ${isDarkMode ? 'bg-black/50 text-gray-300 border border-gray-800' : 'bg-gray-100 text-gray-700 border border-gray-200'
                              }`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {currentTab === 'overview' && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      {p.summary ? (
                        <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {p.summary}
                        </p>
                      ) : (
                        <p className={`text-xs italic ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                          No summary provided for this project.
                        </p>
                      )}
                    </div>
                  )}

                  {/* Tab 2: Case Study Details View */}
                  {currentTab === 'case-study' && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {p.problemStatement && (
                          <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-black/40 border-gray-800/80' : 'bg-gray-50 border-gray-200/80'
                            }`}>
                            <div className="flex items-center gap-1.5 text-rose-400 font-bold uppercase tracking-wider text-[10px] mb-2">
                              <AlertCircle className="w-3.5 h-3.5" /> Problem Context
                            </div>
                            <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {p.problemStatement}
                            </p>
                          </div>
                        )}

                        {p.solutionHighlights && p.solutionHighlights.length > 0 && (
                          <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-black/40 border-gray-800/80' : 'bg-gray-50 border-gray-200/80'
                            }`}>
                            <div className="flex items-center gap-1.5 text-[#59B292] font-bold uppercase tracking-wider text-[10px] mb-2">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Key Engineering Solutions
                            </div>
                            <ul className={`space-y-1 text-xs list-disc list-inside ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {p.solutionHighlights.map((sol, i) => {
                                const cleanSol = typeof sol === 'string' ? sol.replace(/^[\["'\s]+|[\]"'\s]+$/g, '') : sol;
                                return cleanSol ? <li key={i}>{cleanSol}</li> : null;
                              })}
                            </ul>
                          </div>
                        )}
                      </div>

                      {p.measuredImpact && (
                        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs">
                          <Award className="w-4 h-4 text-amber-500 shrink-0" />
                          <div>
                            <span className="text-amber-500 font-bold uppercase text-[10px] block">Measured Outcome</span>
                            <span className={isDarkMode ? 'text-gray-200' : 'text-gray-800'}>{p.measuredImpact}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {(p.liveUrl || p.githubUrl) && (
                    <div className={`flex flex-wrap items-center gap-3 pt-4 border-t ${isDarkMode ? 'border-gray-800/80' : 'border-gray-100'
                      }`}>
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-[#59B292]/15 text-[#59B292] hover:bg-[#59B292]/25 border border-[#59B292]/30 transition-all"
                        >
                          <Globe className="w-3.5 h-3.5" /> Live Demo <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>
                      )}
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl border transition-all ${isDarkMode
                            ? 'bg-black/50 text-gray-300 border-gray-800 hover:bg-gray-800'
                            : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                            }`}
                        >
                          <Terminal className="w-3.5 h-3.5" /> Source Code
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}