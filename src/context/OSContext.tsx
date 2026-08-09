import React, { createContext, useContext, useState } from 'react';
import type { WindowId, WindowState, OSTheme, SystemInterfaceMode } from '../types/os';

interface OSContextType {
  windows: WindowState[];
  activeWindowId: WindowId | null;
  theme: OSTheme;
  interfaceMode: SystemInterfaceMode;
  soundEnabled: boolean;
  scanlinesEnabled: boolean;
  booting: boolean;
  isLoggedIn: boolean;
  startMenuOpen: boolean;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  maximizeWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  updateWindowPosition: (id: WindowId, position: { x: number; y: number }) => void;
  updateWindowSize: (id: WindowId, size: { width: number; height: number }) => void;
  setTheme: (theme: OSTheme) => void;
  setInterfaceMode: (mode: SystemInterfaceMode) => void;
  startBootSequence: (mode: SystemInterfaceMode, theme: OSTheme) => void;
  rebootToLogin: () => void;
  toggleSound: () => void;
  toggleScanlines: () => void;
  toggleStartMenu: () => void;
  closeStartMenu: () => void;
  completeBoot: () => void;
  playSound: (type: 'click' | 'open' | 'close' | 'error' | 'boot') => void;
}

const INITIAL_WINDOWS: WindowState[] = [
  {
    id: 'about',
    title: 'user_profile.sys',
    icon: 'User',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 100, y: 85 },
    size: { width: 740, height: 520 },
    minSize: { width: 450, height: 350 },
  },
  {
    id: 'terminal',
    title: 'cyber_terminal.exe',
    icon: 'Terminal',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 11,
    position: { x: 180, y: 110 },
    size: { width: 680, height: 440 },
    minSize: { width: 400, height: 300 },
  },
  {
    id: 'projects',
    title: 'project_vault.exe',
    icon: 'FolderGit2',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 5,
    position: { x: 140, y: 90 },
    size: { width: 820, height: 540 },
    minSize: { width: 500, height: 400 },
  },
  {
    id: 'skills',
    title: 'skill_matrix.sys',
    icon: 'Cpu',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 4,
    position: { x: 200, y: 100 },
    size: { width: 720, height: 500 },
    minSize: { width: 450, height: 350 },
  },
  {
    id: 'music',
    title: 'synth_radio.exe',
    icon: 'Music',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 3,
    position: { x: 260, y: 115 },
    size: { width: 440, height: 480 },
    minSize: { width: 380, height: 400 },
  },
  {
    id: 'contact',
    title: 'transmission_hub.exe',
    icon: 'Send',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 2,
    position: { x: 220, y: 95 },
    size: { width: 620, height: 500 },
    minSize: { width: 420, height: 380 },
  },
  {
    id: 'game',
    title: 'cyber_arcade.exe',
    icon: 'Gamepad2',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 180, y: 85 },
    size: { width: 580, height: 560 },
    minSize: { width: 480, height: 480 },
  },
  {
    id: 'settings',
    title: 'system_config.sys',
    icon: 'Settings',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 280, y: 120 },
    size: { width: 500, height: 420 },
    minSize: { width: 400, height: 320 },
  },
];

const OSContext = createContext<OSContextType | undefined>(undefined);

