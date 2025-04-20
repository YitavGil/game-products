// src/models/Product.ts
import mongoose, { Schema, model, Model } from 'mongoose';
import { ProductCategory, Product as ProductType, Game as GameType, Hardware as HardwareType, Merchandise as MerchandiseType } from '@/types';

// Base Product Schema
const productSchema = new Schema(
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

// Only create the models once
const models = mongoose.models;

// Base product model
export const Product: Model<ProductType> = 
  models.Product || model('Product', productSchema);

// Game Schema
const gameSchema = new Schema({
  genre: { type: [String], required: true },
  platforms: { type: [String], required: true },
  releaseDate: { type: Date, required: true },
  publisher: { type: String, required: true },
  developer: { type: String, required: true }
});

// Only create discriminators if they don't exist yet
// First, check if the models already exist
if (!models.game) {
  Product.discriminator(ProductCategory.GAME, gameSchema);
}

// Hardware Schema
const hardwareSchema = new Schema({
  brand: { type: String, required: true },
  modelNumber: { type: String, required: true },
  specs: { type: Schema.Types.Mixed, required: true },
  compatibleWith: { type: [String], required: true }
});

if (!models.hardware) {
  Product.discriminator(ProductCategory.HARDWARE, hardwareSchema);
}

// Merchandise Schema
const merchandiseSchema = new Schema({
  size: String,
  color: String,
  material: String,
  relatedTo: String
});

if (!models.merchandise) {
  Product.discriminator(ProductCategory.MERCHANDISE, merchandiseSchema);
}

// Export the Game, Hardware, and Merchandise models using existing models if they exist
export const Game = models.game;
export const Hardware = models.hardware;
export const Merchandise = models.merchandise;

// Helper function to properly type the product data
export function mapProductData(data: any[]): ProductType[] {
  return data.map(item => {
    // Convert MongoDB _id to string id if needed
    const product = {
      ...item,
      _id: item._id.toString()
    };
    
    // Cast to the appropriate type based on category
    switch (product.category) {
      case ProductCategory.GAME:
        return product as GameType;
      case ProductCategory.HARDWARE:
        return product as HardwareType;
      case ProductCategory.MERCHANDISE:
        return product as MerchandiseType;
      default:
        return product as ProductType;
    }
  });
}