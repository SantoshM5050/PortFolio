import React, { useState, useEffect, useRef } from 'react';
import { useOS } from '../../context/OSContext';
import { Terminal, Shield, Cpu, Play, Sparkles, Rocket, Crosshair, Music, LayoutGrid, Disc, Loader2 } from 'lucide-react';

export const BootScreen: React.FC = () => {
  const { completeBoot, interfaceMode } = useOS();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Matrix Rain effect canvas for Matrix Boot mode
  useEffect(() => {
    if (interfaceMode !== 'matrix_rain') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff66';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = katakana.charAt(Math.floor(Math.random() * katakana.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, [interfaceMode]);

  const getModeDetails = () => {
    switch (interfaceMode) {
      case 'windows_12_pro':
      case 'windows_11_pro' as unknown:
        return {
          title: 'Windows 12 Pro Edition',
          subtitle: 'Starting Windows 12 Pro...',
          icon: LayoutGrid,
          accentColor: 'text-blue-400',
          borderColor: 'border-blue-500/40',
          glowColor: 'shadow-[0_0_40px_rgba(59,130,246,0.4)]',
          barGradient: 'from-blue-600 via-cyan-400 to-indigo-500',
          logs: [
            'Starting Windows 12 Pro Edition...',
            'Initializing Windows Fluent Mica Backdrop Engine...',
            'Getting things ready for Santosh Maurya (B.E. IT 2025)...',
            'Loading Centered Taskbar & Start Menu Widgets...',
            'Connecting Nevitech Software Support Services...',
            'Welcome to Windows 12 Pro Edition.'
          ]
        };
      case 'matrix_rain':
        return {
          title: 'MATRIX CODE STREAM OS',
          subtitle: 'DIGITAL KATAKANA RAIN CONSOLE',
          icon: Terminal,
          accentColor: 'text-emerald-400',
          borderColor: 'border-emerald-500/40',
          glowColor: 'shadow-[0_0_40px_rgba(0,255,102,0.3)]',
          barGradient: 'from-emerald-500 via-green-400 to-teal-300',
          logs: [
            '[MATRIX_INIT] Firing digital code stream renderer...',
            '[DECODE] Parsing Katakana / Latin symbol drops...',
            '[HACKER_CLI] Mounting Santosh Maurya Operator Shell...',
            '[SECURITY] Bypassing mainframe encryption barriers...',
            '[NODES] Mounting Code Matrix Nodes...',
            '[MATRIX_READY] Matrix Code Stream OS online.'
          ]
        };
      case 'synthwave_arcade':
        return {
          title: 'SYNTHWAVE OUTRUN 80s OS',
          subtitle: 'RETRO HORIZON GRID & CASSETTE DECK',
          icon: Music,
          accentColor: 'text-pink-400',
          borderColor: 'border-pink-500/40',
          glowColor: 'shadow-[0_0_40px_rgba(255,0,128,0.3)]',
          barGradient: 'from-pink-500 via-purple-500 to-amber-400',
          logs: [
            '[OUTRUN_INIT] Igniting 1980s Sunset Grid Horizon...',
            '[AUDIO_80S] Spinning Retro Synthwave Cassette Tapes...',
            '[VHS_SCAN] Calibrating VHS Scanline filter...',
            '[ARCADE] Mounting 80s Mini Arcade Cabinet...',
            '[OPERATOR] Loading Santosh Maurya Retro Cassette Deck...',
            '[OUTRUN_READY] Synthwave Outrun 80s OS fully booted.'
          ]
        };
      case 'stark_hud':
        return {
          title: 'STARK SPATIAL HUD',
          subtitle: 'MARK-88 TACTICAL SPATIAL INTERFACE',
          icon: Crosshair,
          accentColor: 'text-amber-400',
          borderColor: 'border-amber-500/40',
          glowColor: 'shadow-[0_0_40px_rgba(255,170,0,0.3)]',
          barGradient: 'from-red-600 via-amber-500 to-yellow-400',
          logs: [
            '[STARK_MARK88] Initializing Arc Reactor Core Power Matrix...',
            '[BIOMETRICS] Scanning Retinal Pattern for Santosh Maurya...',
            '[JARVIS_AI] Mounting Spatial Holographic Targets & Radial Arcs...',
            '[TELEMETRY] Calibrating 360-degree Target Reticles...',
            '[DEFENSE_GRID] Threat Level: ZERO | All Systems Nominal...',
            '[STARK_READY] Spatial HUD Mark-88 Online.'
          ]
        };
      case 'interstellar_bridge':
        return {
          title: 'INTERSTELLAR COMMAND BRIDGE',
          subtitle: 'STARSHIP SANTOSH-01 NAVIGATION SYSTEM',
          icon: Rocket,
          accentColor: 'text-emerald-400',
          borderColor: 'border-emerald-500/40',
          glowColor: 'shadow-[0_0_40px_rgba(0,255,102,0.3)]',
          barGradient: 'from-emerald-500 via-teal-400 to-cyan-500',
          logs: [
            '[BRIDGE_NAV] Calibrating Interstellar Warp Coordinates...',
            '[THRUSTERS] Charging Antimatter Plasma Thrusters...',
            '[STARFIELD_3D] Rendering Warp-Speed Particle Vector Mesh...',
            '[COMMS] Establishing Sub-space Relay Node Connection...',
            '[SHIELDS] Deflector Shields set to 100% Maximum...',
            '[WARP_READY] Starship Santosh-01 ready for warp.'
          ]
        };
      case 'quantum_matrix':
        return {
          title: 'QUANTUM NEURAL MATRIX',
          subtitle: '3D HOLOGRAPHIC CONSTELLATION PROTOCOL',
          icon: Sparkles,
          accentColor: 'text-cyan-400',
          borderColor: 'border-cyan-500/40',
          glowColor: 'shadow-[0_0_40px_rgba(0,240,255,0.3)]',
          barGradient: 'from-cyan-500 via-purple-500 to-pink-500',
          logs: [
            '[QUANTUM_INIT] Mounting Holographic Neural Matrix v3.0...',
            '[SYNAPSE_CHECK] Mapping 3D Particle Constellation Nodes...',
            '[NEURAL_MESH] Firing laser impulse synapse connections...',
            '[SECURITY] Verifying identity: Santosh Maurya (B.E. IT 2025)...',
            '[QUANTUM_VRAM] Allocating High-Bandwidth Holographic VRAM...',
            '[MATRIX_READY] Quantum Neural Matrix fully operational.'
          ]
        };
      case 'cyberos':
      default:
        return {
          title: 'CYBEROS WEB OS',
          subtitle: 'ADVANCED GLASSMORPHISM DESKTOP SYSTEM',
          icon: Cpu,
          accentColor: 'text-cyan-400',
          borderColor: 'border-cyan-500/40',
          glowColor: 'shadow-[0_0_40px_rgba(0,240,255,0.3)]',
          barGradient: 'from-cyan-500 via-teal-400 to-emerald-400',
          logs: [
            '[CYBER_INIT] Initializing CyberOS Kernel v2.088...',
            '[WINDOW_MGR] Mounting Z-Index Focus Engine & Glassmorphic Frames...',
            '[SYSTEM_APPS] Loading user_profile.sys, cyber_terminal.exe...',
            '[AUDIO_SYNTH] Initializing Web Audio API Sound Synthesizer...',
            '[SECURITY] Operator Identity Verified: Santosh Maurya...',
            '[CYBER_READY] CyberOS Web Desktop loaded successfully.'
          ]
        };
    }
  };

  const modeDetails = getModeDetails();
  const ModeIcon = modeDetails.icon;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < modeDetails.logs.length - 1) {
          return prev + 1;
        }
        clearInterval(timer);
        setTimeout(() => completeBoot(), 600);
        return prev;
      });
    }, 220);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 8;
      });
    }, 80);

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, [completeBoot, modeDetails.logs.length]);

  // ----------------------------------------------------
  // UNIQUE CUSTOM BOOT SCREEN RENDERERS FOR EACH OS
  // ----------------------------------------------------

  // 1. WINDOWS 12 PRO UNIQUE BOOT SCREEN
  if (interfaceMode === 'windows_12_pro' || (interfaceMode as string) === 'windows_11_pro') {
    return (
      <div className="fixed inset-0 z-[99999] bg-[#000000] font-sans flex flex-col items-center justify-center p-6 select-none text-white">
        {/* Windows 12 Blue Glow Ambient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />

        {/* Windows 12 Icon Logo */}
        <div className="relative z-10 space-y-8 text-center flex flex-col items-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-400 to-indigo-500 flex items-center justify-center font-black text-2xl text-white shadow-[0_0_50px_rgba(59,130,246,0.6)] animate-pulse">
            12
          </div>

          {/* Windows Spinner */}
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
            <div className="text-sm font-semibold tracking-wide text-slate-200">
              {modeDetails.logs[currentStep] || 'Getting things ready...'}
            </div>
            <div className="text-xs text-slate-400">Please do not turn off your PC.</div>
          </div>

          {/* Progress Bar */}
          <div className="w-64 h-1.5 rounded-full bg-slate-900 border border-white/10 overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-150 shadow-[0_0_12px_rgba(59,130,246,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Skip Boot Button */}
        <button
          onClick={completeBoot}
          className="absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs text-slate-300 rounded-xl transition-all cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-blue-400 text-blue-400" />
          SKIP BOOT
        </button>

        <div className="absolute bottom-6 text-[11px] text-slate-500 font-mono">
          WINDOWS 12 PRO EDITION // SANTOSH MAURYA B.E. IT 2025
        </div>
      </div>
    );
  }

  // 2. MATRIX CODE STREAM UNIQUE BOOT SCREEN
  if (interfaceMode === 'matrix_rain') {
    return (
      <div className="fixed inset-0 z-[99999] bg-black font-mono flex flex-col justify-between p-6 select-none text-emerald-400 overflow-hidden">
        {/* Real-time Katakana Matrix Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />

        {/* Top Header */}
        <div className="relative z-10 flex justify-between items-center border-b border-emerald-500/40 pb-4 bg-black/80 backdrop-blur-md p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <Terminal className="w-6 h-6 text-emerald-400 animate-pulse" />
            <div>
              <h1 className="font-orbitron font-extrabold text-lg text-white">MATRIX CODE STREAM OS</h1>
              <p className="text-xs text-emerald-500/80">OPERATOR_SHELL@MAINFRAME</p>
            </div>
          </div>
          <button
            onClick={completeBoot}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/60 text-emerald-300 text-xs font-orbitron rounded-lg cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-emerald-400" />
            SKIP BOOT
          </button>
        </div>

        {/* Terminal Code Log Box */}
        <div className="relative z-10 my-auto max-w-3xl w-full mx-auto p-6 rounded-2xl bg-black/90 border-2 border-emerald-500/60 shadow-[0_0_40px_rgba(0,255,102,0.3)] space-y-4 font-tech text-xs">
          <div className="text-emerald-300 font-bold border-b border-emerald-500/30 pb-2">
            &gt; SYSTEM_BOOT_SEQUENCE_EXECUTOR.SH
          </div>

          <div className="space-y-2 h-44 overflow-y-auto">
            {modeDetails.logs.slice(0, currentStep + 1).map((log, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-emerald-500">&gt;</span>
                <span className={i === currentStep ? 'text-white font-bold' : 'text-emerald-400/80'}>{log}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-emerald-500/30 space-y-1">
            <div className="flex justify-between text-[11px]">
              <span>LOADING BYTES...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-black border border-emerald-500/40 overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="relative z-10 flex justify-between text-[11px] text-emerald-600 font-tech">
          <span>OPERATOR: SANTOSH MAURYA</span>
          <span>STATUS: DECRYPTING</span>
        </div>
      </div>
    );
  }

  // 3. SYNTHWAVE 80S UNIQUE BOOT SCREEN
  if (interfaceMode === 'synthwave_arcade') {
    return (
      <div className="fixed inset-0 z-[99999] bg-black font-mono flex flex-col justify-between p-6 select-none text-pink-400 overflow-hidden">
        {/* Retro 80s Sunset Grid Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-pink-950/60 via-purple-950/40 to-black pointer-events-none" />

        {/* Top Synth Header */}
        <div className="relative z-10 flex justify-between items-center border-b border-pink-500/40 pb-4 bg-black/80 backdrop-blur-md p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <Disc className="w-7 h-7 text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />
            <div>
              <h1 className="font-orbitron font-black text-xl text-white text-glow-pink">SYNTHWAVE OUTRUN 80s</h1>
              <p className="text-xs text-amber-300 font-tech">STEREO CASSETTE DECK VOL. 1988</p>
            </div>
          </div>
          <button
            onClick={completeBoot}
            className="flex items-center gap-2 px-4 py-2 bg-pink-950 hover:bg-pink-900 border border-pink-500/60 text-amber-300 text-xs font-orbitron rounded-lg cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-amber-400" />
            SKIP BOOT
          </button>
        </div>

        {/* Cassette Sleeve Boot Card */}
        <div className="relative z-10 my-auto max-w-2xl w-full mx-auto p-6 rounded-2xl bg-black/90 border-2 border-pink-500 shadow-[0_0_50px_rgba(255,0,128,0.4)] space-y-4 font-tech text-xs">
          <div className="flex items-center justify-between text-amber-300 font-bold border-b border-pink-500/40 pb-2 font-orbitron">
            <span>INSERT COIN // PLAY RETRO CASSETTE</span>
            <span className="text-[10px] text-pink-300">120 MPH</span>
          </div>

          <div className="space-y-2 h-40 overflow-y-auto">
            {modeDetails.logs.slice(0, currentStep + 1).map((log, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-amber-300">♪</span>
                <span className={i === currentStep ? 'text-white font-bold' : 'text-pink-300/80'}>{log}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-pink-500/40 space-y-1">
            <div className="flex justify-between text-[11px] text-amber-300 font-orbitron">
              <span>SYNTH EQUALIZER PROGRESS</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-black border border-pink-500/40 overflow-hidden p-0.5">
              <div className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="relative z-10 flex justify-between text-[11px] text-pink-500 font-tech">
          <span>OPERATOR: SANTOSH MAURYA [80S ARCADE]</span>
          <span>STATUS: CASSETTE PLAYING</span>
        </div>
      </div>
    );
  }

  // STANDARD CYBEROS & OTHER MODES FALLBACK BOOT SCREEN
  return (
    <div className="fixed inset-0 z-[99999] bg-[#020408] font-fira flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none"></div>

      {/* Top Mode Header */}
      <div className={`relative z-10 flex justify-between items-center border-b pb-4 ${modeDetails.borderColor}`}>
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl bg-black/60 border ${modeDetails.borderColor} ${modeDetails.accentColor}`}>
            <ModeIcon className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <h1 className={`font-orbitron font-extrabold text-xl sm:text-2xl text-white tracking-wider ${modeDetails.accentColor}`}>
              {modeDetails.title}
            </h1>
            <p className="text-xs text-slate-400 font-tech">{modeDetails.subtitle}</p>
          </div>
        </div>
        <button
          onClick={completeBoot}
          className={`flex items-center gap-2 px-4 py-2 bg-black/80 hover:bg-white/10 border ${modeDetails.borderColor} text-white text-xs font-orbitron rounded-lg tracking-wider transition-all duration-200 cursor-pointer ${modeDetails.glowColor}`}
        >
          <Play className={`w-3.5 h-3.5 fill-current ${modeDetails.accentColor}`} />
          SKIP BOOT
        </button>
      </div>

      {/* Diagnostic Logs Container */}
      <div className="relative z-10 my-auto max-w-3xl w-full mx-auto space-y-6">
        <div className={`cyber-glass rounded-2xl p-6 border ${modeDetails.borderColor} ${modeDetails.glowColor}`}>
          <div className={`flex items-center justify-between border-b pb-3 mb-4 text-xs ${modeDetails.borderColor}`}>
            <span className="flex items-center gap-2 text-slate-300">
              <Terminal className={`w-4 h-4 ${modeDetails.accentColor}`} />
              BOOT_DIAGNOSTICS.LOG
            </span>
            <span className="flex items-center gap-2 text-emerald-400 font-tech">
              <Shield className="w-3.5 h-3.5" /> SECURE_BOOT_ACTIVE
            </span>
          </div>

          <div className="space-y-2.5 h-52 overflow-y-auto font-tech text-xs sm:text-sm">
            {modeDetails.logs.slice(0, currentStep + 1).map((log, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className={`${modeDetails.accentColor} select-none`}>&gt;</span>
                <span className={index === currentStep ? `${modeDetails.accentColor} font-bold` : 'text-slate-400'}>
                  {log}
                </span>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className={`mt-6 pt-4 border-t ${modeDetails.borderColor}`}>
            <div className="flex justify-between items-center text-xs font-tech mb-2">
              <span className={modeDetails.accentColor}>INITIALIZING SUBSYSTEMS...</span>
              <span className="text-white font-bold">{progress}%</span>
            </div>
            <div className={`w-full h-3 rounded-full bg-black border ${modeDetails.borderColor} p-0.5 overflow-hidden`}>
              <div
                className={`h-full bg-gradient-to-r ${modeDetails.barGradient} rounded-full transition-all duration-150`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`relative z-10 flex justify-between items-center text-xs font-tech text-slate-500 border-t pt-4 ${modeDetails.borderColor}`}>
        <span>SANTOSH MAURYA SYSTEM PROTOCOL</span>
        <span>STATUS: BOOTING</span>
      </div>
    </div>
  );
};
