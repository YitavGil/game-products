// src/lib/products.ts
import clientPromise from './mongoDb';
import { ProductCategory, Product, PaginatedResponse } from '@/types';
import { ObjectId } from 'mongodb';

export interface ProductQueryParams {
  search?: string;
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

export async function getProducts({
  search = '',
  category,
  minPrice,
  maxPrice,
  page = 1,
  limit = 12,
}: ProductQueryParams = {}): Promise<PaginatedResponse<Product>> {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('products');

  // Build filter
  const filter: any = {};
  
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }
  
  if (category) {
    filter.category = category;
  }
  
  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};
    if (minPrice !== undefined) filter.price.$gte = minPrice;
    if (maxPrice !== undefined) filter.price.$lte = maxPrice;
  }

  // Count total matching documents
  const total = await collection.countDocuments(filter);
  
  // Calculate pagination
  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(total / limit);
  
  // Get the data
  const products = await collection
    .find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();
  
  // Convert MongoDB documents to our Product type
  const data = products.map(doc => ({
    ...doc,
    _id: doc._id.toString(),
  })) as unknown as Product[];

  return {
    success: true,
    count: data.length,
    total,
    page,
    totalPages,
    data,
  };
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('products');
    
    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (error) {
      return null; // Invalid ID format
    }
    
    const product = await collection.findOne({ _id: objectId });
    
    if (!product) {
      return null;
    }
    
    return {
      ...product,
      _id: product._id.toString(),
    } as unknown as Product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}