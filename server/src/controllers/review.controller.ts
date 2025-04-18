import { Request, Response } from 'express';
import { ReviewModel, ProductModel } from '../models';
import mongoose from 'mongoose';

// Get reviews for a product
export const getReviewsByProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid product ID'
      });
    }
    
    // Check if product exists
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    
    const reviews = await ReviewModel.find({ productId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
      
    const total = await ReviewModel.countDocuments({ productId });
    
    res.status(200).json({
      success: true,
      count: reviews.length,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: reviews
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Create a review
export const createReview = async (req: Request, res: Response) => {
  try {
    const { productId, userName, rating, comment } = req.body;
    
    // Validate required fields
    if (!productId || !userName || !rating || !comment) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields'
      });
    }
    
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid product ID'
      });
    }
    
    // Check if product exists
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        error: 'Rating must be between 1 and 5'
      });
    }
    
    // Create review
    const review = await ReviewModel.create({
      productId,
      userName,
      rating,
      comment
    });
    
    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};