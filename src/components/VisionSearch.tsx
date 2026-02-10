import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface VisionSearchProps {
  onSearch: (query: string) => void;
  showResults: boolean;
}

const VisionSearch: React.FC<VisionSearchProps> = ({ onSearch, showResults }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        inputRef.current?.blur();
        setIsFocused(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="relative w-full max-w-3xl">
      <div className="relative">
        <div className={`absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none transition-opacity duration-300 ${
          isFocused ? 'opacity-100' : 'opacity-40'
        }`}>
          <Search className="h-6 w-6 text-text-tertiary" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Sök efter uppgift eller kapitel..."
          className={`vision-search pl-16 pr-16 transition-all duration-300 ${
            isFocused ? 'scale-[1.02]' : 'scale-100'
          } ${showResults ? 'rounded-t-3xl rounded-b-none' : 'rounded-3xl'}`}
        />
        
        <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
          {query && (
            <button
              onClick={() => {
                setQuery('');
                onSearch('');
                inputRef.current?.focus();
              }}
              className="p-2 hover:bg-white/20 rounded-full transition-colors pointer-events-auto"
            >
              <X className="w-4 h-4 text-text-tertiary" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisionSearch;
