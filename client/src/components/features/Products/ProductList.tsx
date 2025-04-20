import React from 'react';
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ 
  products,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-background-card animate-pulse rounded-lg h-80"></div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-text-primary mb-2">No products found</h3>
        <p className="text-text-secondary">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;