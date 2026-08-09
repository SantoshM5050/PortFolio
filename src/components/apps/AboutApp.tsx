import React from 'react';
import { Code, Server, Zap, Shield, Rocket, Cpu, Terminal, Music, Briefcase, Calendar, MapPin, GraduationCap, Award } from 'lucide-react';
import { useOS } from '../../context/OSContext';
import { getNevitechExperienceDuration, WORK_EXPERIENCE, EDUCATION_DATA } from '../../data/portfolio.data';

export const AboutApp: React.FC = () => {
  const { interfaceMode } = useOS();
  const nevitechExp = getNevitechExperienceDuration();
  const expItem = WORK_EXPERIENCE[0];
  const eduItem = EDUCATION_DATA[0];

  // Compute Universe-Specific Theme Styles for ALL 6 OS MODES
  const getThemeStyles = () => {
    switch (interfaceMode) {
      case 'matrix_rain':
        return {
          primaryColor: 'text-emerald-400',
          secondaryColor: 'text-green-300',
          borderColor: 'border-emerald-500/40',
          cardBg: 'bg-black/80 border-emerald-500/30 hover:border-emerald-400',
          badgeBg: 'bg-emerald-950/80 border-emerald-400 text-emerald-300 font-bold',
          icon: Terminal,
          headerLabel: 'MATRIX DIGITAL CODE STREAM SPECS',
        };
      case 'synthwave_arcade':
        return {
          primaryColor: 'text-pink-400',
          secondaryColor: 'text-amber-300',
          borderColor: 'border-pink-500/40',
          cardBg: 'bg-black/80 border-pink-500/30 hover:border-amber-400',
          badgeBg: 'bg-pink-950/80 border-pink-400 text-amber-300 font-bold',
          icon: Music,
          headerLabel: 'SYNTHWAVE 80S RETRO CASSETTE DOSSIER',
        };
      case 'quantum_matrix':
        return {
          primaryColor: 'text-cyan-400',
          secondaryColor: 'text-pink-400',
          borderColor: 'border-cyan-500/40',
          cardBg: 'bg-black/70 border-cyan-500/30 hover:border-pink-400/60',
          badgeBg: 'bg-cyan-950/80 border-cyan-400 text-cyan-300 font-bold',
          icon: Zap,
          headerLabel: 'QUANTUM NEURAL SYNAPSE PROFILE',
        };
      case 'stark_hud':
        return {
          primaryColor: 'text-amber-400',
          secondaryColor: 'text-red-400',
          borderColor: 'border-amber-500/40',
          cardBg: 'bg-black/80 border-amber-500/30 hover:border-red-500/60',
          badgeBg: 'bg-red-950/80 border-amber-400 text-amber-300 font-bold',
          icon: Shield,
          headerLabel: 'STARK MARK-88 OPERATOR SPECS',
        };
      case 'interstellar_bridge':
        return {
          primaryColor: 'text-emerald-400',
          secondaryColor: 'text-cyan-400',
          borderColor: 'border-emerald-500/40',
          cardBg: 'bg-slate-950/80 border-emerald-500/30 hover:border-emerald-400/60',
          badgeBg: 'bg-emerald-950/80 border-emerald-400 text-emerald-300 font-bold',
          icon: Rocket,
          headerLabel: 'STARSHIP COMMANDER DOSSIER',
        };
      case 'cyberos':
      default:
        return {
          primaryColor: 'text-cyan-400',
          secondaryColor: 'text-teal-300',
          borderColor: 'border-cyan-500/30',
          cardBg: 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/40',
          badgeBg: 'bg-cyan-950 border-cyan-500/40 text-cyan-300',
          icon: Cpu,
          headerLabel: 'OPERATOR SYSTEM PROFILE',
        };
    }
  };

  const theme = getThemeStyles();
  const HeaderIcon = theme.icon;

  return (
    <div className="flex flex-col h-full p-4 font-mono overflow-auto select-text text-slate-200 space-y-6">
      {/* Top Profile Header */}
      <div className={`flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl border ${theme.cardBg} shadow-2xl`}>
        <div className={`w-32 h-32 rounded-full border-2 ${theme.borderColor} p-1 overflow-hidden shrink-0 shadow-lg relative group`}>
          <img
            src="/santosh_profile.jpg"
            alt="Santosh Maurya"
            className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/30 animate-spin" style={{ animationDuration: '12s' }} />
        </div>
        
        <div className="flex flex-col gap-1.5 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-tech">
            <HeaderIcon className={`w-4 h-4 ${theme.secondaryColor} animate-pulse`} />
            <span className={theme.secondaryColor}>{theme.headerLabel}</span>
          </div>
          <h1 className={`text-2xl sm:text-3xl font-orbitron font-black text-white`}>Santosh Maurya</h1>
          <h2 className={`text-sm ${theme.primaryColor} font-tech`}>Software Support Engineer & FullStack Developer</h2>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-2">
            <span className={`px-2.5 py-1 text-xs font-orbitron rounded-full border ${theme.badgeBg}`}>
              B.E. IT (2025 BATCH)
            </span>
            <span className="px-2.5 py-1 text-xs font-tech rounded-full bg-black/60 border border-white/10 text-slate-300">
              LOCATION: DELHI NCR
            </span>
            <span className="px-2.5 py-1 text-xs font-tech rounded-full bg-black/60 border border-emerald-500/40 text-emerald-400">
              ROLE: TRAINEE SOFTWARE SUPPORT ENGINEER
            </span>
          </div>
        </div>
      </div>

      {/* DYNAMIC WORK EXPERIENCE SECTION */}
      <div className={`p-5 rounded-2xl border ${theme.cardBg} space-y-4`}>
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className={`text-base font-orbitron font-bold ${theme.primaryColor} flex items-center gap-2`}>
            <Briefcase className="w-4 h-4 text-cyan-400" />
            WORK EXPERIENCE
          </h3>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-black/60 border border-white/10 hover:border-cyan-400/60 transition-all space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <h4 className="font-orbitron font-bold text-sm text-white">{expItem.role}</h4>
                <div className="text-xs text-cyan-400 font-tech">{expItem.company} · <span className="text-slate-400">{expItem.type}</span></div>
              </div>
              <div className="flex items-center gap-2 text-xs font-tech text-emerald-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{expItem.startDate} - {expItem.endDate} · <strong className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold">{nevitechExp.durationText}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-tech text-slate-400">
              <MapPin className="w-3 h-3 text-slate-500" />
              <span>{expItem.location}</span>
            </div>

            <p className="text-xs text-slate-300 font-tech leading-relaxed pt-1 border-t border-white/5">
              {expItem.description}
            </p>
          </div>
        </div>
      </div>

      {/* EDUCATION SECTION (SAVITRIBAI PHULE PUNE UNIVERSITY - B.E. IT 7.99 CGPA) */}
      <div className={`p-5 rounded-2xl border ${theme.cardBg} space-y-4`}>
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className={`text-base font-orbitron font-bold ${theme.primaryColor} flex items-center gap-2`}>
            <GraduationCap className="w-5 h-5 text-amber-400" />
            EDUCATION & ACADEMICS
          </h3>
          <span className="text-xs font-tech px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 font-bold flex items-center gap-1">
            <Award className="w-3 h-3 text-amber-400" /> GRADE: {eduItem.grade}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-black/60 border border-white/10 hover:border-amber-400/60 transition-all space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <h4 className="font-orbitron font-bold text-sm text-white">{eduItem.institution}</h4>
              <div className="text-xs text-amber-300 font-tech">{eduItem.degree}</div>
            </div>
            <div className="flex items-center gap-2 text-xs font-tech text-amber-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{eduItem.duration}</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 font-tech leading-relaxed pt-1 border-t border-white/5">
            {eduItem.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {eduItem.highlights.map((h, i) => (
              <span key={i} className="text-[11px] font-tech px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300">
                • {h}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Biography */}
        <div className={`p-5 rounded-2xl border ${theme.cardBg} space-y-3`}>
          <h3 className={`text-base font-orbitron font-bold ${theme.primaryColor} flex items-center gap-2`}>
            <Code className="w-4 h-4" />
            ABOUT & ENGINEERING PHILOSOPHY
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-tech">
            During my B.E. in Information Technology at Savitribai Phule Pune University, I built a solid foundation in software development, data structures & algorithms, computer networks, and database management.
          </p>
          <p className="text-xs text-slate-300 leading-relaxed font-tech">
            I am especially passionate about leveraging technology to build impactful full-stack web solutions, supporting campus management ecosystems, and continuing to grow through real-world experience and continuous learning.
          </p>
        </div>

        {/* Core Specs */}
        <div className={`p-5 rounded-2xl border ${theme.cardBg} space-y-3`}>
          <h3 className={`text-base font-orbitron font-bold ${theme.primaryColor} flex items-center gap-2`}>
            <Server className="w-4 h-4" />
            ACADEMIC & TECHNICAL HIGHLIGHTS
          </h3>
          <ul className="text-xs text-slate-300 space-y-2.5 font-tech">
            <li className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-slate-400">UNIVERSITY</span>
              <span className={`font-bold ${theme.primaryColor}`}>Savitribai Phule Pune University</span>
            </li>
            <li className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-slate-400">DEGREE & STREAM</span>
              <span className="font-bold text-white">B.E. Information Technology</span>
            </li>
            <li className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-slate-400">ACADEMIC SCORE</span>
              <span className="font-bold text-amber-300">7.99 CGPA</span>
            </li>
            <li className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-slate-400">PRIMARY ROLE</span>
              <span className="font-bold text-emerald-400">Trainee Software Support Eng.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
