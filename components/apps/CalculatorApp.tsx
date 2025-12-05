import React, { useState } from 'react';

const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState<string | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [newNum, setNewNum] = useState(true);

  const handleNum = (num: string) => {
    if (newNum) {
      setDisplay(num);
      setNewNum(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOp = (operator: string) => {
    setPrev(display);
    setOp(operator);
    setNewNum(true);
  };

  const calculate = () => {
    if (!prev || !op) return;
    const current = parseFloat(display);
    const previous = parseFloat(prev);
    let result = 0;

    switch (op) {
      case '+': result = previous + current; break;
      case '-': result = previous - current; break;
      case '*': result = previous * current; break;
      case '/': result = previous / current; break;
    }

    setDisplay(result.toString());
    setOp(null);
    setPrev(null);
    setNewNum(true);
  };

  const clear = () => {
    setDisplay('0');
    setPrev(null);
    setOp(null);
    setNewNum(true);
  };

  const btnClass = "h-full w-full flex items-center justify-center text-xl font-medium transition-colors active:opacity-80";
  const darkBtn = "bg-[#505050] text-white";
  const lightBtn = "bg-[#d4d4d2] text-black";
  const orangeBtn = "bg-[#ff9f0a] text-white";

  return (
    <div className="h-full flex flex-col bg-[#2c2c2e]">
      <div className="h-20 bg-[#2c2c2e] text-white flex items-end justify-end px-4 py-2 text-5xl font-light">
        {display}
      </div>
      <div className="flex-1 grid grid-cols-4 gap-[1px] bg-black/20 p-[1px]">
        <button className={`${btnClass} ${lightBtn}`} onClick={clear}>AC</button>
        <button className={`${btnClass} ${lightBtn}`} onClick={() => setDisplay((parseFloat(display) * -1).toString())}>+/-</button>
        <button className={`${btnClass} ${lightBtn}`} onClick={() => setDisplay((parseFloat(display) / 100).toString())}>%</button>
        <button className={`${btnClass} ${orangeBtn}`} onClick={() => handleOp('/')}>÷</button>

        <button className={`${btnClass} ${darkBtn}`} onClick={() => handleNum('7')}>7</button>
        <button className={`${btnClass} ${darkBtn}`} onClick={() => handleNum('8')}>8</button>
        <button className={`${btnClass} ${darkBtn}`} onClick={() => handleNum('9')}>9</button>
        <button className={`${btnClass} ${orangeBtn}`} onClick={() => handleOp('*')}>×</button>

        <button className={`${btnClass} ${darkBtn}`} onClick={() => handleNum('4')}>4</button>
        <button className={`${btnClass} ${darkBtn}`} onClick={() => handleNum('5')}>5</button>
        <button className={`${btnClass} ${darkBtn}`} onClick={() => handleNum('6')}>6</button>
        <button className={`${btnClass} ${orangeBtn}`} onClick={() => handleOp('-')}>-</button>

        <button className={`${btnClass} ${darkBtn}`} onClick={() => handleNum('1')}>1</button>
        <button className={`${btnClass} ${darkBtn}`} onClick={() => handleNum('2')}>2</button>
        <button className={`${btnClass} ${darkBtn}`} onClick={() => handleNum('3')}>3</button>
        <button className={`${btnClass} ${orangeBtn}`} onClick={() => handleOp('+')}>+</button>

        <button className={`${btnClass} ${darkBtn} col-span-2 rounded-bl-lg pl-6 justify-start`} onClick={() => handleNum('0')}>0</button>
        <button className={`${btnClass} ${darkBtn}`} onClick={() => handleNum('.')}>.</button>
        <button className={`${btnClass} ${orangeBtn} rounded-br-lg`} onClick={calculate}>=</button>
      </div>
    </div>
  );
};

export default CalculatorApp;