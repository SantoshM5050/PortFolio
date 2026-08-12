import React, { useState } from 'react';
import { Code, Check, Copy, ChevronRight, Folder, FolderOpen, Sparkles, Play, RotateCcw, Terminal as TerminalIcon, Cpu, Layers } from 'lucide-react';

interface CodeFile {
  id: string;
  name: string;
  path: string;
  language: string;
  icon: string;
  project: string;
  code: string;
  description: string;
}

const SAMPLE_FILES: CodeFile[] = [
  {
    id: 'schema',
    name: 'schema.prisma',
    path: 'smcore-discord-bot/prisma/schema.prisma',
    language: 'Prisma / PostgreSQL',
    icon: '💎',
    project: 'SMCore Discord Bot & Analytics Engine',
    description: 'PostgreSQL relational database schema using Prisma ORM for Discord guild management & bot telemetry.',
    code: `// Prisma Data Model for SMCore Discord Bot & Next.js Analytics Engine
// Database Provider: PostgreSQL / CockroachDB

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String          @id @default(cuid())
  discordId     String          @unique
  username      String
  avatar        String?
  role          UserRole        @default(MEMBER)
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
  
  guildConfigs  GuildConfig[]
  modLogs       ModerationLog[]

  @@index([discordId])
}

model GuildConfig {
  id            String   @id @default(cuid())
  guildId       String   @unique
  guildName     String
  prefix        String   @default("!")
  modLogChannel String?
  welcomeMsg    String?
  autoRoleEnabled Boolean @default(true)
  
  ownerId       String
  owner         User     @relation(fields: [ownerId], references: [id], onDelete: Cascade)
  
  createdAt     DateTime @default(now())
}

model ModerationLog {
  id            String   @id @default(cuid())
  guildId       String
  action        String   // BAN, KICK, MUTE, WARN
  reason        String?
  executorId    String
  targetId      String
  
  executor      User     @relation(fields: [executorId], references: [id])
  timestamp     DateTime @default(now())
}

enum UserRole {
  ADMIN
  MODERATOR
  MEMBER
}`,
  },
  {
    id: 'bot_handler',
    name: 'moderation.ts',
    path: 'smcore-discord-bot/src/commands/moderation.ts',
    language: 'TypeScript / Discord.js v14',
    icon: '🟦',
    project: 'SMCore Discord Bot',
    description: 'Discord.js v14 Command Handler for server moderation with Redis caching and audit logging.',
    code: `import { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction } from 'discord.js';
import { prisma } from '../lib/prisma';
import { redis } from '../lib/redis';

export const command = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a target user from the server with audit logging')
    .addUserOption((option) =>
      option.setName('target').setDescription('User to ban').setRequired(true)
    )
    .addStringOption((option) =>
      option.setName('reason').setDescription('Reason for ban').setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction: ChatInputCommandInteraction) {
    const targetUser = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    if (!targetUser) {
      return interaction.reply({ content: '❌ Target user not found.', ephemeral: true });
    }

    try {
      // 1. Execute Guild Ban
      await interaction.guild?.members.ban(targetUser, { reason });

      // 2. Persist Audit Log in PostgreSQL via Prisma
      await prisma.moderationLog.create({
        data: {
          guildId: interaction.guildId!,
          action: 'BAN',
          reason,
          executorId: interaction.user.id,
          targetId: targetUser.id,
        },
      });

      // 3. Invalidate Guild Cache in Redis
      await redis.del(\`guild:\${interaction.guildId}:modlogs\`);

      return interaction.reply({
        content: \`✅ Successfully banned **\${targetUser.tag}** | Reason: \${reason}\`,
      });
    } catch (error) {
      console.error('Ban Execution Error:', error);
      return interaction.reply({ content: '⚠️ Failed to execute ban command.', ephemeral: true });
    }
  },
};`,
  },
  {
    id: 'api_route',
    name: 'route.ts',
    path: 'smcore-discord-bot/src/app/api/dashboard/stats/route.ts',
    language: 'TypeScript / Next.js 14',
    icon: '⚡',
    project: 'SMCore SaaS Dashboard API',
    description: 'Next.js 14 Serverless API route handling bot analytics metrics and real-time system stats.',
    code: `import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== \`Bearer \${process.env.API_SECRET_TOKEN}\`) {
      return NextResponse.json({ error: 'Unauthorized access payload' }, { status: 401 });
    }

    // Parallel aggregate queries
    const [totalUsers, totalGuilds, totalLogs] = await Promise.all([
      prisma.user.count(),
      prisma.guildConfig.count(),
      prisma.moderationLog.count(),
    ]);

    const systemMemory = process.memoryUsage();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      metrics: {
        totalUsers,
        totalGuilds,
        totalLogs,
        heapUsedMB: (systemMemory.heapUsed / 1024 / 1024).toFixed(2),
        uptimeSeconds: process.uptime(),
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Internal Server Metric Fetch Error', message: err.message },
      { status: 500 }
    );
  }
}`,
  },
  {
    id: 'os_context',
    name: 'OSContext.tsx',
    path: 'multiverse-portfolio/src/context/OSContext.tsx',
    language: 'TypeScript / React 19',
    icon: '⚛️',
    project: 'Multiverse CyberOS Portfolio',
    description: 'React 19 Custom OS Engine managing state persistence, interface universe switching, and audio SFX.',
    code: `import React, { createContext, useContext, useState, useEffect } from 'react';
import type { WindowId, SystemInterfaceMode, WindowState } from '../types/os';

interface OSContextType {
  interfaceMode: SystemInterfaceMode;
  setInterfaceMode: (mode: SystemInterfaceMode) => void;
  windows: WindowState[];
  activeWindowId: WindowId | null;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  rebootToLogin: () => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

export const OSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [interfaceMode, setInterfaceModeState] = useState<SystemInterfaceMode>(() => {
    return (localStorage.getItem('cyberos_interface_mode') as SystemInterfaceMode) || 'cyberos';
  });

  const setInterfaceMode = (mode: SystemInterfaceMode) => {
    setInterfaceModeState(mode);
    localStorage.setItem('cyberos_interface_mode', mode);
  };

  const rebootToLogin = () => {
    localStorage.removeItem('cyberos_logged_in');
    window.location.reload();
  };

  return (
    <OSContext.Provider value={{ interfaceMode, setInterfaceMode, rebootToLogin }}>
      {children}
    </OSContext.Provider>
  );
};`,
  },
];

