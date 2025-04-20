import React from 'react';
import { Box, Container, Grid, Paper, Skeleton, Typography } from '@mui/material';

export default function ProductDetailLoading() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Product Image Skeleton */}
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
            <Skeleton 
              variant="rectangular" 
              width="100%" 
              height={400}
              animation="wave"
              sx={{ borderRadius: 1 }}
            />
          </Paper>
        </Grid>
        
        {/* Product Info Skeleton */}
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
            <Skeleton width={80} height={30} sx={{ mb: 2 }} />
            <Skeleton variant="text" width="70%" height={60} sx={{ mb: 2 }} />
            <Skeleton variant="text" width={160} height={30} sx={{ mb: 2 }} />
            <Skeleton variant="text" width={100} height={40} sx={{ mb: 2 }} />
            
            <Box sx={{ mb: 4 }}>
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="80%" />
            </Box>
            
            <Skeleton variant="rectangular" width={200} height={50} sx={{ mb: 3 }} />
            
            <Skeleton variant="text" width="100%" sx={{ my: 3 }} />
            
            <Typography variant="h6" gutterBottom>
              <Skeleton width={150} />
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Skeleton variant="text" width="60%" height={24} />
                <Skeleton variant="text" width="80%" height={30} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Skeleton variant="text" width="60%" height={24} />
                <Skeleton variant="text" width="80%" height={30} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Skeleton variant="text" width="60%" height={24} />
                <Skeleton variant="text" width="80%" height={30} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Skeleton variant="text" width="60%" height={24} />
                <Skeleton variant="text" width="80%" height={30} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        {/* Reviews Section Skeleton */}
        <Grid item xs={12}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              backgroundColor: 'background.paper', 
              borderRadius: 2,
              mt: 2
            }}
          >
            <Skeleton variant="text" width={150} height={40} sx={{ mb: 3 }} />
            <Skeleton variant="rectangular" width="100%" height={200} sx={{ mb: 2 }} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}