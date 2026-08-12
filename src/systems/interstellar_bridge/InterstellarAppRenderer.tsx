import React, { useState } from 'react';
import type { WindowId } from '../../types/os';
import { Rocket, Compass, Navigation, CheckCircle2, Zap, Briefcase, ExternalLink, Globe } from 'lucide-react';
import { TerminalApp } from '../../components/apps/TerminalApp';
import { MusicApp } from '../../components/apps/MusicApp';
import { GameApp } from '../../components/apps/GameApp';
import { BrowserApp } from '../../components/apps/BrowserApp';
import { getNevitechExperienceDuration, WORK_EXPERIENCE, PROJECTS_DATA } from '../../data/portfolio.data';

interface Props {
  windowId: WindowId;
}

export const InterstellarAppRenderer: React.FC<Props> = ({ windowId }) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const nevitechExp = getNevitechExperienceDuration();
  const expItem = WORK_EXPERIENCE[0];

  // ----------------------------------------------------
  // INTERSTELLAR PROFILE (COMMANDER FLIGHT LOG)
  // ----------------------------------------------------
  if (windowId === 'about') {
    return (
      <div className="font-mono text-emerald-300 p-4 space-y-6 select-text">
        {/* Starship Navigation Banner */}
        <div className="p-5 rounded-2xl bg-slate-950/90 border-2 border-emerald-500/80 shadow-[0_0_30px_rgba(0,255,102,0.4)] space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-500/40 pb-3">
            <div className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-emerald-400 animate-pulse" />
              <span className="font-orbitron font-black text-xs text-white tracking-widest">STARSHIP SANTOSH-01 // COMMANDER LOG</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-cyan-300 border border-emerald-500/60 font-tech">STARDATE 48201.5</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5">
            <img
              src="/santosh_profile.jpg"
              alt="Santosh Maurya"
              className="w-24 h-24 rounded-full object-cover border-2 border-emerald-400 shadow-[0_0_20px_rgba(0,255,102,0.6)]"
            />
            <div className="space-y-1 text-center sm:text-left">
              <h1 className="text-3xl font-orbitron font-black text-white text-glow-emerald">SANTOSH MAURYA</h1>
              <p className="text-xs text-cyan-400 font-tech">SOFTWARE SUPPORT ENGINEER & FULLSTACK DEVELOPER</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-tech text-emerald-300">
            <div className="p-2 bg-slate-900 rounded border border-emerald-500/40">WARP ENGINE: <strong>ENGAGED</strong></div>
            <div className="p-2 bg-slate-900 rounded border border-emerald-500/40">SPEED: <strong>WARP 9.8</strong></div>
            <div className="p-2 bg-slate-900 rounded border border-emerald-500/40">SHIELDS: <strong>100%</strong></div>
            <div className="p-2 bg-slate-900 rounded border border-emerald-500/40">HOME BASE: <strong>EARTH (DEL-01)</strong></div>
          </div>
        </div>

        {/* WORK EXPERIENCE (NO VISIBLE DURATION BADGE) */}
        <div className="p-5 rounded-2xl bg-slate-950/90 border-2 border-emerald-500/60 space-y-3">
          <div className="flex items-center justify-between border-b border-emerald-500/40 pb-2">
            <div className="text-cyan-400 font-bold font-orbitron text-xs flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <span>STARSHIP CAREER LOG</span>
            </div>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-emerald-500/30 space-y-1 text-xs font-tech">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-white font-bold font-orbitron">
              <span>{expItem.role}</span>
              <span className="text-cyan-400 text-[11px]">{expItem.startDate} - {expItem.endDate} ({nevitechExp.durationText})</span>
            </div>
            <div className="text-emerald-300 text-[11px]">{expItem.company} · {expItem.type}</div>
            <div className="text-slate-400 text-[10px]">{expItem.location}</div>
            <p className="text-emerald-200/80 text-[11px] pt-1 leading-relaxed border-t border-emerald-500/20">
              {expItem.description}
            </p>
          </div>
        </div>

        {/* Flight Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-tech">
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-emerald-500/40 space-y-2">
            <div className="text-cyan-400 font-bold font-orbitron flex items-center gap-2">
              <Navigation className="w-4 h-4" /> FLIGHT BIOGRAPHY
            </div>
            <p className="text-emerald-200/80 leading-relaxed">
              B.E. Information Technology Graduate (2025 Batch) and Trainee Software Support Engineer at Nevitech Data Solutions. Specialized in supporting complex Campus Management Systems and building reactive web UIs.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-emerald-500/40 space-y-2">
            <div className="text-cyan-400 font-bold font-orbitron flex items-center gap-2">
              <Zap className="w-4 h-4" /> STARSHIP DRIVE SPECS
            </div>
            <ul className="space-y-1 text-emerald-200/80">
              <li>• FRONTEND PROPULSION: React 19 / Vite / Canvas</li>
              <li>• BACKEND REACTOR: Node.js / Express / Python</li>
              <li>• NAV DATABASES: PostgreSQL / MongoDB</li>
              <li>• LAUNCH MATRIX: Docker / GCP / Vercel</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // INTERSTELLAR SKILLS (WARP CORE POWER METERS)
  // ----------------------------------------------------
  if (windowId === 'skills') {
    const skills = [
      { name: 'TypeScript / ESNext', level: 90, warp: 'WARP 9.0' },
      { name: 'React 18 / 19 & Next.js 15', level: 90, warp: 'WARP 9.0' },
      { name: 'Tailwind CSS v4 & Canvas', level: 95, warp: 'WARP 9.5' },
      { name: 'Node.js & Express / NestJS', level: 88, warp: 'WARP 8.8' },
      { name: 'REST APIs & Support', level: 90, warp: 'WARP 9.0' },
      { name: 'PostgreSQL & Prisma ORM', level: 85, warp: 'WARP 8.5' },
      { name: 'MongoDB & Mongoose', level: 85, warp: 'WARP 8.5' },
      { name: 'Python & FastAPI', level: 82, warp: 'WARP 8.2' },
    ];

    return (
      <div className="font-mono text-emerald-300 p-4 space-y-5 select-text">
        <div className="p-3 rounded-xl bg-slate-950/90 border border-emerald-500/50 font-tech text-xs flex items-center justify-between">
          <span className="flex items-center gap-2 text-cyan-400 font-bold font-orbitron">
            <Compass className="w-4 h-4 text-emerald-400 animate-pulse" /> WARP DRIVE CORE PLASMA OUTPUT
          </span>
          <span className="text-[10px] text-emerald-300">STARSHIP SPECS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((s, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-950/90 border border-emerald-500/40 space-y-2 text-xs font-tech">
              <div className="flex justify-between items-center text-white font-orbitron">
                <span>{s.name}</span>
                <span className="text-[10px] text-cyan-400">{s.warp} | {s.level}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-black border border-emerald-500/40 p-0.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 rounded-full shadow-[0_0_12px_rgba(0,255,102,0.8)]"
                  style={{ width: `${s.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // INTERSTELLAR PROJECTS (DEEP SPACE ARTIFACT VAULT)
  // ----------------------------------------------------
  if (windowId === 'projects') {
    return (
      <div className="font-mono text-emerald-300 p-4 space-y-5 select-text">
        <div className="p-3 rounded-xl bg-slate-950/90 border border-emerald-500/50 font-tech text-xs text-cyan-400 font-bold font-orbitron">
          DEEP SPACE ARTIFACT VAULT:
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECTS_DATA.map((p) => (
            <div key={p.id} className="p-4 rounded-2xl bg-slate-950/90 border-2 border-emerald-500/50 hover:border-cyan-400 space-y-3 transition-all flex flex-col justify-between group">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-orbitron font-black text-white group-hover:text-cyan-300">
                  <span>{p.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-cyan-300 border border-emerald-500/60">{p.category}</span>
                </div>
                <div className="text-[11px] text-cyan-400">{p.subtitle}</div>
                <p className="text-xs text-emerald-200/80 font-tech leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {p.tags.map((t, i) => (
                    <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {p.liveUrl && (
                <div className="pt-2 border-t border-emerald-500/40">
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-all cursor-pointer shadow-lg shadow-emerald-500/30"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>LAUNCH LIVE SITE</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // INTERSTELLAR CONTACT (SUB-SPACE BEACON)
  // ----------------------------------------------------
  if (windowId === 'contact') {
    return (
      <div className="font-mono text-emerald-300 p-4 space-y-5 select-text">
        <div className="p-5 rounded-2xl bg-slate-950/90 border-2 border-emerald-500 shadow-[0_0_30px_rgba(0,255,102,0.4)] space-y-4">
          <div className="text-xs font-orbitron font-black text-cyan-400">TRANSMIT SUB-SPACE QUANTUM BEACON:</div>

          {submitted ? (
            <div className="text-center p-6 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
              <div className="font-orbitron text-white text-sm">SUB-SPACE BEACON RECEIVED BY COMMANDER!</div>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-3 font-tech text-xs">
              <input
                type="text"
                required
                placeholder="INPUT COMMANDER NAME / CALLSIGN..."
                className="w-full bg-black border border-emerald-500/40 rounded-xl p-2.5 text-emerald-200 focus:outline-none focus:border-cyan-400"
              />
              <input
                type="email"
                required
                placeholder="INPUT SUB-SPACE RETURN EMAIL..."
                className="w-full bg-black border border-emerald-500/40 rounded-xl p-2.5 text-emerald-200 focus:outline-none focus:border-cyan-400"
              />
              <textarea
                required
                rows={3}
                placeholder="INPUT SUB-SPACE BEACON PAYLOAD..."
                className="w-full bg-black border border-emerald-500/40 rounded-xl p-2.5 text-emerald-200 focus:outline-none focus:border-cyan-400 resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 text-black font-orbitron font-black text-xs hover:scale-[1.01] cursor-pointer transition-transform shadow-[0_0_20px_rgba(0,255,102,0.6)]"
              >
                DISPATCH SUB-SPACE BEACON
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="h-full font-mono text-emerald-300">
      {windowId === 'terminal' && <TerminalApp />}
      {windowId === 'music' && <MusicApp />}
      {windowId === 'game' && <GameApp />}
      {windowId === 'browser' && <BrowserApp />}
    </div>
  );
};
