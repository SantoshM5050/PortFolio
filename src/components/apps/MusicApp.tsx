import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Disc3, Radio, Search, ExternalLink, Plus } from 'lucide-react';

const YoutubeIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

interface Track {
  id: string;
  title: string;
  artist: string;
  category: string;
  type: 'synth' | 'youtube';
  youtubeId?: string;
  duration: string;
  bgGradient: string;
  frequencyBase?: number;
}

const DEFAULT_TRACKS: Track[] = [
  {
    id: 'yt-1',
    title: 'Lofi Hip Hop Radio 📚 Beats to Relax/Study to',
    artist: 'Lofi Girl 24/7 Live Stream',
    category: 'Lofi',
    type: 'youtube',
    youtubeId: 'jfKfPfyJRdk',
    duration: '24/7 LIVE',
    bgGradient: 'from-purple-900 via-indigo-950 to-black',
  },
  {
    id: 'yt-2',
    title: 'Synthwave Radio 🌆 Chill Retro Drive',
    artist: 'Lofi Synthwave 24/7 Stream',
    category: 'Synthwave',
    type: 'youtube',
    youtubeId: '4xDzrJKXOOY',
    duration: '24/7 LIVE',
    bgGradient: 'from-pink-900 via-purple-950 to-black',
  },
  {
    id: 'yt-3',
    title: 'Lofi Boy • Relaxing Beats & Rain 🎧',
    artist: 'Lofi Boy 24/7 Live Stream',
    category: 'Lofi',
    type: 'youtube',
    youtubeId: '5qap5aO4i9A',
    duration: '24/7 LIVE',
    bgGradient: 'from-emerald-900 via-teal-950 to-black',
  },
  {
    id: 'yt-4',
    title: 'Cyberpunk 2077 Night City Radio 🏙️',
    artist: 'Relic Cyberpunk Station',
    category: 'Cyberpunk',
    type: 'youtube',
    youtubeId: 'MVPTG08PM68',
    duration: '24/7 LIVE',
    bgGradient: 'from-cyan-900 via-slate-950 to-black',
  },
  {
    id: 'yt-5',
    title: 'Phonk Radio ⚡ Gaming & Drift Music',
    artist: 'Cyber Phonk Radio',
    category: 'Phonk',
    type: 'youtube',
    youtubeId: '3L5u5u_yv_w',
    duration: '24/7 LIVE',
    bgGradient: 'from-amber-900 via-red-950 to-black',
  },
  {
    id: 'yt-6',
    title: 'Relaxing Piano & Soft Rain Ambient 🎹',
    artist: 'Peaceful Mind Radio',
    category: 'Ambient',
    type: 'youtube',
    youtubeId: '2OEL4P1rub0',
    duration: '3:00:00',
    bgGradient: 'from-blue-900 via-slate-950 to-black',
  },
  {
    id: '1',
    title: 'Night City Protocol',
    artist: 'Cyberwave Systems (Synth Engine)',
    category: 'Synth Engine',
    type: 'synth',
    duration: '3:45',
    bgGradient: 'from-cyan-900 to-indigo-950',
    frequencyBase: 120,
  },
  {
    id: '2',
    title: 'Midnight Terminal Code',
    artist: 'SynthPulse OST (Synth Engine)',
    category: 'Synth Engine',
    type: 'synth',
    duration: '4:12',
    bgGradient: 'from-pink-900 to-purple-950',
    frequencyBase: 180,
  },
];

const CATEGORY_TABS = ['ALL', 'Lofi', 'Synthwave', 'Cyberpunk', 'Phonk', 'Ambient', 'Synth Engine'];