// Presets for the Interactive Multi-Language Code Compiler Playground
const LANGUAGE_PRESETS: Record<string, { name: string; icon: string; ext: string; defaultCode: string }> = {
  python: {
    name: 'Python 3',
    icon: '🐍',
    ext: '.py',
    defaultCode: `# Python 3 Live Compiler Sandbox
def fibonacci(n):
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])
    return sequence

print(">>> Executing Python 3 Script...")
print("Developer: Santosh Maurya")
print("Fibonacci Sequence (First 10 numbers):")
print(fibonacci(10))

matrix = [[i * j for j in range(1, 5)] for i in range(1, 5)]
print("\\n4x4 Multiplication Matrix:")
for row in matrix:
    print(row)
`,
  },
  javascript: {
    name: 'JavaScript / Node.js',
    icon: '⚡',
    ext: '.js',
    defaultCode: `// JavaScript ES6+ Live Compiler Sandbox
const calculateMetrics = () => {
  const developer = "Santosh Maurya";
  const role = "Software Support Engineer & FullStack Developer";
  const skills = ["React 19", "Next.js 14", "Python", "TypeScript", "PostgreSQL", "Docker"];
  
  console.log(\`Developer: \${developer} (\${role})\`);
  console.log("Core Skill Stack:", skills.join(" | "));
  
  const numbers = [12, 45, 67, 89, 23, 99];
  const max = Math.max(...numbers);
  console.log(\`Max array value in [\${numbers.join(', ')}]: \${max}\`);
};

calculateMetrics();
`,
  },
  cpp: {
    name: 'C++ (GCC 14)',
    icon: '⚙️',
    ext: '.cpp',
    defaultCode: `// C++17 Live Execution Sandbox
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    cout << ">>> Compiling with g++ -O3 main.cpp -o main..." << endl;
    cout << "Target: x86_64-pc-linux-gnu" << endl;
    cout << "Author: Santosh Maurya" << endl << endl;

    vector<int> scores = {98, 85, 92, 100, 78};
    sort(scores.rbegin(), scores.rend());

    cout << "Top Ranked Scores (Descending): ";
    for (int score : scores) {
        cout << score << " ";
    }
    cout << endl;
    cout << "Process finished with exit code 0" << endl;

    return 0;
}
`,
  },
  java: {
    name: 'Java 21 (OpenJDK)',
    icon: '☕',
    ext: '.java',
    defaultCode: `// Java 21 LTS Execution Sandbox
import java.util.*;

public class Main {
    public static void main(String[] args) {
        System.out.println(">>> javac Main.java && java Main");
        System.out.println("JVM Architecture: OpenJDK 21 64-Bit Server VM");
        System.out.println("Developer: Santosh Maurya (B.E. IT 2025)");
        System.out.println("=========================================");

        Map<String, String> stack = new HashMap<>();
        stack.put("Frontend", "React 19 / TypeScript");
        stack.put("Backend", "Next.js 14 / Node.js");
        stack.put("Database", "PostgreSQL / Redis");

        for (Map.Entry<String, String> entry : stack.entrySet()) {
            System.out.println(" • " + entry.getKey() + ": " + entry.getValue());
        }
    }
}
`,
  },
  csharp: {
    name: 'C# (.NET 8.0)',
    icon: '🟦',
    ext: '.cs',
    defaultCode: `// C# .NET 8.0 Runtime Sandbox
using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        Console.WriteLine(">>> dotnet run --configuration Release");
        Console.WriteLine(".NET SDK Version: 8.0.204");
        Console.WriteLine("Developer: Santosh Maurya");
        Console.WriteLine("-----------------------------------------");

        var projects = new List<string> {
            "SMCore SaaS Bot Dashboard",
            "Multiverse CyberOS Portfolio",
            "Shreyaan Healthcare Platform"
        };

        Console.WriteLine("Active High-Performance Projects:");
        foreach (var p in projects) {
            Console.WriteLine($" [STATUS: ONLINE] {p}");
        }
    }
}
`,
  },
};

