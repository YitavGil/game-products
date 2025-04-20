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
  getReviewsByProduct: async (productId: string, page = 1, limit = 10): Promise<PaginatedResponse<Review>> => {
    try {
      const response = await api.get(`/reviews/product/${productId}`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },
  
  createReview: async (reviewData: { productId: string; userName: string; rating: number; comment: string }): Promise<Review> => {
    try {
      const response = await api.post('/reviews', reviewData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  },
};