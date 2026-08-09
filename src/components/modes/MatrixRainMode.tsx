import React, { useEffect, useRef } from 'react';
import { useOS } from '../../context/OSContext';
import type { WindowId } from '../../types/os';
import { Terminal, User, FolderGit2, Cpu, Send, Gamepad2, Power, X, ShieldAlert } from 'lucide-react';
import { MatrixRainAppRenderer } from '../../systems/matrix_rain/MatrixRainAppRenderer';

interface MatrixNode {
  id: WindowId;
  label: string;
  code: string;
  icon: React.ElementType;
}

const NODES: MatrixNode[] = [
  { id: 'about', label: 'OPERATOR IDENTITY', code: 'SYS_01', icon: User },
  { id: 'terminal', label: 'NEURAL SHELL', code: 'CLI_02', icon: Terminal },
  { id: 'projects', label: 'PROJECT MATRIX', code: 'VAULT_03', icon: FolderGit2 },
  { id: 'skills', label: 'POWER ARSENAL', code: 'SKILLS_04', icon: Cpu },
  { id: 'contact', label: 'COMMS RELAY', code: 'BEACON_05', icon: Send },
  { id: 'game', label: 'RETRO ARCADE', code: 'HOLODECK_06', icon: Gamepad2 },
];

export const MatrixRainMode: React.FC = () => {
  const { openWindow, windows, closeWindow, rebootToLogin } = useOS();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Matrix Digital Rain Canvas Effect
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

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array.from({ length: columns }).fill(1) as number[];

    const render = () => {
      ctx.fillStyle = 'rgba(2, 8, 4, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00ff66';
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;

        ctx.fillText(text, x, y * fontSize);

        if (y * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const activeOpenWin = windows.find((w) => w.isOpen && !w.isMinimized);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#020804] text-emerald-400 font-mono select-none">
      {/* Matrix Code Stream Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />

      {/* Top Matrix Header */}
      <div className="absolute top-0 left-0 right-0 z-[100] px-6 py-4 flex items-center justify-between border-b border-emerald-500/40 bg-black/80 backdrop-blur-md text-xs">
        <button
          onClick={() => openWindow('about')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <Terminal className="w-5 h-5 text-emerald-400 animate-pulse" />
          <div>
            <div className="font-orbitron font-bold text-emerald-400 text-sm tracking-widest">
              MATRIX DIGITAL CODE STREAM v4.0
            </div>
            <div className="text-[10px] text-emerald-300/70 font-tech">OPERATOR: SANTOSH MAURYA [CODE MATRIX]</div>
          </div>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            rebootToLogin();
          }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/60 text-emerald-300 text-xs font-orbitron tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(0,255,102,0.3)] hover:scale-105 pointer-events-auto"
        >
          <Power className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          <span>REBOOT / SWITCH OS</span>
        </button>
      </div>

      {/* Center Interactive Code Stream Matrix Cards */}
      <div className="relative z-10 h-full flex items-center justify-center p-6 pt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl w-full">
          {NODES.map((node) => {
            const Icon = node.icon;
            return (
              <div
                key={node.id}
                onClick={() => openWindow(node.id)}
                className="p-6 rounded-2xl bg-black/80 border-2 border-emerald-500/50 hover:border-emerald-300 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(0,255,102,0.3)] cursor-pointer group space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 group-hover:bg-emerald-400 group-hover:text-black transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-tech px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    {node.code}
                  </span>
                </div>

                <div>
                  <h3 className="font-orbitron font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                    {node.label}
                  </h3>
                  <p className="text-[10px] text-emerald-400/70 font-tech mt-1">
                    [ CLICK TO INITIALIZE NODE ]
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="absolute bottom-6 left-8 right-8 z-20 p-3 rounded-xl border border-emerald-500/40 bg-black/80 backdrop-blur-md flex items-center justify-between text-xs text-emerald-300 font-tech">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>NEURAL MAINFRAME: <strong className="text-white">OPERATIONAL</strong></span>
        </div>
        <span>MATRIX DATA STREAM: ACTIVE</span>
      </div>

      {/* Custom Matrix Terminal Modal Viewer */}
      {activeOpenWin && (
        <div className="fixed inset-0 z-40 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl max-h-[85vh] rounded-3xl bg-[#020a04] border-2 border-emerald-400 shadow-[0_0_60px_rgba(0,255,102,0.5)] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-emerald-500/40 bg-emerald-950/60 flex items-center justify-between font-orbitron text-emerald-400">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-emerald-400 animate-pulse" />
                <span className="font-bold text-sm tracking-wider uppercase text-emerald-300">
                  MATRIX TERMINAL // {activeOpenWin.title}
                </span>
              </div>
              <button
                onClick={() => closeWindow(activeOpenWin.id)}
                className="p-1.5 rounded-full bg-emerald-900/60 hover:bg-rose-900 border border-emerald-400 text-emerald-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* App Content Body via MatrixRainAppRenderer */}
            <div className="flex-1 overflow-y-auto p-6 text-white font-mono">
              <MatrixRainAppRenderer windowId={activeOpenWin.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
