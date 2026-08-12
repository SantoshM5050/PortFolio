import React, { useState } from 'react';
import type { WindowId } from '../../types/os';
import { Shield, Crosshair, Radio, CheckCircle2, Zap, Briefcase, ExternalLink, Globe } from 'lucide-react';
import { TerminalApp } from '../../components/apps/TerminalApp';
import { MusicApp } from '../../components/apps/MusicApp';
import { GameApp } from '../../components/apps/GameApp';
import { BrowserApp } from '../../components/apps/BrowserApp';
import { CodeLabApp } from '../../components/apps/CodeLabApp';
import { getNevitechExperienceDuration, WORK_EXPERIENCE, PROJECTS_DATA } from '../../data/portfolio.data';

interface Props {
  windowId: WindowId;
}

export const StarkAppRenderer: React.FC<Props> = ({ windowId }) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const nevitechExp = getNevitechExperienceDuration();
  const expItem = WORK_EXPERIENCE[0];

  // ----------------------------------------------------
  // STARK MARK-88 PROFILE (JARVIS BIOMETRIC BLUEPRINT)
  // ----------------------------------------------------
  if (windowId === 'about') {
    return (
      <div className="font-mono text-amber-400 p-4 space-y-6 select-text">
        {/* JARVIS Tactical Blueprint Banner */}
        <div className="p-5 rounded-2xl bg-black/90 border-2 border-amber-500/80 shadow-[0_0_30px_rgba(255,170,0,0.5)] space-y-4">
          <div className="flex items-center justify-between border-b border-amber-500/40 pb-3">
            <div className="flex items-center gap-2">
              <Crosshair className="w-5 h-5 text-amber-400 animate-pulse" />
              <span className="font-orbitron font-black text-xs text-white tracking-widest">JARVIS BIOMETRIC READOUT // MARK-88</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-red-950 text-amber-300 border border-amber-500/60 font-tech">THREAT: ZERO</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5">
            <img
              src="/santosh_profile.jpg"
              alt="Santosh Maurya"
              className="w-24 h-24 rounded-full object-cover border-2 border-amber-400 shadow-[0_0_20px_rgba(255,170,0,0.6)]"
            />
            <div className="space-y-1 text-center sm:text-left">
              <h1 className="text-3xl font-orbitron font-black text-white text-glow-amber">SANTOSH MAURYA</h1>
              <p className="text-xs text-red-400 font-tech">SOFTWARE SUPPORT ENGINEER [2025 GRADUATE]</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-tech text-amber-300">
            <div className="p-2 bg-red-950/40 rounded border border-amber-500/40">ARC REACTOR: <strong>100% ONLINE</strong></div>
            <div className="p-2 bg-red-950/40 rounded border border-amber-500/40">OUTPUT: <strong>9.5 GW</strong></div>
            <div className="p-2 bg-red-950/40 rounded border border-amber-500/40">TARGET LOCK: <strong>VERIFIED</strong></div>
            <div className="p-2 bg-red-950/40 rounded border border-amber-500/40">BASE: <strong>DELHI NCR</strong></div>
          </div>
        </div>

        {/* WORK EXPERIENCE (NO VISIBLE LIVE TRACKER TEXT) */}
        <div className="p-5 rounded-2xl bg-black/90 border-2 border-amber-500/60 space-y-3">
          <div className="flex items-center justify-between border-b border-amber-500/40 pb-2">
            <div className="text-red-400 font-bold font-orbitron text-xs flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-amber-400" />
              <span>JARVIS OPERATIONAL EXPERIENCE LOG</span>
            </div>
          </div>

          <div className="p-3 bg-red-950/20 rounded-xl border border-amber-500/30 space-y-1 text-xs font-tech">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-white font-bold font-orbitron">
              <span>{expItem.role}</span>
              <span className="text-amber-400 text-[11px]">{expItem.startDate} - {expItem.endDate} ({nevitechExp.durationText})</span>
            </div>
            <div className="text-amber-300 text-[11px]">{expItem.company} · {expItem.type}</div>
            <div className="text-amber-500/70 text-[10px]">{expItem.location}</div>
            <p className="text-amber-200/80 text-[11px] pt-1 leading-relaxed border-t border-amber-500/20">
              {expItem.description}
            </p>
          </div>
        </div>

        {/* Blueprint Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-tech">
          <div className="p-4 rounded-2xl bg-black/90 border border-amber-500/40 space-y-2">
            <div className="text-red-400 font-bold font-orbitron flex items-center gap-2">
              <Shield className="w-4 h-4" /> ARCHITECTURAL BLUEPRINT
            </div>
            <p className="text-amber-200/80 leading-relaxed">
              B.E. Information Technology Graduate (2025 Batch) and Trainee Software Support Engineer at Nevitech Data Solutions. Specialized in supporting complex Campus Management Systems and building reactive web UIs.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/90 border border-amber-500/40 space-y-2">
            <div className="text-red-400 font-bold font-orbitron flex items-center gap-2">
              <Zap className="w-4 h-4" /> STARK TECH SPECS
            </div>
            <ul className="space-y-1 text-amber-200/80">
              <li>• FRONTEND ENGINE: React 19 / Vite / Canvas</li>
              <li>• BACKEND REACTOR: Node.js / Express / Python</li>
              <li>• DATABASE VAULT: PostgreSQL / MongoDB</li>
              <li>• INFRASTRUCTURE: Docker / GCP / Vercel</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // STARK MARK-88 SKILLS (ARC REACTOR POWER GAUGES)
  // ----------------------------------------------------
  if (windowId === 'skills') {
    const skills = [
      { name: 'TypeScript / ESNext', level: 90, gw: '9.0 GW' },
      { name: 'React 18 / 19 & Next.js 15', level: 90, gw: '9.0 GW' },
      { name: 'Tailwind CSS v4 & Canvas', level: 95, gw: '9.5 GW' },
      { name: 'Node.js & Express / NestJS', level: 88, gw: '8.8 GW' },
      { name: 'REST APIs & Support', level: 90, gw: '9.0 GW' },
      { name: 'PostgreSQL & Prisma ORM', level: 85, gw: '8.5 GW' },
      { name: 'MongoDB & Mongoose', level: 85, gw: '8.5 GW' },
      { name: 'Python & FastAPI', level: 82, gw: '8.2 GW' },
    ];

    return (
      <div className="font-mono text-amber-400 p-4 space-y-5 select-text">
        <div className="p-3 rounded-xl bg-black/90 border border-amber-500/50 font-tech text-xs flex items-center justify-between">
          <span className="flex items-center gap-2 text-red-400 font-bold font-orbitron">
            <Radio className="w-4 h-4 text-amber-400 animate-pulse" /> ARC REACTOR SKILL POWER OUTPUT
          </span>
          <span className="text-[10px] text-amber-300">MARK-88 SPECS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((s, i) => (
            <div key={i} className="p-4 rounded-2xl bg-black/90 border border-amber-500/40 space-y-2 text-xs font-tech">
              <div className="flex justify-between items-center text-white font-orbitron">
                <span>{s.name}</span>
                <span className="text-[10px] text-amber-400">{s.gw} | {s.level}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-black border border-amber-500/40 p-0.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 rounded-full shadow-[0_0_12px_rgba(255,170,0,0.8)]"
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
  // STARK MARK-88 PROJECTS (ARMOR VAULT SPECS)
  // ----------------------------------------------------
  if (windowId === 'projects') {
    return (
      <div className="font-mono text-amber-400 p-4 space-y-5 select-text">
        <div className="p-3 rounded-xl bg-black/90 border border-amber-500/50 font-tech text-xs text-red-400 font-bold font-orbitron">
          STARK ARMOR VAULT SPECS:
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECTS_DATA.map((p) => (
            <div key={p.id} className="p-4 rounded-2xl bg-black/90 border-2 border-amber-500/50 hover:border-red-500 space-y-3 transition-all flex flex-col justify-between group">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-orbitron font-black text-white group-hover:text-amber-300">
                  <span>{p.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-red-950 text-amber-300 border border-amber-500/60">{p.category}</span>
                </div>
                <div className="text-[11px] text-amber-300">{p.subtitle}</div>
                <p className="text-xs text-amber-200/80 font-tech leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {p.tags.map((t, i) => (
                    <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-red-950 border border-amber-500/40 text-amber-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {p.liveUrl && (
                <div className="pt-2 border-t border-amber-500/40">
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 transition-all cursor-pointer shadow-lg shadow-amber-500/30"
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
  // STARK MARK-88 CONTACT (SATELLITE BEACON)
  // ----------------------------------------------------
  if (windowId === 'contact') {
    return (
      <div className="font-mono text-amber-400 p-4 space-y-5 select-text">
        <div className="p-5 rounded-2xl bg-black/90 border-2 border-amber-500 shadow-[0_0_30px_rgba(255,170,0,0.4)] space-y-4">
          <div className="text-xs font-orbitron font-black text-red-400">DISPATCH STARK SATELLITE BEACON:</div>

          {submitted ? (
            <div className="text-center p-6 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-amber-400 mx-auto animate-bounce" />
              <div className="font-orbitron text-white text-sm">BEACON TRANSMISSION CONFIRMED!</div>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-3 font-tech text-xs">
              <input
                type="text"
                required
                placeholder="INPUT AGENT / OPERATOR NAME..."
                className="w-full bg-black border border-amber-500/40 rounded-xl p-2.5 text-amber-200 focus:outline-none focus:border-red-500"
              />
              <input
                type="email"
                required
                placeholder="INPUT RETURN EMAIL..."
                className="w-full bg-black border border-amber-500/40 rounded-xl p-2.5 text-amber-200 focus:outline-none focus:border-red-500"
              />
              <textarea
                required
                rows={3}
                placeholder="INPUT SATELLITE BEACON PAYLOAD..."
                className="w-full bg-black border border-amber-500/40 rounded-xl p-2.5 text-amber-200 focus:outline-none focus:border-red-500 resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-red-600 text-black font-orbitron font-black text-xs hover:scale-[1.01] cursor-pointer transition-transform shadow-[0_0_20px_rgba(255,170,0,0.6)]"
              >
                DISPATCH SATELLITE BEACON
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="h-full font-mono text-amber-400">
      {windowId === 'terminal' && <TerminalApp />}
      {windowId === 'music' && <MusicApp />}
      {windowId === 'game' && <GameApp />}
      {windowId === 'browser' && <BrowserApp />}
      {windowId === 'code_lab' && <CodeLabApp />}
    </div>
  );
};
