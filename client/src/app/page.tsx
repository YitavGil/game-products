'use client';

import { Box } from '@mui/material';
import { ProductList } from '@/components/features/Products/ProductList';
import { SearchBar } from '@/components/features/Products/SearchBar';
import { ProductFilters } from '@/components/features/Products/ProductFilters';
import Section from '@/components/layout/Section'

export default function Home() {
  return (
    <Section
      title="Product Catalog"
      subtitle="Browse our collection of games, hardware, and merchandise"
    >
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Box sx={{ flex: 3 }}>
          <SearchBar />
        </Box>
        <Box sx={{ flex: 1, maxWidth: 200 }}>
          <ProductFilters />
        </Box>
      </Box>
      
      <ProductList />
    </Section>
  )
}