// src/components/features/Products/ProductList.tsx
'use client';

import { useState } from 'react';
import { Box, Typography, CircularProgress, Alert, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { productApi } from '@/lib/api';
import { ProductCard } from './ProductCard';
import { Product, PaginatedResponse } from '@/types';
import { Button } from '@/components/common';
import { useRouter, useSearchParams } from 'next/navigation';
import LoadingSpinner from '@/components/common/Loader/LoadingSpinner';

interface ProductListProps {
  initialProducts: PaginatedResponse<Product>;
  currentPage: number;
}

export const ProductList: React.FC<ProductListProps> = ({ initialProducts, currentPage }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Client-side pagination state
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const { 
    data = initialProducts, 
    isError, 
    error
  } = useQuery<PaginatedResponse<Product>, Error>({
    queryKey: ['products', { page: currentPage }],
    queryFn: () => {
      // Convert searchParams to object
      const params: Record<string, string> = {};
      searchParams.forEach((value, key) => {
        params[key] = value;
      });
      
      return productApi.getProducts({
        search: params.search,
        category: params.category,
        minPrice: params.minPrice ? parseInt(params.minPrice) : undefined,
        maxPrice: params.maxPrice ? parseInt(params.maxPrice) : undefined,
        page: currentPage,
        limit: 12
      });
    },
    initialData: initialProducts,
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: false,
  });
  
  const handleLoadMore = async () => {
    if (data && currentPage < data.totalPages && !isLoadingMore) {
      setIsLoadingMore(true);
      
      // Create new URLSearchParams object from current
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('page', (currentPage + 1).toString());
      
      // Navigate to next page
      router.push(`/?${newParams.toString()}`);
      
      setIsLoadingMore(false);
    }
  };
  
  if (isError) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        Error loading products: {error.message}
      </Alert>
    );
  }
  
  const products = data?.data || [];
  const hasMore = data ? currentPage < data.totalPages : false;
  
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
      <Grid container spacing={3}>
        {products.map((product: Product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      
      {hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button 
            variant="primary" 
            onClick={handleLoadMore}
            loading={isLoadingMore}
            disabled={isLoadingMore}
            sx={{ minWidth: 200 }}
          >
            Load More
          </Button>
        </Box>
      )}
    </>
  );
};