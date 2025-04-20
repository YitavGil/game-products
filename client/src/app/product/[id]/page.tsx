// src/app/product/[id]/page.tsx
import { Box, Container, Grid, Typography, Paper, Rating, Divider } from '@mui/material';
import { getProductById } from '@/lib/products';
import { notFound } from 'next/navigation';
import { ProductCategory } from '@/types';
import Image from 'next/image';
import { Chip } from '@/components/common';
import { Suspense } from 'react';
import ProductReviews from '@/components/features/Products/ProductReviews';
import AddToCartButton from '@/components/features/Products/AddToCartButton';
import LoadingSpinner from '@/components/common/Loader/LoadingSpinner';

export const dynamic = 'force-dynamic'; // Allow for revalidation of product data

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id);
  
  if (!product) {
    notFound();
  }

  const renderProductSpecifics = () => {
    switch (product.category) {
      case ProductCategory.GAME:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>Game Details</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Developer
                </Typography>
                <Typography>{(product as any).developer || 'Unknown'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Publisher
                </Typography>
                <Typography>{(product as any).publisher || 'Unknown'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Release Date
                </Typography>
                <Typography>
                  {(product as any).releaseDate 
                    ? new Date((product as any).releaseDate).toLocaleDateString() 
                    : 'Unknown'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Genres
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(product as any).genre?.map((genre: string, index: number) => (
                    <Chip key={index} label={genre} size="small" />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        );
      case ProductCategory.HARDWARE:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>Hardware Specifications</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Brand
                </Typography>
                <Typography>{(product as any).brand || 'Unknown'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Model
                </Typography>
                <Typography>{(product as any).modelNumber || 'Unknown'}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Compatible With
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(product as any).compatibleWith?.map((platform: string, index: number) => (
                    <Chip key={index} label={platform} size="small" />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        );
      case ProductCategory.MERCHANDISE:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>Product Information</Typography>
            <Grid container spacing={2}>
              {(product as any).size && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Size
                  </Typography>
                  <Typography>{(product as any).size}</Typography>
                </Grid>
              )}
              {(product as any).color && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Color
                  </Typography>
                  <Typography>{(product as any).color}</Typography>
                </Grid>
              )}
              {(product as any).material && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Material
                  </Typography>
                  <Typography>{(product as any).material}</Typography>
                </Grid>
              )}
              {(product as any).relatedTo && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Related To
                  </Typography>
                  <Typography>{(product as any).relatedTo}</Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={5}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              backgroundColor: 'background.paper', 
              borderRadius: 2,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Box sx={{ position: 'relative', width: '100%', height: '400px' }}>
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </Box>
          </Paper>
        </Grid>
        
        {/* Product Info */}
        <Grid item xs={12} md={7}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              backgroundColor: 'background.paper', 
              borderRadius: 2,
              height: '100%'
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Chip
                variant="category"
                label={product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                size="small"
              />
            </Box>
            
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {product.rating.toFixed(1)} ({product.rating ? '1 review' : 'No reviews yet'})
              </Typography>
            </Box>
            
            <Typography variant="h5" sx={{ color: 'primary.main', mb: 2 }}>
              ${product.price.toFixed(2)}
            </Typography>
            
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            
            <Box sx={{ mt: 3, mb: 3 }}>
              <AddToCartButton 
                product={product}
                fullWidth={false}
                size="large"
              />
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            {renderProductSpecifics()}
          </Paper>
        </Grid>
        
        {/* Reviews Section */}
        <Grid item xs={12}>
          <Suspense fallback={<LoadingSpinner message="Loading reviews..." />}>
            <ProductReviews productId={params.id} />
          </Suspense>
        </Grid>
      </Grid>
    </Container>
  );
}