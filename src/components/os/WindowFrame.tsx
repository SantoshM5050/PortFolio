import React, { useState, useRef, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import type { WindowState } from '../../types/os';

import { Minus, Square, Copy, X, Terminal, User, FolderGit2, Cpu, Music, Send, Gamepad2, Settings, Shield } from 'lucide-react';

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

interface WindowFrameProps {
  windowState: WindowState;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({ windowState, children }) => {
  const {
    activeWindowId,
    theme,
    focusWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useOS();

  const isFocused = activeWindowId === windowState.id;
  const IconComponent = ICON_MAP[windowState.icon] || Terminal;

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const windowPosStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const windowSizeStartRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });

  // Handle Dragging Start (Mouse & Touch)
  const handleTitleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (windowState.isMaximized) return;
    focusWindow(windowState.id);
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    dragStartRef.current = { x: clientX, y: clientY };
    windowPosStartRef.current = { ...windowState.position };
  };

  // Handle Resizing Start (Mouse & Touch)
  const handleResizeStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (windowState.isMaximized) return;
    e.stopPropagation();
    focusWindow(windowState.id);
    setIsResizing(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    dragStartRef.current = { x: clientX, y: clientY };
    windowSizeStartRef.current = { ...windowState.size };
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (isDragging) {
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        const dx = clientX - dragStartRef.current.x;
        const dy = clientY - dragStartRef.current.y;
        const newX = Math.max(0, windowPosStartRef.current.x + dx);
        const newY = Math.max(65, windowPosStartRef.current.y + dy);
        updateWindowPosition(windowState.id, { x: newX, y: newY });
      } else if (isResizing) {
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        const dx = clientX - dragStartRef.current.x;
        const dy = clientY - dragStartRef.current.y;
        const minW = windowState.minSize?.width || 350;
        const minH = windowState.minSize?.height || 300;
        const newW = Math.max(minW, windowSizeStartRef.current.width + dx);
        const newH = Math.max(minH, windowSizeStartRef.current.height + dy);
        updateWindowSize(windowState.id, { width: newW, height: newH });
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
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
  }, [isDragging, isResizing, windowState.id, windowState.minSize, updateWindowPosition, updateWindowSize]);

  if (!windowState.isOpen || windowState.isMinimized) {
    return null;
  }

  // Theme-specific window border colors
  const themeBorderClasses = {
    cyberpunk: isFocused ? 'border-cyan-400/80 shadow-[0_0_25px_rgba(0,240,255,0.25)]' : 'border-cyan-900/40 opacity-90',
    synthwave: isFocused ? 'border-pink-500/80 shadow-[0_0_25px_rgba(255,0,128,0.25)]' : 'border-pink-900/40 opacity-90',
    matrix: isFocused ? 'border-emerald-500/80 shadow-[0_0_25px_rgba(0,255,102,0.25)]' : 'border-emerald-900/40 opacity-90',
    solar: isFocused ? 'border-amber-400/80 shadow-[0_0_25px_rgba(255,170,0,0.25)]' : 'border-amber-900/40 opacity-90',
  }[theme];

  const themeHeaderClasses = {
    cyberpunk: isFocused ? 'bg-cyan-950/90 text-cyan-300' : 'bg-slate-950/90 text-slate-400',
    synthwave: isFocused ? 'bg-pink-950/90 text-pink-300' : 'bg-slate-950/90 text-slate-400',
    matrix: isFocused ? 'bg-emerald-950/90 text-emerald-300' : 'bg-slate-950/90 text-slate-400',
    solar: isFocused ? 'bg-amber-950/90 text-amber-300' : 'bg-slate-950/90 text-slate-400',
  }[theme];

  const style: React.CSSProperties = windowState.isMaximized
    ? {
        position: 'fixed',
        top: '52px',
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 105px)',
        zIndex: windowState.zIndex,
      }
    : {
        position: 'absolute',
        left: `${windowState.position.x}px`,
        top: `${Math.max(65, windowState.position.y)}px`,
        width: `${windowState.size.width}px`,
        height: `${windowState.size.height}px`,
        zIndex: windowState.zIndex,
      };

  return (
    <div
      onClick={() => focusWindow(windowState.id)}
      style={style}
      className={`cyber-glass pointer-events-auto flex flex-col rounded-lg border overflow-hidden transition-shadow duration-200 select-none ${themeBorderClasses}`}
    >
      {/* Titlebar Header */}
      <div
        onMouseDown={handleTitleStart}
        onTouchStart={handleTitleStart}
        className={`flex items-center justify-between px-3 py-2 border-b border-white/10 cursor-move ${themeHeaderClasses}`}
      >
        {/* Left Info */}
        <div className="flex items-center gap-2 font-orbitron text-xs font-semibold tracking-wide truncate">
          <IconComponent className="w-4 h-4 shrink-0 text-cyan-400" />
          <span className="truncate">{windowState.title}</span>
          <span className="text-[10px] text-slate-500 font-tech px-1.5 py-0.5 bg-black/40 rounded border border-white/10">
            PID:{Math.floor(1000 + windowState.zIndex * 42)}
          </span>
        </div>

        {/* Right Window Controls */}
        <div className="flex items-center gap-1.5 shrink-0 pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(windowState.id);
            }}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 rounded transition-colors cursor-pointer"
            title="Minimize"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              maximizeWindow(windowState.id);
            }}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 rounded transition-colors cursor-pointer"
            title={windowState.isMaximized ? 'Restore' : 'Maximize'}
          >
            {windowState.isMaximized ? <Copy className="w-4 h-4" /> : <Square className="w-4 h-4" />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(windowState.id);
            }}
            className="p-1.5 hover:bg-rose-900/80 text-slate-400 hover:text-rose-300 rounded transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Window Body Container */}
      <div className="flex-1 overflow-auto bg-slate-950/80 relative font-sans">
        {children}
      </div>

      {/* Window Footer Status Bar */}
      <div className="px-3 py-1 bg-black/80 border-t border-white/5 flex items-center justify-between text-[11px] font-tech text-slate-400 shrink-0">
        <span className="flex items-center gap-1">
          <Shield className="w-3 h-3 text-emerald-400" /> SECURE_PROCESS
        </span>
        <span className="text-slate-500">{windowState.size.width}x{windowState.size.height}px</span>
      </div>

      {/* Bottom Right Resize Handle */}
      {!windowState.isMaximized && (
        <div
          onMouseDown={handleResizeStart}
          onTouchStart={handleResizeStart}
          className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize flex items-end justify-end p-0.5 text-cyan-500/70 hover:text-cyan-400"
        >
          <svg width="12" height="12" viewBox="0 0 10 10" fill="currentColor">
            <path d="M7 9H9V7H7V9ZM4 9H6V7H4V9ZM7 6H9V4H7V6Z" />
          </svg>
        </div>
      )}
    </div>
  );
};
