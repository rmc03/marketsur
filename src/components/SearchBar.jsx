import { MagnifyingGlass, X } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';

export function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => onSearch(value), 400);
    return () => clearTimeout(timer);
  }, [value, onSearch]);

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <div className="px-4 py-2 w-full">
      <div className="relative flex items-center w-full group">
        <MagnifyingGlass
          className="absolute left-3 w-5 h-5 text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-500 transition-colors"
          weight="bold"
        />
        <input
          type="text"
          placeholder="Buscar productos..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full glass-input border-none rounded-2xl py-3 pl-10 pr-10 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/30 focus:bg-white/70 dark:focus:bg-white/[0.08] transition-all font-medium text-[15px]"
        />
        {value && (
          <button 
            onClick={handleClear}
            className="absolute right-3 p-1 rounded-full text-slate-400 dark:text-slate-500 hover:bg-white/50 dark:hover:bg-white/[0.1] hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" weight="bold" />
          </button>
        )}
      </div>
    </div>
  );
}
