import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import type { SystemInterfaceMode } from '../../types/os';
import { Cpu, Power, Sparkles, ShieldCheck, Rocket, Monitor, CheckCircle2, ChevronRight, ChevronDown, Terminal, HardDrive, Music, LayoutGrid, Activity, Grid } from 'lucide-react';

const INTERFACE_OPTIONS: { id: SystemInterfaceMode; title: string; subtitle: string; desc: string; icon: React.ElementType; badge: string; color: string }[] = [
  {
    id: 'windows_12_pro',
    title: 'Windows 12 Pro Edition',
    subtitle: 'Fluent Design Centered Taskbar',
    desc: 'Modern Mica Backdrop, Centered Taskbar, Windows Start Menu, Widgets & Fluent UI',
    icon: LayoutGrid,
    badge: 'FLUENT UI',
    color: 'from-blue-600 to-indigo-600 border-blue-500/60 text-blue-400',
  },
  {
    id: 'quantum_matrix',
    title: 'Quantum Neural Matrix v3.0',
    subtitle: 'Holographic Constellation Engine',
    desc: '3D Interactive Particle Field & Firing Laser Synapse Skill Nodes',
    icon: Sparkles,
    badge: 'HOLOGRAPHIC',
    color: 'from-cyan-500 to-purple-600 border-cyan-400/60 text-cyan-300',
  },
  {
    id: 'stark_hud',
    title: 'Stark Spatial HUD Mark-88',
    subtitle: 'JARVIS Tactical Target System',
    desc: 'Spatial Reticle Interface, Arc Reactor Core, & Biometric Lock',
    icon: ShieldCheck,
    badge: 'JARVIS HUD',
    color: 'from-red-600 to-amber-500 border-amber-500/60 text-amber-400',
  },
  {
    id: 'interstellar_bridge',
    title: 'Interstellar Command System',
    subtitle: 'Starship Santosh-01 Cockpit',
    desc: 'Starship Cockpit Bridge with 3D Starfield Warp Speed Canvas',
    icon: Rocket,
    badge: 'WARP DRIVE',
    color: 'from-emerald-500 to-teal-600 border-emerald-400/60 text-emerald-300',
  },
  {
    id: 'cyberos',
    title: 'CyberOS Web Desktop',
    subtitle: 'Window Manager & CLI Environment',
    desc: 'Classic Web Desktop with Draggable Glass Windows, Taskbar & CLI',
    icon: Monitor,
    badge: 'CYBERPUNK',
    color: 'from-cyan-600 to-blue-700 border-cyan-400/60 text-cyan-300',
  },
  {
    id: 'matrix_rain',
    title: 'Matrix Code Stream OS',
    subtitle: 'Digital Katakana Rain Console',
    desc: 'Falling Green Code Rain Canvas & Hacker Terminal Architecture',
    icon: Terminal,
    badge: 'KATAKANA',
    color: 'from-emerald-600 to-green-800 border-emerald-500/60 text-emerald-400',
  },
  {
    id: 'synthwave_arcade',
    title: 'Synthwave Outrun 80s OS',
    subtitle: 'Retro Horizon Grid & Cassette Deck',
    desc: '1980s Neon Grid Sunset Horizon, Cassette Tapes & Synth Player',
    icon: Music,
    badge: 'OUTRUN 80S',
    color: 'from-pink-600 to-purple-600 border-pink-500/60 text-pink-400',
  },
];

