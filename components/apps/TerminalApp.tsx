import React, { useState, useRef, useEffect } from 'react';

const TerminalApp: React.FC = () => {
  const [history, setHistory] = useState<string[]>(['Last login: ' + new Date().toUTCString() + ' on ttys000']);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      const newHistory = [...history, `user@MacBook-Pro ~ % ${cmd}`];
      
      let response = '';
      if (cmd === 'help') response = 'Available commands: help, date, clear, echo [text], whoami';
      else if (cmd === 'date') response = new Date().toString();
      else if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      }
      else if (cmd.startsWith('echo ')) response = cmd.substring(5);
      else if (cmd === 'whoami') response = 'guest';
      else if (cmd !== '') response = `zsh: command not found: ${cmd}`;

      if (response) newHistory.push(response);
      
      setHistory(newHistory);
      setInput('');
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    inputRef.current?.focus();
  }, [history]);

  return (
    <div 
        className="h-full bg-[#1e1e1e] text-white p-2 font-mono text-xs overflow-y-auto"
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
    >
      {history.map((line, i) => (
        <div key={i} className="mb-1 break-words leading-tight opacity-90">{line}</div>
      ))}
      <div className="flex items-center">
        <span className="text-[#27c93f] mr-2">user@MacBook-Pro ~ %</span>
        <input 
            ref={inputRef}
            type="text" 
            className="flex-1 bg-transparent outline-none border-none text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
        />
      </div>
    </div>
  );
};

export default TerminalApp;