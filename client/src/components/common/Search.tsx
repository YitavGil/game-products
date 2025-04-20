'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';

interface SearchProps {
  placeholder?: string;
  className?: string;
}

const Search: React.FC<SearchProps> = ({
  placeholder = 'Search products...',
  className = '',
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Initialize search term from URL
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('search') || ''
  );

  // Update search params and navigate
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      
      // Reset to page 1 when searching
      params.set('page', '1');
      
      return params.toString();
    },
    [searchParams]
  );

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchTerm.trim()) {
      router.push(`${pathname}?${createQueryString('search', searchTerm)}`);
    } else {
      // If search is empty, remove the search param
      const params = new URLSearchParams(searchParams.toString());
      params.delete('search');
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  // Clear search
  const handleClear = () => {
    setSearchTerm('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className={`relative flex items-center ${className}`}
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full py-2 px-4 pr-10 bg-background-dark border border-background-hover rounded-lg focus:outline-none focus:border-primary text-text-primary"
      />
      
      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-10 text-text-secondary hover:text-primary"
          aria-label="Clear search"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
      
      <button
        type="submit"
        className="absolute right-2 text-text-secondary hover:text-primary"
        aria-label="Search"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </form>
  );
};

export default Search;