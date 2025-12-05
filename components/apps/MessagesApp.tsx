import React, { useState } from 'react';
import { Edit } from 'lucide-react';

const MessagesApp: React.FC = () => {
  const [activeContact, setActiveContact] = useState(0);
  const [inputValue, setInputValue] = useState('');
  
  const contacts = [
    { id: 0, name: 'Tim Cook', avatar: 'TC', lastMsg: 'Good morning!', time: '9:41 AM' },
    { id: 1, name: 'Craig Federighi', avatar: 'CF', lastMsg: 'The hair is perfect.', time: 'Yesterday' },
    { id: 2, name: 'Kate', avatar: 'K', lastMsg: 'Meeting at 3?', time: 'Friday' },
  ];

  const [messages, setMessages] = useState([
    { id: 1, sender: 'them', text: 'Good morning! Welcome to macOS Sequoia on the web.', time: '9:41 AM' },
    { id: 2, sender: 'me', text: 'Wow, this is running in a browser?', time: '9:42 AM' },
    { id: 3, sender: 'them', text: 'Yes! It uses React and Tailwind CSS.', time: '9:42 AM' },
  ]);

  const sendMessage = () => {
    if(!inputValue.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'me', text: inputValue, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
    setInputValue('');
  };

  return (
    <div className="flex h-full bg-white">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 flex flex-col bg-gray-50/50 backdrop-blur-xl">
        <div className="h-12 flex items-center justify-between px-4 border-b border-gray-200/50">
            <span className="font-bold text-gray-700">Messages</span>
            <Edit size={18} className="text-blue-500 cursor-pointer" />
        </div>
        <div className="flex-1 overflow-y-auto">
            {contacts.map(c => (
                <div 
                    key={c.id} 
                    onClick={() => setActiveContact(c.id)}
                    className={`flex items-center gap-3 p-3 cursor-pointer ${activeContact === c.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${activeContact === c.id ? 'bg-white text-blue-500' : 'bg-gray-300 text-white'}`}>
                        {c.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                            <span className="font-semibold truncate text-sm">{c.name}</span>
                            <span className={`text-[10px] ${activeContact === c.id ? 'text-blue-100' : 'text-gray-400'}`}>{c.time}</span>
                        </div>
                        <p className={`text-xs truncate ${activeContact === c.id ? 'text-blue-100' : 'text-gray-500'}`}>{c.lastMsg}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="h-12 border-b border-gray-200 flex items-center justify-center bg-white/80 backdrop-blur">
            <div className="flex flex-col items-center">
                <span className="text-xs font-semibold text-gray-500">To: <span className="text-black">{contacts[activeContact].name}</span></span>
            </div>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col">
            {messages.map(msg => (
                <div key={msg.id} className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${msg.sender === 'me' ? 'bg-blue-500 text-white self-end rounded-br-sm' : 'bg-gray-200 text-black self-start rounded-bl-sm'}`}>
                    {msg.text}
                </div>
            ))}
        </div>

        <div className="p-4 bg-white/80 backdrop-blur border-t border-gray-100">
            <div className="relative">
                <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="iMessage"
                    className="w-full border border-gray-300 rounded-full px-4 py-1.5 pr-10 outline-none focus:border-gray-400 text-sm"
                />
                {inputValue && (
                    <button onClick={sendMessage} className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center">
                        <div className="scale-75"><span className="text-[10px] font-bold">↑</span></div>
                    </button>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesApp;