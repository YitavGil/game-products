// src/lib/api.ts
import axios from 'axios';
import { ProductCategory, PaginatedResponse, Product, Review } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface ProductQueryParams {
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

export const productApi = {
  getProducts: async (params: ProductQueryParams = {}): Promise<PaginatedResponse<Product>> => {
    const response = await api.get('/products', { params });
    return response.data;
  },
  
  getProductById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data.data;
  },
  
  getProductsByCategory: async (category: ProductCategory, params: ProductQueryParams = {}): Promise<PaginatedResponse<Product>> => {
    const response = await api.get(`/products/category/${category}`, { params });
    return response.data;
  },
};

export const reviewApi = {
  getReviewsByProduct: async (productId: string): Promise<PaginatedResponse<Review>> => {
    const response = await api.get(`/reviews/product/${productId}`);
    return response.data;
  },
  
  createReview: async (review: { productId: string; userName: string; rating: number; comment: string }): Promise<Review> => {
    const response = await api.post('/reviews', review);
    return response.data.data;
  },
};