import React, { useState, useEffect } from 'react';
import { SystemState, WindowState, AppID } from './types';
import { APPS } from './constants';
import BootScreen from './components/BootScreen';
import LoginScreen from './components/LoginScreen';
import Desktop from './components/Desktop';

export default function App() {
  const [systemState, setSystemState] = useState<SystemState>(SystemState.BOOT);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [zIndexCounter, setZIndexCounter] = useState(100);

  // Boot Sequence
  useEffect(() => {
    if (systemState === SystemState.BOOT) {
      const timer = setTimeout(() => {
        setSystemState(SystemState.LOGIN);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [systemState]);

  const handleLogin = () => {
    setSystemState(SystemState.DESKTOP);
  };

  const openApp = (appId: AppID) => {
    const appConfig = APPS.find(a => a.id === appId);
    if (!appConfig) return;
    
    // Check if already open
    const existingWindow = windows.find(w => w.appId === appId);
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        setWindows(prev => prev.map(w => w.id === existingWindow.id ? { ...w, isMinimized: false } : w));
      }
      focusWindow(existingWindow.id);
      return;
    }

    const newWindow: WindowState = {
      id: `win-${Date.now()}`,
      appId,
      title: appConfig.name,
      x: 100 + (windows.length * 30),
      y: 100 + (windows.length * 30),
      width: appConfig.width || 600,
      height: appConfig.height || 400,
      zIndex: zIndexCounter + 1,
      isMinimized: false,
      isMaximized: false
    };

    setZIndexCounter(prev => prev + 1);
    setWindows(prev => [...prev, newWindow]);
    setActiveWindowId(newWindow.id);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    setActiveWindowId(null);
  };

  const maximizeWindow = (id: string) => {
     setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  };

  const focusWindow = (id: string) => {
    setZIndexCounter(prev => prev + 1);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: zIndexCounter + 1 } : w));
    setActiveWindowId(id);
  };

  const updateWindowPos = (id: string, x: number, y: number) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, x, y } : w));
  };

  return (
    <>
      {systemState === SystemState.BOOT && <BootScreen />}
      
      {systemState === SystemState.LOGIN && (
        <LoginScreen onLogin={handleLogin} />
      )}

      {systemState === SystemState.DESKTOP && (
        <Desktop 
          windows={windows}
          activeWindowId={activeWindowId}
          onOpenApp={openApp}
          onCloseWindow={closeWindow}
          onMinimizeWindow={minimizeWindow}
          onMaximizeWindow={maximizeWindow}
          onFocusWindow={focusWindow}
          onUpdateWindowPos={updateWindowPos}
        />
      )}
    </>
  );
}