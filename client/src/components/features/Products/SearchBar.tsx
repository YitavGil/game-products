// src/components/features/Products/SearchBar.tsx
import React, { useState, useEffect } from 'react';
import { Paper, InputBase, IconButton, alpha } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchFilter } from '@/store/features/products/productsSlice';
import { RootState } from '@/store';
import { useDebounce } from '@/hooks/useDebounce';

export const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const searchFilter = useSelector((state: RootState) => state.products.filters.search);
  const [localSearch, setLocalSearch] = useState(searchFilter);
  
  const debouncedSearch = useDebounce(localSearch, 500);
  
  useEffect(() => {
    if (debouncedSearch !== searchFilter) {
      dispatch(setSearchFilter(debouncedSearch));
    }
  }, [debouncedSearch, dispatch, searchFilter]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
  };
  
  const handleClear = () => {
    setLocalSearch('');
  };
  
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        bgcolor: (theme) => alpha(theme.palette.background.paper, 0.6),
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover, &:focus-within': {
          bgcolor: (theme) => alpha(theme.palette.background.paper, 0.8),
          boxShadow: (theme) => `0 0 0 2px ${theme.palette.primary.main}`,
        },
      }}
      elevation={0}
    >
      <IconButton sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search for products..."
        value={localSearch}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'search products' }}
      />
      {localSearch && (
        <IconButton 
          sx={{ p: '10px' }} 
          aria-label="clear search"
          onClick={handleClear}
        >
          <ClearIcon />
        </IconButton>
      )}
    </Paper>
  );
};