export interface BaseProduct {
    _id?: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: ProductCategory;
    createdAt?: Date;
    updatedAt?: Date;
    inStock: boolean;
    rating?: number; 
    reviews?: Review[];
  }
  
  export enum ProductCategory {
    GAME = 'game',
    HARDWARE = 'hardware',
    MERCHANDISE = 'merchandise'
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
    model: string;
    specs: Record<string, any>;
    compatibleWith: string[];
  }
  
  export interface Merchandise extends BaseProduct {
    size?: string;
    color?: string;
    material?: string;
    relatedTo?: string;
  }
  
  export interface Review {
    _id?: string;
    productId: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt?: Date;
  }

  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
  }
  
  export interface ProductQueryParams {
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
  
  export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }