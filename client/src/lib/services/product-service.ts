import { ObjectId } from 'mongodb';
import clientPromise from '../mongodb';
import { Product, ProductCategory } from '../types';

// Database and collection names
const DB_NAME = 'Catalog'; // Update this to match your MongoDB database name
const PRODUCTS_COLLECTION = 'products';

/**
 * Get products with filtering
 */
export async function getProducts({
  search = '',
  category,
  genre,
  platform,
  minPrice,
  maxPrice,
  sort = 'createdAt',
  page = 1,
  limit = 12,
}: {
  search?: string;
  category?: ProductCategory;
  genre?: string;
  platform?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  limit?: number;
}) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(PRODUCTS_COLLECTION);

    // Build query
    const query: any = {};
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = Number(minPrice);
      if (maxPrice !== undefined) query.price.$lte = Number(maxPrice);
    }
    
    // Game-specific filters
    if (category === ProductCategory.GAME) {
      if (genre) {
        query.genre = { $in: genre.split(',') };
      }
      
      if (platform) {
        query.platforms = { $in: platform.split(',') };
      }
    }
    
    // Sorting
    let sortOption: any = { createdAt: -1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };
    if (sort === 'rating') sortOption = { rating: -1 };
    if (sort === 'name') sortOption = { name: 1 };
    
    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    
    // Execute query
    const products = await collection
      .find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit))
      .toArray();
    
    const total = await collection.countDocuments(query);
    
    return {
      success: true,
      count: products.length,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: products as unknown as Product[]
    };
  } catch (error) {
    console.error('Error fetching products from MongoDB:', error);
    throw error;
  }
}

/**
 * Get a single product by ID
 */
export async function getProductById(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    // Check if id is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return {
        success: false,
        error: 'Invalid product ID'
      };
    }
    
    const product = await db
      .collection(PRODUCTS_COLLECTION)
      .findOne({ _id: new ObjectId(id) });
    
    if (!product) {
      return {
        success: false,
        error: 'Product not found'
      };
    }
    
    return {
      success: true,
      data: product as unknown as Product
    };
  } catch (error) {
    console.error('Error fetching product from MongoDB:', error);
    throw error;
  }
}

/**
 * Get products by category
 */
export async function getProductsByCategory(
  category: string,
  {
    search = '',
    genre,
    platform,
    minPrice,
    maxPrice,
    sort = 'createdAt',
    page = 1,
    limit = 12,
  }: {
    search?: string;
    genre?: string;
    platform?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    page?: number;
    limit?: number;
  }
) {
  try {
    // Validate category
    if (!Object.values(ProductCategory).includes(category as ProductCategory)) {
      return {
        success: false,
        error: 'Invalid category'
      };
    }
    
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(PRODUCTS_COLLECTION);
    
    // Build query
    const query: any = { category };
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = Number(minPrice);
      if (maxPrice !== undefined) query.price.$lte = Number(maxPrice);
    }
    
    // Category-specific filters
    if (category === ProductCategory.GAME) {
      if (genre) {
        query.genre = { $in: genre.split(',') };
      }
      
      if (platform) {
        query.platforms = { $in: platform.split(',') };
      }
    }
    
    // Sorting
    let sortOption: any = { createdAt: -1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };
    if (sort === 'rating') sortOption = { rating: -1 };
    if (sort === 'name') sortOption = { name: 1 };
    
    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    
    // Execute query
    const products = await collection
      .find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit))
      .toArray();
    
    const total = await collection.countDocuments(query);
    
    return {
      success: true,
      count: products.length,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: products as unknown as Product[]
    };
  } catch (error) {
    console.error('Error fetching products by category from MongoDB:', error);
    throw error;
  }
}