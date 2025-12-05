import React from 'react';
import { LucideIcon } from 'lucide-react';

export enum AppID {
  FINDER = 'finder',
  SAFARI = 'safari',
  MESSAGES = 'messages',
  NOTES = 'notes',
  TERMINAL = 'terminal',
  CALCULATOR = 'calculator',
  SETTINGS = 'settings',
  TRASH = 'trash'
}

export enum SystemState {
  BOOT = 'BOOT',
  LOGIN = 'LOGIN',
  DESKTOP = 'DESKTOP'
}

export interface AppConfig {
  id: AppID;
  name: string;
  icon: React.ReactNode; // Using emojis or Lucide components
  component?: React.FC<any>;
  width?: number;
  height?: number;
  bgColor?: string;
}

export interface WindowState {
  id: string;
  appId: AppID;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
}