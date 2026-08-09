import React, { useState } from 'react';
import { ExternalLink, MapPin, Send, Globe, Share2, Zap, Shield, Rocket, Cpu, CheckCircle2, Terminal, Music } from 'lucide-react';
import { useOS } from '../../context/OSContext';

export const ContactApp: React.FC = () => {
  const { interfaceMode } = useOS();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Compute Universe-Specific Theme Styles for ALL 6 OS MODES
  const getThemeStyles = () => {
    switch (interfaceMode) {
      case 'matrix_rain':
        return {
          titleColor: 'text-emerald-400',
          subColor: 'text-green-300',
          borderColor: 'border-emerald-500/40',
          cardBg: 'bg-black/80 border-emerald-500/30 hover:border-emerald-400',
          buttonStyle: 'bg-emerald-500 text-black font-black border-emerald-300 shadow-[0_0_15px_rgba(0,255,102,0.8)]',
          icon: Terminal,
        };
      case 'synthwave_arcade':
        return {
          titleColor: 'text-pink-400',
          subColor: 'text-amber-300',
          borderColor: 'border-pink-500/40',
          cardBg: 'bg-black/80 border-pink-500/30 hover:border-amber-400',
          buttonStyle: 'bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 text-black font-black border-amber-300 shadow-[0_0_15px_rgba(255,0,128,0.8)]',
          icon: Music,
        };
      case 'quantum_matrix':
        return {
          titleColor: 'text-cyan-400',
          subColor: 'text-pink-400',
          borderColor: 'border-cyan-500/40',
          cardBg: 'bg-black/70 border-cyan-500/30 hover:border-pink-400/80',
          buttonStyle: 'bg-gradient-to-r from-cyan-500 to-pink-500 text-black font-black border-pink-300 shadow-[0_0_15px_rgba(255,0,128,0.8)]',
          icon: Zap,
        };
      case 'stark_hud':
        return {
          titleColor: 'text-amber-400',
          subColor: 'text-red-400',
          borderColor: 'border-amber-500/40',
          cardBg: 'bg-black/80 border-amber-500/30 hover:border-red-500/80',
          buttonStyle: 'bg-gradient-to-r from-amber-500 to-red-600 text-black font-black border-yellow-300 shadow-[0_0_15px_rgba(255,170,0,0.8)]',
          icon: Shield,
        };
      case 'interstellar_bridge':
        return {
          titleColor: 'text-emerald-400',
          subColor: 'text-cyan-400',
          borderColor: 'border-emerald-500/40',
          cardBg: 'bg-slate-950/80 border-emerald-500/30 hover:border-emerald-400/80',
          buttonStyle: 'bg-gradient-to-r from-emerald-400 to-cyan-500 text-black font-black border-emerald-300 shadow-[0_0_15px_rgba(0,255,102,0.8)]',
          icon: Rocket,
        };
      case 'cyberos':
      default:
        return {
          titleColor: 'text-cyan-400',
          subColor: 'text-cyan-300',
          borderColor: 'border-cyan-500/30',
          cardBg: 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/40',
          buttonStyle: 'bg-cyan-950 text-cyan-300 border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.3)] font-bold',
          icon: Cpu,
        };
    }
  };

  const theme = getThemeStyles();
  const HeaderIcon = theme.icon;

  const socialLinks = [
    { icon: Share2, label: 'LinkedIn Profile', url: 'https://www.linkedin.com/in/santoshm5050/' },
    { icon: Globe, label: 'X / Twitter Feed', url: 'https://x.com/SantoshM5050' },
    { icon: Globe, label: 'GitHub Repositories', url: 'https://github.com/SantoshM5050' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col h-full p-4 font-mono select-text text-slate-200 overflow-auto space-y-6">
      {/* Top Connection Header */}
      <div className={`p-4 rounded-2xl border ${theme.cardBg} flex items-center justify-between shadow-2xl`}>
        <div className="flex items-center gap-3">
          <HeaderIcon className={`w-6 h-6 ${theme.titleColor} animate-pulse`} />
          <div>
            <h2 className={`font-orbitron font-extrabold text-lg text-white ${theme.titleColor}`}>
              ESTABLISH SUB-SPACE CONNECTION
            </h2>
            <p className={`text-xs ${theme.subColor} font-tech`}>SANTOSH MAURYA DIRECT TRANSMISSION NODE</p>
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transmission Form */}
        <div className={`border ${theme.borderColor} rounded-2xl bg-black/60 p-5 flex flex-col justify-between`}>
          <div className="text-xs text-slate-400 mb-3 tracking-widest font-tech font-bold">
            [ DIRECT MESSAGE PAYLOAD ]
          </div>

          {submitted ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-bounce" />
              <h3 className="font-orbitron font-bold text-white text-base">TRANSMISSION SENT!</h3>
              <p className="text-xs text-slate-400 font-tech">Payload successfully dispatched to Santosh Maurya's neural inbox.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-400 font-tech">OPERATOR NAME</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  className="bg-black/80 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-tech"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-400 font-tech font-tech">RETURN EMAIL ADDRESS</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="bg-black/80 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-tech"
                />
              </div>

              <div className="flex flex-col gap-1 flex-1 min-h-[110px]">
                <label className="text-xs text-slate-400 font-tech font-tech">PAYLOAD MESSAGE</label>
                <textarea 
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your transmission message..."
                  className="bg-black/80 border border-white/10 rounded-xl p-2.5 text-xs text-white resize-none flex-1 focus:outline-none focus:border-cyan-400 font-tech h-full"
                ></textarea>
              </div>

              <button 
                type="submit"
                className={`py-3 px-4 rounded-xl border text-xs font-orbitron transition-all flex items-center justify-center gap-2 cursor-pointer ${theme.buttonStyle}`}
              >
                <Send className="w-4 h-4" /> TRANSMIT MESSAGE
              </button>
            </form>
          )}
        </div>

        {/* Network Nodes */}
        <div className="flex flex-col gap-6">
          <div className={`border ${theme.borderColor} rounded-2xl bg-black/60 p-5 space-y-4`}>
            <div className="text-xs text-slate-400 tracking-widest font-tech font-bold">
              [ NEURAL SOCIAL NODES ]
            </div>

            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => {
                const LinkIcon = link.icon;
                return (
                  <a 
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-3.5 border border-white/10 rounded-xl bg-black/80 hover:bg-white/10 hover:border-cyan-400 transition-all group`}
                  >
                    <LinkIcon className={`w-5 h-5 ${theme.titleColor} group-hover:scale-110 transition-transform`} />
                    <span className="text-xs font-orbitron text-white flex-1">{link.label}</span>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className={`border ${theme.borderColor} rounded-2xl bg-black/60 p-5 flex-1 flex flex-col justify-center space-y-2`}>
            <div className="text-xs text-slate-400 tracking-widest font-tech font-bold">[ BASE COORDINATES ]</div>
            <div className="flex items-center gap-3 text-xs font-tech text-white">
              <MapPin className={`w-4 h-4 ${theme.titleColor}`} />
              <span>Delhi NCR, India (IST UTC+5:30)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
