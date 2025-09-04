'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { AssetHolding } from '@/lib/types';

interface SearchBarProps {
  assets: AssetHolding[];
  onSearch: (results: AssetHolding[]) => void;
  placeholder?: string;
}

export function SearchBar({ assets, onSearch, placeholder = "Search assets..." }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isActive, setIsActive] = useState(false);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (!searchQuery.trim()) {
      onSearch(assets);
      return;
    }

    const filtered = assets.filter(asset =>
      asset.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.assetSymbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.platform.toLowerCase().includes(searchQuery.toLowerCase())
    );

    onSearch(filtered);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch(assets);
    setIsActive(false);
  };

  return (
    <div className="relative mb-6">
      <div className={`glass-card rounded-lg transition-all duration-200 ${isActive ? 'ring-2 ring-cyan-400' : ''}`}>
        <div className="flex items-center px-4 py-3">
          <Search className="w-5 h-5 text-gray-300 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-white placeholder-gray-300 outline-none"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="ml-2 p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200"
            >
              <X className="w-4 h-4 text-gray-300" />
            </button>
          )}
        </div>
      </div>

      {/* Search suggestions could go here */}
      {query && isActive && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-lg p-2 z-20">
          <div className="text-sm text-gray-300">
            Searching for "{query}"...
          </div>
        </div>
      )}
    </div>
  );
}
