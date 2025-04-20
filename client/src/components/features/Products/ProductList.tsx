'use client';

import { useState, useEffect } from 'react';
import { Typography, Alert, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useQuery } from '@tanstack/react-query';
import { productApi } from '@/lib/api';
import { ProductCard } from './ProductCard';
import { Product, PaginatedResponse } from '@/types';
import { Button } from '@/components/common';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface ProductListProps {
  initialProducts: PaginatedResponse<Product>;
  currentPage: number;
}

export const ProductList: React.FC<ProductListProps> = ({ initialProducts, currentPage }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  // Client-side pagination state
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  // Create a URLSearchParams object for our query key
  const buildQueryKey = () => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  };

  const queryParams = buildQueryKey();
  
  const { 
    data = initialProducts, 
    isError, 
    error,
    refetch
  } = useQuery<PaginatedResponse<Product>, Error>({
    queryKey: ['products', queryParams],
    queryFn: () => {
      // Convert searchParams to object for API call
      return productApi.getProducts({
        search: queryParams.search,
        category: queryParams.category,
        minPrice: queryParams.minPrice ? parseInt(queryParams.minPrice) : undefined,
        maxPrice: queryParams.maxPrice ? parseInt(queryParams.maxPrice) : undefined,
        page: currentPage,
        limit: 12
      });
    },
    initialData: initialProducts,
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: false,
  });
  
  // React to URL parameter changes
  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);
  
  const handleLoadMore = async () => {
    if (data && currentPage < data.totalPages && !isLoadingMore) {
      setIsLoadingMore(true);
      
      // Create new URLSearchParams object from current
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('page', (currentPage + 1).toString());
      
      // Navigate to next page
      router.push(`${pathname}?${newParams.toString()}`);
      
      setIsLoadingMore(false);
    }
  };
  
  if (isError) {
    return (
      <Alert 
        severity="error" 
        sx={{ 
          my: 2, 
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}
      >
        Error loading products: {error.message}
      </Alert>
    );
  }
  
  const products = data?.data || [];
  const hasMore = data ? currentPage < data.totalPages : false;
  
  if (products.length === 0) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        py: 6,
        px: 3,
        backgroundColor: 'rgba(26, 34, 54, 0.6)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          No products found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Try adjusting your search or filter criteria.
        </Typography>
        <Button 
          variant="outlined" 
          onClick={() => router.push('/')}
        >
          Back to all products
        </Button>
      </Box>
    );
  }
  
  return (
    <>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {products.map((product: Product) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={3} 
            key={product._id}
            sx={{ 
              display: 'flex',
              height: '450px', 
            }}
          >
            <Box sx={{ 
              width: '100%', 
              display: 'flex',
            }}>
              <ProductCard product={product} />
            </Box>
          </Grid>
        ))}
      </Grid>
      
      {hasMore && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 4, 
          mb: 3 
        }}>
          <Button 
            variant="primary"
            onClick={handleLoadMore}
            loading={isLoadingMore}
            disabled={isLoadingMore}
            sx={{ 
              minWidth: 200,
              py: 1.5,
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3)',
              '&:hover': {
                boxShadow: '0 6px 25px rgba(139, 92, 246, 0.5)',
              }
            }}
          >
            {isLoadingMore ? 'Loading...' : 'Load More Products'}
          </Button>
        </Box>
      )}
    </>
  );
};