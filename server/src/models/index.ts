import mongoose, { Schema, Document } from 'mongoose';

// Product Types
export enum ProductCategory {
  GAME = 'game',
  HARDWARE = 'hardware',
  MERCHANDISE = 'merchandise'
}

// Base Product Schema
export interface BaseProduct extends Document {
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

// Game Schema
export interface Game extends BaseProduct {
  genre: string[];
  platforms: string[];
  releaseDate: Date;
  publisher: string;
  developer: string;
}

// Hardware Schema
export interface Hardware extends BaseProduct {
  brand: string;
  modelNumber: string; // Changed from 'model' to avoid conflict with Mongoose
  specs: Record<string, any>;
  compatibleWith: string[];
}

// Merchandise Schema
export interface Merchandise extends BaseProduct {
  size?: string;
  color?: string;
  material?: string;
  relatedTo?: string;
}

// Review Schema
export interface Review extends Document {
  productId: mongoose.Types.ObjectId;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

// SCHEMAS

const productSchema = new Schema<BaseProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, required: true },
    category: { 
      type: String,
      required: true,
      enum: Object.values(ProductCategory)
    },
    inStock: { type: Boolean, default: true },
    rating: { type: Number, default: 0, min: 0, max: 5 }
  },
  {
    timestamps: true,
    discriminatorKey: 'category'
  }
);

// Text index for search
productSchema.index({ name: 'text', description: 'text' });

const gameSchema = new Schema<Game>({
  genre: { type: [String], required: true },
  platforms: { type: [String], required: true },
  releaseDate: { type: Date, required: true },
  publisher: { type: String, required: true },
  developer: { type: String, required: true }
});

const hardwareSchema = new Schema<Hardware>({
  brand: { type: String, required: true },
  modelNumber: { type: String, required: true }, // Changed from 'model' to 'modelNumber'
  specs: { type: Schema.Types.Mixed, required: true },
  compatibleWith: { type: [String], required: true }
});

const merchandiseSchema = new Schema<Merchandise>({
  size: String,
  color: String,
  material: String,
  relatedTo: String
});

const reviewSchema = new Schema<Review>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    userName: { type: String, required: true, trim: true },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

// MODELS

// Create base model
const ProductModel = mongoose.model<BaseProduct>('Product', productSchema);

// Create discriminator models
const GameModel = ProductModel.discriminator<Game>(
  ProductCategory.GAME,
  gameSchema
);

const HardwareModel = ProductModel.discriminator<Hardware>(
  ProductCategory.HARDWARE,
  hardwareSchema
);

const MerchandiseModel = ProductModel.discriminator<Merchandise>(
  ProductCategory.MERCHANDISE,
  merchandiseSchema
);

const ReviewModel = mongoose.model<Review>('Review', reviewSchema);

// Update product rating when a new review is added
reviewSchema.post('save', async function() {
  const productId = this.productId;
  
  const stats = await ReviewModel.aggregate([
    { $match: { productId: new mongoose.Types.ObjectId(productId) } },
    { $group: { _id: '$productId', avgRating: { $avg: '$rating' } } }
  ]);

  if (stats.length > 0) {
    await ProductModel.findByIdAndUpdate(productId, {
      rating: Math.round(stats[0].avgRating * 10) / 10
    });
  }
});

export {
  ProductModel,
  GameModel,
  HardwareModel,
  MerchandiseModel,
  ReviewModel
};