import React, { useState, useRef, useEffect } from 'react';
import { useOS } from '../../context/OSContext';

interface HistoryItem {
  command?: string;
  output?: React.ReactNode;
  type?: 'input' | 'output' | 'error';
}

export const TerminalApp: React.FC = () => {
  const { openWindow, setTheme, theme } = useOS();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      output: (
        <div className="space-y-1 font-tech text-xs text-cyan-300">
          <div className="text-cyan-400 font-bold">CyberOS Terminal [Version 2.0.84-release]</div>
          <div className="text-slate-400">Type <span className="text-amber-300 font-bold">help</span> to list available CLI commands.</div>
          <div className="text-slate-500">---------------------------------------------------------</div>
        </div>
      ),
    },
  ]);
  const [matrixMode, setMatrixMode] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    const newHistory: HistoryItem[] = [...history, { command: cmd, type: 'input' }];
    const cleanCmd = cmd.toLowerCase().trim();
    const parts = cleanCmd.split(' ');

    let outputNode: React.ReactNode = null;

    switch (parts[0]) {
      case 'help':
        outputNode = (
          <div className="space-y-1 text-xs font-tech text-slate-300">
            <p className="text-cyan-400 font-bold">Available Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] pl-2">
              <div><span className="text-amber-300 font-bold">about</span> - Print developer bio & specs</div>
              <div><span className="text-amber-300 font-bold">skills</span> - Print skill arsenal breakdown</div>
              <div><span className="text-amber-300 font-bold">projects</span> - Print projects list & launch vault</div>
              <div><span className="text-amber-300 font-bold">contact</span> - Display contact info & socials</div>
              <div><span className="text-amber-300 font-bold">neofetch</span> - Display system architecture stats</div>
              <div><span className="text-amber-300 font-bold">matrix</span> - Toggle Matrix green rain mode</div>
              <div><span className="text-amber-300 font-bold">theme [name]</span> - Change theme (cyberpunk/synthwave/matrix)</div>
              <div><span className="text-amber-300 font-bold">clear</span> - Clear terminal history</div>
              <div><span className="text-amber-300 font-bold">sudo</span> - Execute root command</div>
            </div>
          </div>
        );
        break;

      case 'about':
      case 'bio':
        outputNode = (
          <div className="text-xs font-tech space-y-1 text-cyan-200">
            <p className="font-bold text-cyan-400">&gt;&gt; IDENTITY SUMMARY</p>
            <p>Santosh Maurya - FullStack Developer & Cyber UI Architect.</p>
            <p>Passionate about React, Next.js, Node.js, WebGL & AI workflows.</p>
            <button
              onClick={() => openWindow('about')}
              className="text-amber-300 underline hover:text-amber-200 text-[11px] mt-1"
            >
              [Click here to open full Profile App]
            </button>
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="text-xs font-tech space-y-1">
            <p className="font-bold text-cyan-400">&gt;&gt; TECHNICAL ARSENAL</p>
            <p className="text-emerald-400">Frontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion, Three.js</p>
            <p className="text-cyan-400">Backend: Node.js, Express, PostgreSQL, MongoDB, GraphQL, REST APIs</p>
            <p className="text-purple-400">DevOps & AI: Docker, Git, CI/CD, Gemini API, PyTorch, Cloud GCP</p>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="text-xs font-tech space-y-1">
            <p className="font-bold text-cyan-400">&gt;&gt; RECENT ARTIFACTS</p>
            <p>1. <span className="text-amber-300 font-bold">CyberOS Portfolio</span> - Futuristic Web OS</p>
            <p>2. <span className="text-cyan-300 font-bold">AI Data Analytics Hub</span> - Real-time metric dashboards</p>
            <p>3. <span className="text-purple-300 font-bold">Physio Care Platform</span> - Fullstack healthcare booking</p>
            <button
              onClick={() => openWindow('projects')}
              className="text-amber-300 underline hover:text-amber-200 text-[11px] mt-1"
            >
              [Click here to launch Project Vault]
            </button>
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="text-xs font-tech space-y-1 text-cyan-200">
            <p className="font-bold text-cyan-400">&gt;&gt; TRANSMISSION CHANNELS</p>
            <p>LinkedIn: linkedin.com/in/santoshm5050</p>
            <p>GitHub: github.com/SantoshM5050</p>
            <p>X (Twitter): x.com/SantoshM5050</p>
          </div>
        );
        break;

      case 'neofetch':
      case 'sysinfo':
        outputNode = (
          <div className="text-xs font-tech flex gap-4 items-center text-cyan-300 my-2">
            <pre className="text-[10px] text-cyan-400 font-mono hidden sm:block select-none leading-none">
              {`
  ██████╗██╗   ██╗██████╗ ███████╗███╗   ██╗███████╗████████╗
 ██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝████╗  ██║██╔════╝╚══██╔══╝
 ██║      ╚████╔╝ ██████╔╝█████╗  ██╔██╗ ██║█████╗     ██║   
 ██║       ╚██╔╝  ██╔══██╗██╔══╝  ██║╚██╗██║██╔══╝     ██║   
 ╚██████╗   ██║   ██████╔╝███████╗██║ ╚████║███████╗   ██║   
  ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝   ╚═╝   
              `}
            </pre>
            <div className="space-y-0.5 text-[11px]">
              <p><span className="text-cyan-400 font-bold">OS:</span> CyberOS v2.0 x86_64</p>
              <p><span className="text-cyan-400 font-bold">Host:</span> Quantum Mesh Node DEL-01</p>
              <p><span className="text-cyan-400 font-bold">Kernel:</span> 6.8.0-cyber-generic</p>
              <p><span className="text-cyan-400 font-bold">Shell:</span> ZSH 5.9 (cyber-cli)</p>
              <p><span className="text-cyan-400 font-bold">Theme:</span> {theme.toUpperCase()}</p>
              <p><span className="text-cyan-400 font-bold">Memory:</span> 12.4GB / 32GB RAM</p>
            </div>
          </div>
        );
        break;

      case 'matrix':
        setMatrixMode((prev) => !prev);
        outputNode = (
          <p className="text-emerald-400 text-xs font-tech">
            {matrixMode ? 'Matrix digital rain mode deactivated.' : 'Matrix digital rain mode ACTIVATED! Welcome to the construct.'}
          </p>
        );
        break;

      case 'theme':
        if (parts[1] && ['cyberpunk', 'synthwave', 'matrix', 'solar'].includes(parts[1])) {
          setTheme(parts[1] as any);
          outputNode = <p className="text-cyan-300 text-xs font-tech">Theme changed to: <span className="font-bold uppercase text-amber-300">{parts[1]}</span></p>;
        } else {
          outputNode = <p className="text-rose-400 text-xs font-tech">Usage: theme [cyberpunk | synthwave | matrix | solar]</p>;
        }
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'sudo':
        outputNode = <p className="text-rose-400 font-bold text-xs font-tech">[PERMISSION DENIED] User is not in the sudoers file. This incident will be reported.</p>;
        break;

      default:
        outputNode = <p className="text-rose-400 text-xs font-tech">Command not recognized: '{cmd}'. Type <span className="text-amber-300 font-bold">help</span> for commands.</p>;
        break;
    }

    setHistory([...newHistory, { output: outputNode }]);
    setInput('');
  };

  return (
    <div className={`h-full p-4 flex flex-col font-fira select-text ${matrixMode ? 'bg-black/90 text-emerald-400' : 'bg-black/80 text-slate-200'}`}>
      {/* Terminal View Area */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 text-xs sm:text-sm">
        {history.map((item, index) => (
          <div key={index} className="space-y-1">
            {item.command && (
              <div className="flex items-center gap-2 text-cyan-400 font-tech">
                <span className="text-emerald-400 font-bold">santosh@cyberos</span>
                <span className="text-slate-500">:~$</span>
                <span className="text-slate-100 font-semibold">{item.command}</span>
              </div>
            )}
            {item.output && <div className="pl-3 border-l border-cyan-500/20">{item.output}</div>}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Prompt Box */}
      <form onSubmit={handleCommand} className="mt-3 pt-2 border-t border-cyan-500/30 flex items-center gap-2">
        <span className="text-emerald-400 font-bold text-xs shrink-0 font-tech">santosh@cyberos:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type 'help'..."
          className="flex-1 bg-transparent border-none outline-none text-slate-100 font-tech text-xs sm:text-sm placeholder-slate-600 caret-cyan-400"
          autoFocus
        />
        <button type="submit" className="text-xs px-2 py-1 bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 rounded font-orbitron">
          RUN
        </button>
      </form>
    </div>
  );
};