export const LoginPortalScreen: React.FC = () => {
  const { startBootSequence } = useOS();
  const [selectedMode, setSelectedMode] = useState<SystemInterfaceMode>('windows_12_pro');
  const [viewMode, setViewMode] = useState<'grid' | 'dropdown'>('grid');
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const selectedOpt = INTERFACE_OPTIONS.find((opt) => opt.id === selectedMode) || INTERFACE_OPTIONS[0];

  // Key press listener for ENTER to boot instantly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        startBootSequence(selectedMode, 'cyberpunk');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMode, startBootSequence]);

  const handleBoot = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    startBootSequence(selectedMode, 'cyberpunk');
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-[#020408] text-white font-mono flex items-center justify-center p-4 select-none overflow-hidden">
      {/* Authentic BIOS Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      {/* Main BIOS Bootloader Screen Container */}
      <div className="relative z-10 max-w-4xl w-full bg-[#050a12]/95 backdrop-blur-2xl rounded-2xl border border-cyan-500/40 p-6 sm:p-8 shadow-[0_0_80px_rgba(0,240,255,0.25)] space-y-6 max-h-[92vh] flex flex-col justify-between overflow-y-auto">
        
        {/* BIOS Top Header Bar */}
        <div className="border-b border-cyan-500/30 pb-4 space-y-3 shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Cpu className="w-6 h-6 text-cyan-400 animate-pulse" />
              <div>
                <h1 className="font-orbitron font-black text-lg sm:text-xl text-white tracking-widest text-glow-cyan">
                  UEFI MULTIVERSE OS BOOT MANAGER
                </h1>
                <p className="text-xs text-cyan-400/80 font-tech">SANTOSH MAURYA ARCHITECTURE // 7 DEDICATED OS ENGINES</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* View Toggle */}
              <div className="flex items-center bg-black/80 rounded-lg p-1 border border-white/10 text-xs">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-2.5 py-1 rounded flex items-center gap-1 transition-all cursor-pointer ${
                    viewMode === 'grid' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" /> GRID
                </button>
                <button
                  onClick={() => setViewMode('dropdown')}
                  className={`px-2.5 py-1 rounded flex items-center gap-1 transition-all cursor-pointer ${
                    viewMode === 'dropdown' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ChevronDown className="w-3.5 h-3.5" /> LIST
                </button>
              </div>

              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded bg-black/80 border border-emerald-500/30 text-emerald-400 text-xs font-tech">
                <HardDrive className="w-3.5 h-3.5" /> ONLINE
              </span>
            </div>
          </div>

          {/* Operator Profile Badge & Telemetry Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-black/80 border border-cyan-500/30">
            <div className="flex items-center gap-3">
              <img
                src="/santosh_profile.jpg"
                alt="Santosh Maurya"
                className="w-10 h-10 rounded-full object-cover border-2 border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.6)] shrink-0"
              />
              <div>
                <div className="font-orbitron font-bold text-xs text-white flex items-center gap-2">
                  SANTOSH MAURYA <span className="text-[10px] text-cyan-400 font-tech px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 font-bold">GRAD 2025</span>
                </div>
                <div className="text-[11px] text-slate-400 font-tech">Software Support Engineer & FullStack Developer</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[10px] font-tech text-slate-400 shrink-0">
              <span className="flex items-center gap-1 text-cyan-300">
                <Activity className="w-3 h-3 text-cyan-400 animate-pulse" /> CPU: 38°C
              </span>
              <span>RAM: 64GB HBM3</span>
              <span className="text-emerald-400 font-bold">NEURAL LINK: 100%</span>
            </div>
          </div>
        </div>

        {/* OS SELECTOR BODY */}
        <div className="space-y-4 flex-1">
          <div className="flex items-center justify-between text-xs font-orbitron text-cyan-300">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" /> SELECT TARGET OPERATING SYSTEM:
            </span>
            <span className="text-[10px] text-slate-400 font-tech">ACTIVE: {selectedOpt.title}</span>
          </div>

          {viewMode === 'grid' ? (
            /* Interactive 3D OS Grid Cards */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {INTERFACE_OPTIONS.map((opt) => {
                const OptIcon = opt.icon;
                const isSelected = selectedMode === opt.id;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedMode(opt.id)}
                    className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden group flex flex-col justify-between h-28 ${
                      isSelected
                        ? `bg-slate-900/90 border-2 ${opt.color} shadow-[0_0_30px_rgba(0,240,255,0.3)] scale-[1.02]`
                        : 'bg-black/60 border-white/10 hover:border-cyan-400/50 hover:bg-slate-900/50 text-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-500 text-black' : 'bg-slate-900 text-cyan-400'}`}>
                        <OptIcon className="w-5 h-5" />
                      </div>
                      <span className="text-[9px] font-orbitron font-extrabold px-1.5 py-0.5 rounded bg-black/60 border border-white/10 text-cyan-300">
                        {opt.badge}
                      </span>
                    </div>

                    <div>
                      <div className="font-orbitron font-bold text-xs text-white truncate flex items-center justify-between">
                        <span>{opt.title}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 ml-1" />}
                      </div>
                      <div className="text-[10px] text-slate-400 font-tech truncate">{opt.subtitle}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            /* Dropdown List Mode */
            <div className="space-y-2 relative">
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="w-full p-4 rounded-xl bg-cyan-950/70 border border-cyan-400/80 text-left flex items-center justify-between gap-3 shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:border-cyan-300 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500 text-black shadow-md shrink-0">
                    <selectedOpt.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-orbitron font-bold text-sm text-white flex items-center gap-2">
                      {selectedOpt.title}
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="text-xs text-cyan-400/80 font-tech">{selectedOpt.subtitle}</div>
                  </div>
                </div>

                <ChevronDown className={`w-5 h-5 text-cyan-400 transition-transform duration-200 shrink-0 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#040914] border-2 border-cyan-400/80 rounded-xl shadow-[0_0_40px_rgba(0,240,255,0.4)] max-h-64 overflow-y-auto divide-y divide-white/5">
                  {INTERFACE_OPTIONS.map((opt) => {
                    const OptIcon = opt.icon;
                    const isSelected = selectedMode === opt.id;

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setSelectedMode(opt.id);
                          setDropdownOpen(false);
                        }}
                        className={`w-full p-3 text-left flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                          isSelected ? 'bg-cyan-950/90 text-white font-bold' : 'bg-black/90 text-slate-300 hover:bg-cyan-950/50 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-cyan-500 text-black' : 'bg-slate-900 text-slate-400'}`}>
                            <OptIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-orbitron font-bold text-xs">{opt.title}</div>
                            <div className="text-[10px] text-cyan-400/80 font-tech">{opt.subtitle}</div>
                          </div>
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Selected OS Details Banner */}
          <div className="p-3.5 rounded-xl bg-black/80 border border-cyan-500/30 text-xs font-tech text-slate-300 leading-relaxed flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 animate-pulse" />
            <div>
              <span className="text-cyan-400 font-bold font-orbitron">{selectedOpt.title}: </span>
              {selectedOpt.desc}
            </div>
          </div>
        </div>

        {/* Big Clean BOOT BUTTON */}
        <div className="space-y-2 shrink-0 pt-2 border-t border-cyan-500/20">
          <button
            type="button"
            onClick={() => handleBoot()}
            className="w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-orbitron font-black text-sm tracking-widest shadow-[0_0_40px_rgba(0,240,255,0.9)] hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <Power className="w-5 h-5 fill-black" /> BOOT {selectedOpt.title.toUpperCase()} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center justify-between text-[10px] font-tech text-slate-500 px-1">
            <span>PRESS [ENTER] OR CLICK BUTTON TO LAUNCH</span>
            <span>MULTIVERSE BOOTLOADER v3.0 // 7 OS MODES</span>
          </div>
        </div>
      </div>
    </div>
  );
};
