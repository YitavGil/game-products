import { Box, Typography, Paper, Grid } from '@mui/material';
import { ProductCategory } from '@/types';
import { Chip } from '@/components/common';

interface ProductDetailsProps {
  product: any;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const sectionTitleSx = {
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
  };

  const paperSx = { 
    p: 2, 
    backgroundColor: 'rgba(26, 32, 44, 0.4)', 
    borderRadius: 2,
    height: '100%',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  };
  
  const labelSx = {
    mb: 0.5, 
    fontSize: '0.7rem', 
    textTransform: 'uppercase', 
    letterSpacing: 1
  };

  switch (product.category) {
    case ProductCategory.GAME:
      return (
        <Box sx={{ mt: 4 }}>
          <Typography 
            variant="h5" 
            component="h2" 
            sx={sectionTitleSx}
          >
            Game Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <Paper elevation={0} sx={paperSx}>
                <Typography 
                  variant="subtitle2" 
                  color="text.secondary" 
                  sx={labelSx}
                >
                  Developer
                </Typography>
                <Typography sx={{ fontWeight: 500 }}>
                  {product.developer || 'Unknown'}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} md={3}>
              <Paper elevation={0} sx={paperSx}>
                <Typography 
                  variant="subtitle2" 
                  color="text.secondary" 
                  sx={labelSx}
                >
                  Publisher
                </Typography>
                <Typography sx={{ fontWeight: 500 }}>
                  {product.publisher || 'Unknown'}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} md={3}>
              <Paper elevation={0} sx={paperSx}>
                <Typography 
                  variant="subtitle2" 
                  color="text.secondary" 
                  sx={labelSx}
                >
                  Release Date
                </Typography>
                <Typography sx={{ fontWeight: 500 }}>
                  {product.releaseDate 
                    ? new Date(product.releaseDate).toLocaleDateString() 
                    : 'Unknown'}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} md={3}>
              <Paper elevation={0} sx={paperSx}>
                <Typography 
                  variant="subtitle2" 
                  color="text.secondary" 
                  sx={labelSx}
                >
                  Genres
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {product.genre?.map((genre: string, index: number) => (
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
            sx={sectionTitleSx}
          >
            Hardware Specifications
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Paper elevation={0} sx={paperSx}>
                <Typography 
                  variant="subtitle2" 
                  color="text.secondary" 
                  sx={labelSx}
                >
                  Brand
                </Typography>
                <Typography sx={{ fontWeight: 500 }}>
                  {product.brand || 'Unknown'}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={0} sx={paperSx}>
                <Typography 
                  variant="subtitle2" 
                  color="text.secondary" 
                  sx={labelSx}
                >
                  Model
                </Typography>
                <Typography sx={{ fontWeight: 500 }}>
                  {product.modelNumber || 'Unknown'}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={0} sx={paperSx}>
                <Typography 
                  variant="subtitle2" 
                  color="text.secondary" 
                  sx={labelSx}
                >
                  Compatible With
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                  {product.compatibleWith?.map((platform: string, index: number) => (
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
            sx={sectionTitleSx}
          >
            Product Information
          </Typography>
          <Grid container spacing={2}>
            {product.size && (
              <Grid item xs={6} md={3}>
                <Paper elevation={0} sx={paperSx}>
                  <Typography 
                    variant="subtitle2" 
                    color="text.secondary" 
                    sx={labelSx}
                  >
                    Size
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    {product.size}
                  </Typography>
                </Paper>
              </Grid>
            )}
            {product.color && (
              <Grid item xs={6} md={3}>
                <Paper elevation={0} sx={paperSx}>
                  <Typography 
                    variant="subtitle2" 
                    color="text.secondary" 
                    sx={labelSx}
                  >
                    Color
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    {product.color}
                  </Typography>
                </Paper>
              </Grid>
            )}
            {product.material && (
              <Grid item xs={6} md={3}>
                <Paper elevation={0} sx={paperSx}>
                  <Typography 
                    variant="subtitle2" 
                    color="text.secondary" 
                    sx={labelSx}
                  >
                    Material
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    {product.material}
                  </Typography>
                </Paper>
              </Grid>
            )}
            {product.relatedTo && (
              <Grid item xs={6} md={3}>
                <Paper elevation={0} sx={paperSx}>
                  <Typography 
                    variant="subtitle2" 
                    color="text.secondary" 
                    sx={labelSx}
                  >
                    Related To
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    {product.relatedTo}
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
}