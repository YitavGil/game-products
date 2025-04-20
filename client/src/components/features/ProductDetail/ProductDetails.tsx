// src/components/features/ProductDetail/ProductDetails.tsx
'use client';

import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Rating,
  List,
  ListItem,
  ListItemText,
  Button as MuiButton,
  useTheme,
  useMediaQuery,
  Paper,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Chip } from '@/components/common';
import { ProductCategory, Product, Game, Hardware, Merchandise } from '@/types';
import Link from 'next/link';
import { styled } from '@mui/material/styles';

interface ProductDetailsProps {
  product: Product;
}

const ProductImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxHeight: '400px',
  objectFit: 'contain',
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(1),
  backgroundColor: '#121926', // Matching the same background from ProductCard
  padding: theme.spacing(4),
}));

const ProductDetailsSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(1.5),
  backgroundColor: theme.palette.background.paper,
  border: '1px solid rgba(255, 255, 255, 0.1)',
  height: '100%',
}));

const ProductInfoList = styled(List)(({ theme }) => ({
  '& .MuiListItem-root': {
    paddingLeft: 0,
    paddingRight: 0,
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  },
  '& .MuiListItemText-primary': {
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
  },
  '& .MuiListItemText-secondary': {
    color: theme.palette.text.primary,
    fontWeight: 600,
  },
}));

const PriceText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  fontSize: '2rem',
  marginBottom: theme.spacing(2),
}));

// Helper function to get category label
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

// Helper function to format dates
const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const renderSpecificProductDetails = () => {
    switch (product.category) {
      case ProductCategory.GAME:
        const game = product as Game;
        return (
          <>
            {game.platforms && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Platforms
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {game.platforms.map((platform, index) => (
                    <Chip key={index} label={platform} variant="outlined" size="small" />
                  ))}
                </Box>
              </Box>
            )}
            
            <ProductInfoList disablePadding>
              {game.releaseDate && (
                <ListItem disablePadding sx={{ py: 1.5 }}>
                  <ListItemText 
                    primary="Release Date" 
                    secondary={formatDate(game.releaseDate)}
                  />
                </ListItem>
              )}
              {game.publisher && (
                <ListItem disablePadding sx={{ py: 1.5 }}>
                  <ListItemText 
                    primary="Publisher" 
                    secondary={game.publisher}
                  />
                </ListItem>
              )}
              {game.developer && (
                <ListItem disablePadding sx={{ py: 1.5 }}>
                  <ListItemText 
                    primary="Developer" 
                    secondary={game.developer}
                  />
                </ListItem>
              )}
            </ProductInfoList>
          </>
        );
        
      case ProductCategory.HARDWARE:
        const hardware = product as Hardware;
        return (
          <>
            <ProductInfoList disablePadding>
              {hardware.brand && (
                <ListItem disablePadding sx={{ py: 1.5 }}>
                  <ListItemText 
                    primary="Brand" 
                    secondary={hardware.brand}
                  />
                </ListItem>
              )}
              {hardware.modelNumber && (
                <ListItem disablePadding sx={{ py: 1.5 }}>
                  <ListItemText 
                    primary="Model Number" 
                    secondary={hardware.modelNumber}
                  />
                </ListItem>
              )}
              {hardware.compatibleWith && hardware.compatibleWith.length > 0 && (
                <ListItem disablePadding sx={{ py: 1.5 }}>
                  <ListItemText 
                    primary="Compatible With" 
                    secondary={hardware.compatibleWith.join(', ')}
                  />
                </ListItem>
              )}
            </ProductInfoList>
            
            {hardware.specs && Object.keys(hardware.specs).length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Specifications
                </Typography>
                <ProductInfoList disablePadding>
                  {Object.entries(hardware.specs).map(([key, value]) => (
                    <ListItem key={key} disablePadding sx={{ py: 1.5 }}>
                      <ListItemText 
                        primary={key} 
                        secondary={String(value)}
                      />
                    </ListItem>
                  ))}
                </ProductInfoList>
              </Box>
            )}
          </>
        );
        
      case ProductCategory.MERCHANDISE:
        const merch = product as Merchandise;
        return (
          <ProductInfoList disablePadding>
            {merch.material && (
              <ListItem disablePadding sx={{ py: 1.5 }}>
                <ListItemText 
                  primary="Material" 
                  secondary={merch.material}
                />
              </ListItem>
            )}
            {merch.size && (
              <ListItem disablePadding sx={{ py: 1.5 }}>
                <ListItemText 
                  primary="Size" 
                  secondary={merch.size}
                />
              </ListItem>
            )}
            {merch.color && (
              <ListItem disablePadding sx={{ py: 1.5 }}>
                <ListItemText 
                  primary="Color" 
                  secondary={merch.color}
                />
              </ListItem>
            )}
            {merch.relatedTo && (
              <ListItem disablePadding sx={{ py: 1.5 }}>
                <ListItemText 
                  primary="Related To" 
                  secondary={merch.relatedTo}
                />
              </ListItem>
            )}
          </ProductInfoList>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <MuiButton
        component={Link}
        href="/"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Back to Products
      </MuiButton>
      
      <Grid container spacing={4}>
        {/* Product Image Section */}
        <Grid item xs={12} md={6}>
          <ProductDetailsSection>
            <Box sx={{ textAlign: 'center' }}>
              <ProductImage src={product.imageUrl} alt={product.name} />
            </Box>
          </ProductDetailsSection>
        </Grid>
        
        {/* Product Info Section */}
        <Grid item xs={12} md={6}>
          <ProductDetailsSection sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2 }}>
              <Chip
                variant="category"
                label={getCategoryLabel(product.category)}
                size="small"
              />
            </Box>
            
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating 
                value={product.rating} 
                precision={0.5} 
                readOnly 
                sx={{ mr: 1 }}
              />
              <Typography variant="body2">
                {product.rating.toFixed(1)} rating
              </Typography>
            </Box>
            
            <Typography 
              variant="body1" 
              paragraph 
              sx={{ 
                mb: 3,
                color: theme.palette.text.secondary,
                lineHeight: 1.7
              }}
            >
              {product.description}
            </Typography>
            
            {/* Product category-specific details */}
            {renderSpecificProductDetails()}
            
            <Box 
              sx={{ 
                mt: 'auto', 
                pt: 3,
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'flex-start' : 'center',
                justifyContent: 'space-between'
              }}
            >
              <PriceText>
                ${product.price.toFixed(2)}
              </PriceText>
              
              <Box 
                sx={{ 
                  display: 'flex',
                  gap: 2,
                  width: isMobile ? '100%' : 'auto'
                }}
              >
                <Button
                  variant="outlined"
                  aria-label="Add to favorites"
                  startIcon={<FavoriteIcon />}
                >
                  Wishlist
                </Button>
                
                <Button
                  variant="primary"
                  startIcon={<ShoppingCartIcon />}
                  sx={{ flexGrow: isMobile ? 1 : 0 }}
                >
                  Add to Cart
                </Button>
              </Box>
            </Box>
          </ProductDetailsSection>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;