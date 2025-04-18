import { Request, Response } from 'express';
import { ProductModel, ProductCategory } from '../models';
import mongoose from 'mongoose';

// Get all products with filtering
export const getProducts = async (req: Request, res: Response) => {
  try {
    const { 
      search, 
      category, 
      genre, 
      platform, 
      minPrice, 
      maxPrice,
      sort = 'createdAt',
      page = 1,
      limit = 12
    } = req.query;

    // Build query
    const query: any = {};
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$text = { $search: search as string };
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    // Game-specific filters
    if (category === ProductCategory.GAME) {
      if (genre) {
        query.genre = { $in: (genre as string).split(',') };
      }
      
      if (platform) {
        query.platforms = { $in: (platform as string).split(',') };
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
    
    const products = await ProductModel.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));
    
    const total = await ProductModel.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: products
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get a product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid product ID'
      });
    }
    
    const product = await ProductModel.findById(productId);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get products by category
export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    
    // Validate category
    if (!Object.values(ProductCategory).includes(category as ProductCategory)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid category'
      });
    }
    
    // Get filters from query string
    const { 
      search, 
      genre, 
      platform, 
      minPrice, 
      maxPrice,
      sort = 'createdAt',
      page = 1,
      limit = 12
    } = req.query;
    
    // Build query
    const query: any = { category };
    
    if (search) {
      query.$text = { $search: search as string };
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    // Category-specific filters
    if (category === ProductCategory.GAME) {
      if (genre) {
        query.genre = { $in: (genre as string).split(',') };
      }
      
      if (platform) {
        query.platforms = { $in: (platform as string).split(',') };
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
    
    const products = await ProductModel.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));
    
    const total = await ProductModel.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: products
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};