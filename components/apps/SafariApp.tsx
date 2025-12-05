import React from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Shield, Share } from 'lucide-react';

const SafariApp: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Safari Toolbar */}
      <div className="h-12 bg-gray-100 flex items-center px-4 gap-4 border-b border-gray-300">
        <div className="flex gap-4 text-gray-500">
           <ArrowLeft size={18} className="cursor-pointer hover:text-black" />
           <ArrowRight size={18} className="cursor-pointer hover:text-black" />
        </div>
        
        <div className="flex-1 max-w-2xl mx-auto bg-white border border-gray-300 rounded-lg h-8 flex items-center px-3 gap-2 text-xs shadow-sm hover:shadow-md transition-shadow">
            <Shield size={12} className="text-gray-400" />
            <input type="text" value="apple.com" readOnly className="flex-1 outline-none text-center bg-transparent" />
            <RotateCw size={12} className="text-gray-400 hover:text-black cursor-pointer" />
        </div>
        
        <div className="flex gap-4 text-gray-500">
            <Share size={16} className="cursor-pointer hover:text-black" />
            <div className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-200">
                <span className="text-[10px]">+</span>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white flex flex-col items-center justify-center text-center p-10 overflow-auto">
        <div className="animate-pulse">
            <h1 className="text-5xl font-bold mb-4 tracking-tight">iPhone 16 Pro</h1>
            <p className="text-2xl text-gray-500 mb-8">Hello, Apple Intelligence.</p>
            
            <div className="flex gap-4 justify-center">
                <button className="bg-[#0071e3] text-white px-5 py-2 rounded-full text-sm hover:bg-[#0077ed]">Learn more</button>
                <button className="text-[#0066cc] border border-[#0066cc] px-5 py-2 rounded-full text-sm hover:bg-[#0071e3] hover:text-white">Buy</button>
            </div>
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
            {[1,2,3].map(i => (
                <div key={i} className="h-64 bg-gray-50 rounded-2xl flex flex-col p-6 items-center justify-between">
                    <div className="w-full h-32 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="text-left w-full">
                        <h3 className="font-semibold">Card Title {i}</h3>
                        <p className="text-xs text-gray-500">Description text goes here.</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SafariApp;