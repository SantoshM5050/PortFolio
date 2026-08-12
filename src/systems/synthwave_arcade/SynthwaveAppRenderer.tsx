import React, { useState } from 'react';
import type { WindowId } from '../../types/os';
import { CheckCircle2, Trophy, Disc, Radio, Briefcase, ExternalLink, Globe } from 'lucide-react';
import { TerminalApp } from '../../components/apps/TerminalApp';
import { MusicApp } from '../../components/apps/MusicApp';
import { GameApp } from '../../components/apps/GameApp';
import { BrowserApp } from '../../components/apps/BrowserApp';
import { CodeLabApp } from '../../components/apps/CodeLabApp';
import { getNevitechExperienceDuration, WORK_EXPERIENCE, PROJECTS_DATA } from '../../data/portfolio.data';

interface Props {
  windowId: WindowId;
}

export const SynthwaveAppRenderer: React.FC<Props> = ({ windowId }) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const nevitechExp = getNevitechExperienceDuration();
  const expItem = WORK_EXPERIENCE[0];

  // ----------------------------------------------------
  // 80S SYNTHWAVE PROFILE (RETRO CASSETTE SLEEVE & ARCADE HIGH SCORE)
  // ----------------------------------------------------
  if (windowId === 'about') {
    return (
      <div className="font-mono text-pink-400 p-4 space-y-6 select-text">
        {/* VHS Cassette Header Sleeve */}
        <div className="p-5 rounded-2xl bg-black/90 border-2 border-pink-500 shadow-[0_0_30px_rgba(255,0,128,0.5)] space-y-4">
          <div className="flex items-center justify-between border-b border-pink-500/40 pb-3">
            <div className="flex items-center gap-2">
              <Disc className="w-5 h-5 text-pink-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span className="font-orbitron font-black text-xs text-amber-300 tracking-widest">STEREO VHS CASSETTE // VOL. 1988</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-pink-950 text-pink-300 border border-pink-500">OUTRUN 120 MPH</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5">
            <img
              src="/santosh_profile.jpg"
              alt="Santosh Maurya"
              className="w-24 h-24 rounded-full object-cover border-2 border-pink-400 shadow-[0_0_20px_rgba(255,0,128,0.6)]"
            />
            <div className="space-y-1 text-center sm:text-left">
              <h1 className="text-3xl font-orbitron font-black text-white text-glow-pink">SANTOSH MAURYA</h1>
              <p className="text-xs text-amber-300 font-tech">SOFTWARE SUPPORT ENGINEER // FULLSTACK DEVELOPER</p>
            </div>
          </div>

          {/* Arcade High Score Board */}
          <div className="p-4 rounded-xl bg-purple-950/40 border border-pink-500/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-orbitron font-bold text-amber-300">
              <Trophy className="w-4 h-4 text-amber-400 animate-bounce" /> ARCADE HALL OF FAME LEADERBOARD:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-tech text-pink-200">
              <div className="p-2 bg-black/60 rounded border border-pink-500/30">RANK #1: <strong>GRAD 2025</strong></div>
              <div className="p-2 bg-black/60 rounded border border-pink-500/30">SCORE: <strong>9,999,990 PTS</strong></div>
              <div className="p-2 bg-black/60 rounded border border-pink-500/30">ZONE: <strong>DELHI NCR</strong></div>
            </div>
          </div>
        </div>

        {/* WORK EXPERIENCE (NO VISIBLE DURATION BADGE) */}
        <div className="p-5 rounded-2xl bg-black/90 border-2 border-pink-500/60 space-y-3">
          <div className="flex items-center justify-between border-b border-pink-500/40 pb-2">
            <div className="text-amber-300 font-bold font-orbitron text-xs flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-pink-400" />
              <span>SYNTH CAREER EXPERIENCE LOG</span>
            </div>
          </div>

          <div className="p-3 bg-purple-950/30 rounded-xl border border-pink-500/30 space-y-1 text-xs font-tech">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-white font-bold font-orbitron">
              <span>{expItem.role}</span>
              <span className="text-amber-300 text-[11px]">{expItem.startDate} - {expItem.endDate} ({nevitechExp.durationText})</span>
            </div>
            <div className="text-pink-300 text-[11px]">{expItem.company} · {expItem.type}</div>
            <div className="text-pink-400/70 text-[10px]">{expItem.location}</div>
            <p className="text-pink-200/80 text-[11px] pt-1 leading-relaxed border-t border-pink-500/20">
              {expItem.description}
            </p>
          </div>
        </div>

        {/* Bio Track Listing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-tech">
          <div className="p-4 rounded-2xl bg-black/90 border border-pink-500/40 space-y-2">
            <div className="text-amber-300 font-bold font-orbitron">SIDE A: BIOGRAPHY TRACKS</div>
            <p className="text-pink-200/80 leading-relaxed">
              B.E. Information Technology Graduate (2025 Batch) and Trainee Software Support Engineer at Nevitech Data Solutions. Specialized in supporting complex Campus Management Systems and building reactive web UIs.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/90 border border-pink-500/40 space-y-2">
            <div className="text-amber-300 font-bold font-orbitron">SIDE B: SYNTH EQUIPMENT</div>
            <ul className="space-y-1 text-pink-200/80">
              <li>• SYNTH FRONTEND: React 19 / Vite / Canvas</li>
              <li>• SYNTH BACKEND: Node.js / Express / Python</li>
              <li>• DATABASES: PostgreSQL / MongoDB</li>
              <li>• DEPLOYMENT: Docker / GCP / Vercel</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // 80S SYNTHWAVE SKILLS (NEON EQUALIZER METERS)
  // ----------------------------------------------------
  if (windowId === 'skills') {
    const skills = [
      { name: 'TypeScript / ESNext', level: 90, bpm: '128 BPM' },
      { name: 'React 18 / 19 & Next.js 15', level: 90, bpm: '130 BPM' },
      { name: 'Tailwind CSS v4 & Canvas', level: 95, bpm: '124 BPM' },
      { name: 'Node.js & Express / NestJS', level: 88, bpm: '126 BPM' },
      { name: 'REST APIs & Support', level: 90, bpm: '120 BPM' },
      { name: 'PostgreSQL & Prisma ORM', level: 85, bpm: '122 BPM' },
      { name: 'MongoDB & Mongoose', level: 85, bpm: '118 BPM' },
      { name: 'Python & FastAPI', level: 82, bpm: '115 BPM' },
    ];

    return (
      <div className="font-mono text-pink-400 p-4 space-y-5 select-text">
        <div className="p-3 rounded-xl bg-black/90 border border-pink-500/50 font-tech text-xs flex items-center justify-between">
          <span className="flex items-center gap-2 text-amber-300">
            <Radio className="w-4 h-4 text-pink-400 animate-pulse" /> SYNTHWAVE GRAPHIC EQUALIZER SPECS
          </span>
          <span className="text-[10px] text-pink-300 font-bold">OUTRUN AUDIO v80s</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((s, i) => (
            <div key={i} className="p-4 rounded-2xl bg-black/90 border border-pink-500/40 space-y-2 text-xs font-tech">
              <div className="flex justify-between items-center text-white font-orbitron">
                <span>{s.name}</span>
                <span className="text-[10px] text-amber-300">{s.bpm} | {s.level}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-black border border-pink-500/40 p-0.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 rounded-full shadow-[0_0_12px_rgba(255,0,128,0.8)]"
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
  // 80S SYNTHWAVE PROJECTS (RETRO CARTRIDGE VAULT)
  // ----------------------------------------------------
  if (windowId === 'projects') {
    return (
      <div className="font-mono text-pink-400 p-4 space-y-5 select-text">
        <div className="p-3 rounded-xl bg-black/90 border border-pink-500/50 font-tech text-xs text-amber-300">
          SELECT RETRO ARCADE CARTRIDGE TO INSPECT:
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECTS_DATA.map((p) => (
            <div key={p.id} className="p-4 rounded-2xl bg-black/90 border-2 border-pink-500/50 hover:border-amber-400 space-y-3 transition-all flex flex-col justify-between group">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-orbitron font-black text-white group-hover:text-amber-300">
                  <span>{p.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-pink-950 text-amber-300 border border-pink-500">{p.category}</span>
                </div>
                <div className="text-[11px] text-amber-300">{p.subtitle}</div>
                <p className="text-xs text-pink-200/80 font-tech leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {p.tags.map((t, i) => (
                    <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-pink-950 border border-pink-500/40 text-pink-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {p.liveUrl && (
                <div className="pt-2 border-t border-pink-500/40">
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs hover:from-pink-400 hover:to-purple-500 transition-all cursor-pointer shadow-lg shadow-pink-500/30"
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
  // 80S SYNTHWAVE CONTACT (RETRO BEEPER / PAGER FORM)
  // ----------------------------------------------------
  if (windowId === 'contact') {
    return (
      <div className="font-mono text-pink-400 p-4 space-y-5 select-text">
        <div className="p-5 rounded-2xl bg-black/90 border-2 border-pink-500 shadow-[0_0_30px_rgba(255,0,128,0.4)] space-y-4">
          <div className="text-xs font-orbitron font-black text-amber-300">SEND NEON BEEPER TRANSMISSION:</div>

          {submitted ? (
            <div className="text-center p-6 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-amber-300 mx-auto animate-bounce" />
              <div className="font-orbitron text-white text-sm">BEEPER TRANSMISSION DISPATCHED!</div>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-3 font-tech text-xs">
              <input
                type="text"
                required
                placeholder="YOUR NAME / CALLSIGN..."
                className="w-full bg-black border border-pink-500/40 rounded-xl p-2.5 text-pink-200 focus:outline-none focus:border-amber-400"
              />
              <input
                type="email"
                required
                placeholder="YOUR EMAIL ADDRESS..."
                className="w-full bg-black border border-pink-500/40 rounded-xl p-2.5 text-pink-200 focus:outline-none focus:border-amber-400"
              />
              <textarea
                required
                rows={3}
                placeholder="YOUR BEEPER PAYLOAD MESSAGE..."
                className="w-full bg-black border border-pink-500/40 rounded-xl p-2.5 text-pink-200 focus:outline-none focus:border-amber-400 resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 text-black font-orbitron font-black text-xs hover:scale-[1.01] cursor-pointer transition-transform shadow-[0_0_20px_rgba(255,0,128,0.6)]"
              >
                DISPATCH BEEPER MESSAGE
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="h-full font-mono text-pink-400">
      {windowId === 'terminal' && <TerminalApp />}
      {windowId === 'music' && <MusicApp />}
      {windowId === 'game' && <GameApp />}
      {windowId === 'browser' && <BrowserApp />}
      {windowId === 'code_lab' && <CodeLabApp />}
    </div>
  );
};
