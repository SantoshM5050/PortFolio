import React, { useState, useRef, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { Windows11AppRenderer } from '../../systems/windows_11/Windows11AppRenderer';
import type { WindowId } from '../../types/os';
import { 
  User, 
  Terminal as TerminalIcon, 
  FolderGit2, 
  Cpu, 
  Radio, 
  Send, 
  Gamepad2, 
  Power, 
  Minus, 
  Square, 
  X, 
  Search, 
  Wifi, 
  Volume2, 
  Battery, 
  LayoutGrid,
  Globe,
  Code
} from 'lucide-react';

export const Windows11ProMode: React.FC = () => {
  const { 
    windows, 
    activeWindowId, 
    focusWindow, 
    closeWindow, 
    minimizeWindow, 
    maximizeWindow, 
    openWindow, 
    rebootToLogin,
    updateWindowPosition,
  } = useOS();

  const [startMenuOpen, setStartMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [draggingWindowId, setDraggingWindowId] = useState<WindowId | null>(null);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const windowPosStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleDragStart = (winId: WindowId, isMaximized: boolean, e: React.MouseEvent | React.TouchEvent) => {
    if (isMaximized) return;
    focusWindow(winId);
    setDraggingWindowId(winId);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    dragStartRef.current = { x: clientX, y: clientY };
    const win = windows.find((w) => w.id === winId);
    if (win) {
      windowPosStartRef.current = { ...win.position };
    }
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (draggingWindowId) {
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        const dx = clientX - dragStartRef.current.x;
        const dy = clientY - dragStartRef.current.y;
        const newX = Math.max(0, windowPosStartRef.current.x + dx);
        const newY = Math.max(55, windowPosStartRef.current.y + dy);
        updateWindowPosition(draggingWindowId, { x: newX, y: newY });
      }
    };

    const handleEnd = () => {
      setDraggingWindowId(null);
    };

    if (draggingWindowId) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('touchend', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [draggingWindowId, updateWindowPosition]);

  const appIcons: { id: WindowId; label: string; icon: React.ElementType; color: string }[] = [
    { id: 'about', label: 'About Me', icon: User, color: 'from-blue-500 to-indigo-600' },
    { id: 'skills', label: 'Skills', icon: Cpu, color: 'from-cyan-500 to-blue-600' },
    { id: 'projects', label: 'Projects', icon: FolderGit2, color: 'from-emerald-500 to-teal-600' },
    { id: 'contact', label: 'Contact', icon: Send, color: 'from-purple-500 to-indigo-600' },
    { id: 'terminal', label: 'Terminal', icon: TerminalIcon, color: 'from-slate-700 to-slate-900' },
    { id: 'game', label: 'Arcade', icon: Gamepad2, color: 'from-pink-500 to-rose-600' },
    { id: 'music', label: 'Synth Radio', icon: Radio, color: 'from-amber-500 to-orange-600' },
    { id: 'browser', label: 'Web Browser', icon: Globe, color: 'from-blue-600 to-cyan-500' },
    { id: 'code_lab', label: 'Code Lab', icon: Code, color: 'from-cyan-600 to-indigo-600' },
  ];

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const currentDate = new Date().toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0a0f1d] font-sans select-none text-white">
      {/* Windows 11 Bloom / Mica Wallpaper Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0c1427] via-[#091533] to-[#040814]">
        {/* Glowing Ambient Bloom Effect */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-600/30 via-indigo-500/20 to-cyan-400/20 blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-600/20 via-blue-500/20 to-teal-400/10 blur-[100px] animate-pulse" style={{ animationDuration: '14s' }} />
      </div>

      {/* Top Header Bar for Reboot / Switch OS */}
      <div className="absolute top-0 left-0 right-0 z-[100] px-6 py-2.5 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-black text-[10px] text-white shadow-md">
            12
          </div>
          <span className="font-bold tracking-wide text-white">Windows 12 Pro Edition</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-950/80 text-blue-300 border border-blue-500/40">
            FLUENT DESKTOP v2.088
          </span>
        </div>

        {/* Top Header Controls (Fullscreen + Reboot) */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
              } else if (document.exitFullscreen) {
                document.exitFullscreen().catch(() => {});
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-slate-300 text-xs font-semibold transition-all cursor-pointer shadow-md"
            title="Toggle Fullscreen Mode (F11)"
          >
            <Square className="w-3.5 h-3.5 text-blue-400" />
            <span>FULLSCREEN</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              rebootToLogin();
            }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/80 hover:bg-red-900 border border-red-500/60 text-red-300 text-xs font-semibold transition-all cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:scale-105"
          >
            <Power className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>REBOOT / SWITCH OS</span>
          </button>
        </div>
      </div>

      {/* Desktop Workspace Multi-Column Grid Shortcuts (Real Windows Layout) */}
      <div className="absolute top-16 left-6 z-10 grid grid-flow-col grid-rows-4 sm:grid-rows-5 gap-3 max-h-[calc(100vh-130px)] select-none">
        {appIcons.map((app) => {
          const Icon = app.icon;
          return (
            <button
              key={app.id}
              onClick={() => openWindow(app.id)}
              className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white/10 transition-all cursor-pointer group text-center w-24"
            >
              <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${app.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                <Icon className="w-5.5 h-5.5" />
              </div>
              <span className="text-[11px] text-slate-200 font-medium drop-shadow truncate w-full">{app.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Windows Stack */}
      <div className="absolute inset-0 z-20 pointer-events-none pt-14 pb-16">
        {windows.map((win) => {
          if (!win.isOpen) return null;
          const isActive = activeWindowId === win.id;

          return (
            <div
              key={win.id}
              onClick={() => focusWindow(win.id)}
              style={{
                top: win.isMaximized ? '48px' : `${Math.max(win.position.y, 80)}px`,
                left: win.isMaximized ? '0px' : `${win.position.x}px`,
                width: win.isMaximized ? '100%' : `${win.size.width}px`,
                height: win.isMaximized ? 'calc(100vh - 105px)' : `${win.size.height}px`,
                zIndex: win.zIndex,
                display: win.isMinimized ? 'none' : 'flex',
              }}
              className={`absolute flex-col ${win.isMaximized ? 'rounded-none border-t-0' : 'rounded-2xl border'} backdrop-blur-2xl shadow-2xl transition-all pointer-events-auto overflow-hidden ${
                isActive
                  ? 'bg-slate-900/90 border-blue-500/50 shadow-[0_0_40px_rgba(59,130,246,0.3)]'
                  : 'bg-slate-950/80 border-white/10 shadow-lg'
              }`}
            >
              {/* Windows 11 Title Bar */}
              <div
                onMouseDown={(e) => handleDragStart(win.id, win.isMaximized, e)}
                onTouchStart={(e) => handleDragStart(win.id, win.isMaximized, e)}
                onDoubleClick={() => maximizeWindow(win.id)}
                className="flex items-center justify-between px-4 py-3 bg-slate-950/70 border-b border-white/10 select-none cursor-move"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-xs font-bold text-slate-200 tracking-tight">{win.title}</span>
                </div>

                {/* Window Control Buttons */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      minimizeWindow(win.id);
                    }}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      maximizeWindow(win.id);
                    }}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Square className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeWindow(win.id);
                    }}
                    className="p-1.5 rounded-lg hover:bg-red-500 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Window Body Content */}
              <div className="flex-1 overflow-auto bg-slate-950/40">
                <Windows11AppRenderer windowId={win.id} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Windows 12 Popover Start Menu */}
      {startMenuOpen && (
        <>
          {/* Backdrop overlay to close start menu when clicking outside */}
          <div
            onClick={() => setStartMenuOpen(false)}
            className="fixed inset-0 z-[115] bg-black/20"
          />
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-[120] w-[540px] max-w-[92vw] bg-slate-900/90 border border-white/20 backdrop-blur-2xl rounded-2xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Windows 11 Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type here to search apps, skills, or projects..."
              className="w-full bg-slate-950/80 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Pinned Apps Header */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-200 border-b border-white/10 pb-2">
            <span>Pinned Apps</span>
            <span className="text-[10px] text-blue-400">All apps &gt;</span>
          </div>

          {/* Pinned Apps Grid */}
          <div className="grid grid-cols-4 gap-4 pt-1">
            {appIcons
              .filter((app) => app.label.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((app) => {
                const Icon = app.icon;
                return (
                  <button
                    key={app.id}
                    onClick={() => {
                      openWindow(app.id);
                      setStartMenuOpen(false);
                    }}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/10 transition-all cursor-pointer group text-center"
                  >
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${app.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs text-slate-200 font-medium truncate w-full">{app.label}</span>
                  </button>
                );
              })}
          </div>

          {/* Start Menu Footer with Santosh Maurya User Account */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/santosh_profile.jpg"
                alt="Santosh Maurya"
                className="w-9 h-9 rounded-full object-cover border border-blue-400"
              />
              <div>
                <div className="text-xs font-bold text-white">Santosh Maurya</div>
                <div className="text-[10px] text-slate-400 font-medium">B.E. IT 2025 Graduate</div>
              </div>
            </div>

            <button
              onClick={() => {
                setStartMenuOpen(false);
                rebootToLogin();
              }}
              className="p-2.5 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-300 transition-colors cursor-pointer"
              title="Power Off / Reboot System"
            >
              <Power className="w-4 h-4" />
            </button>
          </div>
        </div>
      </>
      )}

      {/* Windows 11 Centered Taskbar */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-[110] px-4 py-1.5 rounded-2xl border border-white/15 bg-slate-900/80 backdrop-blur-2xl shadow-2xl flex items-center gap-2">
        {/* Windows 11 Start Icon */}
        <button
          onClick={() => setStartMenuOpen((prev) => !prev)}
          className={`p-2.5 rounded-xl transition-all cursor-pointer group ${
            startMenuOpen ? 'bg-white/20' : 'hover:bg-white/10'
          }`}
          title="Start Menu"
        >
          <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-blue-600 via-cyan-400 to-indigo-500 flex items-center justify-center font-black text-[10px] text-white shadow-md group-hover:scale-110 transition-transform">
            <LayoutGrid className="w-3.5 h-3.5 text-white" />
          </div>
        </button>

        {/* Windows 11 Search Icon */}
        <button
          onClick={() => setStartMenuOpen(true)}
          className="p-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
          title="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Taskbar Separator */}
        <div className="w-[1px] h-5 bg-white/10 mx-1" />

        {/* App Shortcuts in Taskbar */}
        {appIcons.map((app) => {
          const Icon = app.icon;
          const targetWin = windows.find((w) => w.id === app.id);
          const isOpen = targetWin?.isOpen;
          const isActive = activeWindowId === app.id && isOpen;

          return (
            <button
              key={app.id}
              onClick={() => {
                if (isOpen) {
                  focusWindow(app.id);
                } else {
                  openWindow(app.id);
                }
              }}
              className={`p-2 rounded-xl transition-all cursor-pointer relative group ${
                isActive ? 'bg-white/20' : isOpen ? 'bg-white/10' : 'hover:bg-white/10'
              }`}
              title={app.label}
            >
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${app.color} flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform`}>
                <Icon className="w-4 h-4" />
              </div>
              {isOpen && (
                <div className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 rounded-full transition-all ${
                  isActive ? 'w-4 bg-blue-400' : 'w-2 bg-slate-400'
                }`} />
              )}
            </button>
          );
        })}

        {/* Taskbar Right System Tray */}
        <div className="w-[1px] h-5 bg-white/10 mx-1" />

        <div className="flex items-center gap-2 px-2 text-xs text-slate-300 font-medium">
          <Wifi className="w-3.5 h-3.5 text-blue-400" />
          <Volume2 className="w-3.5 h-3.5 text-slate-300" />
          <Battery className="w-3.5 h-3.5 text-emerald-400" />
          <div className="flex flex-col text-[10px] leading-tight text-right text-slate-300">
            <span>{currentTime}</span>
            <span className="text-[9px] text-slate-400">{currentDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
