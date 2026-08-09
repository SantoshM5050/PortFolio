import React from 'react';
import { useOS } from '../../context/OSContext';
import type { WindowId } from '../../types/os';
import { User, Terminal, FolderGit2, Cpu, Music, Send, Gamepad2, Settings, RefreshCw, Sparkles, Activity, ShieldCheck } from 'lucide-react';


const APPS: { id: WindowId; title: string; name: string; icon: React.ElementType; desc: string; badge?: string }[] = [
  { id: 'about', title: 'user_profile.sys', name: 'Profile & Bio', icon: User, desc: 'Identity specs, career timeline & background' },
  { id: 'terminal', title: 'cyber_terminal.exe', name: 'Cyber Terminal', icon: Terminal, desc: 'Command CLI for secret commands & system stats', badge: 'CLI' },
  { id: 'projects', title: 'project_vault.exe', name: 'Project Vault', icon: FolderGit2, desc: 'Curated gallery of apps, bots & platforms', badge: 'HOT' },
  { id: 'skills', title: 'skill_matrix.sys', name: 'Skill Arsenal', icon: Cpu, desc: 'Technical stack ratings & node graph' },
  { id: 'music', title: 'synth_radio.exe', name: 'Lo-Fi Synth Radio', icon: Music, desc: 'Ambient tracks with audio spectrum visualizer' },
  { id: 'contact', title: 'transmission_hub.exe', name: 'Contact Hub', icon: Send, desc: 'Encrypted message transmission & socials' },
  { id: 'game', title: 'cyber_arcade.exe', name: 'Cyber Arcade', icon: Gamepad2, desc: 'Retro arcade mini-game challenge', badge: 'MINI-GAME' },
  { id: 'settings', title: 'system_config.sys', name: 'System Config', icon: Settings, desc: 'Theme customizer & audio toggles' },
];

export const StartMenu: React.FC = () => {
  const { startMenuOpen, openWindow, closeStartMenu, theme, setTheme, completeBoot } = useOS();

  if (!startMenuOpen) return null;

  return (
    <div className="fixed bottom-14 left-3 z-[9999] w-[94vw] sm:w-[480px] cyber-glass rounded-xl border border-cyan-500/40 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.8)] font-sans select-none animate-in fade-in slide-in-from-bottom-3 duration-200">
      {/* Header Profile Info */}
      <div className="flex items-center gap-3.5 p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/20 mb-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center font-orbitron font-extrabold text-cyan-400 text-base">
              SM
            </div>
          </div>
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-900 shadow-[0_0_8px_rgba(0,255,102,0.8)]"></span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-orbitron font-bold text-slate-100 text-sm tracking-wide truncate">
              SANTOSH MOURYA
            </h3>
            <span className="px-1.5 py-0.5 text-[10px] font-tech font-bold bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/30">
              LVL 99
            </span>
          </div>
          <p className="text-xs text-cyan-400/80 font-tech truncate">FullStack Developer @SantoshM5050</p>
        </div>

      </div>

      {/* App Grid List */}
      <div className="text-[11px] font-orbitron font-semibold text-slate-400 mb-2 px-1 flex items-center justify-between">
        <span>SYSTEM APPLICATIONS</span>
        <span className="text-[10px] text-cyan-400 font-tech flex items-center gap-1">
          <Activity className="w-3 h-3 text-emerald-400" /> ALL ONLINE
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 max-h-72 overflow-y-auto pr-1">
        {APPS.map((app) => {
          const Icon = app.icon;
          return (
            <button
              key={app.id}
              onClick={() => openWindow(app.id)}
              className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-900/60 hover:bg-cyan-950/60 border border-slate-800 hover:border-cyan-500/50 text-left transition-all group"
            >
              <div className="p-2 rounded-md bg-slate-800 group-hover:bg-cyan-900/60 text-cyan-400 group-hover:text-cyan-200 transition-colors shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-orbitron text-xs text-slate-200 group-hover:text-cyan-300 transition-colors font-medium truncate">
                    {app.name}
                  </span>
                  {app.badge && (
                    <span className="text-[9px] font-tech font-bold px-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {app.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1 font-sans">{app.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Quick Theme Switcher */}
      <div className="p-2.5 rounded-lg bg-slate-950/80 border border-white/5 mb-3 flex items-center justify-between">
        <span className="text-xs font-orbitron text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> THEME:
        </span>
        <div className="flex items-center gap-1.5">
          {(['cyberpunk', 'synthwave', 'matrix', 'solar'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`px-2 py-1 text-[10px] font-tech rounded capitalize border transition-all ${
                theme === t
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Footer Power Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-tech text-slate-400">
        <span className="flex items-center gap-1 text-[11px] text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" /> SYSTEM KERNEL v2.0
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              closeStartMenu();
              completeBoot();
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-orbitron border border-slate-700 transition-colors"
          >
            <RefreshCw className="w-3 h-3" /> REBOOT
          </button>
        </div>
      </div>
    </div>
  );
};
