export type WindowId = 
  | 'about' 
  | 'terminal' 
  | 'projects' 
  | 'skills' 
  | 'music' 
  | 'contact' 
  | 'game' 
  | 'settings';

export type OSTheme = 'cyberpunk' | 'synthwave' | 'matrix' | 'solar';

export type SystemInterfaceMode = 
  | 'cyberos' 
  | 'quantum_matrix' 
  | 'stark_hud' 
  | 'interstellar_bridge' 
  | 'matrix_rain' 
  | 'synthwave_arcade'
  | 'windows_12_pro';

export interface WindowState {
  id: WindowId;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  minSize?: { width: number; height: number };
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'FullStack' | 'AI / Bot' | 'Frontend' | 'Mobile';
  tags: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  highlights: string[];
}

export interface SkillCategory {
  name: string;
  skills: { name: string; level: number; iconName?: string; experience?: string }[];
}
