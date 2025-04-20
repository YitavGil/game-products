// src/components/features/Products/SearchBar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useDebounce } from '@/hooks/useDebounce';
import { TextField } from '@/components/common';
import { styled } from '@mui/material/styles';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const SearchPaper = styled(Paper)(({ theme }) => ({
  padding: '2px 4px',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover, &:focus-within': {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
  },
}));

interface SearchBarProps {
  initialSearch?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ initialSearch = '' }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [localSearch, setLocalSearch] = useState(initialSearch);
  
  const debouncedSearch = useDebounce(localSearch, 500);
  
  useEffect(() => {
    if (debouncedSearch !== initialSearch) {
      // Create new URLSearchParams object from current
      const params = new URLSearchParams(searchParams.toString());
      
      // Update or remove search parameter
      if (debouncedSearch) {
        params.set('search', debouncedSearch);
      } else {
        params.delete('search');
      }
      
      // Reset page when search changes
      params.delete('page');
      
      // Update URL with new params
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [debouncedSearch, router, pathname, searchParams, initialSearch]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
  };
  
  const handleClear = () => {
    setLocalSearch('');
  };
  
  return (
    <SearchPaper elevation={0}>
      <TextField
        placeholder="Search for products..."
        value={localSearch}
        onChange={handleChange}
        startIcon={<SearchIcon />}
        endIcon={localSearch ? <ClearIcon onClick={handleClear} style={{ cursor: 'pointer' }} /> : null}
        variant="standard"
        InputProps={{
          disableUnderline: true,
        }}
        sx={{ 
          '& .MuiInputBase-root': {
            padding: '10px',
          },
        }}
      />
    </SearchPaper>
  );
};