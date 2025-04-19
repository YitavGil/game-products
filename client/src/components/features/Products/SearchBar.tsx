import React, { useState, useEffect } from 'react';
import { Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchFilter } from '@/store/features/products/productsSlice';
import { RootState } from '@/store';
import { useDebounce } from '@/hooks/useDebounce';
import { TextField } from '@/components/common';
import { styled } from '@mui/material/styles';

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