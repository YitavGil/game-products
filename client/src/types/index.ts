export enum ProductCategory {
    GAME = 'game',
    HARDWARE = 'hardware',
    MERCHANDISE = 'merchandise'
  }
  
  export interface Review {
    _id: string;
    productId: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: Date;
  }
  
  export interface BaseProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: ProductCategory;
    inStock: boolean;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Game extends BaseProduct {
    genre: string[];
    platforms: string[];
    releaseDate: Date;
    publisher: string;
    developer: string;
  }
  
  export interface Hardware extends BaseProduct {
    brand: string;
    modelNumber: string;
    specs: Record<string, any>;
    compatibleWith: string[];
  }
  
  export interface Merchandise extends BaseProduct {
    size?: string;
    color?: string;
    material?: string;
    relatedTo?: string;
  }
  
  export type Product = Game | Hardware | Merchandise;
  
  export interface PaginatedResponse<T> {
    success: boolean;
    count: number;
    total: number;
    page: number;
    totalPages: number;
    data: T[];
  }