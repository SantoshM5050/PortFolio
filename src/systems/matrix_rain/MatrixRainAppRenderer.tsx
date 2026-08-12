import React, { useState } from 'react';
import type { WindowId } from '../../types/os';
import { Terminal, Send, CheckCircle2, Cpu, FolderGit2, Briefcase, ExternalLink, Globe } from 'lucide-react';
import { TerminalApp } from '../../components/apps/TerminalApp';
import { MusicApp } from '../../components/apps/MusicApp';
import { GameApp } from '../../components/apps/GameApp';
import { BrowserApp } from '../../components/apps/BrowserApp';
import { getNevitechExperienceDuration, WORK_EXPERIENCE, PROJECTS_DATA } from '../../data/portfolio.data';

interface Props {
  windowId: WindowId;
}

export const MatrixRainAppRenderer: React.FC<Props> = ({ windowId }) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const nevitechExp = getNevitechExperienceDuration();
  const expItem = WORK_EXPERIENCE[0];

  // ----------------------------------------------------
  // MATRIX HACKER PROFILE (ABOUT)
  // ----------------------------------------------------
  if (windowId === 'about') {
    return (
      <div className="font-mono text-emerald-400 p-4 space-y-6 select-text">
        {/* Terminal Header Prompt */}
        <div className="p-3 rounded-xl bg-black/90 border border-emerald-500/50 font-tech text-xs space-y-1">
          <div className="flex items-center gap-2 text-emerald-300">
            <Terminal className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>OPERATOR_SHELL@MATRIX-MAINFRAME:~$ cat /sys/operator/dossier.matrix</span>
          </div>
          <div className="text-[10px] text-emerald-500/70">READING BYTES FROM MEMORY ADDRESS 0x7FFF9A0012...</div>
        </div>

        {/* Real Profile Photo Header */}
        <div className="p-5 rounded-2xl bg-black/90 border-2 border-emerald-500/60 shadow-[0_0_25px_rgba(0,255,102,0.3)] space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src="/santosh_profile.jpg"
              alt="Santosh Maurya"
              className="w-24 h-24 rounded-2xl object-cover border-2 border-emerald-400 shadow-[0_0_15px_rgba(0,255,102,0.6)]"
            />
            <div className="space-y-1 text-center sm:text-left">
              <h1 className="text-2xl font-orbitron font-extrabold text-white">SANTOSH MAURYA</h1>
              <p className="text-xs text-emerald-300 font-tech">ROLE: SOFTWARE SUPPORT ENGINEER // FULLSTACK DEVELOPER</p>
              <div className="flex flex-wrap gap-2 text-[10px] font-tech pt-1 justify-center sm:justify-start">
                <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/50 text-emerald-300">CLASS: B.E. 2025 GRADUATE</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/50 text-emerald-300">LOCATION: DELHI NCR (DEL-01)</span>
              </div>
            </div>
          </div>
        </div>

        {/* WORK EXPERIENCE (NO VISIBLE LIVE TRACKER TEXT) */}
        <div className="p-4 rounded-2xl bg-black/90 border-2 border-emerald-500/50 space-y-3">
          <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2">
            <div className="text-emerald-300 font-bold font-orbitron text-xs flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>CAREER_LOG.SYS</span>
            </div>
          </div>

          <div className="p-3 bg-emerald-950/20 rounded-xl border border-emerald-500/30 space-y-1 text-xs font-tech">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-white font-bold">
              <span>{expItem.role}</span>
              <span className="text-emerald-400 text-[11px]">{expItem.startDate} - {expItem.endDate} ({nevitechExp.durationText})</span>
            </div>
            <div className="text-emerald-300 text-[11px]">{expItem.company} · {expItem.type}</div>
            <div className="text-emerald-500/70 text-[10px]">{expItem.location}</div>
            <p className="text-emerald-300/80 text-[11px] pt-1 leading-relaxed border-t border-emerald-500/20">
              {expItem.description}
            </p>
          </div>
        </div>

        {/* Matrix Code Stream Bio & Specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-black/90 border border-emerald-500/40 space-y-2 text-xs font-tech">
            <div className="text-emerald-300 font-bold font-orbitron flex items-center gap-2">
              <span>&gt;</span> BIOGRAPHY_STREAM.DAT
            </div>
            <p className="text-emerald-400/80 leading-relaxed">
              B.E. Information Technology Graduate (2025 Batch) and Trainee Software Support Engineer at Nevitech Data Solutions. Specialized in supporting complex Campus Management Systems and building reactive web UIs.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/90 border border-emerald-500/40 space-y-2 text-xs font-tech">
            <div className="text-emerald-300 font-bold font-orbitron flex items-center gap-2">
              <span>&gt;</span> MAINFRAME_SPECS.CFG
            </div>
            <ul className="space-y-1 text-emerald-400/80 text-[11px]">
              <li>[GRADUATION] B.E. Information Technology 2025</li>
              <li>[COMPANY] Nevitech Data Solutions Pvt Ltd</li>
              <li>[FRONTEND] React 19 / Vite / Canvas / Tailwind</li>
              <li>[BACKEND] Node.js / Express / Python FastAPI</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // MATRIX HACKER SKILLS (HEX & BINARY METERS)
  // ----------------------------------------------------
  if (windowId === 'skills') {
    const skills = [
      { name: 'TypeScript / ESNext', level: 90, addr: '0x7F01' },
      { name: 'React 18 / 19 & Next.js 15', level: 90, addr: '0x7F02' },
      { name: 'Tailwind CSS v4 & Canvas', level: 95, addr: '0x7F03' },
      { name: 'Node.js & Express / NestJS', level: 88, addr: '0x7F04' },
      { name: 'REST APIs & Support', level: 90, addr: '0x7F05' },
      { name: 'PostgreSQL & Prisma ORM', level: 85, addr: '0x7F06' },
      { name: 'MongoDB & Mongoose', level: 85, addr: '0x7F07' },
      { name: 'Python & FastAPI', level: 82, addr: '0x7F08' },
    ];

    return (
      <div className="font-mono text-emerald-400 p-4 space-y-5 select-text">
        <div className="p-3 rounded-xl bg-black/90 border border-emerald-500/50 font-tech text-xs space-y-1">
          <div className="flex items-center gap-2 text-emerald-300">
            <Cpu className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>OPERATOR_SHELL@MATRIX-MAINFRAME:~$ ./dump_skills.sh --hex-format</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((s, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-black/90 border border-emerald-500/40 space-y-2 text-xs font-tech">
              <div className="flex justify-between items-center text-emerald-300">
                <span className="font-bold">&gt; {s.name}</span>
                <span className="text-[10px] text-emerald-500">{s.addr} | {s.level}%</span>
              </div>
              <div className="text-[11px] tracking-widest text-emerald-400">
                [{'█'.repeat(Math.floor(s.level / 10))}{'░'.repeat(10 - Math.floor(s.level / 10))}]
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // MATRIX HACKER PROJECTS (VAULT MATRIX DUMP)
  // ----------------------------------------------------
  if (windowId === 'projects') {
    return (
      <div className="font-mono text-emerald-400 p-4 space-y-5 select-text">
        <div className="p-3 rounded-xl bg-black/90 border border-emerald-500/50 font-tech text-xs space-y-1">
          <div className="flex items-center gap-2 text-emerald-300">
            <FolderGit2 className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>OPERATOR_SHELL@MATRIX-MAINFRAME:~$ ls -la /sys/vault/projects/</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECTS_DATA.map((p) => (
            <div key={p.id} className="p-4 rounded-2xl bg-black/90 border-2 border-emerald-500/40 hover:border-emerald-300 space-y-3 transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-orbitron font-bold text-white">
                  <span>{p.title}</span>
                  <span className="text-[10px] text-emerald-400 border border-emerald-500/40 px-1.5 py-0.5 rounded">{p.category}</span>
                </div>
                <div className="text-[11px] text-emerald-300">{p.subtitle}</div>
                <p className="text-xs text-emerald-400/80 font-tech leading-snug">{p.description}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {p.tags.map((t, i) => (
                    <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {p.liveUrl && (
                <div className="pt-2 border-t border-emerald-500/30">
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-all cursor-pointer"
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
  // MATRIX HACKER CONTACT (SOCKET TRANSMISSION)
  // ----------------------------------------------------
  if (windowId === 'contact') {
    return (
      <div className="font-mono text-emerald-400 p-4 space-y-5 select-text">
        <div className="p-3 rounded-xl bg-black/90 border border-emerald-500/50 font-tech text-xs space-y-1">
          <div className="flex items-center gap-2 text-emerald-300">
            <Send className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>OPERATOR_SHELL@MATRIX-MAINFRAME:~$ nc -l -p 8080 --send-payload</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-black/90 border-2 border-emerald-500/50 space-y-4">
          {submitted ? (
            <div className="text-center p-6 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
              <div className="font-orbitron text-white text-sm">SOCKET TRANSMISSION ACCEPTED [200 OK]</div>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-3 font-tech text-xs">
              <div className="space-y-1">
                <label className="text-emerald-300">&gt; INPUT_OPERATOR_NAME:</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black border border-emerald-500/40 rounded p-2 text-emerald-300 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-emerald-300">&gt; INPUT_EMAIL_ADDRESS:</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-emerald-500/40 rounded p-2 text-emerald-300 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-emerald-300">&gt; INPUT_PAYLOAD_DATA:</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full bg-black border border-emerald-500/40 rounded p-2 text-emerald-300 focus:outline-none focus:border-emerald-400 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded bg-emerald-500 text-black font-orbitron font-bold text-xs hover:bg-emerald-400 cursor-pointer transition-colors"
              >
                EXECUTE SOCKET TRANSMISSION
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Fallback for Terminal, Game, Music, Browser
  return (
    <div className="h-full font-mono text-emerald-400">
      {windowId === 'terminal' && <TerminalApp />}
      {windowId === 'music' && <MusicApp />}
      {windowId === 'game' && <GameApp />}
      {windowId === 'browser' && <BrowserApp />}
    </div>
  );
};
