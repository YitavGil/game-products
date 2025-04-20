import { getProductsByCategory } from '@/lib/services/product-service';
import { ProductCategory } from '@/lib/types';
import ProductList from '@/components/features/Products/ProductList';
import Search from '@/components/common/Search';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: {
    category: string;
  };
  searchParams: {
    page?: string;
    search?: string;
    sort?: string;
  };
}

export default async function CategoryPage({ 
  params, 
  searchParams 
}: CategoryPageProps) {
  // Validate category param
  const categoryValues = Object.values(ProductCategory);
  if (!categoryValues.includes(params.category as ProductCategory)) {
    return notFound();
  }

  const category = params.category as ProductCategory;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const search = searchParams.search || '';
  const sort = searchParams.sort || '-createdAt';

  // Fetch products for this category using SSR
  const { data: products, success, total, totalPages } = await getProductsByCategory(
    category,
    {
      page,
      search,
      sort,
      limit: 12
    }
  );

  if (!success) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-text-primary mb-4">Error</h1>
        <p className="text-text-secondary">Failed to load products.</p>
      </div>
    );
  }

  // Category-specific metadata
  const categoryInfo = {
    [ProductCategory.GAME]: {
      title: 'Games',
      description: 'Browse our collection of the latest games for all platforms. From action and adventure to RPGs and simulations, find your next gaming obsession.'
    },
    [ProductCategory.HARDWARE]: {
      title: 'Gaming Hardware',
      description: 'Discover premium gaming hardware including consoles, accessories, and peripherals to enhance your gaming experience.'
    },
    [ProductCategory.MERCHANDISE]: {
      title: 'Gaming Merchandise',
      description: 'Show your love for your favorite games with official merchandise including clothing, collectibles, and more.'
    }
  };

  return (
    <div className="space-y-8">
      {/* Category Header */}
      <div className="bg-background-card rounded-lg p-6 shadow-md">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display text-primary mb-3">
              {categoryInfo[category].title}
            </h1>
            <p className="text-text-secondary mb-2">
              {categoryInfo[category].description}
            </p>
            <div className="text-sm text-text-secondary">
              Showing {products.length} of {total} products
            </div>
          </div>
          
          {/* Search Component */}
          <div className="w-full md:w-64">
            <Search placeholder={`Search ${categoryInfo[category].title.toLowerCase()}...`} />
          </div>
        </div>
      </div>

      {/* Product Listing */}
      <ProductList products={products} />

      {/* Basic Pagination - In a real app, this would be more sophisticated */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <a
                key={pageNum}
                href={`/category/${category}?page=${pageNum}${search ? `&search=${search}` : ''}${sort ? `&sort=${sort}` : ''}`}
                className={`px-4 py-2 rounded ${
                  pageNum === page
                    ? 'bg-primary text-text-primary'
                    : 'bg-background-card text-text-secondary hover:bg-background-hover'
                }`}
              >
                {pageNum}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}