import React, { useState, useEffect, useRef } from 'react';
import { Search, Command, X } from 'lucide-react';

interface SpotlightSearchProps {
  onSearch: (query: string) => void;
  onClose?: () => void;
}

const SpotlightSearch: React.FC<SpotlightSearchProps> = ({ onSearch, onClose }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsFocused(true);
      }
      if (e.key === 'Escape') {
        inputRef.current?.blur();
        setIsFocused(false);
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <div className={`absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-opacity duration-200 ${
          isFocused ? 'opacity-100' : 'opacity-60'
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
          placeholder={isFocused ? "Sök uppgiftsnummer, ämne, kapitel..." : "Sök lösningar... (⌘K)"}
          className={`spotlight-search pl-14 pr-14 transition-all duration-200 ${
            isFocused ? 'scale-[1.02]' : 'scale-100'
          }`}
        />
        
        <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
          {query ? (
            <button
              onClick={() => {
                setQuery('');
                onSearch('');
                inputRef.current?.focus();
              }}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors pointer-events-auto"
            >
              <X className="w-4 h-4 text-text-tertiary" />
            </button>
          ) : (
            <kbd className="inline-flex items-center px-2 py-1 text-xs font-medium text-text-tertiary bg-white/40 backdrop-blur-sm rounded-lg border border-border/50">
              <Command className="w-3 h-3 mr-1" />
              K
            </kbd>
          )}
        </div>
      </div>

      {isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-window p-4 animate-slide-up z-10">
          <div className="text-sm text-text-secondary mb-2">Snabbkommandon:</div>
          <div className="space-y-1 text-xs text-text-tertiary">
            <div>• Skriv uppgiftsnummer (t.ex. "2431") för att hitta specifik lösning</div>
            <div>• Använd "fysik:" eller "matte:" för att filtrera ämnen</div>
            <div>• ESC för att stänga sökningen</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotlightSearch;
