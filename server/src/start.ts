// src/start.ts
import mongoose from 'mongoose';
import seedDatabase from './seed';
import app from './server';

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

async function startServer() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI!);
    console.log('Connected to MongoDB');
    
    // Check if database needs seeding
    const productCount = await mongoose.connection.db.collection('products').countDocuments();
    if (productCount === 0) {
      console.log('Database is empty, running seed...');
      await seedDatabase();
    } else {
      console.log('Database already has data, skipping seed');
    }
    
    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();