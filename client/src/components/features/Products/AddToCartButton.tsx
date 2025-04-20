// src/components/features/Products/AddToCartButton.tsx
'use client';

import React from 'react';
import { Button } from '@/components/common';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Product } from '@/types';

interface AddToCartButtonProps {
  product: Product;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ 
  product, 
  size = 'medium',
  fullWidth = true
}) => {
  // In a real application, this would dispatch to your cart state/store
  const handleAddToCart = () => {
    console.log('Adding to cart:', product);
    // Implement cart functionality
  };

  return (
    <Button
      variant="primary"
      size={size}
      startIcon={<ShoppingCartIcon />}
      onClick={handleAddToCart}
      fullWidth={fullWidth}
    >
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;