import React from 'react';
import { motion, useDragControls } from 'framer-motion';
import { WindowState } from '../types';

interface WindowFrameProps {
  windowState: WindowState;
  isActive: boolean;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onMove: (x: number, y: number) => void;
}

const WindowFrame: React.FC<WindowFrameProps> = ({
  windowState,
  isActive,
  children,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove
}) => {
  const dragControls = useDragControls();

  const handleDragEnd = (event: any, info: any) => {
     onMove(windowState.x + info.offset.x, windowState.y + info.offset.y);
  };

  const isMaximized = windowState.isMaximized;

  return (
    <motion.div
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false} // Only drag from title bar
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        width: isMaximized ? '100%' : windowState.width,
        height: isMaximized ? '100%' : windowState.height,
        x: isMaximized ? 0 : windowState.x,
        y: isMaximized ? 0 : windowState.y,
        borderRadius: isMaximized ? 0 : 12
      }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`absolute flex flex-col bg-white/80 backdrop-blur-xl shadow-2xl overflow-hidden border border-white/40 pointer-events-auto`}
      style={{ 
        zIndex: windowState.zIndex,
        boxShadow: isActive ? '0 20px 50px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.1)'
      }}
      onPointerDown={onFocus}
    >
      {/* Title Bar */}
      <div 
        className="h-9 flex items-center px-4 bg-gradient-to-b from-white/50 to-white/20 border-b border-black/5 cursor-default shrink-0"
        onPointerDown={(e) => {
            onFocus();
            if (!isMaximized) dragControls.start(e);
        }}
        onDoubleClick={onMaximize}
      >
        <div className="flex gap-2 group">
            <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10 flex items-center justify-center text-[8px] text-black/50 opacity-100 hover:text-black hover:opacity-100 group-hover:content-['x']">
                <span className="opacity-0 hover:opacity-100">✕</span>
            </button>
            <button onClick={(e) => { e.stopPropagation(); onMinimize(); }} className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10 flex items-center justify-center text-[8px] text-black/50 opacity-100 hover:text-black">
                <span className="opacity-0 hover:opacity-100">−</span>
            </button>
            <button onClick={(e) => { e.stopPropagation(); onMaximize(); }} className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10 flex items-center justify-center text-[6px] text-black/50 opacity-100 hover:text-black">
                <span className="opacity-0 hover:opacity-100">↗</span>
            </button>
        </div>
        <div className="flex-1 text-center text-xs font-semibold text-black/70 ml-[-50px] pointer-events-none">
            {windowState.title}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
};

export default WindowFrame;