import React, { useState } from 'react';
import { Search, Command } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative max-w-2xl">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-text-secondary" />
      </div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Sök lösningar... (⌘K)"
        className="search-input pl-12 pr-12"
      />
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
        <kbd className="inline-flex items-center px-2 py-1 text-xs font-medium text-text-secondary bg-gray-100 rounded border border-border">
          <Command className="w-3 h-3 mr-1" />
          K
        </kbd>
      </div>
    </div>
  );
};

export default SearchBar;
