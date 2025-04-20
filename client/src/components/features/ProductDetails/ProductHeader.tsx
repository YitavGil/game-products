// src/components/features/Products/ProductHeader.tsx
import { Box, Typography, Rating } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Chip } from '@/components/common';

interface ProductHeaderProps {
  name: string;
  rating: number;
  price: number;
  description: string;
  category: string;
}

export default function ProductHeader({
  name,
  rating,
  price,
  description,
  category,
}: ProductHeaderProps) {
  return (
    <>
      {/* Category Tag - Top of the page */}
      <Box sx={{ mb: 2 }}>
        <Chip
          variant="category"
          label={category.charAt(0).toUpperCase() + category.slice(1)}
          size="small"
          sx={{ 
            fontWeight: 600,
            backgroundColor: '#F43F5E',
            color: 'white',
          }}
        />
      </Box>

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
        {name}
      </Typography>

      {/* Rating */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Rating
          value={rating}
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
          {rating.toFixed(1)} ({rating ? '1 review' : 'No reviews yet'})
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
        ${price.toFixed(2)}
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
        {description}
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
    </>
  );
}