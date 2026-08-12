import React, { useState } from 'react';
import { Code, FileCode, Check, Copy, ChevronRight, Folder, FolderOpen, Sparkles } from 'lucide-react';

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
    <OSContext.Provider value={{ interfaceMode, setInterfaceMode, rebootToLogin, ... }}>
      {children}
    </OSContext.Provider>
  );
};`,
  },
];

export const CodeLabApp: React.FC = () => {
  const [activeFileId, setActiveFileId] = useState<string>('schema');
  const [copied, setCopied] = useState<boolean>(false);

  const activeFile = SAMPLE_FILES.find((f) => f.id === activeFileId) || SAMPLE_FILES[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col font-mono select-none bg-[#0e131f] text-slate-200 overflow-hidden">
      {/* VS-Code Top Command Header */}
      <div className="px-4 py-2 bg-[#090d16] border-b border-white/10 flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-cyan-400" />
          <span className="font-orbitron font-bold text-white tracking-wider">VS-CODE LAB // ARCHITECTURE EXPLORER</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
            {activeFile.language}
          </span>
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
              <span>Copy Snippet</span>
            </>
          )}
        </button>
      </div>

      {/* Main Studio Body (Sidebar + Code Viewport) */}
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

      {/* VS-Code Footer Status Bar */}
      <div className="px-3 py-1 bg-[#090d16] border-t border-white/10 flex items-center justify-between text-[10px] font-tech text-slate-400 shrink-0">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-cyan-400">
            <FileCode className="w-3 h-3" /> TypeScript 5.7 / React 19
          </span>
          <span>UTF-8</span>
          <span>LF</span>
        </div>
        <div className="flex items-center gap-3 text-slate-500">
          <span>LN: {activeFile.code.split('\n').length}</span>
          <span className="text-emerald-400">Ready</span>
        </div>
      </div>
    </div>
  );
};
