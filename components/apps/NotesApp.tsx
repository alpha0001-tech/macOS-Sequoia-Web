import React, { useState } from 'react';
import { List, Grid, Edit3 } from 'lucide-react';

const NotesApp: React.FC = () => {
  const [activeNote, setActiveNote] = useState(0);
  const [notes, setNotes] = useState([
    { id: 0, title: 'Welcome', content: 'Welcome to Notes on web!\n\nThis is a simple clone of the macOS Notes app.' },
    { id: 1, title: 'Ideas', content: '- Build a web OS\n- Learn Framer Motion\n- Coffee break' },
    { id: 2, title: 'Shopping List', content: 'Milk\nEggs\nBread' },
  ]);

  const activeNoteData = notes.find(n => n.id === activeNote);

  return (
    <div className="flex h-full bg-white">
      {/* Sidebar */}
      <div className="w-60 bg-gray-50 border-r border-gray-200 flex flex-col">
         <div className="h-10 flex items-center px-4 gap-2 text-gray-500">
            <List size={16} />
            <Grid size={16} />
         </div>
         <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {notes.map(note => (
                <div 
                    key={note.id}
                    onClick={() => setActiveNote(note.id)} 
                    className={`p-3 rounded-lg cursor-pointer ${activeNote === note.id ? 'bg-[#f8bc04]/20' : 'hover:bg-gray-100'}`}
                >
                    <div className={`font-bold text-sm mb-1 ${activeNote === note.id ? 'text-[#e0a800]' : 'text-gray-800'}`}>{note.title}</div>
                    <div className="text-xs text-gray-500 truncate">{note.content}</div>
                    <div className="text-[10px] text-gray-400 mt-1">9:41 AM</div>
                </div>
            ))}
         </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col bg-white">
         <div className="h-10 flex items-center justify-end px-4 border-b border-gray-100">
            <Edit3 size={18} className="text-gray-400 hover:text-gray-600 cursor-pointer"/>
         </div>
         <div className="flex-1 p-8">
            <div className="text-xs text-gray-400 text-center mb-4">{new Date().toDateString()} at 9:41 AM</div>
            {activeNoteData && (
                <textarea 
                    className="w-full h-full resize-none outline-none text-gray-800 text-base leading-relaxed"
                    value={activeNoteData.content}
                    onChange={(e) => {
                        const newNotes = [...notes];
                        const index = newNotes.findIndex(n => n.id === activeNote);
                        newNotes[index].content = e.target.value;
                        setNotes(newNotes);
                    }}
                />
            )}
         </div>
      </div>
    </div>
  );
};

export default NotesApp;