export const CodeLabApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'explorer' | 'playground'>('explorer');
  const [activeFileId, setActiveFileId] = useState<string>('schema');
  const [copied, setCopied] = useState<boolean>(false);

  // Playground States
  const [selectedLang, setSelectedLang] = useState<string>('python');
  const [editableCode, setEditableCode] = useState<string>(LANGUAGE_PRESETS.python.defaultCode);
  const [outputConsole, setOutputConsole] = useState<string>('Click [ ▶ RUN CODE ] to compile and execute snippet...');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [execTime, setExecTime] = useState<number | null>(null);

  const activeFile = SAMPLE_FILES.find((f) => f.id === activeFileId) || SAMPLE_FILES[0];

  const handleCopyCode = () => {
    const codeToCopy = activeTab === 'explorer' ? activeFile.code : editableCode;
    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLangChange = (langKey: string) => {
    setSelectedLang(langKey);
    setEditableCode(LANGUAGE_PRESETS[langKey].defaultCode);
    setOutputConsole(`Ready to run ${LANGUAGE_PRESETS[langKey].name} code.`);
    setExecTime(null);
  };

  // Run Code Execution Simulator & JS/Python Interpreter
  const handleRunCode = () => {
    setIsRunning(true);
    setOutputConsole('⏳ Compiling and initializing runtime environment...');
    const start = performance.now();

    setTimeout(() => {
      let resultStr = '';
      const elapsed = Math.round(performance.now() - start + Math.random() * 15 + 8);

      try {
        if (selectedLang === 'javascript') {
          const logs: string[] = [];
          const customConsole = {
            log: (...args: any[]) => logs.push(args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ')),
            error: (...args: any[]) => logs.push('[ERROR] ' + args.join(' ')),
            warn: (...args: any[]) => logs.push('[WARN] ' + args.join(' ')),
          };

          const runFn = new Function('console', editableCode);
          runFn(customConsole);
          resultStr = logs.length > 0 ? logs.join('\n') : 'Code executed with 0 console output messages.';
        } else if (selectedLang === 'python') {
          // Client Python Interpreter Simulation
          const lines = editableCode.split('\n');
          const outputLines: string[] = [];

          lines.forEach((line) => {
            const trimmed = line.trim();
            if (trimmed.startsWith('print(') && trimmed.endsWith(')')) {
              const content = trimmed.slice(6, -1).trim();
              if (content.startsWith('"') || content.startsWith("'") || content.startsWith('`')) {
                outputLines.push(content.slice(1, -1).replace(/\\n/g, '\n'));
              } else if (content === 'fibonacci(10)') {
                outputLines.push('[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]');
              } else if (content === 'row') {
                outputLines.push('[1, 2, 3, 4]\n[2, 4, 6, 8]\n[3, 6, 9, 12]\n[4, 8, 12, 16]');
              } else {
                outputLines.push(content);
              }
            }
          });

          resultStr = outputLines.length > 0 ? outputLines.join('\n') : '>>> Python 3 Execution Finished.\nSantosh Maurya Script Output Generated Successfully.';
        } else if (selectedLang === 'cpp') {
          resultStr = `[GCC 14.1.0 COMPILER OUTPUT]\n$ g++ -std=c++17 main.cpp -o main\n$ ./main\n\n>>> Compiling with g++ -O3 main.cpp -o main...\nTarget: x86_64-pc-linux-gnu\nAuthor: Santosh Maurya\n\nTop Ranked Scores (Descending): 100 98 92 85 78\nProcess finished with exit code 0`;
        } else if (selectedLang === 'java') {
          resultStr = `[OPENJDK 21 HOTSPOT VM OUTPUT]\n$ javac Main.java && java Main\n\n>>> JVM Architecture: OpenJDK 21 64-Bit Server VM\nDeveloper: Santosh Maurya (B.E. IT 2025)\n=========================================\n • Frontend: React 19 / TypeScript\n • Backend: Next.js 14 / Node.js\n • Database: PostgreSQL / Redis\n\n[BUILD SUCCESSFUL in ${elapsed}ms]`;
        } else if (selectedLang === 'csharp') {
          resultStr = `[.NET 8.0 RUNTIME OUTPUT]\n$ dotnet run --configuration Release\n\n.NET SDK Version: 8.0.204\nDeveloper: Santosh Maurya\n-----------------------------------------\nActive High-Performance Projects:\n [STATUS: ONLINE] SMCore SaaS Bot Dashboard\n [STATUS: ONLINE] Multiverse CyberOS Portfolio\n [STATUS: ONLINE] Shreyaan Healthcare Platform\n\nExited with code 0`;
        }
      } catch (err: any) {
        resultStr = `❌ COMPILATION / RUNTIME ERROR:\n${err.message || String(err)}`;
      }

      setOutputConsole(resultStr);
      setExecTime(elapsed);
      setIsRunning(false);
    }, 450);
  };

  return (
    <div className="h-full flex flex-col font-mono select-none bg-[#0e131f] text-slate-200 overflow-hidden">
      {/* VS-Code Top Navigation Header (Architecture Explorer vs Interactive Compiler Sandbox) */}
      <div className="px-4 py-2 bg-[#090d16] border-b border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-cyan-400" />
            <span className="font-orbitron font-bold text-white tracking-wider">VS-CODE LAB</span>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-black/60 rounded-lg p-0.5 border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab('explorer')}
              className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'explorer' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Architecture Vault
            </button>
            <button
              onClick={() => setActiveTab('playground')}
              className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'playground' ? 'bg-cyan-500 text-black font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Play className="w-3.5 h-3.5" /> Live Compiler Sandbox
            </button>
          </div>
        </div>

        <button
          onClick={handleCopyCode}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-xs font-semibold transition-all cursor-pointer shadow-md"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-cyan-400" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* VIEW 1: ARCHITECTURE EXPLORER VAULT */}
      {activeTab === 'explorer' && (
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar File Explorer Tree */}
          <div className="w-64 bg-[#0a0e17] border-r border-white/10 flex flex-col shrink-0 select-none overflow-y-auto">
            <div className="px-3 py-2 text-[11px] font-bold text-slate-400 tracking-wider uppercase border-b border-white/5 flex items-center gap-1.5">
              <FolderOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>EXPLORER</span>
            </div>

            <div className="p-2 space-y-3 text-xs">
              {/* Project 1: SMCore Bot */}
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-slate-300 font-bold px-1 text-[11px]">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <Folder className="w-3.5 h-3.5 text-indigo-400" />
                  <span>smcore-discord-bot</span>
                </div>
                <div className="pl-4 space-y-1">
                  {SAMPLE_FILES.slice(0, 3).map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setActiveFileId(f.id)}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-all cursor-pointer ${
                        activeFileId === f.id
                          ? 'bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold shadow-sm'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="text-xs">{f.icon}</span>
                      <span className="truncate">{f.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Project 2: Multiverse Portfolio */}
              <div className="space-y-1 pt-2 border-t border-white/5">
                <div className="flex items-center gap-1 text-slate-300 font-bold px-1 text-[11px]">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <Folder className="w-3.5 h-3.5 text-cyan-400" />
                  <span>multiverse-portfolio</span>
                </div>
                <div className="pl-4 space-y-1">
                  {SAMPLE_FILES.slice(3).map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setActiveFileId(f.id)}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-all cursor-pointer ${
                        activeFileId === f.id
                          ? 'bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold shadow-sm'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="text-xs">{f.icon}</span>
                      <span className="truncate">{f.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Code Editor Area */}
          <div className="flex-1 flex flex-col bg-[#080c14] overflow-hidden">
            {/* Active File Tab Bar */}
            <div className="flex items-center bg-[#0d121f] border-b border-white/10 px-2 overflow-x-auto text-xs shrink-0">
              {SAMPLE_FILES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFileId(f.id)}
                  className={`flex items-center gap-2 px-4 py-2 border-r border-white/10 text-xs transition-all cursor-pointer shrink-0 ${
                    activeFileId === f.id
                      ? 'bg-[#080c14] text-cyan-300 border-t-2 border-t-cyan-400 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <span>{f.icon}</span>
                  <span>{f.name}</span>
                </button>
              ))}
            </div>

            {/* Project & File Metadata Banner */}
            <div className="px-4 py-2.5 bg-cyan-950/30 border-b border-cyan-500/20 flex items-center justify-between text-xs shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-bold text-white">{activeFile.project}</span>
                <span className="text-[11px] text-slate-400">· {activeFile.description}</span>
              </div>
              <span className="text-[10px] text-cyan-400/80 font-tech truncate">{activeFile.path}</span>
            </div>

            {/* Code Viewer with Line Numbers */}
            <div className="flex-1 overflow-auto p-4 font-mono text-xs text-slate-200 leading-relaxed select-text bg-[#070a10]">
              <table className="w-full border-collapse">
                <tbody>
                  {activeFile.code.split('\n').map((line, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="w-10 text-right pr-4 text-slate-600 select-none text-[11px]">
                        {idx + 1}
                      </td>
                      <td className="whitespace-pre text-slate-200">
                        {line || ' '}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: INTERACTIVE MULTI-LANGUAGE CODE COMPILER SANDBOX */}
      {activeTab === 'playground' && (
        <div className="flex-1 flex flex-col overflow-hidden bg-[#070a10]">
          {/* Compiler Language Bar & Run Button */}
          <div className="px-4 py-2.5 bg-[#0a0e17] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">SELECT LANGUAGE:</span>
              {Object.keys(LANGUAGE_PRESETS).map((langKey) => {
                const p = LANGUAGE_PRESETS[langKey];
                const isSel = selectedLang === langKey;

                return (
                  <button
                    key={langKey}
                    onClick={() => handleLangChange(langKey)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                      isSel
                        ? 'bg-cyan-950 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                        : 'bg-black/40 border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{p.icon}</span>
                    <span>{p.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleLangChange(selectedLang)}
                className="p-2 rounded-lg bg-black/50 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Reset Code Preset"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-orbitron font-extrabold text-xs tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.7)] hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>{isRunning ? 'EXECUTING...' : '▶ RUN CODE'}</span>
              </button>
            </div>
          </div>

          {/* Code Playground Editor & Output Console (Split View) */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Left Editable Code Editor */}
            <div className="flex-1 flex flex-col border-r border-white/10 overflow-hidden bg-[#05080f]">
              <div className="px-3 py-1.5 bg-[#090d16] border-b border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-tech">
                <span>EDITABLE CODE EDITOR ({LANGUAGE_PRESETS[selectedLang].ext})</span>
                <span className="text-cyan-400">INPUT SOURCE</span>
              </div>
              <textarea
                value={editableCode}
                onChange={(e) => setEditableCode(e.target.value)}
                spellCheck={false}
                className="flex-1 w-full p-4 bg-transparent text-xs font-mono text-cyan-200 focus:outline-none resize-none leading-relaxed select-text font-tech"
              />
            </div>

            {/* Right Output Terminal Console */}
            <div className="w-full md:w-1/2 flex flex-col bg-black overflow-hidden border-t md:border-t-0 border-white/10">
              <div className="px-3 py-1.5 bg-[#090d16] border-b border-white/10 flex items-center justify-between text-[11px] font-tech text-slate-300">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <TerminalIcon className="w-3.5 h-3.5" /> OUTPUT CONSOLE (STDOUT)
                </span>
                {execTime !== null && (
                  <span className="text-emerald-400 text-[10px] font-bold px-2 py-0.5 bg-emerald-950 rounded border border-emerald-500/40">
                    EXECTIME: {execTime}ms
                  </span>
                )}
              </div>
              <pre className="flex-1 p-4 text-xs font-mono text-emerald-400 overflow-auto whitespace-pre-wrap leading-relaxed select-text font-tech bg-black/90">
                {outputConsole}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* VS-Code Footer Status Bar */}
      <div className="px-3 py-1 bg-[#090d16] border-t border-white/10 flex items-center justify-between text-[10px] font-tech text-slate-400 shrink-0">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-cyan-400">
            <Cpu className="w-3 h-3" /> MULTI-LANG EXECUTION SANDBOX
          </span>
          <span>{LANGUAGE_PRESETS[selectedLang].name}</span>
          <span>UTF-8</span>
        </div>
        <div className="flex items-center gap-3 text-slate-500">
          <span className="text-emerald-400">Compiler Engine Active</span>
        </div>
      </div>
    </div>
  );
};
