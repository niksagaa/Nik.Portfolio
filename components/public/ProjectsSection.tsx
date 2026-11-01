'use client';

import React, { useState } from 'react';
import { FolderGit2, ExternalLink, Sparkles, ChevronDown, ChevronUp, CheckCircle, Target, Lightbulb, TrendingUp } from 'lucide-react';
import { ExtendedProject } from '@/types';

interface ProjectsSectionProps {
  projects: ExtendedProject[];
  isDarkMode: boolean;
}

// Hiwalay na sub-component para isolated ang state ng bawat card
function ProjectCard({ project, isDarkMode }: { project: ExtendedProject; isDarkMode: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`p-6 sm:p-7 rounded-2xl border flex flex-col justify-between space-y-6 transition-all ${
        isDarkMode 
          ? 'bg-[#121212] border-[#222222] hover:border-[#333333]' 
          : 'bg-white border-gray-200 hover:border-gray-300 shadow-xs'
      }`}
    >
      <div className="space-y-4">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#59B292]/10 text-[#59B292]">
              {project.category || 'Frontend'}
            </span>
            <h3 className="text-lg font-bold tracking-tight">{project.title}</h3>
          </div>
          {project.featured && (
            <span className="flex items-center gap-1 text-[10px] font-medium text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-md">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
          )}
        </div>

        <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {project.summary}
        </p>

        {/* Tech Stack Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {project.tags.map((tag, idx) => (
              <span 
                key={idx}
                className={`text-[11px] font-mono px-2.5 py-1 rounded-md border ${
                  isDarkMode ? 'bg-black/40 border-[#222222] text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Dropdown Details */}
        {isExpanded && (
          <div className={`pt-4 mt-4 border-t space-y-4 text-xs ${isDarkMode ? 'border-[#222222]' : 'border-gray-100'}`}>
            <div className="space-y-1.5 pl-3 border-l-2 border-[#59B292]/60">
              <span className="font-semibold text-[#59B292] flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                <Target className="w-3.5 h-3.5" /> Problem Statement
              </span>
              <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {project.problemStatement || "Architecting a performant solution to resolve frontend workflow bottlenecks and data consistency."}
              </p>
            </div>

            <div className="space-y-2 pl-3 border-l-2 border-[#59B292]/60">
              <span className="font-semibold text-[#59B292] flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                <Lightbulb className="w-3.5 h-3.5" /> Solution & Engineering
              </span>
              {project.solutionHighlights && project.solutionHighlights.length > 0 ? (
                <div className="space-y-1.5 pt-0.5">
                  {project.solutionHighlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#59B292] shrink-0 mt-0.5" />
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{hl}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Built using modern modular components and strict typing.</p>
              )}
            </div>

            <div className="space-y-1.5 pl-3 border-l-2 border-[#59B292]">
              <span className="font-semibold text-[#59B292] flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                <TrendingUp className="w-3.5 h-3.5" /> Measured Impact
              </span>
              <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                {project.measuredImpact || "Optimized asset loading speeds and ensured reliable production deployments."}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className={`pt-4 border-t flex items-center justify-between text-xs font-medium ${isDarkMode ? 'border-[#222222]' : 'border-gray-100'}`}>
        <div className="flex items-center gap-4">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[#59B292] hover:underline py-1">
              <ExternalLink className="w-3.5 h-3.5" /> Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className={`flex items-center gap-1.5 transition py-1 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Source
            </a>
          )}
        </div>

        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[#59B292] hover:underline flex items-center gap-1.5 font-medium py-1"
        >
          <span>{isExpanded ? 'Hide details' : 'View case study'}</span> 
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}

export default function ProjectsSection({ projects, isDarkMode }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category || 'Frontend')))];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter((p) => (p.category || 'Frontend') === selectedCategory);

  return (
    <section id="projects" className="space-y-8 pt-8">
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2.5 tracking-tight">
            <FolderGit2 className="text-[#59B292] w-6 h-6 shrink-0" /> Featured Projects
          </h2>
          <p className={`text-xs sm:text-sm mt-1.5 max-w-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Production-ready applications built with clean architecture, robust type safety, and scalable frontend patterns.
          </p>
        </div>

        {categories.length > 1 && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#59B292] text-black font-semibold shadow-sm'
                    : isDarkMode 
                      ? 'bg-[#121212] border border-[#222222] text-gray-400 hover:text-white' 
                      : 'bg-gray-100 border border-gray-200 text-gray-600 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {filteredProjects.length === 0 ? (
        <div className={`p-10 text-center rounded-2xl border border-dashed ${isDarkMode ? 'border-[#222222] bg-[#121212]/30 text-gray-400' : 'border-gray-300 bg-gray-50 text-gray-500'}`}>
          <p className="text-xs">No projects found in this category.</p>
        </div>
      ) : (
        /* May kasamang `items-start` dito para hindi maghilahan sa taas ang mga katabing card */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.id || idx} project={project} isDarkMode={isDarkMode} />
          ))}
        </div>
      )}
    </section>
  );
}