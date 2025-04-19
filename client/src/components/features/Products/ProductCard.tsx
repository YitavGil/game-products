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
  height: '240px', // Increased height for better image display
  width: '100%',
  backgroundColor: '#121926', // Slightly darker than background for contrast
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden', // Prevent image overflow
  padding: theme.spacing(2),
}));

const ProductTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  lineHeight: 1.2,
  height: '2.4rem', // Fixed height for 2 lines
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  marginBottom: theme.spacing(1),
}));

const ProductDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  lineHeight: 1.5,
  height: '2.625rem', // Fixed height for 2 lines
  marginBottom: theme.spacing(1),
}));

const CardActionsContainer = styled(Card.Actions)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingTop: theme.spacing(1.5),
  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '60px', // Fixed height for actions area
}));

const PriceText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  fontSize: '1.125rem',
}));

const ButtonsContainer = styled(Box)({
  display: 'flex',
  gap: '8px',
});

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

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card
      sx={{
        height: '420px', // Increased card height
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1E293B', // Ensure consistent background color
        overflow: 'hidden', // Prevent content overflow
      }}
    >
      <ProductImageContainer>
        <CardActionArea
          component={Link}
          href={`/product/${product._id}`}
          sx={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CardMedia
            component="img"
            image={product.imageUrl}
            alt={product.name}
            sx={{ 
              maxWidth: '90%', 
              maxHeight: '90%', 
              objectFit: 'contain',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
        </CardActionArea>

        <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 5 }}>
          <Chip
            variant="category"
            label={getCategoryLabel(product.category)}
            size="small"
          />
        </Box>
      </ProductImageContainer>

      <Card.Content sx={{ 
        p: 2, 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <Box>
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

          <ProductDescription>
            {product.description}
          </ProductDescription>
        </Box>

        <Box sx={{ mt: 'auto' }}>
          {product.category === ProductCategory.GAME && 'genre' in product && product.genre?.length > 0 && (
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
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
        </Box>
      </Card.Content>

      <CardActionsContainer>
        <PriceText>
          ${product.price.toFixed(2)}
        </PriceText>

        <ButtonsContainer>
          <Button
            variant="outlined"
            size="small"
            aria-label="Add to favorites"
            sx={{ minWidth: '36px', width: '36px', height: '36px', p: 0 }}
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
        </ButtonsContainer>
      </CardActionsContainer>
    </Card>
  );
};