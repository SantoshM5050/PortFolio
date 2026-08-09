import React, { useEffect, useRef } from 'react';
import { useOS } from '../../context/OSContext';
import type { WindowId } from '../../types/os';
import { Music, User, Terminal, FolderGit2, Cpu, Send, Gamepad2, Power, X, Disc } from 'lucide-react';
import { SynthwaveAppRenderer } from '../../systems/synthwave_arcade/SynthwaveAppRenderer';

interface SynthwaveNode {
  id: WindowId;
  label: string;
  tapeCode: string;
  icon: React.ElementType;
}

const NODES: SynthwaveNode[] = [
  { id: 'about', label: 'OPERATOR TAPE', tapeCode: 'CASSETTE_01', icon: User },
  { id: 'terminal', label: 'SYNTH CLI SHELL', tapeCode: 'CASSETTE_02', icon: Terminal },
  { id: 'projects', label: 'OUTRUN VAULT', tapeCode: 'CASSETTE_03', icon: FolderGit2 },
  { id: 'skills', label: 'NEON POWER GRID', tapeCode: 'CASSETTE_04', icon: Cpu },
  { id: 'contact', label: 'RETRO COMMS', tapeCode: 'CASSETTE_05', icon: Send },
  { id: 'game', label: '80S MINI ARCADE', tapeCode: 'CASSETTE_06', icon: Gamepad2 },
];

export const SynthwaveArcadeMode: React.FC = () => {
  const { openWindow, windows, closeWindow, rebootToLogin } = useOS();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 3D Synthwave Horizon Grid Canvas Effect
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

    let offset = 0;

    const render = () => {
      ctx.fillStyle = '#0f021a';
      ctx.fillRect(0, 0, width, height);

      // Draw Glowing Synthwave Sun
      const sunX = width / 2;
      const sunY = height / 2.8;
      const sunRadius = 110;

      const sunGrad = ctx.createLinearGradient(sunX, sunY - sunRadius, sunX, sunY + sunRadius);
      sunGrad.addColorStop(0, '#ffaa00');
      sunGrad.addColorStop(0.5, '#ff0080');
      sunGrad.addColorStop(1, '#aa00ff');

      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
      ctx.fillStyle = sunGrad;
      ctx.shadowBlur = 40;
      ctx.shadowColor = '#ff0080';
      ctx.fill();

      // Horizon Line
      const horizon = height / 2.2;

      // Perspective Grid Lines
      ctx.strokeStyle = '#ff0080';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#ff0080';

      // Vanishing point perspective lines
      for (let x = -width; x <= width * 2; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, height);
        ctx.lineTo(sunX, horizon);
        ctx.stroke();
      }

      // Horizontal moving grid lines
      offset = (offset + 1.2) % 40;
      for (let y = horizon; y <= height; y += (y - horizon) * 0.15 + 4) {
        const lineY = y + offset;
        if (lineY <= height && lineY >= horizon) {
          ctx.beginPath();
          ctx.moveTo(0, lineY);
          ctx.lineTo(width, lineY);
          ctx.stroke();
        }
      }

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
    <div className="relative w-full h-full overflow-hidden bg-[#0f021a] text-pink-400 font-mono select-none">
      {/* 3D Synthwave Grid Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-80" />

      {/* Top Synthwave Header */}
      <div className="absolute top-0 left-0 right-0 z-[100] px-6 py-4 flex items-center justify-between border-b border-pink-500/40 bg-black/80 backdrop-blur-md text-xs">
        <button
          onClick={() => openWindow('about')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <Music className="w-5 h-5 text-pink-400 animate-pulse" />
          <div>
            <div className="font-orbitron font-black text-pink-400 text-sm tracking-widest text-glow-pink">
              SYNTHWAVE OUTRUN 80s OS
            </div>
            <div className="text-[10px] text-amber-300 font-tech">OPERATOR: SANTOSH MAURYA [CASSETTE DECK]</div>
          </div>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            rebootToLogin();
          }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-950/80 hover:bg-pink-900 border border-pink-500/60 text-pink-300 text-xs font-orbitron tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(255,0,128,0.4)] hover:scale-105 pointer-events-auto"
        >
          <Power className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>REBOOT / SWITCH OS</span>
        </button>
      </div>

      {/* Center Interactive Neon Cassette Deck Cards */}
      <div className="relative z-10 h-full flex items-center justify-center p-6 pt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl w-full">
          {NODES.map((node) => {
            const Icon = node.icon;
            return (
              <div
                key={node.id}
                onClick={() => openWindow(node.id)}
                className="p-6 rounded-2xl bg-black/80 border-2 border-pink-500/60 hover:border-amber-400 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,0,128,0.4)] cursor-pointer group space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-pink-950/80 border border-pink-500/40 text-pink-400 group-hover:bg-amber-400 group-hover:text-black transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-tech px-2 py-0.5 rounded bg-pink-950 text-amber-300 border border-pink-500/40">
                    {node.tapeCode}
                  </span>
                </div>

                <div>
                  <h3 className="font-orbitron font-black text-sm text-white group-hover:text-amber-300 transition-colors">
                    {node.label}
                  </h3>
                  <p className="text-[10px] text-pink-400/80 font-tech mt-1">
                    [ PLAY RETRO CASSETTE ]
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="absolute bottom-6 left-8 right-8 z-20 p-3 rounded-xl border border-pink-500/40 bg-black/80 backdrop-blur-md flex items-center justify-between text-xs text-pink-300 font-tech">
        <div className="flex items-center gap-2">
          <Disc className="w-4 h-4 text-pink-400 animate-spin" />
          <span>OUTRUN AUDIO: <strong className="text-amber-300">SYNTHWAVE 80S ACTIVE</strong></span>
        </div>
        <span>HORIZON SPEED: 120 MPH</span>
      </div>

      {/* Custom Synthwave Cassette Deck Modal Viewer */}
      {activeOpenWin && (
        <div className="fixed inset-0 z-40 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl max-h-[85vh] rounded-3xl bg-[#14021e] border-2 border-pink-500 shadow-[0_0_60px_rgba(255,0,128,0.5)] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-pink-500/40 bg-pink-950/60 flex items-center justify-between font-orbitron text-pink-400">
              <div className="flex items-center gap-3">
                <Music className="w-5 h-5 text-pink-400 animate-pulse" />
                <span className="font-black text-sm tracking-wider uppercase text-amber-300">
                  SYNTHWAVE CASSETTE // {activeOpenWin.title}
                </span>
              </div>
              <button
                onClick={() => closeWindow(activeOpenWin.id)}
                className="p-1.5 rounded-full bg-pink-900/60 hover:bg-rose-900 border border-pink-400 text-pink-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* App Content Body via SynthwaveAppRenderer */}
            <div className="flex-1 overflow-y-auto p-6 text-white font-mono">
              <SynthwaveAppRenderer windowId={activeOpenWin.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
