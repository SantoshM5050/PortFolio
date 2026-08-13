import React, { useState, useRef, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import type { WindowState } from '../../types/os';

import { Minus, Square, Copy, X, Terminal, User, FolderGit2, Cpu, Music, Send, Gamepad2, Settings, Shield, Globe, Code } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  User,
  Terminal,
  FolderGit2,
  Cpu,
  Music,
  Send,
  Gamepad2,
  Settings,
  Globe,
  Code,
};

interface WindowFrameProps {
  windowState: WindowState;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({ windowState, children }) => {
  const {
    activeWindowId,
    interfaceMode,
    focusWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useOS();

  const isFocused = activeWindowId === windowState.id;
  const IconComponent = ICON_MAP[windowState.icon] || Terminal;

  // Universe-specific window border & shadow styling
  const getUniverseWindowStyles = () => {
    switch (interfaceMode) {
      case 'matrix_rain':
        return {
          border: isFocused ? 'border-emerald-500/80 shadow-[0_0_30px_rgba(0,255,102,0.3)] bg-black/95' : 'border-emerald-900/50 bg-black/90',
          header: isFocused ? 'bg-emerald-950/90 text-emerald-300' : 'bg-black/90 text-slate-400',
          badge: 'MATRIX_NODE',
          accentIcon: 'text-emerald-400',
        };
      case 'synthwave_arcade':
        return {
          border: isFocused ? 'border-pink-500/80 shadow-[0_0_30px_rgba(255,0,128,0.3)] bg-black/95' : 'border-pink-900/50 bg-black/90',
          header: isFocused ? 'bg-pink-950/90 text-pink-300' : 'bg-black/90 text-slate-400',
          badge: '80S_RETRO',
          accentIcon: 'text-pink-400',
        };
      case 'stark_hud':
        return {
          border: isFocused ? 'border-amber-500/80 shadow-[0_0_30px_rgba(255,170,0,0.3)] bg-black/95' : 'border-amber-900/50 bg-black/90',
          header: isFocused ? 'bg-amber-950/90 text-amber-300' : 'bg-black/90 text-slate-400',
          badge: 'MARK-88 HUD',
          accentIcon: 'text-amber-400',
        };
      case 'interstellar_bridge':
        return {
          border: isFocused ? 'border-teal-500/80 shadow-[0_0_30px_rgba(20,184,166,0.3)] bg-slate-950/95' : 'border-teal-900/50 bg-slate-950/90',
          header: isFocused ? 'bg-teal-950/90 text-teal-300' : 'bg-slate-950/90 text-slate-400',
          badge: 'STARSHIP_BEACON',
          accentIcon: 'text-teal-400',
        };
      case 'quantum_matrix':
        return {
          border: isFocused ? 'border-cyan-400/80 shadow-[0_0_30px_rgba(0,240,255,0.3)] bg-slate-950/95' : 'border-cyan-950/50 bg-slate-950/90',
          header: isFocused ? 'bg-cyan-950/90 text-cyan-300' : 'bg-slate-950/90 text-slate-400',
          badge: 'QUANTUM_SYNAPSE',
          accentIcon: 'text-cyan-400',
        };
      case 'windows_12_pro':
        return {
          border: isFocused ? 'border-blue-500/60 shadow-[0_0_35px_rgba(59,130,246,0.35)] bg-slate-900/90' : 'border-white/10 bg-slate-950/80',
          header: isFocused ? 'bg-slate-900/90 text-white' : 'bg-slate-950/80 text-slate-400',
          badge: 'WIN12_FLUENT',
          accentIcon: 'text-blue-400',
        };
      case 'cyberos':
      default:
        return {
          border: isFocused ? 'border-cyan-400/80 shadow-[0_0_25px_rgba(0,240,255,0.25)] bg-slate-950/90' : 'border-cyan-900/40 opacity-90 bg-slate-950/90',
          header: isFocused ? 'bg-cyan-950/90 text-cyan-300' : 'bg-slate-950/90 text-slate-400',
          badge: 'CYBER_PROCESS',
          accentIcon: 'text-cyan-400',
        };
    }
  };

  const uniStyle = getUniverseWindowStyles();

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

  const style: React.CSSProperties = windowState.isMaximized
    ? {
        position: 'fixed',
        top: '52px',
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 54px)',
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
      className={`cyber-glass pointer-events-auto flex flex-col ${windowState.isMaximized ? 'rounded-none border-t-0' : 'rounded-xl border'} overflow-hidden transition-all duration-200 select-none ${uniStyle.border}`}
    >
      {/* Titlebar Header */}
      <div
        onMouseDown={handleTitleStart}
        onTouchStart={handleTitleStart}
        onDoubleClick={() => maximizeWindow(windowState.id)}
        className={`flex items-center justify-between px-3.5 py-2 border-b border-white/10 cursor-move ${uniStyle.header}`}
      >
        {/* Left Info */}
        <div className="flex items-center gap-2 font-orbitron text-xs font-bold tracking-wide truncate">
          <IconComponent className={`w-4 h-4 shrink-0 ${uniStyle.accentIcon}`} />
          <span className="truncate">{windowState.title}</span>
          <span className="text-[10px] font-tech px-1.5 py-0.5 bg-black/40 rounded border border-white/10 text-slate-300">
            {uniStyle.badge}
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
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col relative font-sans">
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
