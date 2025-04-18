// src/components/features/Products/ProductList.tsx
import { useState } from 'react';
import { Box, Typography, CircularProgress, Alert, useTheme, useMediaQuery } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { productApi } from '@/lib/api';
import { ProductCard } from './ProductCard';
import { Product, PaginatedResponse } from '@/types';
import { Button } from '@/components/common';

export const ProductList: React.FC = () => {
  const [page, setPage] = useState(1);
  const filters = useSelector((state: RootState) => state.products.filters);
  const theme = useTheme();
  
  // Responsive grid columns
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  
  const { 
    data, 
    isLoading, 
    isError, 
    error, 
    isFetching 
  } = useQuery<PaginatedResponse<Product>, Error>({
    queryKey: ['products', { ...filters, page }],
    queryFn: () => productApi.getProducts({
      search: filters.search,
      category: filters.category,
      minPrice: filters.minPrice !== '' ? filters.minPrice : undefined,
      maxPrice: filters.maxPrice !== '' ? filters.maxPrice : undefined,
      page,
      limit: 12
    }),
    staleTime: 1000 * 60, // 1 minute
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
  });
  
  const handleLoadMore = () => {
    if (data && page < data.totalPages && !isFetching) {
      setPage((old) => old + 1);
    }
  };
  
  if (isLoading && page === 1) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (isError) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        Error loading products: {error.message}
      </Alert>
    );
  }
  
  const products = data?.data || [];
  const hasMore = data ? page < data.totalPages : false;
  
  if (products.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h5" gutterBottom>
          No products found
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Try adjusting your search or filter criteria.
        </Typography>
      </Box>
    );
  }
  
  // Determine grid columns based on screen size
  const getGridColumns = () => {
    if (isLargeScreen) return 'repeat(4, 1fr)';
    if (isMediumScreen) return 'repeat(3, 1fr)';
    return 'repeat(2, 1fr)';
  };
  
  return (
    <>
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: getGridColumns(), 
        gap: 3
      }}>
        {products.map((product: Product) => (
          <Box key={product._id}>
            <ProductCard product={product} />
          </Box>
        ))}
      </Box>
      
      {hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button 
            variant="primary" 
            onClick={handleLoadMore}
            loading={isFetching}
            disabled={isFetching}
            sx={{ minWidth: 200 }}
          >
            Load More
          </Button>
        </Box>
      )}
    </>
  );
};