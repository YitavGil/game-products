import { getProductById, getProducts } from '@/lib/services/product-service';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Rating from '@/components/common/Rating';
import Button from '@/components/common/Button';
import ReviewForm from '@/components/features/Reviews/ReviewForm';
import ReviewList from '@/components/features/Reviews/ReviewList';
import ProductList from '@/components/features/Products/ProductList';
import { ProductCategory } from '@/lib/types';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  // Fetch product details using SSR
  const { data: product, success } = await getProductById(params.id);
  
  if (!success || !product) {
    return notFound();
  }
  
  // Fetch related products based on category
  const { data: relatedProducts } = await getProducts({
    category: product.category,
    limit: 4,
    // Exclude current product
    // Note: This is a simplification. In a real app, you might want to get products 
    // with similar genres, tags, etc.
  });
  
  // Filter out the current product from related products
  const filteredRelatedProducts = relatedProducts.filter(p => p._id !== product._id);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-12">
        {/* Breadcrumb */}
        <div className="mb-6 text-text-secondary">
          <Link href="/" className="hover:text-primary">Home</Link>
          {' / '}
          <Link href={`/category/${product.category}`} className="hover:text-primary">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          {' / '}
          <span>{product.name}</span>
        </div>
        
        {/* Product details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product image */}
          <div className="relative h-80 md:h-96 bg-background-card rounded-lg overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>
          
          {/* Product info */}
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <Rating value={product.rating} size="medium" showValue />
            </div>
            
            <p className="text-text-secondary mb-6">{product.description}</p>
            
            {/* Product-specific details */}
            {product.category === ProductCategory.GAME && 'genre' in product && (
              <>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Details</h3>
                  <ul className="space-y-2 text-text-secondary">
                    <li><span className="font-medium">Genre:</span> {product.genre.join(', ')}</li>
                    <li><span className="font-medium">Platforms:</span> {product.platforms.join(', ')}</li>
                    <li><span className="font-medium">Release Date:</span> {new Date(product.releaseDate).toLocaleDateString()}</li>
                    <li><span className="font-medium">Developer:</span> {product.developer}</li>
                    <li><span className="font-medium">Publisher:</span> {product.publisher}</li>
                  </ul>
                </div>
              </>
            )}
            
            {product.category === ProductCategory.HARDWARE && 'brand' in product && (
              <>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Details</h3>
                  <ul className="space-y-2 text-text-secondary">
                    <li><span className="font-medium">Brand:</span> {product.brand}</li>
                    <li><span className="font-medium">Model:</span> {product.modelNumber}</li>
                    <li><span className="font-medium">Compatible With:</span> {product.compatibleWith.join(', ')}</li>
                  </ul>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Specifications</h3>
                  <ul className="space-y-2 text-text-secondary">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <li key={key}>
                        <span className="font-medium">{key}:</span> {value}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
            
            {product.category === ProductCategory.MERCHANDISE && 'material' in product && (
              <>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Details</h3>
                  <ul className="space-y-2 text-text-secondary">
                    {product.size && <li><span className="font-medium">Size:</span> {product.size}</li>}
                    {product.color && <li><span className="font-medium">Color:</span> {product.color}</li>}
                    {product.material && <li><span className="font-medium">Material:</span> {product.material}</li>}
                    {product.relatedTo && <li><span className="font-medium">Related to:</span> {product.relatedTo}</li>}
                  </ul>
                </div>
              </>
            )}
            
            {/* Price and actions */}
            <div className="bg-background-card p-4 rounded-lg mt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold text-text-primary">${product.price.toFixed(2)}</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${
                    product.inStock 
                      ? 'bg-success text-text-primary bg-opacity-20' 
                      : 'bg-error text-text-primary bg-opacity-20'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  variant="primary" 
                  fullWidth 
                  disabled={!product.inStock}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reviews section - Note: These are client components that fetch from the API */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* Client component that fetches reviews from the backend API */}
            <ReviewList productId={params.id} />
          </div>
          <div className="md:col-span-1">
            {/* Client component for submitting reviews to the backend API */}
            <ReviewForm productId={params.id} />
          </div>
        </div>
      </div>
      
      {/* Related products section */}
      {filteredRelatedProducts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">You Might Also Like</h2>
          <ProductList products={filteredRelatedProducts} />
        </div>
      )}
    </div>
  );
}