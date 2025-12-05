import React, { useState } from 'react';
import { Wifi, Bluetooth, Globe, Bell, ScreenShare, Moon } from 'lucide-react';

const SettingsApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('General');

  const tabs = [
    { name: 'Wi-Fi', icon: <Wifi size={16} className="text-blue-500" /> },
    { name: 'Bluetooth', icon: <Bluetooth size={16} className="text-blue-500" /> },
    { name: 'Network', icon: <Globe size={16} className="text-blue-500" /> },
    { name: 'Notifications', icon: <Bell size={16} className="text-red-500" /> },
    { name: 'Screen Time', icon: <ScreenShare size={16} className="text-indigo-500" /> },
    { name: 'General', icon: <div className="w-4 h-4 bg-gray-400 rounded-sm flex items-center justify-center text-[10px] text-white">⚙️</div> },
    { name: 'Appearance', icon: <Moon size={16} className="text-blue-400" /> },
  ];

  return (
    <div className="flex h-full bg-[#f5f5f7] text-[13px]">
      {/* Sidebar */}
      <div className="w-56 flex flex-col pt-4 pb-4 px-2 overflow-y-auto border-r border-gray-200">
         
         {/* User Card */}
         <div className="flex items-center gap-3 px-2 mb-4 hover:bg-black/5 rounded-lg py-2 cursor-default transition-colors">
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=User&background=random" className="w-full h-full" alt="User" />
            </div>
            <div className="flex flex-col">
                <span className="font-semibold text-black">Guest User</span>
                <span className="text-gray-500 text-xs">Apple ID</span>
            </div>
         </div>

         {/* Menu Items */}
         <div className="space-y-0.5">
            {tabs.map(tab => (
                <div 
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`flex items-center gap-3 px-3 py-1.5 rounded-lg cursor-default ${activeTab === tab.name ? 'bg-blue-500 text-white' : 'hover:bg-black/5 text-gray-700'}`}
                >
                    {/* Icon wrapper to ensure consistent color handling if needed */}
                    <div className={`${activeTab === tab.name ? 'brightness-200 grayscale' : ''}`}>{tab.icon}</div>
                    <span className="font-medium">{tab.name}</span>
                </div>
            ))}
         </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
         <h1 className="text-xl font-bold mb-6">{activeTab}</h1>
         
         <div className="bg-white rounded-lg border border-gray-200/60 shadow-sm p-4 space-y-4">
             {activeTab === 'Wi-Fi' && (
                 <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="font-medium">Wi-Fi</span>
                        <span className="text-gray-500 text-xs">Connect to the internet</span>
                    </div>
                    <div className="w-10 h-6 bg-blue-500 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" /></div>
                 </div>
             )}

             {activeTab === 'Appearance' && (
                 <div className="grid grid-cols-3 gap-4">
                     <div className="flex flex-col items-center gap-2 cursor-pointer">
                        <div className="w-full aspect-video bg-[#f0f0f0] rounded-md border border-gray-200 flex items-center justify-center"><div className="w-1/2 h-1/2 bg-white shadow-sm rounded"></div></div>
                        <span className="text-xs font-medium">Light</span>
                     </div>
                     <div className="flex flex-col items-center gap-2 cursor-pointer">
                        <div className="w-full aspect-video bg-[#333] rounded-md border border-gray-600 flex items-center justify-center"><div className="w-1/2 h-1/2 bg-[#555] shadow-sm rounded"></div></div>
                        <span className="text-xs font-medium">Dark</span>
                     </div>
                     <div className="flex flex-col items-center gap-2 cursor-pointer">
                        <div className="w-full aspect-video bg-gradient-to-r from-[#f0f0f0] to-[#333] rounded-md border border-gray-400 flex items-center justify-center"><div className="w-1/2 h-1/2 bg-gradient-to-r from-white to-[#555] shadow-sm rounded"></div></div>
                        <span className="text-xs font-medium">Auto</span>
                     </div>
                 </div>
             )}
             
             {/* Generic content for others */}
             {!['Wi-Fi', 'Appearance'].includes(activeTab) && (
                 <div className="flex flex-col gap-4">
                     <div className="flex items-center justify-between py-1 border-b border-gray-100 pb-4">
                        <span className="font-medium">Option 1</span>
                        <div className="w-10 h-6 bg-gray-200 rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" /></div>
                     </div>
                     <div className="flex items-center justify-between py-1">
                        <span className="font-medium">Option 2</span>
                        <span className="text-gray-400">Default</span>
                     </div>
                 </div>
             )}
         </div>
      </div>
    </div>
  );
};

export default SettingsApp;