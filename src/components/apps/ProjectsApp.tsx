import React, { useState } from 'react';
import type { ProjectItem } from '../../types/os';
import { CheckCircle, Eye, Globe, Zap, Shield, Rocket, Cpu, Terminal, Music } from 'lucide-react';
import { useOS } from '../../context/OSContext';

import { PROJECTS_DATA } from '../../data/portfolio.data';

export const ProjectsApp: React.FC = () => {
  const { interfaceMode } = useOS();
  const [filter, setFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'FullStack', 'AI / Bot', 'Frontend'];

  const filteredProjects = filter === 'All' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter((p) => p.category === filter);

  // Compute Universe-Specific Theme Styles for ALL 6 OS MODES
  const getThemeStyles = () => {
    switch (interfaceMode) {
      case 'matrix_rain':
        return {
          bannerBg: 'bg-black/80 border-emerald-500/40 text-emerald-300',
          activeTab: 'bg-emerald-500 text-black border-emerald-300 shadow-[0_0_15px_rgba(0,255,102,0.8)] font-bold',
          cardBorder: 'border-emerald-500/30 hover:border-emerald-400 hover:shadow-[0_0_25px_rgba(0,255,102,0.3)]',
          badgeBg: 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300',
          titleColor: 'text-emerald-400',
          icon: Terminal,
        };
      case 'synthwave_arcade':
        return {
          bannerBg: 'bg-black/80 border-pink-500/40 text-amber-300',
          activeTab: 'bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 text-black border-amber-300 shadow-[0_0_15px_rgba(255,0,128,0.8)] font-bold',
          cardBorder: 'border-pink-500/30 hover:border-amber-400 hover:shadow-[0_0_25px_rgba(255,0,128,0.3)]',
          badgeBg: 'bg-pink-950/80 border-pink-500/40 text-amber-300',
          titleColor: 'text-pink-400',
          icon: Music,
        };
      case 'quantum_matrix':
        return {
          bannerBg: 'bg-black/70 border-cyan-500/40 text-cyan-300',
          activeTab: 'bg-gradient-to-r from-cyan-500 to-pink-500 text-black border-pink-300 shadow-[0_0_15px_rgba(255,0,128,0.8)] font-bold',
          cardBorder: 'border-cyan-500/30 hover:border-pink-400/80 hover:shadow-[0_0_25px_rgba(255,0,128,0.3)]',
          badgeBg: 'bg-pink-950/80 border-pink-500/40 text-pink-300',
          titleColor: 'text-cyan-400',
          icon: Zap,
        };
      case 'stark_hud':
        return {
          bannerBg: 'bg-black/80 border-amber-500/40 text-amber-300',
          activeTab: 'bg-gradient-to-r from-amber-500 to-red-600 text-black border-yellow-300 shadow-[0_0_15px_rgba(255,170,0,0.8)] font-bold',
          cardBorder: 'border-amber-500/30 hover:border-red-500/80 hover:shadow-[0_0_25px_rgba(255,170,0,0.3)]',
          badgeBg: 'bg-red-950/80 border-red-500/40 text-amber-300',
          titleColor: 'text-amber-400',
          icon: Shield,
        };
      case 'interstellar_bridge':
        return {
          bannerBg: 'bg-slate-950/80 border-emerald-500/40 text-emerald-300',
          activeTab: 'bg-gradient-to-r from-emerald-400 to-cyan-500 text-black border-emerald-300 shadow-[0_0_15px_rgba(0,255,102,0.8)] font-bold',
          cardBorder: 'border-emerald-500/30 hover:border-emerald-400/80 hover:shadow-[0_0_25px_rgba(0,255,102,0.3)]',
          badgeBg: 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300',
          titleColor: 'text-emerald-400',
          icon: Rocket,
        };
      case 'cyberos':
      default:
        return {
          bannerBg: 'bg-slate-900/80 border-slate-800 text-slate-300',
          activeTab: 'bg-cyan-950 text-cyan-300 border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.3)] font-bold',
          cardBorder: 'border-slate-800 hover:border-cyan-500/40',
          badgeBg: 'bg-cyan-950 border-cyan-500/30 text-cyan-300',
          titleColor: 'text-cyan-400',
          icon: Cpu,
        };
    }
  };

  const theme = getThemeStyles();
  const HeaderIcon = theme.icon;

  return (
    <div className="space-y-5 font-mono text-slate-200 p-4 select-text h-full overflow-auto">
      {/* Top Filter Bar */}
      <div className={`flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl border ${theme.bannerBg}`}>
        <div className="flex items-center gap-2 text-xs font-orbitron">
          <HeaderIcon className="w-4 h-4 text-cyan-400 animate-pulse" /> FILTER PROJECT REPOSITORY:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 text-xs font-orbitron rounded-full border transition-all cursor-pointer ${
                filter === cat
                  ? theme.activeTab
                  : 'bg-black/60 text-slate-400 border-white/10 hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Showcase Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className={`group rounded-2xl bg-black/70 border ${theme.cardBorder} overflow-hidden transition-all duration-300 flex flex-col justify-between`}
          >
            {/* Image Banner */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              <span className={`absolute top-3 left-3 px-2.5 py-0.5 text-[10px] font-tech font-bold rounded-full border ${theme.badgeBg}`}>
                {project.category}
              </span>
            </div>

            {/* Content Body */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1">
                <h3 className={`font-orbitron font-bold text-base text-white group-hover:${theme.titleColor} transition-colors`}>
                  {project.title}
                </h3>
                <p className="text-xs text-cyan-400/80 font-tech">{project.subtitle}</p>
                <p className="text-xs text-slate-300/80 font-tech line-clamp-2 mt-1">
                  {project.description}
                </p>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-[10px] font-tech rounded bg-white/5 border border-white/10 text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-3 border-t border-white/10 text-xs font-orbitron">
                <button
                  onClick={() => setSelectedProject(project)}
                  className={`flex-1 py-1.5 rounded-xl border border-white/10 hover:border-cyan-400 bg-white/5 hover:bg-cyan-950/60 text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer`}
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" /> INSPECT SPECS
                </button>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl border border-white/10 hover:border-cyan-400 bg-white/5 text-slate-300 hover:text-white transition-all"
                  >
                    <Globe className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Inspection Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`relative w-full max-w-2xl rounded-2xl bg-black border-2 ${theme.cardBorder} p-6 space-y-4 shadow-2xl`}>
            <div className="flex items-start justify-between border-b border-white/10 pb-3">
              <div>
                <h2 className={`font-orbitron font-extrabold text-lg text-white ${theme.titleColor}`}>
                  {selectedProject.title}
                </h2>
                <p className="text-xs text-cyan-400 font-tech">{selectedProject.subtitle}</p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-rose-900 border border-white/20 text-xs font-orbitron"
              >
                CLOSE
              </button>
            </div>

            <p className="text-xs text-slate-300 font-tech leading-relaxed">
              {selectedProject.description}
            </p>

            {/* Highlights */}
            <div className="space-y-2">
              <h4 className="text-xs font-orbitron text-white">KEY ARCHITECTURE HIGHLIGHTS:</h4>
              <ul className="space-y-1.5 text-xs text-slate-300 font-tech">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-orbitron flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" /> VIEW GITHUB CODE
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
