import { getProducts } from '@/lib/services/product-service';
import ProductList from '@/components/features/Products/ProductList';
import { ProductCategory } from '@/lib/types';
import Link from 'next/link';
import Button from '@/components/common/Button';

export default async function HomePage() {
  // Fetch featured products (latest games) using SSR
  const gamesResponse = await getProducts({
    category: ProductCategory.GAME,
    limit: 4,
    sort: '-createdAt'
  });
  
  // Fetch featured hardware products using SSR
  const hardwareResponse = await getProducts({
    category: ProductCategory.HARDWARE,
    limit: 4,
    sort: '-rating'
  });
  
  const featuredGames = gamesResponse.data || [];
  const featuredHardware = hardwareResponse.data || [];

  return (
    <div className="space-y-12">
      {/* Hero section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background-card rounded-lg shadow-md overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-primary mb-6">
            Level Up Your Gaming Experience
          </h1>
          <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
            Discover the latest games, cutting-edge hardware, and exclusive merchandise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="large" className="sm:w-auto">
              <Link href="/products">
                Browse All Products
              </Link>
            </Button>
            <Button variant="outline" size="large" className="sm:w-auto">
              <Link href={`/category/${ProductCategory.GAME}`}>
                Explore Games
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Games section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-display text-text-primary">
            Latest Games
          </h2>
          <Link 
            href={`/category/${ProductCategory.GAME}`}
            className="text-primary hover:text-primary-hover transition-colors"
          >
            View All Games
          </Link>
        </div>
        <ProductList products={featuredGames} />
      </section>

      {/* Featured Hardware section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-display text-text-primary">
            Top-Rated Hardware
          </h2>
          <Link 
            href={`/category/${ProductCategory.HARDWARE}`}
            className="text-primary hover:text-primary-hover transition-colors"
          >
            View All Hardware
          </Link>
        </div>
        <ProductList products={featuredHardware} />
      </section>

      {/* Categories section */}
      <section className="py-12">
        <h2 className="text-2xl md:text-3xl font-display text-text-primary mb-6 text-center">
          Shop By Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Game Category */}
          <div className="bg-background-card rounded-lg p-6 text-center hover:shadow-glow transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Games</h3>
            <p className="text-text-secondary mb-4">
              Discover the latest releases and classic titles for all platforms.
            </p>
            <Button variant="outline">
              <Link href={`/category/${ProductCategory.GAME}`}>
                Browse Games
              </Link>
            </Button>
          </div>
          
          {/* Hardware Category */}
          <div className="bg-background-card rounded-lg p-6 text-center hover:shadow-glow transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Hardware</h3>
            <p className="text-text-secondary mb-4">
              Upgrade your setup with top-of-the-line gaming hardware and accessories.
            </p>
            <Button variant="outline">
              <Link href={`/category/${ProductCategory.HARDWARE}`}>
                Browse Hardware
              </Link>
            </Button>
          </div>
          
          {/* Merchandise Category */}
          <div className="bg-background-card rounded-lg p-6 text-center hover:shadow-glow transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Merchandise</h3>
            <p className="text-text-secondary mb-4">
              Show your gaming passion with apparel, collectibles, and more.
            </p>
            <Button variant="outline">
              <Link href={`/category/${ProductCategory.MERCHANDISE}`}>
                Browse Merchandise
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}