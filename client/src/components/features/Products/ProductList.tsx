// src/components/features/Products/ProductList.tsx
import { useState } from 'react';
import { Grid, Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { productApi } from '@/lib/api';
import { ProductCard } from './ProductCard';
import { Product } from '@/types';

export const ProductList: React.FC = () => {
  const [page, setPage] = useState(1);
  const filters = useSelector((state: RootState) => state.products.filters);
  
  const { data, isLoading, isError, error, isPreviousData } = useQuery({
    queryKey: ['products', { ...filters, page }],
    queryFn: () => productApi.getProducts({
      search: filters.search,
      category: filters.category,
      minPrice: filters.minPrice !== '' ? filters.minPrice : undefined,
      maxPrice: filters.maxPrice !== '' ? filters.maxPrice : undefined,
      page,
      limit: 12
    }),
    keepPreviousData: true,
  });
  
  const handleLoadMore = () => {
    if (data && page < data.totalPages && !isPreviousData) {
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
        Error loading products: {(error as Error).message}
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
  
  return (
    <>
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: 3
      }}>
        {products.map((product: Product) => (
          <Box key={product._id} sx={{ width: '100%' }}>
            <ProductCard product={product} />
          </Box>
        ))}
      </Box>
      
      {hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleLoadMore}
            disabled={isLoading}
            sx={{ minWidth: 200 }}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Load More'}
          </Button>
        </Box>
      )}
    </>
  );
};