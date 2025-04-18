// src/components/features/Products/ProductCard.tsx
import { Card, CardActionArea, CardMedia, CardContent, Typography, Box, Rating, Chip, CardActions, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from 'next/link';
import { Product, ProductCategory } from '@/types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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

  const getCategoryColor = (category: ProductCategory) => {
    switch (category) {
      case ProductCategory.GAME:
        return '#8B5CF6'; // primary
      case ProductCategory.HARDWARE:
        return '#4F46E5'; // secondary
      case ProductCategory.MERCHANDISE:
        return '#F43F5E'; // accent
      default:
        return '#8B5CF6';
    }
  };

  return (
    <Card 
      sx={{ 
        width: '100%',
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: '12px',
        overflow: 'hidden',
        bgcolor: '#1E293B',
        height: '420px' // Fixed height for all cards
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Box 
          sx={{ 
            height: '220px', 
            width: '100%', 
            bgcolor: '#1E293B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CardActionArea 
            component={Link} 
            href={`/product/${product._id}`}
            sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <CardMedia
              component="img"
              image={product.imageUrl}
              alt={product.name}
              sx={{ 
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                p: 2
              }}
            />
          </CardActionArea>
        </Box>
        
        <Chip
          label={getCategoryLabel(product.category)}
          size="small"
          sx={{ 
            position: 'absolute', 
            top: 8, 
            right: 8,
            fontWeight: 'bold',
            bgcolor: getCategoryColor(product.category),
            color: 'white'
          }}
        />
      </Box>
      
      <CardContent sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{
            fontWeight: 600,
            fontSize: '1rem',
            mb: 1,
            lineHeight: 1.2,
            height: '2.4rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
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
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            {product.rating.toFixed(1)}
          </Typography>
        </Box>
        
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: 1.5,
            mb: 1
          }}
        >
          {product.description}
        </Typography>
        
        {product.category === ProductCategory.GAME && 'genre' in product && product.genre.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, mt: 'auto', mb: 1, flexWrap: 'wrap' }}>
            {product.genre.slice(0, 2).map((genre, index) => (
              <Chip 
                key={index} 
                label={genre} 
                size="small" 
                variant="outlined" 
                sx={{ height: '20px', fontSize: '0.7rem' }} 
              />
            ))}
          </Box>
        )}
      </CardContent>
      
      <CardActions sx={{ p: 2, pt: 0, borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', mr: 'auto' }}>
          ${product.price.toFixed(2)}
        </Typography>
        
        <Button 
          size="small" 
          variant="outlined"
          aria-label="Add to favorites"
          sx={{ minWidth: '36px', p: '6px' }}
        >
          <FavoriteIcon fontSize="small" />
        </Button>
        
        <Button 
          size="small" 
          variant="contained" 
          startIcon={<ShoppingCartIcon />}
          sx={{ ml: 1 }}
        >
          Add
        </Button>
      </CardActions>
    </Card>
  );
};