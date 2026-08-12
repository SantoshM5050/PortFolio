import React, { useState } from 'react';
import type { WindowId } from '../../types/os';
import { User, Briefcase, GraduationCap, Code, Server, CheckCircle2, Award, FolderGit2, Send, Cpu, ExternalLink, Globe } from 'lucide-react';
import { TerminalApp } from '../../components/apps/TerminalApp';
import { MusicApp } from '../../components/apps/MusicApp';
import { GameApp } from '../../components/apps/GameApp';
import { BrowserApp } from '../../components/apps/BrowserApp';
import { CodeLabApp } from '../../components/apps/CodeLabApp';
import { getNevitechExperienceDuration, WORK_EXPERIENCE, EDUCATION_DATA, PORTFOLIO_BIO, PROJECTS_DATA, SKILLS_DATA } from '../../data/portfolio.data';

interface Props {
  windowId: WindowId;
}

export const Windows11AppRenderer: React.FC<Props> = ({ windowId }) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const nevitechExp = getNevitechExperienceDuration();
  const expItem = WORK_EXPERIENCE[0];
  const eduItem = EDUCATION_DATA[0];

  // ----------------------------------------------------
  // WINDOWS 11 PRO ABOUT / SETTINGS USER PAGE
  // ----------------------------------------------------
  if (windowId === 'about') {
    return (
      <div className="font-sans text-slate-100 p-6 space-y-6 select-text">
        {/* Windows 11 Fluent Profile Header */}
        <div className="p-6 rounded-2xl bg-slate-800/80 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-center gap-6">
          <img
            src="/santosh_profile.jpg"
            alt="Santosh Maurya"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500/60 shadow-lg"
          />
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-blue-400">
              <User className="w-4 h-4" /> WINDOWS 12 PRO USER ACCOUNT
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{PORTFOLIO_BIO.name}</h1>
            <p className="text-xs text-slate-300 font-medium">{PORTFOLIO_BIO.title}</p>
            <div className="flex flex-wrap gap-2 pt-1 justify-center sm:justify-start">
              <span className="px-3 py-1 text-xs rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-300 font-semibold">
                B.E. IT 2025 GRADUATE
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-slate-700/60 border border-white/10 text-slate-300">
                DELHI NCR
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-medium">
                NEVITECH SOFTWARE SUPPORT ENGINEER
              </span>
            </div>
          </div>
        </div>

        {/* Work Experience Section */}
        <div className="p-6 rounded-2xl bg-slate-800/80 border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Briefcase className="w-5 h-5 text-blue-400" />
              <span>Work Experience</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <h4 className="font-bold text-sm text-white">{expItem.role}</h4>
                <div className="text-xs text-blue-400 font-medium">{expItem.company} · <span className="text-slate-400">{expItem.type}</span></div>
              </div>
              <div className="text-xs text-emerald-400 font-medium bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30 self-start sm:self-auto">
                {expItem.startDate} - {expItem.endDate} ({nevitechExp.durationText})
              </div>
            </div>
            <div className="text-[11px] text-slate-400">{expItem.location}</div>
            <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-white/5">
              {expItem.description}
            </p>
          </div>
        </div>

        {/* Education Section */}
        <div className="p-6 rounded-2xl bg-slate-800/80 border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <GraduationCap className="w-5 h-5 text-amber-400" />
              <span>Education</span>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400" /> Grade: {eduItem.grade}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <h4 className="font-bold text-sm text-white">{eduItem.institution}</h4>
                <div className="text-xs text-amber-300 font-medium">{eduItem.degree}</div>
              </div>
              <div className="text-xs text-slate-400 font-medium">{eduItem.duration}</div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-white/5">
              {eduItem.description}
            </p>
          </div>
        </div>

        {/* Bio & Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-white/10 backdrop-blur-xl space-y-3">
            <h3 className="text-sm font-bold text-blue-400 flex items-center gap-2">
              <Code className="w-4 h-4" /> About Me
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {PORTFOLIO_BIO.bio}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-white/10 backdrop-blur-xl space-y-3">
            <h3 className="text-sm font-bold text-blue-400 flex items-center gap-2">
              <Server className="w-4 h-4" /> Technical Specs
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-slate-400">Degree</span>
                <span className="font-semibold text-white">B.E. IT (SPPU - 7.99 CGPA)</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-slate-400">Current Role</span>
                <span className="font-semibold text-white">Nevitech Software Support</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-slate-400">Tech Stack</span>
                <span className="font-semibold text-blue-300">React 19 / Node.js / TypeScript</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // WINDOWS 11 PRO SKILLS MANAGER
  // ----------------------------------------------------
  if (windowId === 'skills') {
    return (
      <div className="font-sans text-slate-100 p-6 space-y-6 select-text">
        <div className="p-4 rounded-xl bg-slate-800/80 border border-white/10 text-xs font-semibold text-blue-400 flex items-center gap-2">
          <Cpu className="w-4 h-4" /> Windows 12 Task Manager - Technical Skill Meter
        </div>

        <div className="space-y-6">
          {SKILLS_DATA.map((cat, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-800/80 border border-white/10 backdrop-blur-xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                {cat.name}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cat.skills.map((s, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 space-y-2">
                    <div className="flex justify-between items-center text-xs font-medium">
                      <span className="text-slate-200 font-bold">{s.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-950 text-blue-300 border border-blue-500/40 font-mono font-bold tracking-wider">
                        {s.status || 'PROD READY'}
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden border border-white/10">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)] w-full" />
                    </div>
                    <div className="text-[10px] text-slate-400 flex justify-between font-mono pt-0.5">
                      <span>Status</span>
                      <span className="text-emerald-400 font-bold">VERIFIED</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // WINDOWS 11 PRO PROJECTS EXPLORER
  // ----------------------------------------------------
  if (windowId === 'projects') {
    return (
      <div className="font-sans text-slate-100 p-6 space-y-6 select-text">
        <div className="p-4 rounded-xl bg-slate-800/80 border border-white/10 text-xs font-semibold text-blue-400 flex items-center gap-2">
          <FolderGit2 className="w-4 h-4" /> Windows File Explorer - Featured Projects Directory
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS_DATA.map((p) => (
            <div key={p.id} className="p-5 rounded-2xl bg-slate-800/80 border border-white/10 backdrop-blur-xl hover:border-blue-500/60 transition-all space-y-3 group flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white group-hover:text-blue-300 transition-colors">{p.title}</h3>
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-300">
                    {p.category}
                  </span>
                </div>
                <div className="text-[11px] text-blue-400 font-medium">{p.subtitle}</div>
                <p className="text-xs text-slate-300 leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {p.tags.map((t, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-white/10 text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {p.liveUrl && (
                <div className="pt-3 border-t border-white/10">
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer hover:scale-[1.02]"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>LAUNCH LIVE SITE</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
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
  // WINDOWS 11 PRO CONTACT APP
  // ----------------------------------------------------
  if (windowId === 'contact') {
    return (
      <div className="font-sans text-slate-100 p-6 space-y-6 select-text">
        <div className="p-6 rounded-2xl bg-slate-800/80 border border-white/10 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-white/10 pb-3">
            <Send className="w-5 h-5 text-blue-400" /> Windows Mail & Communication Hub
          </div>

          {submitted ? (
            <div className="text-center p-8 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <div className="font-bold text-white text-base">Your Message Has Been Sent Successfully!</div>
              <p className="text-xs text-slate-300">Santosh Maurya will review your message and respond shortly.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Your Full Name:</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name..."
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Your Email Address:</label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Message Payload:</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Type your message here..."
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 resize-none transition-colors"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 cursor-pointer transition-all hover:scale-[1.01]"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="h-full font-mono text-slate-200">
      {windowId === 'terminal' && <TerminalApp />}
      {windowId === 'music' && <MusicApp />}
      {windowId === 'game' && <GameApp />}
      {windowId === 'browser' && <BrowserApp />}
      {windowId === 'code_lab' && <CodeLabApp />}
    </div>
  );
};
