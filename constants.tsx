import { AppConfig, AppID } from './types';
import { Terminal, Calculator, Globe, MessageSquare, StickyNote, Settings, Trash2, FolderOpen } from 'lucide-react';
import React from 'react';

export const WALLPAPER_URL = "https://4kwallpapers.com/images/wallpapers/macos-sequoia-light-3840x2160-17482.jpg";
export const WALLPAPER_GRADIENT = "radial-gradient(circle at 10% 20%, rgb(255, 197, 61) 0%, rgb(255, 94, 77) 20%, rgb(162, 59, 114) 40%, rgb(45, 52, 54) 80%)";

export const APPS: AppConfig[] = [
  { 
    id: AppID.FINDER, 
    name: 'Finder', 
    icon: <div className="text-blue-500 text-3xl">😊</div>, 
    width: 600, 
    height: 400 
  },
  { 
    id: AppID.SAFARI, 
    name: 'Safari', 
    icon: <div className="text-3xl">🧭</div>, 
    width: 800, 
    height: 600 
  },
  { 
    id: AppID.MESSAGES, 
    name: 'Messages', 
    icon: <div className="text-green-500 text-3xl">💬</div>, 
    width: 700, 
    height: 500 
  },
  { 
    id: AppID.NOTES, 
    name: 'Notes', 
    icon: <div className="text-yellow-400 text-3xl">📝</div>, 
    width: 800, 
    height: 500 
  },
  { 
    id: AppID.TERMINAL, 
    name: 'Terminal', 
    icon: <div className="text-gray-800 text-3xl">💻</div>, 
    width: 600, 
    height: 400,
    bgColor: '#1e1e1e'
  },
  { 
    id: AppID.CALCULATOR, 
    name: 'Calculator', 
    icon: <div className="text-orange-500 text-3xl">🧮</div>, 
    width: 240, 
    height: 320,
    bgColor: '#2c2c2e'
  },
  { 
    id: AppID.SETTINGS, 
    name: 'Settings', 
    icon: <div className="text-gray-500 text-3xl">⚙️</div>, 
    width: 600, 
    height: 400 
  },
  { 
    id: AppID.TRASH, 
    name: 'Trash', 
    icon: <div className="text-gray-400 text-3xl">🗑️</div> 
  },
];
