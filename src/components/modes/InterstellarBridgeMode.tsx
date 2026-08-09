import React, { useEffect, useRef, useState } from 'react';
import { useOS } from '../../context/OSContext';
import type { WindowId } from '../../types/os';
import { Rocket, Navigation, Shield, Compass, User, Terminal, FolderGit2, Cpu, Send, Gamepad2, Power, X } from 'lucide-react';
import { InterstellarAppRenderer } from '../../systems/interstellar_bridge/InterstellarAppRenderer';

interface PlanetNode {
  id: WindowId;
  title: string;
  destination: string;
  coord: string;
  icon: React.ElementType;
  x: number;
  y: number;
  color: string;
}

const PLANETS: PlanetNode[] = [
  { id: 'about', title: 'EARTH BASE', destination: 'Operator Bio & Specs', coord: 'SECTOR 001', icon: User, x: 25, y: 35, color: '#00f0ff' },
  { id: 'terminal', title: 'QUANTUM CORE', destination: 'Neural CLI Shell', coord: 'SECTOR 002', icon: Terminal, x: 75, y: 35, color: '#00ff66' },
  { id: 'projects', title: 'DEEP SPACE VAULT', destination: 'Project Matrix', coord: 'SECTOR 003', icon: FolderGit2, x: 30, y: 70, color: '#ff0080' },
  { id: 'skills', title: 'REACTOR CORE', destination: 'Skill Power Arsenal', coord: 'SECTOR 004', icon: Cpu, x: 70, y: 70, color: '#ffaa00' },
  { id: 'contact', title: 'SUB-SPACE BEACON', destination: 'Transmission Form', coord: 'SECTOR 005', icon: Send, x: 50, y: 52, color: '#aa3bff' },
  { id: 'game', title: 'HOLODECK BAY', destination: 'Cyber Arcade Game', coord: 'SECTOR 006', icon: Gamepad2, x: 50, y: 88, color: '#00f0ff' },
];

