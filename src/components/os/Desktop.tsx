import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import type { WindowId } from '../../types/os';
import { Terminal, User, FolderGit2, Cpu, Music, Send, Gamepad2, Activity, ShieldCheck, Wifi, Clock, Power, Globe, Maximize2, Code } from 'lucide-react';
import { WindowFrame } from './WindowFrame';
import { CyberOSAppRenderer } from '../../systems/cyberos/CyberOSAppRenderer';

const DESKTOP_ICONS: { id: WindowId; label: string; icon: React.ElementType; tag: string }[] = [
  { id: 'about', label: 'about.sys', icon: User, tag: 'PROFILE' },
  { id: 'terminal', label: 'terminal.exe', icon: Terminal, tag: 'CLI' },
  { id: 'projects', label: 'projects.exe', icon: FolderGit2, tag: 'VAULT' },
  { id: 'skills', label: 'skills.exe', icon: Cpu, tag: 'MATRIX' },
  { id: 'code_lab', label: 'code_lab.exe', icon: Code, tag: 'IDE' },
  { id: 'music', label: 'music.exe', icon: Music, tag: 'LO-FI' },
  { id: 'contact', label: 'contact.exe', icon: Send, tag: 'NODE' },
  { id: 'game', label: 'game.exe', icon: Gamepad2, tag: 'ARCADE' },
  { id: 'browser', label: 'browser.exe', icon: Globe, tag: 'WEB' },
];

export const Desktop: React.FC = () => {
  const { windows, openWindow, theme, rebootToLogin } = useOS();
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; s: number; d: number }[]>([]);
  const [time, setTime] = useState<string>('');
  const [cpuUsage, setCpuUsage] = useState<number>(14);

  // Time & System Stats Simulator
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);

    const cpuInterval = setInterval(() => {
      setCpuUsage(Math.floor(12 + Math.random() * 15));
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(cpuInterval);
    };
  }, []);

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: Math.random() * 2.5 + 1,
      d: Math.random() * 18 + 10,
    }));
    setParticles(newParticles);
  }, []);

  const primaryThemeColor =
    theme === 'matrix' ? 'text-green-400 border-green-500/40 shadow-green-500/20' :
    theme === 'synthwave' ? 'text-pink-400 border-pink-500/40 shadow-pink-500/20' :
    theme === 'solar' ? 'text-yellow-400 border-yellow-500/40 shadow-yellow-500/20' :
    'text-cyan-400 border-cyan-500/40 shadow-cyan-500/20';

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-[#080e1a]">
      {/* Dynamic Animated Particle Mesh Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.s}px`,
              height: `${p.s}px`,
              animationDuration: `${p.d}s`,
            }}
            className="absolute rounded-full bg-cyan-400/40 animate-pulse"
          />
        ))}
      </div>

      {/* Futuristic Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Top Status Bar HUD */}
      <div className="absolute top-0 left-0 right-0 z-[100] px-6 py-3 border-b border-cyan-500/30 bg-black/60 backdrop-blur-md flex items-center justify-between font-mono text-xs text-slate-300">
        <div className="flex items-center gap-6">
          <div
            onClick={() => openWindow('about')}
            className="flex items-center gap-2 text-cyan-400 font-orbitron font-bold text-sm tracking-wider cursor-pointer hover:opacity-80 transition-opacity"
          >
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>CYBEROS v2.088</span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5 font-tech">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" /> CPU: {cpuUsage}%
            </span>
            <span className="flex items-center gap-1.5 font-tech">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> DEFENSE: ACTIVE
            </span>
            <span className="flex items-center gap-1.5 font-tech">
              <Wifi className="w-3.5 h-3.5 text-purple-400" /> MATRIX_LINK: 1.2 Gbps
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-tech">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{time || '12:00:00 AM'}</span>
          </div>

          <button
            type="button"
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
              } else if (document.exitFullscreen) {
                document.exitFullscreen().catch(() => {});
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 font-orbitron text-xs tracking-wider transition-all cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.2)] hover:scale-105 pointer-events-auto"
            title="Toggle Fullscreen Mode (F11)"
          >
            <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>FULLSCREEN</span>
          </button>

          {/* Reboot Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              rebootToLogin();
            }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 font-orbitron text-xs tracking-wider transition-all cursor-pointer shadow-[0_0_12px_rgba(0,240,255,0.3)] hover:scale-105 pointer-events-auto"
          >
            <Power className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>REBOOT</span>
          </button>
        </div>
      </div>

      {/* Desktop App Icons Grid */}
      <div className="absolute top-16 left-6 z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 p-2 pointer-events-auto">
        {DESKTOP_ICONS.map((icon) => (
          <button
            key={icon.id}
            onDoubleClick={() => openWindow(icon.id)}
            onClick={() => openWindow(icon.id)}
            className="flex flex-col items-center gap-2 p-2.5 rounded-xl hover:bg-white/10 transition-all duration-300 group focus:outline-none focus:ring-1 focus:ring-cyan-400/50 cursor-pointer"
          >
            <div className={`relative p-3.5 rounded-2xl bg-black/60 backdrop-blur-xl border shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] group-active:scale-95 ${primaryThemeColor}`}>
              <icon.icon className="w-7 h-7" />
              <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.2 text-[9px] font-orbitron font-bold rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                {icon.tag}
              </span>
            </div>
            <span className="text-xs text-slate-200 font-tech text-center drop-shadow-lg group-hover:text-cyan-300 transition-colors">
              {icon.label}
            </span>
          </button>
        ))}
      </div>

      {/* Central Sci-Fi HUD Watermark Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none flex flex-col items-center justify-center text-center opacity-25 select-none">
        <div className="relative">
          <h1 className="font-orbitron font-black text-5xl md:text-7xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-500">
            SANTOSH MAURYA
          </h1>
          <div className="mt-2 font-tech text-xs tracking-[0.4em] text-cyan-300">
            // FULLSTACK DEVELOPER & CYBER UI ARCHITECT //
          </div>
          <div className="mt-4 flex items-center justify-center gap-4 text-[10px] font-mono text-slate-500">
            <span>[ SYSTEM: OPERATIONAL ]</span>
            <span>[ CORE: REACT 19 / VITE ]</span>
            <span>[ NODE: DEL-01 ]</span>
          </div>
        </div>
      </div>

      {/* Render Active Windows via CyberOSAppRenderer */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {windows.map((win) => {
          if (win.isMinimized) return null;
          
          return (
            <WindowFrame key={win.id} windowState={win}>
              <div className="text-white font-mono pointer-events-auto h-full overflow-hidden">
                <CyberOSAppRenderer windowId={win.id} />
              </div>
            </WindowFrame>
          );
        })}
      </div>
    </div>
  );
};
