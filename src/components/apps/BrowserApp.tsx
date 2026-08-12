import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Home, Lock, ExternalLink, Search, ShieldCheck } from 'lucide-react';

interface Bookmark {
  name: string;
  url: string;
  icon: string;
  desc: string;
}

const DEFAULT_BOOKMARKS: Bookmark[] = [
  {
    name: 'Shreyaan Physio',
    url: 'https://www.shreyaanphysiotherapycenter.in/',
    icon: '🏥',
    desc: 'Live Healthcare Patient Platform',
  },
  {
    name: 'SMCore Dashboard',
    url: 'https://smcoredashboard.vercel.app/',
    icon: '🤖',
    desc: 'SaaS Bot & Analytics Dashboard',
  },
  {
    name: 'GitHub Repos',
    url: 'https://github.com/SantoshM5050',
    icon: '💻',
    desc: 'Santosh Maurya GitHub Profile',
  },
  {
    name: 'Wikipedia',
    url: 'https://www.wikipedia.org',
    icon: '📄',
    desc: 'Free Encylopedia',
  },
];

export const BrowserApp: React.FC = () => {
  const [url, setUrl] = useState<string>('https://www.shreyaanphysiotherapycenter.in/');
  const [inputUrl, setInputUrl] = useState<string>('https://www.shreyaanphysiotherapycenter.in/');
  const [history, setHistory] = useState<string[]>(['https://www.shreyaanphysiotherapycenter.in/']);
  const [historyIdx, setHistoryIdx] = useState<number>(0);
  const [key, setKey] = useState<number>(0);

  const navigateTo = (newUrl: string) => {
    let formatted = newUrl.trim();
    if (!formatted) return;

    if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
      if (formatted.includes('.') && !formatted.includes(' ')) {
        formatted = `https://${formatted}`;
      } else {
        formatted = `https://www.google.com/search?q=${encodeURIComponent(formatted)}&igu=1`;
      }
    }

    setUrl(formatted);
    setInputUrl(formatted);

    const newHistory = history.slice(0, historyIdx + 1);
    newHistory.push(formatted);
    setHistory(newHistory);
    setHistoryIdx(newHistory.length - 1);
  };

  const handleBack = () => {
    if (historyIdx > 0) {
      const prev = history[historyIdx - 1];
      setHistoryIdx(historyIdx - 1);
      setUrl(prev);
      setInputUrl(prev);
    }
  };

  const handleForward = () => {
    if (historyIdx < history.length - 1) {
      const next = history[historyIdx + 1];
      setHistoryIdx(historyIdx + 1);
      setUrl(next);
      setInputUrl(next);
    }
  };

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="h-full flex flex-col font-sans select-none bg-slate-950 text-slate-200 overflow-hidden">
      {/* Top Browser Navigation Toolbar */}
      <div className="p-2.5 bg-slate-900 border-b border-white/10 flex items-center gap-2 shadow-md">
        <div className="flex items-center gap-1">
          <button
            onClick={handleBack}
            disabled={historyIdx <= 0}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
            title="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleForward}
            disabled={historyIdx >= history.length - 1}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
            title="Forward"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={handleRefresh}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
            title="Refresh"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigateTo('https://www.shreyaanphysiotherapycenter.in/')}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
            title="Home"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>

        {/* URL Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigateTo(inputUrl);
          }}
          className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 focus-within:border-cyan-400 transition-all text-xs font-tech"
        >
          <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Search Google or enter web address..."
            className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none"
          />
          <button type="submit" className="text-slate-400 hover:text-cyan-400 cursor-pointer">
            <Search className="w-3.5 h-3.5" />
          </button>
        </form>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900 transition-all text-xs font-orbitron font-bold flex items-center gap-1 shrink-0"
          title="Open in external browser window"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Bookmarks Bar */}
      <div className="px-3 py-1.5 bg-slate-900/60 border-b border-white/5 flex items-center gap-2 overflow-x-auto text-xs font-tech">
        <span className="text-[10px] text-slate-500 font-orbitron shrink-0">BOOKMARKS:</span>
        {DEFAULT_BOOKMARKS.map((bm) => (
          <button
            key={bm.name}
            onClick={() => navigateTo(bm.url)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] whitespace-nowrap transition-all cursor-pointer shrink-0 ${
              url === bm.url
                ? 'bg-cyan-950 border-cyan-500/50 text-cyan-300 font-bold'
                : 'bg-black/40 border-white/10 text-slate-300 hover:border-cyan-400/50 hover:bg-white/5'
            }`}
          >
            <span>{bm.icon}</span>
            <span>{bm.name}</span>
          </button>
        ))}
      </div>

      {/* Main Viewport Container */}
      <div className="flex-1 relative bg-slate-950">
        <iframe
          key={key}
          src={url}
          title="CyberOS Web Browser"
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
        />
      </div>

      {/* Footer Security Bar */}
      <div className="px-3 py-1 bg-slate-950 border-t border-white/10 flex items-center justify-between text-[10px] font-tech text-slate-400">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>CYBER_OS ENCRYPTED BROWSER PIPELINE</span>
        </div>
        <span className="text-slate-500 truncate max-w-[200px]">{url}</span>
      </div>
    </div>
  );
};
