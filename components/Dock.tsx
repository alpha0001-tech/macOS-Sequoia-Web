import React from 'react';
import { motion, useMotionValue, useTransform, useSpring, MotionValue } from 'framer-motion';
import { APPS } from '../constants';
import { AppID, AppConfig } from '../types';

interface DockProps {
  onOpenApp: (id: AppID) => void;
  openApps: AppID[];
}

const Dock: React.FC<DockProps> = ({ onOpenApp, openApps }) => {
  const mouseX = useMotionValue<number | null>(null);

  return (
    <div className="absolute bottom-4 left-0 w-full flex justify-center z-50 pointer-events-none">
      <div 
        className="flex items-end gap-2 px-3 py-2 bg-white/20 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl pointer-events-auto mx-4"
        onMouseLeave={() => mouseX.set(null)}
      >
        {APPS.map((app) => (
          <DockItem 
            key={app.id}
            mouseX={mouseX}
            app={app}
            isOpen={openApps.includes(app.id)}
            onClick={() => onOpenApp(app.id)}
          />
        ))}
      </div>
    </div>
  );
};

interface DockItemProps {
  mouseX: MotionValue<number | null>;
  app: AppConfig;
  isOpen: boolean;
  onClick: () => void;
}

const DockItem: React.FC<DockItemProps> = ({ mouseX, app, isOpen, onClick }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    // If mouse is not hovering (val is null), treat as far away
    const xVal = val ?? -10000;
    return xVal - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [45, 80, 45]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      className="relative flex flex-col items-center justify-center cursor-pointer group mb-1"
      onClick={onClick}
      onMouseMove={(e) => mouseX.set(e.pageX)}
    >
        {/* Tooltip */}
        <div className="absolute -top-12 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {app.name}
        </div>

        {/* Icon Container */}
        <div className="w-full h-full bg-white rounded-xl shadow-lg flex items-center justify-center overflow-hidden hover:brightness-110 transition-all border border-black/5">
            {app.icon}
        </div>

        {/* Active Dot indicator */}
        <div className={`absolute -bottom-2 w-1 h-1 bg-black/60 rounded-full transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
    </motion.div>
  );
};

export default Dock;