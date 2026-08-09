import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { Cpu, Zap, Shield, Rocket, Terminal, Music } from 'lucide-react';

interface SkillItem {
  name: string;
  level: number;
  experience: string;
  category: 'Frontend' | 'Backend' | 'Database / Cloud' | 'Tools & AI';
}

const SKILLS_DATA: SkillItem[] = [
  { name: 'TypeScript / JavaScript (ESNext)', level: 95, experience: '4 yrs', category: 'Frontend' },
  { name: 'React 18 / 19 & Next.js 15', level: 92, experience: '3.5 yrs', category: 'Frontend' },
  { name: 'Tailwind CSS & CSS Modules', level: 95, experience: '4 yrs', category: 'Frontend' },
  { name: 'HTML5 Canvas & WebGL / Three.js', level: 82, experience: '2 yrs', category: 'Frontend' },
  { name: 'Framer Motion & Web Animations', level: 88, experience: '2.5 yrs', category: 'Frontend' },

  { name: 'Node.js & Express / NestJS', level: 90, experience: '3.5 yrs', category: 'Backend' },
  { name: 'REST APIs & GraphQL', level: 88, experience: '3 yrs', category: 'Backend' },
  { name: 'Discord.js & Bot Architectures', level: 85, experience: '2 yrs', category: 'Backend' },
  { name: 'Python & FastAPI', level: 80, experience: '2 yrs', category: 'Backend' },

  { name: 'PostgreSQL & Prisma ORM', level: 88, experience: '3 yrs', category: 'Database / Cloud' },
  { name: 'MongoDB & Mongoose', level: 85, experience: '3 yrs', category: 'Database / Cloud' },
  { name: 'Docker & Containerization', level: 78, experience: '2 yrs', category: 'Database / Cloud' },
  { name: 'Google Cloud GCP & Vercel', level: 82, experience: '2.5 yrs', category: 'Database / Cloud' },

  { name: 'Gemini AI API & OpenAI SDK', level: 88, experience: '2 yrs', category: 'Tools & AI' },
  { name: 'Git, GitHub & CI/CD Pipelines', level: 92, experience: '4 yrs', category: 'Tools & AI' },
  { name: 'Vite & Webpack Tooling', level: 90, experience: '3 yrs', category: 'Tools & AI' },
];

