# Gaming Store API

A simple API for a gaming store catalog and reviews with MongoDB integration.

## Features

- Products API for games, hardware, and gaming merchandise
- Reviews API with rating system
- MongoDB database integration
- Filtering capabilities (by search, category, genre, platform)

## Project Structure

```
src/
├── controllers/    # Request handlers
├── models/         # MongoDB schemas
├── routes/         # API routes
├── middleware/     # Error handling middleware
├── utils/          # Utilities including database seeding
└── server.ts       # Entry point
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB database (local or Atlas)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with your MongoDB connection:

```
MONGO_URI=mongodb+srv://yitav:IMpMZEIhw6oJ22QF@cluster0.yno4a.mongodb.net/Catalog?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
```

### Seeding the Database

To populate the database with sample data:

```bash
npm run seed
```

### Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## API Endpoints

### Products

- `GET /api/products` - Get all products with filters
  - Query parameters:
    - `search` - Search term
    - `category` - Product category (game, hardware, merchandise)
    - `genre` - Filter games by genre (comma-separated)
    - `platform` - Filter games by platform (comma-separated) 
    - `minPrice` - Minimum price
    - `maxPrice` - Maximum price
    - `sort` - Sort option (price_asc, price_desc, rating, name)
    - `page` - Page number
    - `limit` - Items per page

- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category

### Reviews

- `GET /api/reviews/product/:productId` - Get reviews for a product
- `POST /api/reviews` - Create a new review
  - Required fields: `productId`, `userName`, `rating`, `comment`

## Next.js Integration

When using with Next.js, consider:

- Using this API for all write operations (like adding reviews)
- Potentially using Next.js server components to directly fetch from MongoDB for read-heavy operations
- Using this API for complex filtering when client-side filtering becomes impractical