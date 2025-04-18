// src/app/page.tsx
'use client';

import { Container, Grid, Box, Typography } from '@mui/material';
import { ProductList } from '@/components/features/Products/ProductList';
import { SearchBar } from '@/components/features/Products/SearchBar';
import { ProductFilters } from '@/components/features/Products/ProductFilters';

export default function Home() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Product Catalog
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Browse our collection of games, hardware, and merchandise
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Box sx={{ flex: 3 }}>
          <SearchBar />
        </Box>
        <Box sx={{ flex: 1, maxWidth: 200 }}>
          <ProductFilters />
        </Box>
      </Box>
      
      <ProductList />
    </Container>
  );
}