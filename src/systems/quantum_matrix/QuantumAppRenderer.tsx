import React from 'react';
import type { WindowId } from '../../types/os';
import { AboutApp } from '../../components/apps/AboutApp';
import { TerminalApp } from '../../components/apps/TerminalApp';
import { ProjectsApp } from '../../components/apps/ProjectsApp';
import { SkillsApp } from '../../components/apps/SkillsApp';
import { MusicApp } from '../../components/apps/MusicApp';
import { ContactApp } from '../../components/apps/ContactApp';
import { GameApp } from '../../components/apps/GameApp';
import { BrowserApp } from '../../components/apps/BrowserApp';
import { CodeLabApp } from '../../components/apps/CodeLabApp';

interface Props {
  windowId: WindowId;
}

export const QuantumAppRenderer: React.FC<Props> = ({ windowId }) => {
  return (
    <div className="quantum-universe-container text-cyan-300 font-mono h-full flex flex-col">
      {windowId === 'about' && <AboutApp />}
      {windowId === 'terminal' && <TerminalApp />}
      {windowId === 'projects' && <ProjectsApp />}
      {windowId === 'skills' && <SkillsApp />}
      {windowId === 'music' && <MusicApp />}
      {windowId === 'contact' && <ContactApp />}
      {windowId === 'game' && <GameApp />}
      {windowId === 'browser' && <BrowserApp />}
      {windowId === 'code_lab' && <CodeLabApp />}
    </div>
  );
};
