// src/components/features/Products/ProductFilters.tsx
import React, { useState } from 'react';
import { 
  Box, 
  Popover,
  Typography, 
  Divider, 
  FormControl, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Slider
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryFilter, setPriceFilter, clearFilters } from '@/store/features/products/productsSlice';
import { ProductCategory } from '@/types';
import { RootState } from '@/store';
import { Button, Chip } from '@/components/common';
import { styled } from '@mui/material/styles';

const FilterContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  width: 320,
}));

const FilterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const PriceRangeDisplay = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 8,
});

export const ProductFilters: React.FC = () => {
  const dispatch = useDispatch();
  const { category, minPrice, maxPrice } = useSelector((state: RootState) => state.products.filters);
  
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  
  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPrice !== '' ? minPrice : 0,
    maxPrice !== '' ? maxPrice : 500
  ]);
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === 'all' ? '' : (event.target.value as ProductCategory);
    dispatch(setCategoryFilter(value));
  };
  
  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
  };
  
  const handlePriceChangeCommitted = () => {
    dispatch(setPriceFilter({ min: priceRange[0], max: priceRange[1] }));
  };
  
  const handleClearFilters = () => {
    dispatch(clearFilters());
    setPriceRange([0, 500]);
    handleClose();
  };
  
  const getActiveFiltersCount = () => {
    let count = 0;
    if (category) count += 1;
    if (minPrice !== '' || maxPrice !== '') count += 1;
    return count;
  };
  
  const activeCount = getActiveFiltersCount();
  
  return (
    <>
      <Button
        variant={activeCount > 0 ? "primary" : "outlined"}
        fullWidth
        startIcon={<FilterListIcon />}
        onClick={handleClick}
        sx={{ height: '48px' }}
      >
        Filters
        {activeCount > 0 && (
          <Chip 
            label={activeCount} 
            size="small" 
            sx={{ ml: 1, height: 20, minWidth: 20 }}
          />
        )}
      </Button>
      
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <FilterContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Filter Products</Typography>
          
          <FilterSection>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Category</Typography>
            <RadioGroup
              value={category || 'all'}
              onChange={handleCategoryChange}
            >
              <FormControlLabel value="all" control={<Radio />} label="All Products" />
              <FormControlLabel value={ProductCategory.GAME} control={<Radio />} label="Games" />
              <FormControlLabel value={ProductCategory.HARDWARE} control={<Radio />} label="Hardware" />
              <FormControlLabel value={ProductCategory.MERCHANDISE} control={<Radio />} label="Merchandise" />
            </RadioGroup>
          </FilterSection>
          
          <Divider sx={{ my: 2 }} />
          
          <FilterSection>
            <Typography variant="subtitle1" gutterBottom>
              Price Range
            </Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              onChangeCommitted={handlePriceChangeCommitted}
              valueLabelDisplay="auto"
              min={0}
              max={500}
              sx={{ mt: 4 }}
            />
            <PriceRangeDisplay>
              <Typography variant="body2">${priceRange[0]}</Typography>
              <Typography variant="body2">${priceRange[1]}</Typography>
            </PriceRangeDisplay>
          </FilterSection>
          
          <Button 
            variant="outlined" 
            color="secondary" 
            fullWidth 
            onClick={handleClearFilters}
            sx={{ mt: 2 }}
          >
            Clear Filters
          </Button>
        </FilterContent>
      </Popover>
    </>
  );
};