export const InterstellarBridgeMode: React.FC = () => {
  const { openWindow, windows, closeWindow, rebootToLogin } = useOS();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [warpSpeed, setWarpSpeed] = useState<boolean>(true);

  const activeOpenWin = windows.find((w) => w.isOpen && !w.isMinimized);

  // 3D Starfield Warp Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const stars = Array.from({ length: 250 }).map(() => ({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: Math.random() * width,
    }));

    const cx = width / 2;
    const cy = height / 2;

    const render = () => {
      ctx.fillStyle = 'rgba(2, 4, 10, 0.4)';
      ctx.fillRect(0, 0, width, height);

      const speed = warpSpeed ? 8 : 2;

      stars.forEach((star) => {
        star.z -= speed;
        if (star.z <= 0) {
          star.z = width;
          star.x = (Math.random() - 0.5) * width;
          star.y = (Math.random() - 0.5) * height;
        }

        const k = 256 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = (1 - star.z / width) * 3;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = '#00f0ff';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#00f0ff';
          ctx.fill();
        }
      });

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrame);
    };
  }, [warpSpeed]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#020408] text-white font-mono select-none">
      {/* 3D Starfield Warp Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Ship Cockpit Overlay Frame */}
      <div className="absolute inset-0 z-10 border-[16px] border-slate-950/80 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.9)]" />

      {/* Top Navigation Control Bar */}
      <div className="absolute top-6 left-8 right-8 z-[100] flex items-center justify-between p-4 rounded-xl border border-cyan-500/40 bg-slate-950/80 backdrop-blur-md">
        <button
          onClick={() => openWindow('about')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <Rocket className="w-5 h-5 text-cyan-400 animate-pulse" />
          <span className="font-orbitron font-extrabold text-sm tracking-widest text-cyan-300">
            INTERSTELLAR COMMAND BRIDGE // STARSHIP SANTOSH-01
          </span>
        </button>

        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={() => setWarpSpeed(!warpSpeed)}
            className={`px-3 py-1.5 rounded-full font-orbitron font-bold border transition-all cursor-pointer ${
              warpSpeed
                ? 'bg-cyan-500 text-black border-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.8)]'
                : 'bg-slate-900 text-cyan-400 border-cyan-800'
            }`}
          >
            {warpSpeed ? 'WARP DRIVE: ENGAGED' : 'IMPULSE DRIVE'}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              rebootToLogin();
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/60 text-cyan-300 font-orbitron font-bold text-xs tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:scale-105 pointer-events-auto"
          >
            <Power className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>REBOOT / SWITCH OS</span>
          </button>
        </div>
      </div>

      {/* Interactive Planetary Navigation Nodes */}
      <div className="absolute inset-0 z-20 pointer-events-auto">
        {PLANETS.map((planet) => {
          const Icon = planet.icon;

          return (
            <div
              key={planet.id}
              style={{ left: `${planet.x}%`, top: `${planet.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
              onClick={() => openWindow(planet.id)}
            >
              <div className="relative p-6 rounded-full bg-slate-950/80 border-2 border-cyan-500/50 group-hover:border-cyan-300 group-hover:scale-125 transition-all duration-300 shadow-[0_0_30px_rgba(0,240,255,0.4)]">
                <Icon className="w-8 h-8 text-cyan-400" style={{ color: planet.color }} />
                <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40 animate-spin" style={{ animationDuration: '15s' }} />
              </div>

              <div className="mt-3 text-center bg-black/80 border border-white/10 px-3 py-1.5 rounded-lg space-y-0.5 backdrop-blur-md">
                <span className="text-[10px] text-cyan-400 font-tech block">{planet.coord}</span>
                <span className="font-orbitron font-bold text-xs text-white group-hover:text-cyan-300 transition-colors block">
                  {planet.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Bridge Instrument Panel */}
      <div className="absolute bottom-6 left-8 right-8 z-20 p-4 rounded-xl border border-cyan-500/40 bg-slate-950/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
        <button
          onClick={() => openWindow('projects')}
          className="flex items-center gap-2 font-tech hover:text-cyan-300 transition-colors cursor-pointer group"
        >
          <Navigation className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span>COURSE: <strong className="text-white">PROJECT VAULT [CLICK]</strong></span>
        </button>

        <button
          onClick={() => openWindow('about')}
          className="flex items-center gap-2 font-tech hover:text-cyan-300 transition-colors cursor-pointer group"
        >
          <Compass className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          <span>OPERATOR: <strong className="text-cyan-300">SANTOSH MAURYA [CLICK]</strong></span>
        </button>

        <button
          onClick={() => openWindow('contact')}
          className="flex items-center gap-2 font-tech hover:text-cyan-300 transition-colors cursor-pointer group"
        >
          <Shield className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
          <span>SHIELDS: <strong className="text-emerald-400">100% [CLICK COMMS]</strong></span>
        </button>
      </div>

      {/* Custom Starship Cockpit Holographic Terminal Frame Modal Viewer */}
      {activeOpenWin && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in zoom-in duration-300">
          <div className="relative w-full max-w-4xl max-h-[85vh] rounded-3xl bg-[#020b14] border-2 border-emerald-500/80 shadow-[0_0_60px_rgba(0,255,102,0.4)] flex flex-col overflow-hidden">
            {/* Cockpit Terminal Header */}
            <div className="px-6 py-4 border-b border-emerald-500/40 bg-slate-950/80 flex items-center justify-between font-orbitron text-emerald-400">
              <div className="flex items-center gap-3">
                <Rocket className="w-5 h-5 text-emerald-400 animate-pulse" />
                <span className="font-bold text-sm tracking-wider uppercase text-emerald-300">
                  STARSHIP TERMINAL // {activeOpenWin.title}
                </span>
              </div>
              <button
                onClick={() => closeWindow(activeOpenWin.id)}
                className="p-1.5 rounded-full bg-slate-900 hover:bg-rose-900 border border-emerald-400 text-emerald-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* App Content Body via InterstellarAppRenderer */}
            <div className="flex-1 overflow-y-auto p-6 text-white font-mono">
              <InterstellarAppRenderer windowId={activeOpenWin.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
