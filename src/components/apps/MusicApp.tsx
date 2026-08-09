import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Disc3 } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  bgGradient: string;
  frequencyBase: number;
}

const TRACKS: Track[] = [
  { id: '1', title: 'Night City Protocol', artist: 'Cyberwave Systems', album: 'Neon Drive 2088', duration: '3:45', bgGradient: 'from-cyan-900 to-indigo-950', frequencyBase: 120 },
  { id: '2', title: 'Midnight Terminal Code', artist: 'SynthPulse', album: 'CyberOS OST', duration: '4:12', bgGradient: 'from-pink-900 to-purple-950', frequencyBase: 180 },
  { id: '3', title: 'Construct Rain Ambient', artist: 'Matrix Echo', album: 'Neural Connection', duration: '5:00', bgGradient: 'from-emerald-900 to-teal-950', frequencyBase: 220 },
  { id: '4', title: 'Solar Flare Horizon', artist: 'Retrowave Lab', album: 'Solar Synth', duration: '3:30', bgGradient: 'from-amber-900 to-orange-950', frequencyBase: 150 }
];

export const MusicApp: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const track = TRACKS[currentTrackIndex];

  // Start Synthwave Audio Generator
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
      osc.frequency.setValueAtTime(track.frequencyBase, ctx.currentTime);

      gain.gain.setValueAtTime(isMuted ? 0 : volume * 0.15, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscRef.current = osc;
      gainRef.current = gain;
      setIsPlaying(true);
    } catch {
      // Audio autoplay restriction
    }
  };

  const stopSynthAudio = () => {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
      } catch {}
      oscRef.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopSynthAudio();
    } else {
      startSynthAudio();
    }
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    if (isPlaying) {
      setTimeout(() => startSynthAudio(), 100);
    }
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    if (isPlaying) {
      setTimeout(() => startSynthAudio(), 100);
    }
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

  return (
    <div className="h-full flex flex-col font-sans text-slate-200 select-none p-4 overflow-auto">
      {/* Vinyl / Cover Art Canvas Header */}
      <div className={`relative p-6 rounded-xl bg-gradient-to-br ${track.bgGradient} border border-cyan-500/40 overflow-hidden flex flex-col items-center justify-center text-center space-y-3`}>
        <div className="relative">
          <div className={`w-24 h-24 rounded-full border-4 border-black/80 bg-slate-950 flex items-center justify-center shadow-2xl ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }}>
            <Disc3 className="w-12 h-12 text-cyan-400" />
          </div>
          <div className="absolute inset-0 rounded-full border border-cyan-400/40 pointer-events-none"></div>
        </div>

        <div>
          <h3 className="font-orbitron font-extrabold text-base text-white">{track.title}</h3>
          <p className="text-xs text-cyan-300 font-tech">{track.artist} • {track.album}</p>
        </div>

        {/* Live Audio Canvas Spectrum */}
        <div className="w-full h-14 rounded-lg bg-black/60 border border-white/10 p-1">
          <canvas ref={canvasRef} width={380} height={50} className="w-full h-full" />
        </div>
      </div>

      {/* Track Player Controls */}
      <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
        {/* Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button onClick={handlePrevTrack} className="p-2 rounded-full hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer">
            <SkipBack className="w-5 h-5" />
          </button>
          <button
            onClick={togglePlay}
            className="p-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,240,255,0.8)] hover:scale-105 transition-all cursor-pointer"
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-black" /> : <Play className="w-6 h-6 fill-black ml-0.5" />}
          </button>
          <button onClick={handleNextTrack} className="p-2 rounded-full hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer">
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Volume & Details */}
        <div className="flex items-center gap-3 text-xs font-tech text-slate-400">
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
      </div>

      {/* Playlist Selector */}
      <div className="mt-3 flex-1 overflow-y-auto space-y-1 pr-1 font-tech text-xs">
        <span className="text-[10px] font-orbitron text-slate-500 block mb-1">AVAILABLE STREAMS</span>
        {TRACKS.map((t, idx) => (
          <button
            key={t.id}
            onClick={() => {
              setCurrentTrackIndex(idx);
              if (isPlaying) setTimeout(() => startSynthAudio(), 100);
            }}
            className={`w-full flex items-center justify-between p-2 rounded border transition-all text-left cursor-pointer ${
              currentTrackIndex === idx
                ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300 font-bold'
                : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <div className="truncate">
              <span className="text-slate-500 mr-2">0{idx + 1}.</span>
              <span>{t.title}</span>
            </div>
            <span className="text-[10px] text-slate-500 shrink-0 ml-2">{t.duration}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
