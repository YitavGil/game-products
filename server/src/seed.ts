import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { 
  GameModel, 
  HardwareModel, 
  MerchandiseModel,
  ProductCategory 
} from './models';

// Load environment variables
dotenv.config();

// Sample game data
const games = [
  {
    name: "Elden Ring",
    description: "Elden Ring is an action role-playing game developed by FromSoftware and published by Bandai Namco Entertainment. The game was directed by Hidetaka Miyazaki and made in collaboration with fantasy novelist George R. R. Martin.",
    price: 59.99,
    imageUrl: "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/phvVT0qZfcRms5qDAk0SI3CM.png",
    category: ProductCategory.GAME,
    inStock: true,
    genre: ["RPG", "Action", "Open World"],
    platforms: ["PlayStation 5", "Xbox Series X", "PC"],
    releaseDate: new Date("2022-02-25"),
    publisher: "Bandai Namco",
    developer: "FromSoftware"
  },
  {
    name: "God of War Ragnarök",
    description: "God of War Ragnarök is an action-adventure game developed by Santa Monica Studio and published by Sony Interactive Entertainment. It was released worldwide on November 9, 2022, for the PlayStation 4 and PlayStation 5.",
    price: 69.99,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ87Z9Cq3gbWvQVis0hqQOcojQi25GKnlGUDQ&s",
    category: ProductCategory.GAME,
    inStock: true,
    genre: ["Action", "Adventure"],
    platforms: ["PlayStation 5", "PlayStation 4"],
    releaseDate: new Date("2022-11-09"),
    publisher: "Sony Interactive Entertainment",
    developer: "Santa Monica Studio"
  },
  {
    name: "Cyberpunk 2077",
    description: "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.",
    price: 39.99,
    imageUrl: "https://image.api.playstation.com/vulcan/ap/rnd/202111/3013/cKZ4tKNFj9C00giTzYtH8PF1.png",
    category: ProductCategory.GAME,
    inStock: true,
    genre: ["RPG", "Action", "Open World"],
    platforms: ["PlayStation 5", "Xbox Series X", "PC"],
    releaseDate: new Date("2020-12-10"),
    publisher: "CD Projekt",
    developer: "CD Projekt Red"
  },
  {
    name: "The Legend of Zelda: Tears of the Kingdom",
    description: "The sequel to The Legend of Zelda: Breath of the Wild is set in the same world, but with new gameplay elements and an expanded world that includes the skies above Hyrule.",
    price: 69.99,
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/f/fb/The_Legend_of_Zelda_Tears_of_the_Kingdom_cover.jpg",
    category: ProductCategory.GAME,
    inStock: true,
    genre: ["Action", "Adventure", "Open World"],
    platforms: ["Nintendo Switch"],
    releaseDate: new Date("2023-05-12"),
    publisher: "Nintendo",
    developer: "Nintendo"
  },
  {
    name: "Call of Duty: Modern Warfare III",
    description: "Call of Duty: Modern Warfare III is a first-person shooter game developed by Infinity Ward and published by Activision.",
    price: 69.99,
    imageUrl: "https://image.api.playstation.com/vulcan/ap/rnd/202308/1722/15f4ab1e0fe6a37609b164362a653c0e5bcee98a861d0f10.png",
    category: ProductCategory.GAME,
    inStock: true,
    genre: ["FPS", "Action"],
    platforms: ["PlayStation 5", "Xbox Series X", "PC"],
    releaseDate: new Date("2023-11-10"),
    publisher: "Activision",
    developer: "Infinity Ward"
  }
];

