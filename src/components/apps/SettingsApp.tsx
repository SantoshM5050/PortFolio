import React from 'react';
import { useOS } from '../../context/OSContext';
import type { OSTheme } from '../../types/os';
import { Settings, Sparkles, RefreshCw } from 'lucide-react';

export const SettingsApp: React.FC = () => {
  const {
    theme,
    setTheme,
    soundEnabled,
    toggleSound,
    scanlinesEnabled,
    toggleScanlines,
    completeBoot,
  } = useOS();


  const themes: { id: OSTheme; name: string; color: string; desc: string }[] = [
    { id: 'cyberpunk', name: 'Cyberpunk Cyan', color: 'bg-cyan-500', desc: 'Futuristic neon cyan & obsidian glass' },
    { id: 'synthwave', name: 'Synthwave Pink', color: 'bg-pink-500', desc: '80s retro hot pink & purple glow' },
    { id: 'matrix', name: 'Matrix Green', color: 'bg-emerald-500', desc: 'Hacker terminal green phosphor' },
    { id: 'solar', name: 'Solar Gold', color: 'bg-amber-500', desc: 'Warm cyberpunk amber & gold' },
  ];

  return (
    <div className="space-y-5 font-sans text-slate-200 p-1 select-text">
      {/* Header */}
      <div className="p-4 rounded-xl cyber-glass border border-cyan-500/40 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 flex items-center justify-between">
        <div>
          <h3 className="font-orbitron font-extrabold text-lg text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-cyan-400" /> SYSTEM CONFIGURATION
          </h3>
          <p className="text-xs text-cyan-400/80 font-tech">CUSTOMIZE CYBEROS DISPLAY & AUDIO SPECS</p>
        </div>
      </div>

      {/* Theme Customizer */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
        <h4 className="font-orbitron font-bold text-xs text-cyan-400 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" /> VISUAL THEME PRESETS
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`p-3 rounded-lg border text-left flex items-center gap-3 transition-all ${
                theme === t.id
                  ? 'bg-cyan-950/90 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className={`w-4 h-4 rounded-full ${t.color} shrink-0 shadow-lg`}></span>
              <div>
                <span className="font-orbitron text-xs text-white font-bold block">{t.name}</span>
                <span className="text-[11px] text-slate-400 font-sans">{t.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Audio & Display Toggles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div className="space-y-0.5 font-tech text-xs">
            <span className="font-orbitron font-bold text-white block">AUDIO SFX</span>
            <span className="text-slate-400">Synthesizer interface sounds</span>
          </div>
          <button
            onClick={toggleSound}
            className={`px-3 py-1.5 rounded font-orbitron text-xs font-bold border transition-all ${
              soundEnabled
                ? 'bg-cyan-950 text-cyan-300 border-cyan-400'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            {soundEnabled ? 'ENABLED' : 'MUTED'}
          </button>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div className="space-y-0.5 font-tech text-xs">
            <span className="font-orbitron font-bold text-white block">CRT SCANLINES</span>
            <span className="text-slate-400">Retro CRT monitor lines</span>
          </div>
          <button
            onClick={toggleScanlines}
            className={`px-3 py-1.5 rounded font-orbitron text-xs font-bold border transition-all ${
              scanlinesEnabled
                ? 'bg-cyan-950 text-cyan-300 border-cyan-400'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            {scanlinesEnabled ? 'ACTIVE' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Reboot System */}
      <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs font-tech text-slate-400">
        <span>CYBEROS VER 2.0.84 BUILD</span>
        <button
          onClick={completeBoot}
          className="px-4 py-2 rounded bg-rose-950/80 border border-rose-500/40 text-rose-300 font-orbitron font-bold flex items-center gap-1.5 hover:bg-rose-900 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" /> RESTART NEURAL OS
        </button>
      </div>
    </div>
  );
};
