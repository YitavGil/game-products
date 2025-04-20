import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import Rating from '@/components/common/Rating';
import Button from '@/components/common/Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Format price to two decimal places
  const formattedPrice = product.price.toFixed(2);
  
  return (
    <div className="bg-background-card rounded-lg overflow-hidden shadow-md hover:shadow-glow transition-all duration-300 h-full flex flex-col">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <Link href={`/products/${product._id}`}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 hover:scale-105"
          />
        </Link>
        
        {/* Category Badge */}
        <div className="absolute top-2 right-2 bg-accent px-2 py-1 rounded text-xs font-medium text-text-primary">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </div>
      </div>
      
      {/* Product Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-text-primary mb-1 line-clamp-1">
          <Link href={`/products/${product._id}`} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </h3>
        
        {/* Rating */}
        <div className="mb-2">
          <Rating value={product.rating} size="small" showValue />
        </div>
        
        {/* Description */}
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        {/* Product Info - Game specific */}
        {'genre' in product && product.genre && (
          <div className="flex flex-wrap gap-1 mb-2">
            {product.genre.slice(0, 3).map((g, index) => (
              <span 
                key={index} 
                className="bg-background-hover text-text-secondary text-xs px-2 py-1 rounded"
              >
                {g}
              </span>
            ))}
          </div>
        )}
        
        {/* Product Info - Hardware specific */}
        {'brand' in product && product.brand && (
          <div className="text-text-secondary text-xs mb-2">
            {product.brand}
          </div>
        )}
        
        <div className="mt-auto pt-4">
          {/* Price */}
          <div className="flex items-baseline mb-3">
            <span className="text-xl font-bold text-text-primary">
              ${formattedPrice}
            </span>
            
            {/* Stock Badge */}
            <span className={`ml-2 text-xs px-2 py-0.5 rounded ${
              product.inStock 
                ? 'bg-success text-text-primary bg-opacity-20' 
                : 'bg-error text-text-primary bg-opacity-20'
            }`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="small" 
              className="flex-1"
            >
              Details
            </Button>
            <Button 
              variant="primary" 
              size="small" 
              className="flex-1"
              disabled={!product.inStock}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;