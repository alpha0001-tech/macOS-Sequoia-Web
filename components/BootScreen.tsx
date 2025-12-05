import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BootScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100);
    }, 100); // Start animation quickly
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 text-white">
      <div className="text-8xl mb-12 select-none"></div>
      <div className="w-52 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-white rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default BootScreen;