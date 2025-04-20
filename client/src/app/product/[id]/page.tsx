// src/app/product/[id]/page.tsx
import { Box, Container, Typography, Paper, Rating, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import { getProductById } from '@/lib/products';
import { notFound } from 'next/navigation';
import { ProductCategory } from '@/types';
import Image from 'next/image';
import { Chip } from '@/components/common';
import { Suspense } from 'react';
import ProductReviews from '@/components/features/Products/ProductReviews';
import LoadingSpinner from '@/components/common/Loader/LoadingSpinner';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';

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
          <Box sx={{ mt: 4 }}>
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                fontSize: '1.5rem', 
                mb: 3,
                fontWeight: 600,
                background: 'linear-gradient(to right, #8B5CF6, #A78BFA)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '40px',
                  height: '3px',
                  background: '#8B5CF6',
                  borderRadius: '2px',
                }
              }}
            >
              Game Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    backgroundColor: 'rgba(26, 32, 44, 0.4)', 
                    borderRadius: 2,
                    height: '100%',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <Typography 
                    variant="subtitle2" 
                    color="text.secondary" 
                    sx={{ mb: 0.5, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1 }}
                  >
                    Developer
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    {(product as any).developer || 'Unknown'}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} md={3}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    backgroundColor: 'rgba(26, 32, 44, 0.4)', 
                    borderRadius: 2,
                    height: '100%',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <Typography 
                    variant="subtitle2" 
                    color="text.secondary" 
                    sx={{ mb: 0.5, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1 }}
                  >
                    Publisher
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    {(product as any).publisher || 'Unknown'}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} md={3}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    backgroundColor: 'rgba(26, 32, 44, 0.4)', 
                    borderRadius: 2,
                    height: '100%',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <Typography 
                    variant="subtitle2" 
                    color="text.secondary" 
                    sx={{ mb: 0.5, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1 }}
                  >
                    Release Date
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    {(product as any).releaseDate 
                      ? new Date((product as any).releaseDate).toLocaleDateString() 
                      : 'Unknown'}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} md={3}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    backgroundColor: 'rgba(26, 32, 44, 0.4)', 
                    borderRadius: 2,
                    height: '100%',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <Typography 
                    variant="subtitle2" 
                    color="text.secondary" 
                    sx={{ mb: 0.5, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1 }}
                  >
                    Genres
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(product as any).genre?.map((genre: string, index: number) => (
                      <Chip 
                        key={index} 
                        label={genre} 
                        size="small" 
                        sx={{ 
                          backgroundColor: 'rgba(79, 70, 229, 0.1)', 
                          borderColor: 'rgba(79, 70, 229, 0.3)',
                          mb: 0.5,
                        }} 
                      />
                    ))}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        );
      case ProductCategory.HARDWARE:
        return (
          <Box sx={{ mt: 4 }}>
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                fontSize: '1.5rem', 
                mb: 3,
                fontWeight: 600,
                background: 'linear-gradient(to right, #8B5CF6, #A78BFA)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '40px',
                  height: '3px',
                  background: '#8B5CF6',
                  borderRadius: '2px',
                }
              }}
            >
              Hardware Specifications
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    backgroundColor: 'rgba(26, 32, 44, 0.4)', 
                    borderRadius: 2,
                    height: '100%',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <Typography 
                    variant="subtitle2" 
                    color="text.secondary" 
                    sx={{ mb: 0.5, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1 }}
                  >
                    Brand
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    {(product as any).brand || 'Unknown'}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    backgroundColor: 'rgba(26, 32, 44, 0.4)', 
                    borderRadius: 2,
                    height: '100%',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <Typography 
                    variant="subtitle2" 
                    color="text.secondary" 
                    sx={{ mb: 0.5, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1 }}
                  >
                    Model
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    {(product as any).modelNumber || 'Unknown'}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    backgroundColor: 'rgba(26, 32, 44, 0.4)', 
                    borderRadius: 2,
                    height: '100%',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <Typography 
                    variant="subtitle2" 
                    color="text.secondary" 
                    sx={{ mb: 0.5, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1 }}
                  >
                    Compatible With
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                    {(product as any).compatibleWith?.map((platform: string, index: number) => (
                      <Chip 
                        key={index} 
                        label={platform} 
                        size="small" 
                        sx={{ 
                          backgroundColor: 'rgba(244, 63, 94, 0.1)', 
                          borderColor: 'rgba(244, 63, 94, 0.3)',
                          mb: 0.5,
                        }} 
                      />
                    ))}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        );
      case ProductCategory.MERCHANDISE:
        return (
          <Box sx={{ mt: 4 }}>
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                fontSize: '1.5rem', 
                mb: 3,
                fontWeight: 600,
                background: 'linear-gradient(to right, #8B5CF6, #A78BFA)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '40px',
                  height: '3px',
                  background: '#8B5CF6',
                  borderRadius: '2px',
                }
              }}
            >
              Product Information
            </Typography>
            <Grid container spacing={2}>
              {(product as any).size && (
                <Grid item xs={6} md={3}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 2, 
                      backgroundColor: 'rgba(26, 32, 44, 0.4)', 
                      borderRadius: 2,
                      height: '100%',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <Typography 
                      variant="subtitle2" 
                      color="text.secondary" 
                      sx={{ mb: 0.5, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1 }}
                    >
                      Size
                    </Typography>
                    <Typography sx={{ fontWeight: 500 }}>
                      {(product as any).size}
                    </Typography>
                  </Paper>
                </Grid>
              )}
              {(product as any).color && (
                <Grid item xs={6} md={3}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 2, 
                      backgroundColor: 'rgba(26, 32, 44, 0.4)', 
                      borderRadius: 2,
                      height: '100%',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <Typography 
                      variant="subtitle2" 
                      color="text.secondary" 
                      sx={{ mb: 0.5, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1 }}
                    >
                      Color
                    </Typography>
                    <Typography sx={{ fontWeight: 500 }}>
                      {(product as any).color}
                    </Typography>
                  </Paper>
                </Grid>
              )}
              {(product as any).material && (
                <Grid item xs={6} md={3}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 2, 
                      backgroundColor: 'rgba(26, 32, 44, 0.4)', 
                      borderRadius: 2,
                      height: '100%',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <Typography 
                      variant="subtitle2" 
                      color="text.secondary" 
                      sx={{ mb: 0.5, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1 }}
                    >
                      Material
                    </Typography>
                    <Typography sx={{ fontWeight: 500 }}>
                      {(product as any).material}
                    </Typography>
                  </Paper>
                </Grid>
              )}
              {(product as any).relatedTo && (
                <Grid item xs={6} md={3}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 2, 
                      backgroundColor: 'rgba(26, 32, 44, 0.4)', 
                      borderRadius: 2,
                      height: '100%',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <Typography 
                      variant="subtitle2" 
                      color="text.secondary" 
                      sx={{ mb: 0.5, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1 }}
                    >
                      Related To
                    </Typography>
                    <Typography sx={{ fontWeight: 500 }}>
                      {(product as any).relatedTo}
                    </Typography>
                  </Paper>
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
      <Paper
        elevation={0}
        sx={{
          p: 3,
          backgroundColor: 'rgba(13, 18, 30, 0.7)',
          borderRadius: 3,
          border: '1px solid rgba(255, 255, 255, 0.05)',
          mb: 4,
          overflow: 'hidden',
        }}
      >
        {/* Category Tag - Top of the page */}
        <Box sx={{ mb: 2 }}>
          <Chip
            variant="category"
            label={product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            size="small"
            sx={{ 
              fontWeight: 600,
              backgroundColor: '#F43F5E',
              color: 'white',
            }}
          />
        </Box>

        {/* Two-column layout for product info and image */}
        <Grid container spacing={4}>
          {/* Left column - Product details */}
          <Grid item xs={12} md={7}>
            {/* Product name */}
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.75rem', sm: '2.25rem' },
                color: '#A78BFA',
                mb: 2,
                fontFamily: '"Russo One", sans-serif',
              }}
            >
              {product.name}
            </Typography>

            {/* Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating
                value={product.rating}
                precision={0.5}
                readOnly
                sx={{
                  color: '#FFD700',
                  '& .MuiRating-iconEmpty': {
                    color: 'rgba(255, 215, 0, 0.2)'
                  }
                }}
              />
              <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                {product.rating.toFixed(1)} ({product.rating ? '1 review' : 'No reviews yet'})
              </Typography>
            </Box>

            {/* Price */}
            <Typography
              variant="h4"
              sx={{
                color: '#8B5CF6',
                fontWeight: 700,
                fontSize: '2rem',
                mb: 3,
              }}
            >
              ${product.price.toFixed(2)}
            </Typography>

            {/* Description */}
            <Typography
              variant="body1"
              paragraph
              sx={{
                color: 'text.secondary',
                mb: 4,
                lineHeight: 1.7,
              }}
            >
              {product.description}
            </Typography>

            {/* Action buttons */}
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <Box
                component="button"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px 24px',
                  backgroundColor: '#8B5CF6',
                  color: 'white',
                  fontWeight: 600,
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#7C3AED',
                    transform: 'translateY(-2px)',
                  },
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                <ShoppingCartIcon sx={{ mr: 1 }} />
                Add to Cart
              </Box>

              <Box
                component="button"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px 24px',
                  backgroundColor: 'transparent',
                  color: '#F43F5E',
                  fontWeight: 600,
                  border: '1px solid rgba(244, 63, 94, 0.5)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: '#F43F5E',
                    backgroundColor: 'rgba(244, 63, 94, 0.05)',
                  },
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                <FavoriteIcon sx={{ mr: 1 }} />
                Add to Wishlist
              </Box>
            </Box>

            {/* Product specifications */}
            {renderProductSpecifics()}
          </Grid>

          {/* Right column - Product image */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                minHeight: { xs: '300px', md: '450px' },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                backgroundColor: 'rgba(11, 17, 32, 0.5)',
                borderRadius: 2,
                overflow: 'hidden',
                p: 2,
              }}
            >
       
            </Box>
          </Grid>
        </Grid>
       
      </Paper>

      {/* Reviews Section */}
      <Suspense fallback={<LoadingSpinner message="Loading reviews..." />}>
        <ProductReviews productId={params.id} />
      </Suspense>
    </Container>
  );
}