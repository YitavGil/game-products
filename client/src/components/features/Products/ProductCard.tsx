// src/components/features/Products/ProductCard.tsx
import React from 'react';
import { CardActionArea, CardMedia, Typography, Box, Rating } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from 'next/link';
import { Product, ProductCategory } from '@/types';
import { Card, Button, Chip } from '@/components/common';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const getCategoryLabel = (category: ProductCategory): string => {
    switch (category) {
      case ProductCategory.GAME:
        return 'Game';
      case ProductCategory.HARDWARE:
        return 'Hardware';
      case ProductCategory.MERCHANDISE:
        return 'Merch';
      default:
        return category;
    }
  };

  return (
    <Card
      sx={{
        width: '434px',
        height: '450px', 
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0B1120',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 10px 25px rgba(139, 92, 246, 0.2)',
          borderColor: '#8B5CF6',
        },
      }}
    >
      {/* Product Image Section */}
      <Box 
        sx={{ 
          position: 'relative',
          height: '200px', // Fixed height for image area
          width: '100%',
          backgroundColor: '#0A101F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <CardActionArea
          component={Link}
          href={`/product/${product._id}`}
          sx={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CardMedia
            component="img"
            image={product.imageUrl}
            alt={product.name}
            sx={{ 
              maxWidth: '80%', 
              maxHeight: '80%', 
              objectFit: 'contain',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              }
            }}
          />
        </CardActionArea>

        <Chip
          variant="category"
          label={getCategoryLabel(product.category)}
          size="small"
          sx={{ 
            position: 'absolute',
            top: 10,
            right: 10,
            fontWeight: 600,
            zIndex: 2
          }}
        />
      </Box>

      {/* Product Info Section */}
      <Box sx={{ 
        p: 2, 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        backgroundColor: '#1E293B',
      }}>
        <Typography 
          variant="h6" 
          sx={{
            fontWeight: 600,
            fontSize: '1rem',
            lineHeight: 1.3,
            height: '2.6rem', // Fixed height for title (2 lines)
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            mb: 1,
          }}
        >
          {product.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating
            value={product.rating}
            precision={0.5}
            size="small"
            readOnly
            sx={{ 
              color: '#FFD700',
              '& .MuiRating-iconEmpty': {
                color: 'rgba(255, 215, 0, 0.2)'
              }
            }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1, fontSize: '0.75rem' }}>
            ({product.rating.toFixed(1)})
          </Typography>
        </Box>

        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            fontSize: '0.875rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: 1.5,
            height: '2.625rem', // Fixed height for description (2 lines)
            mb: 2,
          }}
        >
          {product.description}
        </Typography>

        {/* Genre Tags for Games */}
        {product.category === ProductCategory.GAME && 'genre' in product && product.genre?.length > 0 && (
          <Box sx={{ 
            display: 'flex', 
            gap: 0.5, 
            flexWrap: 'wrap',
            height: '22px', // Fixed height for genre tags
            overflow: 'hidden',
            mb: 1
          }}>
            {product.genre.slice(0, 2).map((genre, index) => (
              <Chip
                key={index}
                label={genre}
                variant="outlined"
                size="small"
                sx={{ 
                  height: '22px', 
                  fontSize: '0.7rem',
                  backgroundColor: 'rgba(79, 70, 229, 0.1)', 
                }}
              />
            ))}
          </Box>
        )}

        <Box sx={{ mt: 'auto' }} />
      </Box>

      {/* Price and Action Buttons */}
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        backgroundColor: '#1E293B',
        height: '60px', // Fixed height for action area
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700,
            color: '#8B5CF6',
            fontSize: '1.125rem',
          }}
        >
          ${product.price.toFixed(2)}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            aria-label="Add to favorites"
            sx={{ 
              minWidth: '36px', 
              width: '36px', 
              height: '36px', 
              p: 0,
              borderRadius: '8px',
              color: '#F43F5E',
              borderColor: 'rgba(244, 63, 94, 0.3)',
              '&:hover': {
                borderColor: '#F43F5E',
                backgroundColor: 'rgba(244, 63, 94, 0.05)',
              }
            }}
          >
            <FavoriteIcon fontSize="small" />
          </Button>

          <Button
            variant="primary"
            size="small"
            startIcon={<ShoppingCartIcon />}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Card>
  );
};