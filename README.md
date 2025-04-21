# Game Store: Product Catalog & Reviews Application

## Overview

Game Store is a full-stack e-commerce application designed for gaming enthusiasts, offering a comprehensive catalog of games, hardware, and gaming merchandise. The application provides a seamless browsing experience with server-side rendering, detailed product information, and an interactive review system.

## Key Features

- 🎮 Product Catalog with Multiple Categories
  - Games
  - Hardware
  - Merchandise
- 🔍 Advanced Filtering and Search Functionality
- 📝 Interactive Product Reviews
- 📱 Fully Responsive Design
- 🖥️ Server-Side Rendering (SSR) for Optimal Performance

## Technologies Used

### Frontend
- Next.js 15 (App Router)
- React 19
- TypeScript
- Material-UI (MUI)
- Tanstack Query
- Axios

### Backend
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose

### Database
- MongoDB Atlas

## Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB

## Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/game-store.git
cd game-store
```

2. Install dependencies for both client and server
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables
- Create `.env` files in both `server` and `client` directories
- Add necessary configurations (MongoDB URI, API endpoints)

## Configuration

### Server Configuration
- Create a `.env` file in the `server` directory with:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

### Client Configuration
- Create a `.env` file in the `client` directory with:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Running the Application

1. Seed the Database
```bash
# In the server directory
npm run seed
```

2. Start the Backend Server
```bash
# In the server directory
npm run dev
```
- Backend runs on `http://localhost:5000`

3. Start the Frontend Client
```bash
# In the client directory
npm run dev
```
- Frontend runs on `http://localhost:3000`

## API Endpoints

- `GET /api/products`: Retrieve products
- `GET /api/products/:id`: Get specific product details
- `GET /api/reviews/product/:productId`: Fetch product reviews
- `POST /api/reviews`: Submit a new review

## Design Philosophy

- 🌈 Gaming-themed dark UI with responsive design
- 🚀 Performance-optimized with Server-Side Rendering for Read-Only data
- 💡 Modular and type-safe architecture

## Performance Optimizations

- Server-Side Rendering for initial page loads
- Efficient data fetching with React Query
- Tailwind CSS for minimal CSS bundle size
- Optimized MongoDB queries

## Known Issues

* Image does not appear in the product details page
* Several TypeScript errors exist in the project
* Docker configuration has issues with path aliasing
