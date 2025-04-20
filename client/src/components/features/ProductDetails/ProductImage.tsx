// src/components/features/Products/ProductImage.tsx
import { Box } from '@mui/material';
import Image from 'next/image';

interface ProductImageProps {
  imageUrl: string;
  name: string;
}

export default function ProductImage({ imageUrl, name }: ProductImageProps) {
  return (
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
      {/* Using an error handler to catch issues with image loading */}
      <Image
        src={imageUrl || '/placeholder-product.png'} // Fallback to placeholder if imageUrl is invalid
        alt={name}
        fill
        style={{
          objectFit: 'contain',
          padding: '20px',
        }}
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
        onError={(e) => {
          // Fallback to a placeholder if the image fails to load
          const target = e.target as HTMLImageElement;
          target.onerror = null; // Prevent infinite loop
          target.src = '/placeholder-product.png'; // Set a placeholder image
        }}
      />
    </Box>
  );
}