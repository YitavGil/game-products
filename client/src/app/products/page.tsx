import { getProducts } from '@/lib/services/product-service';
import ProductList from '@/components/features/Products/ProductList';
import { ProductCategory } from '@/lib/types';
import Search from '@/components/common/Search';

interface ProductsPageProps {
  searchParams: {
    page?: string;
    search?: string;
    category?: string;
    sort?: string;
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const search = searchParams.search || '';
  const category = searchParams.category as ProductCategory | undefined;
  const sort = searchParams.sort || '-createdAt';

  // Fetch all products using SSR
  const { data: products, success, total, totalPages } = await getProducts({
    page,
    search,
    category,
    sort,
    limit: 12
  });

  if (!success) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-text-primary mb-4">Error</h1>
        <p className="text-text-secondary">Failed to load products.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-background-card rounded-lg p-6 shadow-md">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display text-primary mb-3">
              All Products
            </h1>
            <p className="text-text-secondary mb-2">
              Browse our complete collection of games, hardware, and merchandise.
            </p>
            <div className="text-sm text-text-secondary">
              Showing {products.length} of {total} products
            </div>
          </div>
          
          {/* Search Component */}
          <div className="w-full md:w-64">
            <Search placeholder="Search products..." />
          </div>
        </div>
      </div>

      {/* Product List */}
      <ProductList products={products} />

      {/* Basic Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <a
                key={pageNum}
                href={`/products?page=${pageNum}${search ? `&search=${search}` : ''}${category ? `&category=${category}` : ''}${sort ? `&sort=${sort}` : ''}`}
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