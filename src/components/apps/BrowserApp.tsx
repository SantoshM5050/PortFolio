import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Home, Lock, ExternalLink, Search, ShieldCheck, Globe, Compass } from 'lucide-react';

interface Bookmark {
  name: string;
  url: string;
  icon: string;
  desc: string;
  embeddable?: boolean;
}

const DEFAULT_BOOKMARKS: Bookmark[] = [
  {
    name: 'Shreyaan Physio',
    url: 'https://www.shreyaanphysiotherapycenter.in/',
    icon: '🏥',
    desc: 'Live Healthcare Patient Platform',
    embeddable: true,
  },
  {
    name: 'SMCore Dashboard',
    url: 'https://smcoredashboard.vercel.app/',
    icon: '🤖',
    desc: 'SaaS Bot & Analytics Dashboard',
    embeddable: true,
  },
  {
    name: 'Google Search Engine',
    url: 'https://www.google.com/search?igu=1',
    icon: '🔍',
    desc: 'Live Embedded Google Search',
    embeddable: true,
  },
  {
    name: 'Wikipedia',
    url: 'https://www.wikipedia.org',
    icon: '📄',
    desc: 'Free Encylopedia',
    embeddable: true,
  },
  {
    name: 'GitHub Profile',
    url: 'https://github.com/SantoshM5050',
    icon: '💻',
    desc: 'Santosh Maurya GitHub Profile',
    embeddable: false,
  },
];

const SEARCH_ENGINES = [
  { name: 'Google', url: (q: string) => `https://www.google.com/search?q=${encodeURIComponent(q)}&igu=1` },
  { name: 'DuckDuckGo', url: (q: string) => `https://duckduckgo.com/?q=${encodeURIComponent(q)}` },
  { name: 'Wikipedia', url: (q: string) => `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(q)}` },
];

export const BrowserApp: React.FC = () => {
  const [url, setUrl] = useState<string>('https://www.shreyaanphysiotherapycenter.in/');
  const [inputUrl, setInputUrl] = useState<string>('https://www.shreyaanphysiotherapycenter.in/');
  const [history, setHistory] = useState<string[]>(['https://www.shreyaanphysiotherapycenter.in/']);
  const [historyIdx, setHistoryIdx] = useState<number>(0);
  const [key, setKey] = useState<number>(0);
  const [activeEngine, setActiveEngine] = useState<number>(0);

  const navigateTo = (newUrl: string) => {
    let formatted = newUrl.trim();
    if (!formatted) return;

    if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
      if (formatted.includes('.') && !formatted.includes(' ')) {
        formatted = `https://${formatted}`;
      } else {
        formatted = SEARCH_ENGINES[activeEngine].url(formatted);
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

  // Check if current site might block iframe embedding (like github or raw youtube)
  const isDirectXFrameBlock = url.includes('github.com') || url.includes('youtube.com') || url.includes('twitter.com') || url.includes('facebook.com');

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
            placeholder="Type any URL or Google search query..."
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
          className="p-2 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900 transition-all text-xs font-orbitron font-bold flex items-center gap-1 shrink-0 cursor-pointer"
          title="Open in external browser window"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Launch Tab</span>
        </a>
      </div>

      {/* Bookmarks & Search Engine Selector Bar */}
      <div className="px-3 py-1.5 bg-slate-900/80 border-b border-white/10 flex items-center justify-between gap-2 overflow-x-auto text-xs font-tech">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] text-slate-400 font-orbitron shrink-0 flex items-center gap-1">
            <Compass className="w-3 h-3 text-cyan-400" /> SITES:
          </span>
          {DEFAULT_BOOKMARKS.map((bm) => (
            <button
              key={bm.name}
              onClick={() => navigateTo(bm.url)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                url === bm.url
                  ? 'bg-cyan-950 border-cyan-500/60 text-cyan-300 font-bold shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                  : 'bg-black/50 border-white/10 text-slate-300 hover:border-cyan-400/50 hover:bg-white/5'
              }`}
            >
              <span>{bm.icon}</span>
              <span>{bm.name}</span>
            </button>
          ))}
        </div>

        {/* Engine Switcher */}
        <div className="hidden md:flex items-center gap-1 shrink-0 text-[10px] font-tech text-slate-400">
          <span>ENGINE:</span>
          {SEARCH_ENGINES.map((eng, idx) => (
            <button
              key={eng.name}
              onClick={() => setActiveEngine(idx)}
              className={`px-2 py-0.5 rounded border transition-all cursor-pointer ${
                activeEngine === idx ? 'bg-cyan-500 text-black font-bold border-cyan-400' : 'bg-black/40 text-slate-400 border-white/10 hover:text-white'
              }`}
            >
              {eng.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="flex-1 relative bg-slate-950 flex flex-col">
        {isDirectXFrameBlock ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-5 bg-gradient-to-b from-slate-950 via-slate-900 to-black">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_40px_rgba(0,240,255,0.3)]">
              <Globe className="w-8 h-8 animate-pulse" />
            </div>
            <div className="max-w-md space-y-2">
              <h3 className="font-orbitron font-bold text-lg text-white">EXTERNAL SECURITY POLICY DETECTED</h3>
              <p className="text-xs text-slate-300 font-tech leading-relaxed">
                This target website (<span className="text-cyan-400 font-bold">{url}</span>) restricts direct inline iframe embedding due to X-Frame-Options security policies.
              </p>
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-orbitron font-extrabold text-xs tracking-wider shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" /> LAUNCH FULL SITE IN LIVE TAB
            </a>
          </div>
        ) : (
          <iframe
            key={key}
            src={url}
            title="CyberOS Web Browser"
            className="w-full h-full border-0 bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
          />
        )}
      </div>

      {/* Footer Security Bar */}
      <div className="px-3 py-1 bg-slate-950 border-t border-white/10 flex items-center justify-between text-[10px] font-tech text-slate-400">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>CYBER_OS LIVE WEB PIPELINE</span>
        </div>
        <span className="text-slate-500 truncate max-w-[280px]">{url}</span>
      </div>
    </div>
  );
};
