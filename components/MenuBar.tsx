import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Search, Control } from 'lucide-react';

interface MenuBarProps {
  activeAppName: string;
}

const MenuBar: React.FC<MenuBarProps> = ({ activeAppName }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options).replace(/,/g, '');
  };

  return (
    <div className="h-[30px] w-full bg-white/30 backdrop-blur-2xl absolute top-0 left-0 z-50 flex items-center justify-between px-4 text-sm font-medium text-black select-none shadow-sm">
      <div className="flex items-center gap-4">
        <span className="text-lg hover:opacity-50 cursor-default"></span>
        <span className="font-bold cursor-default">{activeAppName}</span>
        <span className="hidden md:block opacity-80 hover:opacity-100 cursor-default">File</span>
        <span className="hidden md:block opacity-80 hover:opacity-100 cursor-default">Edit</span>
        <span className="hidden md:block opacity-80 hover:opacity-100 cursor-default">View</span>
        <span className="hidden md:block opacity-80 hover:opacity-100 cursor-default">Go</span>
        <span className="hidden md:block opacity-80 hover:opacity-100 cursor-default">Window</span>
        <span className="hidden md:block opacity-80 hover:opacity-100 cursor-default">Help</span>
      </div>

      <div className="flex items-center gap-4">
        <Battery size={18} className="opacity-80" />
        <Wifi size={16} className="opacity-80" />
        <Search size={16} className="opacity-80" />
        <div className="cursor-default">{formatTime(time)}</div>
      </div>
    </div>
  );
};

export default MenuBar;