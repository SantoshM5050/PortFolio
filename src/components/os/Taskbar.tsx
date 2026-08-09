import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { StartMenu } from './StartMenu';
import { User, Terminal, FolderGit2, Cpu, Music, Send, Gamepad2, Settings, Volume2, VolumeX, Tv, Zap, Clock } from 'lucide-react';


const ICON_MAP: Record<string, React.ElementType> = {
  User,
  Terminal,
  FolderGit2,
  Cpu,
  Music,
  Send,
  Gamepad2,
  Settings,
};

export const Taskbar: React.FC = () => {
  const {
    windows,
    activeWindowId,
    startMenuOpen,
    toggleStartMenu,
    focusWindow,
    minimizeWindow,
    soundEnabled,
    toggleSound,
    scanlinesEnabled,
    toggleScanlines,
    theme,
  } = useOS();

  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <StartMenu />
      <div className="fixed bottom-0 left-0 right-0 h-12 z-[9998] cyber-glass border-t border-cyan-500/30 flex items-center justify-between px-3 font-sans select-none backdrop-blur-md">
        {/* Left Start Button & Launcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleStartMenu}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-orbitron font-extrabold text-xs tracking-wider transition-all duration-200 border ${
              startMenuOpen
                ? 'bg-cyan-500 text-black border-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.8)]'
                : 'bg-cyan-950/80 text-cyan-400 hover:text-cyan-200 border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
            }`}
          >
            <Zap className={`w-4 h-4 ${startMenuOpen ? 'animate-spin' : 'animate-pulse text-amber-400'}`} />
            CYBER<span className={startMenuOpen ? 'text-black' : 'text-slate-100'}>OS</span>
          </button>

          {/* Running App Tabs */}
          <div className="hidden sm:flex items-center gap-1.5 ml-2 overflow-x-auto max-w-[50vw] py-1">
            {windows.map((w) => {
              if (!w.isOpen) return null;
              const Icon = ICON_MAP[w.icon] || Terminal;
              const isActive = activeWindowId === w.id && !w.isMinimized;

              return (
                <button
                  key={w.id}
                  onClick={() => {
                    if (isActive) {
                      minimizeWindow(w.id);
                    } else {
                      focusWindow(w.id);
                    }
                  }}
                  className={`flex items-center gap-2 px-3 py-1 rounded border text-xs font-orbitron font-medium transition-all max-w-[160px] truncate ${
                    isActive
                      ? 'bg-cyan-950/90 text-cyan-300 border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                      : w.isMinimized
                      ? 'bg-slate-900/40 text-slate-500 border-slate-800 hover:border-slate-700'
                      : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:border-cyan-600'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
                  <span className="truncate">{w.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right System Tray */}
        <div className="flex items-center gap-2 sm:gap-3 text-slate-300 text-xs font-tech">
          {/* CRT Scanline Toggle */}
          <button
            onClick={toggleScanlines}
            className={`p-1.5 rounded border transition-colors ${
              scanlinesEnabled
                ? 'bg-cyan-950/80 text-cyan-400 border-cyan-500/40'
                : 'bg-slate-900/60 text-slate-500 border-slate-800'
            }`}
            title={scanlinesEnabled ? 'CRT Scanlines ON' : 'CRT Scanlines OFF'}
          >
            <Tv className="w-3.5 h-3.5" />
          </button>

          {/* Audio SFX Toggle */}
          <button
            onClick={toggleSound}
            className={`p-1.5 rounded border transition-colors ${
              soundEnabled
                ? 'bg-cyan-950/80 text-cyan-400 border-cyan-500/40'
                : 'bg-slate-900/60 text-slate-500 border-slate-800'
            }`}
            title={soundEnabled ? 'System Audio SFX ON' : 'System Audio SFX OFF'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Active Theme Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded bg-black/50 border border-white/10 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="font-orbitron capitalize text-cyan-300">{theme}</span>
          </div>

          {/* Clock */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 border border-cyan-500/30 text-cyan-300 font-orbitron font-semibold text-xs shadow-[inset_0_0_10px_rgba(0,240,255,0.1)]">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{time}</span>
          </div>
        </div>
      </div>
    </>
  );
};
