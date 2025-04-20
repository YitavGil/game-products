'use client';

import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Rating,
  Avatar,
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';
import { Review } from '@/types';
import { format } from 'date-fns';

interface DisplayReviewsProps {
  productId: string;
  isLoading: boolean;
  isError: boolean;
  displayReviews: Review[];
}

const DisplayReviews: React.FC<DisplayReviewsProps> = ({ 
  productId, 
  isLoading, 
  isError, 
  displayReviews 
}) => {
  return (
    <>
      <Box sx={{ 
        p: 3, 
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        background: 'linear-gradient(to right, rgba(139, 92, 246, 0.05), rgba(13, 18, 30, 0))'
      }}>
        <Typography 
          variant="h4" 
          sx={{
            fontWeight: 700,
            color: '#A78BFA',
            fontSize: '1.5rem',
            fontFamily: '"Russo One", sans-serif',
          }}
        >
          Customer Reviews
        </Typography>
      </Box>

      {isError && (
        <Box sx={{ p: 3 }}>
          <Alert 
            severity="info" 
            sx={{ 
              backgroundColor: 'rgba(79, 70, 229, 0.1)',
              border: '1px solid rgba(79, 70, 229, 0.2)',
              color: '#A78BFA',
              '& .MuiAlert-icon': {
                color: '#8B5CF6'
              }
            }}
          >
            We're showing sample reviews while our review service is under maintenance. You can still submit your own review!
          </Alert>
        </Box>
      )}

      <Box sx={{ p: 3 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2,
            fontSize: '1.25rem',
            fontWeight: 600
          }}
        >
          {displayReviews.length === 0
            ? 'No reviews yet'
            : `${displayReviews.length} Review${displayReviews.length !== 1 ? 's' : ''}`}
        </Typography>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress sx={{ color: '#8B5CF6' }} />
          </Box>
        ) : (
          <Box>
            {displayReviews.map((review) => (
              <Paper
                key={review._id}
                elevation={0}
                sx={{
                  p: 3,
                  mb: 2,
                  backgroundColor: 'rgba(15, 23, 42, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: 2,
                }}
              >
                <Grid container spacing={2}>
                  <Grid xs={12} sm={3} md={2}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: '#8B5CF6', 
                          width: 60,
                          height: 60,
                          mb: 1,
                        }}
                      >
                        {review.userName.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography sx={{ fontWeight: 600, textAlign: 'center' }}>
                        {review.userName}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ fontSize: '0.75rem', mt: 0.5, textAlign: 'center' }}
                      >
                        {format(new Date(review.createdAt), 'MMM d, yyyy')}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid xs={12} sm={9} md={10}>
                    <Box sx={{ mb: 1.5 }}>
                      <Rating 
                        value={review.rating} 
                        readOnly 
                        size="small"
                        sx={{
                          color: '#FFD700',
                          '& .MuiRating-iconEmpty': {
                            color: 'rgba(255, 215, 0, 0.2)'
                          }
                        }} 
                      />
                    </Box>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'text.secondary',
                        lineHeight: 1.6,
                        mt: 1
                      }}
                    >
                      {review.comment}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default DisplayReviews;