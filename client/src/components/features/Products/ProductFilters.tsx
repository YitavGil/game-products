// src/components/features/Products/ProductFilters.tsx
'use client';

import React, { useState, useEffect } from 'react';
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
import { ProductCategory } from '@/types';
import { Button, Chip } from '@/components/common';
import { styled } from '@mui/material/styles';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

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

interface ProductFiltersProps {
  initialCategory?: ProductCategory | '';
  initialMinPrice?: number;
  initialMaxPrice?: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  initialCategory = '',
  initialMinPrice,
  initialMaxPrice
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  
  // Initialize state from URL params or props
  const [category, setCategory] = useState<ProductCategory | ''>(() => {
    const categoryParam = searchParams.get('category') as ProductCategory | null;
    return categoryParam || initialCategory;
  });
  
  const [priceRange, setPriceRange] = useState<[number, number]>(() => {
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    return [
      minPriceParam ? parseInt(minPriceParam) : (initialMinPrice !== undefined ? initialMinPrice : 0),
      maxPriceParam ? parseInt(maxPriceParam) : (initialMaxPrice !== undefined ? initialMaxPrice : 500)
    ];
  });
  
  // Sync state with URL when URL changes
  useEffect(() => {
    const categoryParam = searchParams.get('category') as ProductCategory | null;
    if (categoryParam !== category && categoryParam !== null) {
      setCategory(categoryParam);
    }
    
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    
    if (
      (minPriceParam && parseInt(minPriceParam) !== priceRange[0]) || 
      (maxPriceParam && parseInt(maxPriceParam) !== priceRange[1])
    ) {
      setPriceRange([
        minPriceParam ? parseInt(minPriceParam) : 0,
        maxPriceParam ? parseInt(maxPriceParam) : 500
      ]);
    }
  }, [searchParams, category, priceRange]);
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === 'all' ? '' : (event.target.value as ProductCategory);
    setCategory(value);
  };
  
  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
  };
  
  const applyFilters = () => {
    // Create new URLSearchParams object from current
    const params = new URLSearchParams(searchParams.toString());
    
    // Update category
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    
    // Update price range
    if (priceRange[0] > 0) {
      params.set('minPrice', priceRange[0].toString());
    } else {
      params.delete('minPrice');
    }
    
    if (priceRange[1] < 500) {
      params.set('maxPrice', priceRange[1].toString());
    } else {
      params.delete('maxPrice');
    }
    
    // Reset page when filters change
    params.delete('page');
    
    // Update URL with new params, using replace to avoid building history
    router.replace(`${pathname}?${params.toString()}`);
    
    // Close popover
    handleClose();
  };
  
  const handleClearFilters = () => {
    // Reset local state
    setCategory('');
    setPriceRange([0, 500]);
    
    // Create new URLSearchParams with only search param
    const params = new URLSearchParams();
    const searchValue = searchParams.get('search');
    if (searchValue) {
      params.set('search', searchValue);
    }
    
    // Update URL with new params
    router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ''}`);
    
    // Close popover
    handleClose();
  };
  
  const getActiveFiltersCount = () => {
    let count = 0;
    if (category) count += 1;
    if (priceRange[0] > 0 || priceRange[1] < 500) count += 1;
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
          
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={handleClearFilters}
              sx={{ flex: 1 }}
            >
              Clear
            </Button>
            <Button 
              variant="primary" 
              onClick={applyFilters}
              sx={{ flex: 2 }}
            >
              Apply Filters
            </Button>
          </Box>
        </FilterContent>
      </Popover>
    </>
  );
};