export const SkillsApp: React.FC = () => {
  const { interfaceMode } = useOS();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend', 'Database / Cloud', 'Tools & AI'];

  const filteredSkills = activeCategory === 'All'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === activeCategory);

  // Compute Universe-Specific Theme Styles for ALL 6 OS MODES
  const getThemeStyles = () => {
    switch (interfaceMode) {
      case 'matrix_rain':
        return {
          bannerBg: 'bg-gradient-to-r from-emerald-950 via-green-950 to-black border-emerald-500/50',
          titleColor: 'text-emerald-400',
          subColor: 'text-green-300',
          icon: Terminal,
          activeTab: 'bg-emerald-500 text-black font-black border-emerald-300 shadow-[0_0_15px_rgba(0,255,102,0.8)]',
          cardBorder: 'border-emerald-500/30 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(0,255,102,0.3)]',
          dotColor: 'bg-emerald-400',
          textColor: 'text-emerald-300',
          meterGradient: 'from-emerald-600 via-green-400 to-teal-300 shadow-[0_0_12px_rgba(0,255,102,0.8)]',
        };
      case 'synthwave_arcade':
        return {
          bannerBg: 'bg-gradient-to-r from-pink-950 via-purple-950 to-amber-950 border-pink-500/50',
          titleColor: 'text-pink-400',
          subColor: 'text-amber-300',
          icon: Music,
          activeTab: 'bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 text-black font-black border-amber-300 shadow-[0_0_15px_rgba(255,0,128,0.8)]',
          cardBorder: 'border-pink-500/30 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(255,0,128,0.3)]',
          dotColor: 'bg-pink-400',
          textColor: 'text-pink-300',
          meterGradient: 'from-pink-500 via-purple-500 to-amber-400 shadow-[0_0_12px_rgba(255,0,128,0.8)]',
        };
      case 'quantum_matrix':
        return {
          bannerBg: 'bg-gradient-to-r from-cyan-950/80 via-purple-950/80 to-pink-950/80 border-cyan-500/50',
          titleColor: 'text-cyan-400',
          subColor: 'text-pink-400',
          icon: Zap,
          activeTab: 'bg-gradient-to-r from-cyan-500 to-pink-500 text-black border-pink-300 shadow-[0_0_15px_rgba(255,0,128,0.8)] font-black',
          cardBorder: 'border-cyan-500/30 hover:border-pink-400/80 hover:shadow-[0_0_20px_rgba(255,0,128,0.3)]',
          dotColor: 'bg-pink-400',
          textColor: 'text-cyan-300',
          meterGradient: 'from-cyan-400 via-purple-400 to-pink-500 shadow-[0_0_12px_rgba(255,0,128,0.8)]',
        };
      case 'stark_hud':
        return {
          bannerBg: 'bg-gradient-to-r from-red-950/80 via-black to-amber-950/80 border-amber-500/50',
          titleColor: 'text-amber-400',
          subColor: 'text-red-400',
          icon: Shield,
          activeTab: 'bg-gradient-to-r from-amber-500 to-red-600 text-black border-yellow-300 shadow-[0_0_15px_rgba(255,170,0,0.8)] font-black',
          cardBorder: 'border-amber-500/30 hover:border-red-500/80 hover:shadow-[0_0_20px_rgba(255,170,0,0.3)]',
          dotColor: 'bg-amber-400',
          textColor: 'text-amber-400',
          meterGradient: 'from-amber-400 via-orange-500 to-red-600 shadow-[0_0_12px_rgba(255,170,0,0.8)]',
        };
      case 'interstellar_bridge':
        return {
          bannerBg: 'bg-gradient-to-r from-slate-950 via-emerald-950/80 to-cyan-950/80 border-emerald-500/50',
          titleColor: 'text-emerald-400',
          subColor: 'text-cyan-400',
          icon: Rocket,
          activeTab: 'bg-gradient-to-r from-emerald-400 to-cyan-500 text-black border-emerald-300 shadow-[0_0_15px_rgba(0,255,102,0.8)] font-black',
          cardBorder: 'border-emerald-500/30 hover:border-emerald-400/80 hover:shadow-[0_0_20px_rgba(0,255,102,0.3)]',
          dotColor: 'bg-emerald-400',
          textColor: 'text-emerald-300',
          meterGradient: 'from-emerald-400 via-teal-400 to-cyan-500 shadow-[0_0_12px_rgba(0,255,102,0.8)]',
        };
      case 'cyberos':
      default:
        return {
          bannerBg: 'bg-gradient-to-r from-cyan-950/40 via-slate-900 to-teal-950/40 border-cyan-500/40',
          titleColor: 'text-cyan-400',
          subColor: 'text-cyan-400/80',
          icon: Cpu,
          activeTab: 'bg-cyan-950 text-cyan-300 border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.3)] font-bold',
          cardBorder: 'border-slate-800 hover:border-cyan-500/40',
          dotColor: 'bg-cyan-400',
          textColor: 'text-cyan-400',
          meterGradient: 'from-cyan-500 to-teal-400 shadow-[0_0_12px_rgba(0,240,255,0.8)]',
        };
    }
  };

  const theme = getThemeStyles();
  const HeaderIcon = theme.icon;

  return (
    <div className="space-y-6 font-mono text-slate-200 p-4 select-text h-full overflow-auto">
      {/* Dynamic Universe Banner */}
      <div className={`p-4 rounded-2xl border ${theme.bannerBg} flex items-center justify-between shadow-2xl`}>
        <div>
          <h3 className={`font-orbitron font-extrabold text-lg text-white flex items-center gap-2 ${theme.titleColor}`}>
            <HeaderIcon className="w-5 h-5 animate-pulse" /> SYSTEM SKILL ARSENAL
          </h3>
          <p className={`text-xs font-tech ${theme.subColor}`}>
            {interfaceMode === 'matrix_rain' && 'MATRIX DIGITAL CODE STREAM PROFICIENCY SPECS'}
            {interfaceMode === 'synthwave_arcade' && 'SYNTHWAVE 80S OUTRUN CASSETTE POWER MATRIX'}
            {interfaceMode === 'quantum_matrix' && 'QUANTUM HOLOGRAPHIC SYNAPSE PROFICIENCY'}
            {interfaceMode === 'stark_hud' && 'STARK MARK-88 ARC REACTOR POWER SPECS'}
            {interfaceMode === 'interstellar_bridge' && 'INTERSTELLAR WARP-DRIVE CORE MATRIX'}
            {interfaceMode === 'cyberos' && 'NEURAL MATRIX PROFICIENCY RATINGS'}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-3 font-tech text-xs">
          <span className="px-2.5 py-1 rounded-full bg-black/80 border border-white/10 text-white">
            NODES: {SKILLS_DATA.length}
          </span>
          <span className={`px-2.5 py-1 rounded-full bg-black/80 border border-white/10 ${theme.textColor}`}>
            AVG: 87%
          </span>
        </div>
      </div>

      {/* Category Tab Buttons */}
      <div className="flex flex-wrap gap-2 pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-orbitron rounded-full border transition-all cursor-pointer ${
              activeCategory === cat
                ? theme.activeTab
                : 'bg-black/60 text-slate-400 border-white/10 hover:border-white/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Power Meters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSkills.map((skill, index) => (
          <div
            key={index}
            className={`p-4 rounded-2xl bg-black/70 border ${theme.cardBorder} transition-all duration-300 space-y-2`}
          >
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${theme.dotColor} animate-ping`}></span>
                <span className="font-orbitron font-bold text-slate-100">{skill.name}</span>
              </div>
              <div className="flex items-center gap-2 font-tech">
                <span className="text-[10px] px-2 py-0.5 rounded bg-black/80 text-slate-400 border border-white/10">
                  {skill.experience}
                </span>
                <span className={`font-bold ${theme.textColor}`}>{skill.level}%</span>
              </div>
            </div>

            {/* Glowing Neon Bar */}
            <div className="w-full h-2.5 rounded-full bg-black p-0.5 border border-white/10 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${theme.meterGradient} rounded-full transition-all duration-500`}
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
