// src/utils/product-helpers.ts
import { ProductCategory } from '@/types';

export const getCategoryLabel = (category: ProductCategory): string => {
  switch (category) {
    case ProductCategory.GAME:
      return 'Game';
    case ProductCategory.HARDWARE:
      return 'Hardware';
    case ProductCategory.MERCHANDISE:
      return 'Merch';
    default:
      return category;
  }
};