export const OSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<WindowState[]>(INITIAL_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>('terminal');

  const [theme, setThemeState] = useState<OSTheme>(() => {
    return (localStorage.getItem('cyberos_theme') as OSTheme) || 'cyberpunk';
  });

  const [interfaceMode, setInterfaceModeState] = useState<SystemInterfaceMode>(() => {
    const saved = localStorage.getItem('cyberos_interface_mode');
    const validModes = [
      'windows_12_pro',
      'quantum_matrix',
      'stark_hud',
      'interstellar_bridge',
      'matrix_rain',
      'synthwave_arcade',
      'cyberos',
    ];
    if (saved === 'windows_11_pro' || !saved || !validModes.includes(saved)) {
      localStorage.setItem('cyberos_interface_mode', 'windows_12_pro');
      return 'windows_12_pro';
    }
    return saved as SystemInterfaceMode;
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('cyberos_logged_in') === 'true';
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [scanlinesEnabled, setScanlinesEnabled] = useState<boolean>(false);
  const [booting, setBooting] = useState<boolean>(false);
  const [startMenuOpen, setStartMenuOpen] = useState<boolean>(false);
  const [maxZIndex, setMaxZIndex] = useState<number>(20);

  // Audio synthesize synthesizer for sci-fi retro SFX
  const playSound = (type: 'click' | 'open' | 'close' | 'error' | 'boot') => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'open') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'close') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(700, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.07);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.07);
        osc.start(now);
        osc.stop(now + 0.07);
      } else if (type === 'boot') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch {
      // Audio context restriction
    }
  };

  const focusWindow = (id: WindowId) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const nextZ = maxZIndex + 1;
          setMaxZIndex(nextZ);
          return { ...w, zIndex: nextZ, isMinimized: false };
        }
        return w;
      })
    );
    setActiveWindowId(id);
  };

  const openWindow = (id: WindowId) => {
    playSound('open');
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const nextZ = maxZIndex + 1;
          setMaxZIndex(nextZ);
          return { ...w, isOpen: true, isMinimized: false, zIndex: nextZ };
        }
        return w;
      })
    );
    setActiveWindowId(id);
    if (startMenuOpen) setStartMenuOpen(false);
  };

  const closeWindow = (id: WindowId) => {
    playSound('close');
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: false, isMinimized: false } : w))
    );
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const minimizeWindow = (id: WindowId) => {
    playSound('click');
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const maximizeWindow = (id: WindowId) => {
    playSound('click');
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
  };

  const updateWindowPosition = (id: WindowId, position: { x: number; y: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, position } : w))
    );
  };

  const updateWindowSize = (id: WindowId, size: { width: number; height: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, size } : w))
    );
  };

  const setTheme = (newTheme: OSTheme) => {
    playSound('click');
    localStorage.setItem('cyberos_theme', newTheme);
    setThemeState(newTheme);
  };

  const setInterfaceMode = (mode: SystemInterfaceMode) => {
    playSound('click');
    localStorage.setItem('cyberos_interface_mode', mode);
    setInterfaceModeState(mode);
  };

  const startBootSequence = (mode: SystemInterfaceMode, selectedTheme: OSTheme) => {
    playSound('click');
    localStorage.setItem('cyberos_interface_mode', mode);
    localStorage.setItem('cyberos_theme', selectedTheme);
    setInterfaceModeState(mode);
    setThemeState(selectedTheme);
    setBooting(true);
  };

  const completeBoot = () => {
    playSound('boot');
    localStorage.setItem('cyberos_logged_in', 'true');
    setBooting(false);
    setIsLoggedIn(true);
  };

  const rebootToLogin = () => {
    playSound('click');
    localStorage.clear();
    setWindows(INITIAL_WINDOWS.map((w) => ({ ...w, isOpen: false })));
    setActiveWindowId(null);
    setIsLoggedIn(false);
    setBooting(false);
    setTimeout(() => {
      window.location.reload();
    }, 50);
  };

  const toggleSound = () => setSoundEnabled((prev) => !prev);
  const toggleScanlines = () => setScanlinesEnabled((prev) => !prev);
  const toggleStartMenu = () => {
    playSound('click');
    setStartMenuOpen((prev) => !prev);
  };
  const closeStartMenu = () => setStartMenuOpen(false);

  return (
    <OSContext.Provider
      value={{
        windows,
        activeWindowId,
        theme,
        interfaceMode,
        soundEnabled,
        scanlinesEnabled,
        booting,
        isLoggedIn,
        startMenuOpen,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        updateWindowPosition,
        updateWindowSize,
        setTheme,
        setInterfaceMode,
        startBootSequence,
        rebootToLogin,
        toggleSound,
        toggleScanlines,
        toggleStartMenu,
        closeStartMenu,
        completeBoot,
        playSound,
      }}
    >
      {children}
    </OSContext.Provider>
  );
};

export const useOS = () => {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error('useOS must be used within an OSProvider');
  }
  return context;
};
