export enum ProductCategory {
    GAME = 'game',
    HARDWARE = 'hardware',
    MERCHANDISE = 'merchandise'
  }
  
  // Base Product interface
  export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: ProductCategory;
    inStock: boolean;
    rating: number;
    createdAt?: string;
    updatedAt?: string;
  }
  
  // Game-specific interface
  export interface Game extends Product {
    genre: string[];
    platforms: string[];
    releaseDate: string;
    publisher: string;
    developer: string;
  }
  
  // Hardware-specific interface
  export interface Hardware extends Product {
    brand: string;
    modelNumber: string;
    specs: Record<string, any>;
    compatibleWith: string[];
  }
  
  // Merchandise-specific interface
  export interface Merchandise extends Product {
    size?: string;
    color?: string;
    material?: string;
    relatedTo?: string;
  }
  
  // Review interface
  export interface Review {
    _id: string;
    productId: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
  }
  
  // API response interfaces
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
  }
  
  export interface PaginatedResponse<T> {
    success: boolean;
    count: number;
    total: number;
    page: number;
    totalPages: number;
    data: T[];
  }
  
  // Filter parameters
  export interface ProductFilterParams {
    search?: string;
    category?: ProductCategory;
    genre?: string;
    platform?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    page?: number;
    limit?: number;
  }