import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, 400);
    return () => clearTimeout(timer);
  }, [value, onSearch]);

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <div className="px-4 py-2 w-full">
      <div className="relative flex items-center w-full group">
        <Search className="absolute left-3 w-5 h-5 text-slate-400 group-focus-within:text-[#1877F2] transition-colors" />
        <input
          type="text"
          placeholder="Buscar productos..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-slate-100 border-none rounded-2xl py-3 pl-10 pr-10 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-[#1877F2]/50 focus:bg-white transition-all outline-none"
        />
        {value && (
          <button 
            onClick={handleClear}
            className="absolute right-3 p-1 rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