// Sample hardware data
const hardware = [
  {
    name: "PlayStation 5",
    description: "The PlayStation 5 (PS5) is a home video game console developed by Sony Interactive Entertainment.",
    price: 499.99,
    imageUrl: "https://media.direct.playstation.com/is/image/sierialto/PS5-digital-edition-front-with-dualsense",
    category: ProductCategory.HARDWARE,
    inStock: true,
    brand: "Sony",
    modelNumber: "CFI-1000A",
    specs: {
      cpu: "AMD Zen 2, 8 cores at 3.5GHz",
      gpu: "AMD RDNA 2, 10.28 TFLOPS",
      storage: "825GB SSD",
      memory: "16GB GDDR6"
    },
    compatibleWith: ["PlayStation 5 Games"]
  },
  {
    name: "Xbox Series X",
    description: "The Xbox Series X is a home video game console developed by Microsoft.",
    price: 499.99,
    imageUrl: "https://i.guim.co.uk/img/media/b1f45f6b84b40e8e1f17b78ce9ae39bc25c6dc36/323_0_1417_850/master/1417.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=ca11f848f93038a71e7196ac0cc79d42",
    category: ProductCategory.HARDWARE,
    inStock: true,
    brand: "Microsoft",
    modelNumber: "Series X",
    specs: {
      cpu: "AMD Zen 2, 8 cores at 3.8GHz",
      gpu: "AMD RDNA 2, 12 TFLOPS",
      storage: "1TB SSD",
      memory: "16GB GDDR6"
    },
    compatibleWith: ["Xbox Series X Games", "Xbox One Games"]
  },
  {
    name: "SteelSeries Arctis Pro Wireless",
    description: "Premium high-resolution gaming headset with swappable dual-battery system.",
    price: 329.99,
    imageUrl: "https://m.media-amazon.com/images/I/41sT7BnVFiL._AC_UF894,1000_QL80_.jpg",
    category: ProductCategory.HARDWARE,
    inStock: true,
    brand: "SteelSeries",
    modelNumber: "Arctis Pro Wireless",
    specs: {
      driver: "40mm",
      frequency: "10-40,000Hz",
      connectivity: "2.4GHz wireless, Bluetooth",
      batteryLife: "20 hours (with 2 batteries)"
    },
    compatibleWith: ["PC", "PlayStation", "Nintendo Switch", "Mobile"]
  },
  {
    name: "Razer BlackWidow V3 Pro",
    description: "Wireless mechanical gaming keyboard with Razer Chroma RGB",
    price: 229.99,
    imageUrl: "https://assets2.razerzone.com/images/pnx.assets/9a4267d1a3614ac6bbc05bf89e706b3b/razer-blackwidow-v3-pro-usp01-mobile.jpg",
    category: ProductCategory.HARDWARE,
    inStock: true,
    brand: "Razer",
    modelNumber: "BlackWidow V3 Pro",
    specs: {
      switches: "Razer Green Mechanical",
      connectivity: "Razer HyperSpeed Wireless, Bluetooth, USB-C",
      batteryLife: "Up to 192 hours",
      layout: "Full-size with numeric keypad"
    },
    compatibleWith: ["PC", "Mac"]
  }
];

// Sample merchandise data
const merchandise = [
  {
    name: "The Last of Us Part II T-Shirt",
    description: "Official The Last of Us Part II logo t-shirt in black.",
    price: 24.99,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiUaTQxV-7oRgzLTrwz6tFr2ZLNRHBJCGPPA&s",
    category: ProductCategory.MERCHANDISE,
    inStock: true,
    size: "Medium",
    color: "Black",
    material: "100% Cotton",
    relatedTo: "The Last of Us Part II"
  },
  {
    name: "Halo Master Chief Helmet Replica",
    description: "Full-scale wearable replica of the Master Chief's helmet from Halo Infinite.",
    price: 149.99,
    imageUrl: "https://m.media-amazon.com/images/I/51qYRmRI+cL.jpg",
    category: ProductCategory.MERCHANDISE,
    inStock: true,
    size: "One Size",
    color: "Green",
    material: "High-quality plastic",
    relatedTo: "Halo Infinite"
  },
  {
    name: "Pokémon Pikachu Plush",
    description: "Adorable Pikachu plush toy, officially licensed by The Pokémon Company.",
    price: 19.99,
    imageUrl: "https://m.media-amazon.com/images/I/81aZ0KtrfVL.jpg",
    category: ProductCategory.MERCHANDISE,
    inStock: true,
    size: "8 inches",
    color: "Yellow",
    material: "Polyester",
    relatedTo: "Pokémon"
  }
];

/**
 * Seed the database with mock data
 */
const seedDatabase = async () => {
  try {
    // Connect to MongoDB - check for both environment variable names
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!mongoUri) {
      throw new Error('MongoDB URI not found in environment variables');
    }
    
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding');

    // Check if database already has data using Mongoose models
    const [gamesCount, hardwareCount, merchandiseCount] = await Promise.all([
      GameModel.countDocuments(),
      HardwareModel.countDocuments(),
      MerchandiseModel.countDocuments()
    ]);
    
    const totalProductsCount = gamesCount + hardwareCount + merchandiseCount;
    
    if (totalProductsCount > 0) {
      console.log('Database already has data, skipping seed');
      
      // If running as standalone script, disconnect and exit
      if (require.main === module) {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
        process.exit(0);
      }
      
      return false;
    }

    // Clear existing data
    await Promise.all([
      GameModel.deleteMany({}),
      HardwareModel.deleteMany({}),
      MerchandiseModel.deleteMany({})
    ]);
    
    console.log('Existing data cleared');

    // Insert new data
    await Promise.all([
      GameModel.insertMany(games),
      HardwareModel.insertMany(hardware),
      MerchandiseModel.insertMany(merchandise)
    ]);
    
    console.log('Database seeded successfully!');
    console.log(`- ${games.length} games added`);
    console.log(`- ${hardware.length} hardware items added`);
    console.log(`- ${merchandise.length} merchandise items added`);
    
    // If running as standalone script, disconnect and exit
    if (require.main === module) {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
      process.exit(0);
    }
    
    return true;
  } catch (error) {
    console.error('Error seeding database:', error);
    
    // If running as standalone script, exit with error
    if (require.main === module) {
      process.exit(1);
    }
    
    throw error;
  }
};

// Only run seed automatically if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

// Export for use in other files
export default seedDatabase;