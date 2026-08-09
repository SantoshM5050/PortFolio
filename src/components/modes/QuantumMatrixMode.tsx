import React, { useEffect, useRef, useState } from 'react';
import { useOS } from '../../context/OSContext';
import type { WindowId } from '../../types/os';
import { Cpu, Terminal, FolderGit2, User, Send, Gamepad2, Activity, ShieldCheck, Zap, Power, X, Sparkles } from 'lucide-react';
import { QuantumAppRenderer } from '../../systems/quantum_matrix/QuantumAppRenderer';

interface QuantumNode {
  id: WindowId;
  label: string;
  category: string;
  icon: React.ElementType;
  x: number;
  y: number;
  color: string;
}

const NODES: QuantumNode[] = [
  { id: 'about', label: 'Santosh Maurya', category: 'OPERATOR PROFILE', icon: User, x: 50, y: 35, color: '#00f0ff' },
  { id: 'terminal', label: 'Cyber CLI', category: 'NEURAL SHELL', icon: Terminal, x: 25, y: 55, color: '#00ff66' },
  { id: 'projects', label: 'Project Vault', category: 'ARTIFACT MATRIX', icon: FolderGit2, x: 75, y: 55, color: '#ff0080' },
  { id: 'skills', label: 'Skill Arsenal', category: 'POWER METERS', icon: Cpu, x: 35, y: 75, color: '#ffaa00' },
  { id: 'contact', label: 'Neural Comms', category: 'TRANSMISSION', icon: Send, x: 65, y: 75, color: '#aa3bff' },
  { id: 'game', label: 'Cyber Arcade', category: 'HOLODECK GAME', icon: Gamepad2, x: 50, y: 88, color: '#00f0ff' },
];

export const QuantumMatrixMode: React.FC = () => {
  const { openWindow, windows, closeWindow, rebootToLogin } = useOS();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [hoveredNode, setHoveredNode] = useState<QuantumNode | null>(null);

  // 3D Particle Constellation Canvas
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

    const particleCount = 85;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      radius: Math.random() * 2 + 1,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#00f0ff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00f0ff';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${1 - dist / 130})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        const mouseDist = Math.hypot(p.x - mouseRef.current.x, p.y - mouseRef.current.y);
        if (mouseDist < 160) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = `rgba(255, 0, 128, ${1 - mouseDist / 160})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      });

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const activeOpenWin = windows.find((w) => w.isOpen && !w.isMinimized);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#03060c] text-white select-none">
      {/* Particle Constellation Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Sci-Fi Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 z-[100] px-6 py-4 flex items-center justify-between border-b border-cyan-500/30 bg-black/60 backdrop-blur-md font-mono text-xs select-none">
        <div
          onClick={() => openWindow('about')}
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <Zap className="w-5 h-5 text-amber-400 animate-pulse" />
          <div>
            <div className="font-orbitron font-extrabold text-cyan-400 text-sm tracking-wider text-glow-cyan">
              QUANTUM NEURAL MATRIX v3.0
            </div>
            <div className="text-[10px] text-slate-400 font-tech">OPERATOR: SANTOSH MAURYA [CLICK PROFILE]</div>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            rebootToLogin();
          }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 text-xs font-orbitron tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:scale-105 pointer-events-auto"
        >
          <Power className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span>REBOOT / SWITCH OS</span>
        </button>
      </div>

      {/* Interactive Neural Matrix Nodes */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {NODES.map((node) => {
          const Icon = node.icon;
          const isHovered = hoveredNode?.id === node.id;

          return (
            <div
              key={node.id}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer pointer-events-auto"
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => openWindow(node.id)}
            >
              <div
                className={`relative p-5 rounded-full backdrop-blur-md border-2 transition-all duration-500 ${
                  isHovered
                    ? 'scale-125 bg-black/80 border-cyan-400 shadow-[0_0_35px_rgba(0,240,255,0.8)]'
                    : 'bg-black/50 border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.8)] hover:border-cyan-400/60'
                }`}
                style={{ borderColor: isHovered ? node.color : undefined }}
              >
                <Icon className="w-8 h-8 transition-transform duration-300 group-hover:rotate-12" style={{ color: node.color }} />
                <div
                  className="absolute inset-0 rounded-full border border-dashed animate-spin pointer-events-none opacity-40"
                  style={{ borderColor: node.color, animationDuration: '10s' }}
                />
              </div>

              <div className="mt-3 text-center space-y-0.5">
                <span className="text-[10px] font-tech px-2 py-0.5 rounded bg-black/70 border border-white/10 text-cyan-300 block">
                  {node.category}
                </span>
                <span className="font-orbitron font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors block">
                  {node.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Bottom Info HUD Widgets */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 cyber-glass px-6 py-3 rounded-full border border-cyan-500/40 flex items-center gap-6 font-mono text-xs text-slate-300 select-none">
        <button
          onClick={() => openWindow('skills')}
          className="flex items-center gap-2 hover:text-cyan-300 transition-colors cursor-pointer group"
        >
          <Activity className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform animate-pulse" />
          <span>NEURAL SYNAPSE: <strong className="text-emerald-400">99.8% [SKILLS]</strong></span>
        </button>
        <span className="text-slate-600">|</span>
        <button
          onClick={() => openWindow('terminal')}
          className="flex items-center gap-2 hover:text-cyan-300 transition-colors cursor-pointer group"
        >
          <ShieldCheck className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
          <span>ENCRYPTION: <strong className="text-cyan-300">ACTIVE [CLI]</strong></span>
        </button>
      </div>

      {/* Custom Quantum Holographic Holo-Card Modal Viewer */}
      {activeOpenWin && (
        <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in zoom-in duration-300">
          <div className="relative w-full max-w-4xl max-h-[85vh] rounded-3xl bg-black/90 border-2 border-cyan-400 shadow-[0_0_60px_rgba(0,240,255,0.4)] flex flex-col overflow-hidden">
            {/* Quantum Holo Header */}
            <div className="px-6 py-4 border-b border-cyan-500/40 bg-cyan-950/60 flex items-center justify-between font-orbitron">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-spin" />
                <span className="font-bold text-sm tracking-wider text-cyan-300 text-glow-cyan uppercase">
                  QUANTUM HOLOGRAM // {activeOpenWin.title}
                </span>
              </div>
              <button
                onClick={() => closeWindow(activeOpenWin.id)}
                className="p-1.5 rounded-full bg-cyan-900/60 hover:bg-rose-900 border border-cyan-400 text-cyan-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* App Content Body via QuantumAppRenderer */}
            <div className="flex-1 overflow-y-auto p-6 text-white font-mono">
              <QuantumAppRenderer windowId={activeOpenWin.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
