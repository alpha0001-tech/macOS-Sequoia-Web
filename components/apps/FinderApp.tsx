import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, LayoutGrid, List } from 'lucide-react';

interface FinderAppProps {
  initialPath?: string;
}

const FinderApp: React.FC<FinderAppProps> = ({ initialPath = 'Recents' }) => {
  const [activeItem, setActiveItem] = useState(initialPath);

  const sidebarItems = [
    { name: 'AirDrop', icon: <div className="text-blue-500">📡</div> },
    { name: 'Recents', icon: <div className="text-blue-500">🕒</div> },
    { name: 'Applications', icon: <div className="text-blue-500">🛠️</div> },
    { name: 'Desktop', icon: <div className="text-blue-500">🖥️</div> },
    { name: 'Documents', icon: <div className="text-blue-500">📄</div> },
    { name: 'Downloads', icon: <div className="text-blue-500">⬇️</div> },
  ];

  const contentMap: Record<string, any[]> = {
    'Recents': [
        { name: 'Project_Specs.pdf', type: 'pdf' },
        { name: 'Meeting_Notes.txt', type: 'txt' },
        { name: 'Screenshot_2024.png', type: 'img' },
    ],
    'Applications': [
        { name: 'Safari', type: 'app' },
        { name: 'Messages', type: 'app' },
        { name: 'Calculator', type: 'app' },
    ],
    'Desktop': [
        { name: 'Work', type: 'folder' },
        { name: 'Personal', type: 'folder' },
    ],
    'Documents': [
        { name: 'Resume.docx', type: 'doc' },
        { name: 'Budget.xlsx', type: 'sheet' },
    ],
    'Downloads': [
        { name: 'installer_v2.dmg', type: 'installer' },
    ],
    'Trash': [
        { name: 'old_photo.jpg', type: 'img' }
    ]
  };

  const currentContent = contentMap[activeItem] || [];

  return (
    <div className="flex h-full bg-white text-sm font-medium">
      {/* Sidebar */}
      <div className="w-48 bg-gray-100/80 backdrop-blur-xl border-r border-gray-200 pt-4 flex flex-col gap-1 p-2">
        <div className="px-2 mb-2 text-xs text-gray-500 font-semibold">Favorites</div>
        {sidebarItems.map(item => (
          <div 
            key={item.name}
            onClick={() => setActiveItem(item.name)}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer ${activeItem === item.name ? 'bg-gray-300/50' : 'hover:bg-gray-200/50'}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </div>
        ))}
         <div className="px-2 mt-4 mb-2 text-xs text-gray-500 font-semibold">Locations</div>
         <div 
            onClick={() => setActiveItem('Trash')}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer ${activeItem === 'Trash' ? 'bg-gray-300/50' : 'hover:bg-gray-200/50'}`}
          >
            <div className="text-gray-500">🗑️</div>
            <span>Trash</span>
          </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="h-12 border-b border-gray-200 flex items-center px-4 gap-4 bg-white/50">
           <div className="flex gap-2 text-gray-400">
             <ChevronLeft size={18} className="cursor-pointer hover:text-black"/>
             <ChevronRight size={18} className="cursor-pointer hover:text-black"/>
           </div>
           <span className="font-semibold text-gray-700">{activeItem}</span>
           <div className="flex-1" />
           <div className="flex gap-3 text-gray-500">
             <LayoutGrid size={16} />
             <List size={16} />
             <Search size={16} />
           </div>
        </div>

        {/* File Grid */}
        <div className="flex-1 p-4 grid grid-cols-4 md:grid-cols-5 gap-4 content-start overflow-auto bg-white">
            {currentContent.map((file, i) => (
                <div key={i} className="flex flex-col items-center gap-1 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                    <div className="w-16 h-16 flex items-center justify-center text-4xl">
                        {file.type === 'folder' && '📂'}
                        {file.type === 'app' && '📦'}
                        {file.type === 'img' && '🖼️'}
                        {file.type === 'txt' && '📄'}
                        {file.type === 'pdf' && '📕'}
                        {file.type === 'doc' && '📝'}
                        {file.type === 'sheet' && '📊'}
                        {file.type === 'installer' && '💿'}
                    </div>
                    <span className="text-center text-xs text-gray-700 break-all line-clamp-2">{file.name}</span>
                </div>
            ))}
             {currentContent.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center h-64 text-gray-300">
                    <span className="text-4xl mb-2">📭</span>
                    <span>Empty</span>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default FinderApp;