import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WALLPAPER_GRADIENT, WALLPAPER_URL } from '../constants';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [isExiting, setIsExiting] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      triggerLogin();
    }
  };

  const triggerLogin = () => {
    setIsExiting(true);
    setTimeout(onLogin, 500);
  };

  return (
    <motion.div 
      className="fixed inset-0 z-40 flex flex-col items-center justify-center text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      style={{
        background: `url(${WALLPAPER_URL}) no-repeat center center fixed`,
        backgroundSize: 'cover',
      }}
    >
        {/* Overlay for blur effect */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-xl z-0" />

        <div className="z-10 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gray-300 mb-6 overflow-hidden shadow-2xl">
                <img src="https://ui-avatars.com/api/?name=User&background=random&size=128" alt="User" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl font-semibold mb-6 shadow-black drop-shadow-md">Guest User</h2>
            
            <div className="relative group">
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter Password"
                    className="bg-white/20 border border-white/30 rounded-full px-4 py-1.5 text-center text-sm outline-none placeholder-white/60 focus:bg-white/30 transition-all w-48 backdrop-blur-md shadow-lg"
                    autoFocus
                />
                 <button 
                    onClick={triggerLogin}
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-white/80 hover:text-white"
                >
                    ➔
                </button>
            </div>
            <p className="text-[10px] mt-8 opacity-60 font-medium">Click or Enter to unlock</p>
        </div>
    </motion.div>
  );
};

export default LoginScreen;