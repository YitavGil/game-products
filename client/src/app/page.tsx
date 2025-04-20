// src/app/page.tsx
import { Box } from '@mui/material';
import { getProducts } from '@/lib/products';
import { ProductList } from '@/components/features/Products/ProductList';
import { SearchBar } from '@/components/features/Products/SearchBar';
import { ProductFilters } from '@/components/features/Products/ProductFilters';
import Section from '@/components/layout/Section';
import { Suspense } from 'react';
import { ProductCategory } from '@/types';
import LoadingSpinner from '@/components/common/Loader/LoadingSpinner';

export const dynamic = 'force-dynamic'; // Make page dynamic to reflect URL params changes

interface HomePageProps {
  searchParams?: {
    search?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
  };
}

export default async function Home({ searchParams = {} }: HomePageProps) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const minPrice = searchParams.minPrice ? parseInt(searchParams.minPrice) : undefined;
  const maxPrice = searchParams.maxPrice ? parseInt(searchParams.maxPrice) : undefined;
  const category = searchParams.category as ProductCategory | undefined;
  
  const productsData = await getProducts({
    search: searchParams.search,
    category,
    minPrice,
    maxPrice,
    page,
    limit: 12,
  });

  return (
    <Section
      title="Product Catalog"
      subtitle="Browse our collection of games, hardware, and merchandise"
    >
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Box sx={{ flex: 3 }}>
          <SearchBar initialSearch={searchParams.search || ''} />
        </Box>
        <Box sx={{ flex: 1, maxWidth: 200 }}>
          <ProductFilters 
            initialCategory={category || ''}
            initialMinPrice={minPrice}
            initialMaxPrice={maxPrice}
          />
        </Box>
      </Box>
      
      <Suspense fallback={<LoadingSpinner />}>
        <ProductList 
          initialProducts={productsData} 
          currentPage={page} 
        />
      </Suspense>
    </Section>
  );
}