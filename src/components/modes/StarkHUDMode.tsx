import React from 'react';
import { useOS } from '../../context/OSContext';
import type { WindowId } from '../../types/os';
import { User, Terminal, FolderGit2, Cpu, Send, Gamepad2, Shield, Crosshair, Radio, Eye, Power, X } from 'lucide-react';
import { StarkAppRenderer } from '../../systems/stark_hud/StarkAppRenderer';

interface StarkTarget {
  id: WindowId;
  label: string;
  code: string;
  icon: React.ElementType;
  angle: number;
}

const TARGETS: StarkTarget[] = [
  { id: 'about', label: 'IDENTITY_SYS', code: 'TARGET_01', icon: User, angle: 0 },
  { id: 'terminal', label: 'NEURAL_CLI', code: 'TARGET_02', icon: Terminal, angle: 60 },
  { id: 'projects', label: 'VAULT_SPECS', code: 'TARGET_03', icon: FolderGit2, angle: 120 },
  { id: 'skills', label: 'REACTOR_POWER', code: 'TARGET_04', icon: Cpu, angle: 180 },
  { id: 'contact', label: 'COMMS_BEACON', code: 'TARGET_05', icon: Send, angle: 240 },
  { id: 'game', label: 'HOLODECK_GAME', code: 'TARGET_06', icon: Gamepad2, angle: 300 },
];

export const StarkHUDMode: React.FC = () => {
  const { openWindow, windows, closeWindow, rebootToLogin } = useOS();

  const activeOpenWin = windows.find((w) => w.isOpen && !w.isMinimized);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#050004] text-amber-500 font-mono select-none flex items-center justify-center">
      {/* Background HUD Grid Shader Overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/20 via-black to-black pointer-events-none" />
      
      {/* Stark HUD Scanline Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 text-amber-500 pointer-events-none" />

      {/* Top Stark Header Bar */}
      <div className="absolute top-6 left-6 right-6 z-[100] flex items-center justify-between p-4 border border-amber-500/40 bg-black/70 backdrop-blur-md rounded-xl">
        <button
          onClick={() => openWindow('about')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <Shield className="w-5 h-5 text-red-500 animate-pulse" />
          <span className="font-orbitron font-black tracking-widest text-amber-400 text-sm">
            STARK SPATIAL HUD // MARK-88 PROTOCOL
          </span>
        </button>

        <div className="flex items-center gap-4 text-xs text-amber-300/80 font-tech">
          <span className="hidden md:inline">THREAT LEVEL: <strong className="text-emerald-400">ZERO</strong></span>
          <span className="hidden md:inline">•</span>
          
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              rebootToLogin();
            }}
            className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/80 hover:bg-red-900 border border-amber-500/60 text-amber-300 font-orbitron font-bold text-xs tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(255,170,0,0.3)] hover:scale-105 pointer-events-auto"
          >
            <Power className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>REBOOT / SWITCH OS</span>
          </button>
        </div>
      </div>

      {/* Central Rotating Target Reticle & Core Arc Reactor */}
      <div className="relative z-10 w-[500px] h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-500/40 animate-spin" style={{ animationDuration: '30s' }} />
        <div className="absolute inset-6 rounded-full border border-red-500/30 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
        
        <button
          onClick={() => openWindow('about')}
          className="w-48 h-48 rounded-full border-4 border-amber-400/80 bg-red-950/40 backdrop-blur-xl flex flex-col items-center justify-center text-center p-4 shadow-[0_0_50px_rgba(255,170,0,0.5)] hover:scale-110 transition-transform cursor-pointer group"
        >
          <Crosshair className="w-10 h-10 text-amber-400 group-hover:rotate-45 transition-transform animate-pulse" />
          <h2 className="font-orbitron font-extrabold text-white text-xs mt-2">SANTOSH MAURYA</h2>
          <span className="text-[10px] text-amber-400 font-tech">CLICK FOR IDENTITY</span>
        </button>

        {TARGETS.map((target) => {
          const radius = 220;
          const rad = (target.angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;
          const Icon = target.icon;

          return (
            <div
              key={target.id}
              style={{ transform: `translate(${x}px, ${y}px)` }}
              className="absolute group cursor-pointer"
              onClick={() => openWindow(target.id)}
            >
              <div className="relative p-4 rounded-full bg-black/80 border-2 border-amber-500/60 text-amber-400 group-hover:border-red-500 group-hover:text-red-400 group-hover:scale-125 transition-all duration-300 shadow-[0_0_20px_rgba(255,170,0,0.4)]">
                <Icon className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-[9px] font-tech bg-red-950 border border-red-500/60 rounded text-red-300">
                  {target.code}
                </span>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 top-14 whitespace-nowrap px-3 py-1 bg-black/90 border border-amber-500/50 rounded text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-orbitron font-bold text-xs text-white">{target.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Side Tactical Status Widgets */}
      <button
        onClick={() => openWindow('terminal')}
        className="absolute bottom-6 left-6 z-20 p-4 border border-amber-500/30 bg-black/80 backdrop-blur-md rounded-xl font-tech text-xs space-y-2 text-amber-300 hover:border-amber-400 transition-all cursor-pointer group text-left"
      >
        <div className="flex items-center gap-2 text-red-400 font-bold font-orbitron group-hover:text-amber-400">
          <Radio className="w-4 h-4 animate-pulse" /> SPATIAL TELEMETRY
        </div>
        <div>TARGETING ACQUISITION: ACTIVE</div>
        <div className="text-amber-400 font-bold">[ CLICK TO OPEN CLI ]</div>
      </button>

      <button
        onClick={() => openWindow('skills')}
        className="absolute bottom-6 right-6 z-20 p-4 border border-amber-500/30 bg-black/80 backdrop-blur-md rounded-xl font-tech text-xs space-y-2 text-amber-300 hover:border-amber-400 transition-all cursor-pointer group text-right"
      >
        <div className="flex items-center justify-end gap-2 text-amber-400 font-bold font-orbitron group-hover:text-red-400">
          <span>BIOMETRIC EYE LOCK</span> <Eye className="w-4 h-4" />
        </div>
        <div>USER IDENTITY: VERIFIED</div>
        <div className="text-amber-400 font-bold">[ CLICK SKILL REACTOR ]</div>
      </button>

      {/* Custom Stark Mark-88 Spatial HUD Frame Modal Viewer */}
      {activeOpenWin && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in zoom-in duration-300">
          <div className="relative w-full max-w-4xl max-h-[85vh] rounded-3xl bg-[#0a0205] border-2 border-amber-500/80 shadow-[0_0_60px_rgba(255,170,0,0.5)] flex flex-col overflow-hidden">
            {/* Stark Header */}
            <div className="px-6 py-4 border-b border-amber-500/40 bg-red-950/40 flex items-center justify-between font-orbitron text-amber-400">
              <div className="flex items-center gap-3">
                <Crosshair className="w-5 h-5 text-amber-400 animate-pulse" />
                <span className="font-bold text-sm tracking-wider uppercase text-amber-300">
                  STARK MARK-88 // {activeOpenWin.title}
                </span>
              </div>
              <button
                onClick={() => closeWindow(activeOpenWin.id)}
                className="p-1.5 rounded-full bg-red-950/80 hover:bg-red-900 border border-amber-400 text-amber-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* App Content Body via StarkAppRenderer */}
            <div className="flex-1 overflow-y-auto p-6 text-white font-mono">
              <StarkAppRenderer windowId={activeOpenWin.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
