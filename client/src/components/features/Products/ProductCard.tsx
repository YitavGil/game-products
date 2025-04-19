// src/components/features/Products/ProductCard.tsx
import React from 'react';
import { CardActionArea, CardMedia, Typography, Box, Rating } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from 'next/link';
import { Product, ProductCategory } from '@/types';
import { Card, Button, Chip } from '@/components/common';
import { styled } from '@mui/material/styles';

interface ProductCardProps {
  product: Product;
}

const ProductImageContainer = styled(Box)(({ theme }) => ({
  height: '220px',
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
}));

const ProductTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  marginBottom: theme.spacing(1),
  lineHeight: 1.2,
  height: '2.4rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
}));

const ProductDescription = styled(Typography)(({ theme }) => ({
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  lineHeight: 1.5,
  marginBottom: theme.spacing(1),
}));

const getCategoryLabel = (category: ProductCategory) => {
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

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card 
      interactive
      sx={{ height: '420px', display: 'flex', flexDirection: 'column' }}
    >
      <ProductImageContainer>
        <CardActionArea 
          component={Link} 
          href={`/product/${product._id}`}
          sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <CardMedia
            component="img"
            image={product.imageUrl}
            alt={product.name}
            sx={{ width: '100%', height: '100%', objectFit: 'contain', p: 2 }}
          />
        </CardActionArea>
        
        <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
          <Chip
            variant="category"
            label={getCategoryLabel(product.category)}
            size="small"
          />
        </Box>
      </ProductImageContainer>
      
      <Card.Content sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <ProductTitle variant="h6">
          {product.name}
        </ProductTitle>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating
            value={product.rating}
            precision={0.5}
            size="small"
            readOnly
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            {product.rating.toFixed(1)}
          </Typography>
        </Box>
        
        <ProductDescription variant="body2" color="text.secondary">
          {product.description}
        </ProductDescription>
        
        {product.category === ProductCategory.GAME && 'genre' in product && product.genre.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, mt: 'auto', mb: 1, flexWrap: 'wrap' }}>
            {product.genre.slice(0, 2).map((genre, index) => (
              <Chip 
                key={index} 
                label={genre} 
                variant="outlined" 
                size="small"
                sx={{ height: '20px', fontSize: '0.7rem' }} 
              />
            ))}
          </Box>
        )}
      </Card.Content>
      
      <Card.Actions sx={{ p: 2, pt: 0, borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', mr: 'auto' }}>
          ${product.price.toFixed(2)}
        </Typography>
        
        <Button
          variant="outlined"
          size="small"
          aria-label="Add to favorites"
          sx={{ minWidth: '36px', p: '6px' }}
        >
          <FavoriteIcon fontSize="small" />
        </Button>
        
        <Button
          variant="primary"
          size="small"
          startIcon={<ShoppingCartIcon />}
          sx={{ ml: 1 }}
        >
          Add
        </Button>
      </Card.Actions>
    </Card>
  );
};