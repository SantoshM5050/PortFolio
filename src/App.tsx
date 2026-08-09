import React from 'react';
import { OSProvider, useOS } from './context/OSContext';
import { LoginPortalScreen } from './components/os/LoginPortalScreen';
import { BootScreen } from './components/os/BootScreen';
import { Desktop } from './components/os/Desktop';
import { Taskbar } from './components/os/Taskbar';

import { QuantumMatrixMode } from './components/modes/QuantumMatrixMode';
import { StarkHUDMode } from './components/modes/StarkHUDMode';
import { InterstellarBridgeMode } from './components/modes/InterstellarBridgeMode';
import { MatrixRainMode } from './components/modes/MatrixRainMode';
import { SynthwaveArcadeMode } from './components/modes/SynthwaveArcadeMode';
import { Windows11ProMode } from './components/modes/Windows11ProMode';

const CyberOS: React.FC = () => {
  const { booting, isLoggedIn, theme, interfaceMode } = useOS();

  const renderInterfaceMode = () => {
    switch (interfaceMode) {
      case 'windows_12_pro':
      case 'windows_11_pro' as unknown:
        return <Windows11ProMode />;
      case 'quantum_matrix':
        return <QuantumMatrixMode />;
      case 'stark_hud':
        return <StarkHUDMode />;
      case 'interstellar_bridge':
        return <InterstellarBridgeMode />;
      case 'matrix_rain':
        return <MatrixRainMode />;
      case 'synthwave_arcade':
        return <SynthwaveArcadeMode />;
      case 'cyberos':
        return <Desktop />;
      default:
        return <Windows11ProMode />;
    }
  };

  return (
    <div className={`min-h-screen bg-black overflow-hidden font-inter text-white theme-${theme}`}>
      {/* CRT Scanline Overlay */}
      <div className="pointer-events-none fixed inset-0 z-[100] opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
      
      {/* Vignette Overlay */}
      <div className="pointer-events-none fixed inset-0 z-[90] shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />

      {/* Screen 1: Login Portal (Gateway & OS Selector) */}
      {!isLoggedIn && !booting && <LoginPortalScreen />}

      {/* Screen 2: System Boot Diagnostics */}
      {booting && <BootScreen />}

      {/* Screen 3: Fullscreen Interface View */}
      {isLoggedIn && !booting && (
        <div className="relative h-screen flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
          {/* Fullscreen Interface Render (7 Multiverse OS Modes) */}
          <div className="relative flex-1 w-full min-h-0 overflow-hidden">
            {renderInterfaceMode()}
          </div>

          {/* System Taskbar (Only for CyberOS Web Desktop mode) */}
          {interfaceMode === 'cyberos' && <Taskbar />}
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <OSProvider>
      <CyberOS />
    </OSProvider>
  );
}

export default App;
