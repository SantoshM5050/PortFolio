import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import type { SystemInterfaceMode } from '../../types/os';
import { Cpu, Power, Sparkles, ShieldCheck, Rocket, Monitor, CheckCircle2, ChevronRight, ChevronDown, Terminal, HardDrive, Music, LayoutGrid } from 'lucide-react';

const INTERFACE_OPTIONS: { id: SystemInterfaceMode; title: string; subtitle: string; desc: string; icon: React.ElementType }[] = [
  {
    id: 'windows_12_pro',
    title: 'Windows 12 Pro Edition',
    subtitle: 'Fluent Design Centered Taskbar',
    desc: 'Modern Mica Backdrop, Centered Taskbar, Windows Start Menu, Widgets & Fluent UI',
    icon: LayoutGrid,
  },
  {
    id: 'quantum_matrix',
    title: 'Quantum Neural Matrix v3.0',
    subtitle: 'Holographic Constellation Engine',
    desc: '3D Interactive Particle Field & Firing Laser Synapse Skill Nodes',
    icon: Sparkles,
  },
  {
    id: 'stark_hud',
    title: 'Stark Spatial HUD Mark-88',
    subtitle: 'JARVIS Tactical Target System',
    desc: 'Spatial Reticle Interface, Arc Reactor Core, & Biometric Lock',
    icon: ShieldCheck,
  },
  {
    id: 'interstellar_bridge',
    title: 'Interstellar Command System',
    subtitle: 'Starship Santosh-01 Cockpit',
    desc: 'Starship Cockpit Bridge with 3D Starfield Warp Speed Canvas',
    icon: Rocket,
  },
  {
    id: 'cyberos',
    title: 'CyberOS Web Desktop',
    subtitle: 'Window Manager & CLI Environment',
    desc: 'Classic Web Desktop with Draggable Glass Windows, Taskbar & CLI',
    icon: Monitor,
  },
  {
    id: 'matrix_rain',
    title: 'Matrix Code Stream OS',
    subtitle: 'Digital Katakana Rain Console',
    desc: 'Falling Green Code Rain Canvas & Hacker Terminal Architecture',
    icon: Terminal,
  },
  {
    id: 'synthwave_arcade',
    title: 'Synthwave Outrun 80s OS',
    subtitle: 'Retro Horizon Grid & Cassette Deck',
    desc: '1980s Neon Grid Sunset Horizon, Cassette Tapes & Synth Player',
    icon: Music,
  },
];

export const LoginPortalScreen: React.FC = () => {
  const { startBootSequence } = useOS();
  const [selectedMode, setSelectedMode] = useState<SystemInterfaceMode>('windows_12_pro');
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const selectedOpt = INTERFACE_OPTIONS.find((opt) => opt.id === selectedMode) || INTERFACE_OPTIONS[0];
  const SelectedIcon = selectedOpt.icon;

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

  const handleBoot = (e: React.FormEvent) => {
    e.preventDefault();
    startBootSequence(selectedMode, 'cyberpunk');
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-[#020408] text-white font-mono flex items-center justify-center p-4 select-none overflow-hidden">
      {/* Authentic BIOS Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      {/* Main BIOS Bootloader Screen Container (Compact & Perfectly Centered) */}
      <div className="relative z-10 max-w-2xl w-full bg-[#050a12]/95 backdrop-blur-2xl rounded-2xl border border-cyan-500/40 p-6 sm:p-7 shadow-[0_0_60px_rgba(0,240,255,0.2)] space-y-5">
        
        {/* BIOS Top Header Bar */}
        <div className="border-b border-cyan-500/30 pb-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
              <div>
                <h1 className="font-orbitron font-extrabold text-base sm:text-lg text-white tracking-widest text-glow-cyan">
                  UEFI SYSTEM BOOT MANAGER
                </h1>
                <p className="text-[11px] text-cyan-400/80 font-tech">SANTOSH MAURYA ARCHITECTURE // 7 MULTIVERSE OS ENGINES</p>
              </div>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/80 border border-white/10 text-emerald-400 text-xs font-tech">
              <HardDrive className="w-3.5 h-3.5" /> SYSTEM_ONLINE
            </span>
          </div>

          {/* Operator Profile Photo Badge */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-black/80 border border-cyan-500/30">
            <img
              src="/santosh_profile.jpg"
              alt="Santosh Maurya"
              className="w-10 h-10 rounded-full object-cover border-2 border-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.6)]"
            />
            <div className="flex-1">
              <div className="font-orbitron font-bold text-xs text-white">SANTOSH MAURYA <span className="text-[10px] text-cyan-400 font-tech font-bold">GRAD 2025</span></div>
              <div className="text-[11px] text-slate-400 font-tech">Software Support Engineer & FullStack Developer</div>
            </div>
          </div>
        </div>

        {/* Boot Target Dropdown Selection Form */}
        <form onSubmit={handleBoot} className="space-y-4">
          <div className="space-y-2 relative">
            <div className="flex items-center justify-between text-xs font-orbitron text-cyan-300">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" /> SELECT OS ENVIRONMENT:
              </span>
              <span className="text-[10px] text-slate-500 font-tech">[DROPDOWN MENU]</span>
            </div>

            {/* Custom Styled UEFI Dropdown Trigger Button */}
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="w-full p-3.5 rounded-xl bg-cyan-950/70 border border-cyan-400/80 text-left flex items-center justify-between gap-3 shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:border-cyan-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500 text-black shadow-md shrink-0">
                  <SelectedIcon className="w-5 h-5" />
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

            {/* Dropdown Options Popover List */}
            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#040914] border-2 border-cyan-400/80 rounded-xl shadow-[0_0_40px_rgba(0,240,255,0.4)] max-h-64 overflow-y-auto divide-y divide-white/5 animate-in fade-in slide-in-from-top-2 duration-150">
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
                        isSelected
                          ? 'bg-cyan-950/90 text-white font-bold'
                          : 'bg-black/90 text-slate-300 hover:bg-cyan-950/50 hover:text-white'
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

          {/* Selected OS Description Preview Card */}
          <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-xs font-tech text-slate-300 leading-relaxed">
            <span className="text-cyan-400 font-bold">OS SPECS: </span>
            {selectedOpt.desc}
          </div>

          {/* Big Clean BOOT BUTTON */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-orbitron font-black text-sm tracking-widest shadow-[0_0_30px_rgba(0,240,255,0.8)] hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <Power className="w-5 h-5 fill-black" /> BOOT SELECTED OS <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* BIOS Footer Navigation */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-tech text-slate-500">
          <span>PRESS [ENTER] OR CLICK TO BOOT</span>
          <span>BOOTLOADER v2.088 // DROPDOWN MODE</span>
        </div>
      </div>
    </div>
  );
};