export const MusicApp: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>(DEFAULT_TRACKS);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [customYtInput, setCustomYtInput] = useState('');
  const [ytError, setYtError] = useState<string | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const track = tracks[currentTrackIndex] || tracks[0];

  // Cleanup on unmount (Window Close Audio Stop Fix)
  useEffect(() => {
    return () => {
      stopSynthAudio();
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {}
        audioCtxRef.current = null;
      }
    };
  }, []);

  // Stop Web Audio synth engine safely
  const stopSynthAudio = () => {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
      } catch {}
      oscRef.current = null;
    }
  };

  // Start Synthwave Web Audio Oscillator
  const startSynthAudio = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      if (oscRef.current) {
        oscRef.current.stop();
      }

      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(track.frequencyBase || 150, ctx.currentTime);
      gain.gain.setValueAtTime(isMuted ? 0 : volume * 0.15, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscRef.current = osc;
      gainRef.current = gain;
    } catch {
      // Audio autoplay restriction
    }
  };

  const handleSelectTrack = (idx: number) => {
    stopSynthAudio();
    setCurrentTrackIndex(idx);
    setIsPlaying(true);
    const targetTrack = tracks[idx];
    if (targetTrack.type === 'synth') {
      setTimeout(() => startSynthAudio(), 100);
    }
  };

  const togglePlayPause = () => {
    if (track.type === 'synth') {
      if (isPlaying) {
        stopSynthAudio();
        setIsPlaying(false);
      } else {
        startSynthAudio();
        setIsPlaying(true);
      }
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  const handleNextTrack = () => {
    stopSynthAudio();
    const nextIdx = (currentTrackIndex + 1) % tracks.length;
    handleSelectTrack(nextIdx);
  };

  const handlePrevTrack = () => {
    stopSynthAudio();
    const prevIdx = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    handleSelectTrack(prevIdx);
  };

  const handleAddYouTubeLink = (e: React.FormEvent) => {
    e.preventDefault();
    setYtError(null);
    if (!customYtInput.trim()) return;

    let ytId = '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = customYtInput.match(regExp);

    if (match && match[2].length === 11) {
      ytId = match[2];
    } else if (customYtInput.trim().length === 11) {
      ytId = customYtInput.trim();
    }

    if (!ytId) {
      setYtError('Please paste a valid YouTube Link or 11-character Video ID');
      return;
    }

    const newTrack: Track = {
      id: `yt-custom-${Date.now()}`,
      title: `Custom Stream (${ytId})`,
      artist: 'User Broadcast Channel',
      category: 'Custom YT',
      type: 'youtube',
      youtubeId: ytId,
      duration: 'STREAM',
      bgGradient: 'from-red-950 via-slate-950 to-black',
    };

    stopSynthAudio();
    setTracks((prev) => [newTrack, ...prev]);
    setCurrentTrackIndex(0);
    setIsPlaying(true);
    setCustomYtInput('');
  };

  // Canvas Spectrum Equalizer Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let bars = 32;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = canvas.width / bars;

      for (let i = 0; i < bars; i++) {
        let barHeight = isPlaying
          ? Math.random() * (canvas.height * 0.8) + 10 
          : 4;

        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, '#00f0ff');
        gradient.addColorStop(0.5, '#aa3bff');
        gradient.addColorStop(1, '#ff0080');

        ctx.fillStyle = gradient;
        ctx.fillRect(i * barWidth + 2, canvas.height - barHeight, barWidth - 4, barHeight);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying]);

  // Filtered tracks based on Search and Category
  const filteredTracks = tracks.filter((t) => {
    const matchesCategory = selectedCategory === 'ALL' || t.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q) || t.category.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="h-full flex flex-col font-sans text-slate-200 select-none p-4 overflow-auto space-y-4">
      {/* Top Search & Filter Bar */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 bg-slate-900/90 border border-cyan-500/40 rounded-xl p-1.5 focus-within:border-cyan-400 transition-all shadow-lg">
          <Search className="w-4 h-4 text-cyan-400 ml-2 shrink-0 animate-pulse" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search channels & tracks (Lofi, Synthwave, Phonk)..."
            className="flex-1 bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none font-tech"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-slate-400 hover:text-white px-2 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORY_TABS.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-[10px] font-tech transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(0,240,255,0.6)]'
                  : 'bg-black/60 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-400/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Player Display */}
      {track.type === 'youtube' && track.youtubeId && isPlaying ? (
        <div className="space-y-2">
          <div className="w-full rounded-2xl overflow-hidden border border-red-500/40 bg-black shadow-2xl aspect-video relative">
            <iframe
              src={`https://www.youtube.com/embed/${track.youtubeId}?autoplay=1&enablejsapi=1`}
              title={track.title}
              allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
          <div className="flex items-center justify-between px-1">
            <div className="truncate pr-2">
              <h3 className="font-orbitron font-bold text-xs text-white truncate max-w-[280px]">{track.title}</h3>
              <p className="text-[10px] text-cyan-300 font-tech">{track.artist}</p>
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${track.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-600/80 hover:bg-red-500 text-white text-[10px] font-orbitron font-bold transition-all shrink-0"
            >
              <ExternalLink className="w-3 h-3" /> YouTube
            </a>
          </div>
        </div>
      ) : (
        /* Synth / Standby Audio Card View */
        <div className={`relative p-5 rounded-2xl bg-gradient-to-br ${track.bgGradient} border border-cyan-500/40 overflow-hidden flex flex-col items-center justify-center text-center space-y-3 shadow-2xl`}>
          <div className="relative">
            <div className={`w-20 h-20 rounded-full border-4 border-black/80 bg-slate-950 flex items-center justify-center shadow-2xl ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }}>
              {track.type === 'youtube' ? (
                <YoutubeIcon className="w-10 h-10 text-red-500" />
              ) : (
                <Disc3 className="w-10 h-10 text-cyan-400" />
              )}
            </div>
          </div>

          <div>
            <h3 className="font-orbitron font-extrabold text-sm md:text-base text-white tracking-wide">{track.title}</h3>
            <p className="text-xs text-cyan-300 font-tech">{track.artist} • {track.duration}</p>
          </div>

          {/* Live Audio Canvas Spectrum */}
          <div className="w-full h-12 rounded-xl bg-black/70 border border-white/10 p-1">
            <canvas ref={canvasRef} width={380} height={44} className="w-full h-full" />
          </div>
        </div>
      )}

      {/* Main Track Player Play / Pause & Navigation Bar */}
      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-lg">
        <div className="flex items-center justify-between">
          <button onClick={handlePrevTrack} className="p-2 rounded-xl bg-black/60 border border-white/10 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 transition-all cursor-pointer flex items-center gap-1 text-xs font-tech">
            <SkipBack className="w-4 h-4" /> Prev
          </button>

          {/* PROPER PLAY / PAUSE BUTTON */}
          <button
            onClick={togglePlayPause}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black shadow-[0_0_20px_rgba(0,240,255,0.7)] font-orbitron text-xs font-black cursor-pointer hover:scale-105 transition-all flex items-center gap-2"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-black" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-black ml-0.5" />
                <span>PLAY</span>
              </>
            )}
          </button>

          <button onClick={handleNextTrack} className="p-2 rounded-xl bg-black/60 border border-white/10 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 transition-all cursor-pointer flex items-center gap-1 text-xs font-tech">
            Next <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Volume Control for Synth Engine */}
        {track.type === 'synth' && (
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs font-tech text-slate-400">
            <button onClick={() => setIsMuted(!isMuted)} className="cursor-pointer">
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setVolume(val);
                setIsMuted(false);
                if (gainRef.current && audioCtxRef.current) {
                  gainRef.current.gain.setValueAtTime(val * 0.15, audioCtxRef.current.currentTime);
                }
              }}
              className="flex-1 accent-cyan-400 h-1 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* Add Custom YouTube Link Input */}
      <form onSubmit={handleAddYouTubeLink} className="space-y-1">
        <div className="flex items-center gap-2 bg-black/60 border border-white/10 rounded-xl p-1.5 focus-within:border-cyan-400 transition-all">
          <Plus className="w-4 h-4 text-slate-400 ml-1.5 shrink-0" />
          <input
            type="text"
            value={customYtInput}
            onChange={(e) => setCustomYtInput(e.target.value)}
            placeholder="Add YouTube Link or Video ID (e.g. https://youtu.be/...)..."
            className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none font-tech"
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-orbitron text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-md"
          >
            <YoutubeIcon className="w-3.5 h-3.5" /> ADD SONG
          </button>
        </div>
        {ytError && <p className="text-[10px] text-red-400 font-tech px-1">{ytError}</p>}
      </form>

      {/* Playlist & Channels Catalog */}
      <div className="flex-1 overflow-y-auto space-y-1 pr-1 font-tech text-xs min-h-[140px]">
        <div className="flex items-center justify-between text-[10px] font-orbitron text-slate-500 mb-1 px-1">
          <span>CURATED RADIO CHANNELS ({filteredTracks.length})</span>
          <span>GENRE / TYPE</span>
        </div>

        {filteredTracks.map((t) => {
          const originalIdx = tracks.findIndex((item) => item.id === t.id);
          const isSelected = currentTrackIndex === originalIdx;

          return (
            <button
              key={t.id}
              onClick={() => handleSelectTrack(originalIdx)}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all text-left cursor-pointer ${
                isSelected
                  ? 'bg-cyan-950/80 border-cyan-500/60 text-cyan-300 font-bold shadow-md'
                  : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:bg-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-slate-500 text-[10px] w-4">{originalIdx + 1}.</span>
                <div className="truncate">
                  <div className="text-white text-xs truncate">{t.title}</div>
                  <div className="text-[10px] text-slate-400 truncate">{t.artist}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-2">
                {t.type === 'youtube' ? (
                  <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 text-[9px] font-bold border border-red-500/30 flex items-center gap-1">
                    <YoutubeIcon className="w-3 h-3" /> {t.category}
                  </span>
                ) : (
                  <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-[9px] font-bold border border-cyan-500/30 flex items-center gap-1">
                    <Radio className="w-3 h-3" /> SYNTH
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
