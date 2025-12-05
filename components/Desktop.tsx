import React from 'react';
import { WALLPAPER_GRADIENT, WALLPAPER_URL } from '../constants';
import MenuBar from './MenuBar';
import Dock from './Dock';
import WindowFrame from './WindowFrame';
import { WindowState, AppID } from '../types';
import TerminalApp from './apps/TerminalApp';
import CalculatorApp from './apps/CalculatorApp';
import SafariApp from './apps/SafariApp';
import FinderApp from './apps/FinderApp';
import MessagesApp from './apps/MessagesApp';
import NotesApp from './apps/NotesApp';
import SettingsApp from './apps/SettingsApp';

interface DesktopProps {
  windows: WindowState[];
  activeWindowId: string | null;
  onOpenApp: (id: AppID) => void;
  onCloseWindow: (id: string) => void;
  onMinimizeWindow: (id: string) => void;
  onMaximizeWindow: (id: string) => void;
  onFocusWindow: (id: string) => void;
  onUpdateWindowPos: (id: string, x: number, y: number) => void;
}

const Desktop: React.FC<DesktopProps> = ({
  windows,
  activeWindowId,
  onOpenApp,
  onCloseWindow,
  onMinimizeWindow,
  onMaximizeWindow,
  onFocusWindow,
  onUpdateWindowPos
}) => {
  
  // Determine active app name for menu bar
  const activeWindow = windows.find(w => w.id === activeWindowId);
  const activeAppName = activeWindow ? activeWindow.title : 'Finder';

  const renderAppContent = (appId: AppID) => {
    switch (appId) {
      case AppID.FINDER: return <FinderApp />;
      case AppID.TERMINAL: return <TerminalApp />;
      case AppID.CALCULATOR: return <CalculatorApp />;
      case AppID.SAFARI: return <SafariApp />;
      case AppID.MESSAGES: return <MessagesApp />;
      case AppID.NOTES: return <NotesApp />;
      case AppID.SETTINGS: return <SettingsApp />;
      case AppID.TRASH: return <FinderApp initialPath="Trash" />;
      default: return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 bg-white">
          <div className="text-4xl mb-2">🚧</div>
          <p>Work in Progress</p>
        </div>
      );
    }
  };

  return (
    <div 
      className="w-full h-full relative overflow-hidden bg-black"
      style={{
        backgroundImage: `url('${WALLPAPER_URL}'), ${WALLPAPER_GRADIENT}`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'hard-light'
      }}
    >
      <MenuBar activeAppName={activeAppName} />
      
      {/* Desktop Icons */}
      <div className="absolute top-12 right-6 flex flex-col items-end gap-6 text-white drop-shadow-md">
         <div className="group flex flex-col items-center gap-1 cursor-pointer w-20">
            <div className="w-16 h-16 bg-blue-300/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20 group-hover:bg-blue-400/30 transition-colors">
                <span className="text-4xl">📁</span>
            </div>
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-transparent group-hover:bg-blue-600/80 transition-colors">Documents</span>
         </div>
         <div className="group flex flex-col items-center gap-1 cursor-pointer w-20">
             <div className="w-16 h-16 bg-blue-300/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20 group-hover:bg-blue-400/30 transition-colors">
                <span className="text-4xl">🖼️</span>
            </div>
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-transparent group-hover:bg-blue-600/80 transition-colors">Screenshots</span>
         </div>
      </div>

      {/* Windows Layer */}
      <div className="absolute inset-0 top-[30px] bottom-[80px] pointer-events-none">
        {windows.map((win) => (
          !win.isMinimized && (
            <WindowFrame
              key={win.id}
              windowState={win}
              isActive={win.id === activeWindowId}
              onClose={() => onCloseWindow(win.id)}
              onMinimize={() => onMinimizeWindow(win.id)}
              onMaximize={() => onMaximizeWindow(win.id)}
              onFocus={() => onFocusWindow(win.id)}
              onMove={(x, y) => onUpdateWindowPos(win.id, x, y)}
            >
              {renderAppContent(win.appId)}
            </WindowFrame>
          )
        ))}
      </div>

      <Dock 
        openApps={windows.map(w => w.appId)} 
        onOpenApp={onOpenApp} 
      />
    </div>
  );
};

export default Desktop;