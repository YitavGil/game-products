'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Rating,
  TextField,
  Avatar,
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewApi } from '@/lib/api';
import { Review } from '@/types';
import { Button } from '@/components/common';
import { format } from 'date-fns';

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const queryClient = useQueryClient();
  const [reviewForm, setReviewForm] = useState({
    userName: '',
    rating: 5,
    comment: ''
  });
  const [formError, setFormError] = useState('');

  const {
    data,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => reviewApi.getReviewsByProduct(productId),
    // Add error handling and retry config
    retry: 1,
    retryDelay: 1000,
    onError: (error) => {
      console.error("Error fetching reviews:", error);
    }
  });

  const mutation = useMutation({
    mutationFn: (newReview: { productId: string; userName: string; rating: number; comment: string }) => 
      reviewApi.createReview(newReview),
    onSuccess: () => {
      // Invalidate and refetch reviews
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
      // Reset form
      setReviewForm({
        userName: '',
        rating: 5,
        comment: ''
      });
    },
    onError: (err: any) => {
      setFormError(err.message || 'Failed to submit review');
    }
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setReviewForm({
      ...reviewForm,
      [e.target.name]: e.target.value
    });
  };

  const handleRatingChange = (_: React.SyntheticEvent, value: number | null) => {
    setReviewForm({
      ...reviewForm,
      rating: value || 5
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!reviewForm.userName.trim()) {
      setFormError('Please enter your name');
      return;
    }
    
    if (!reviewForm.comment.trim()) {
      setFormError('Please enter a comment');
      return;
    }
    
    setFormError('');
    
    mutation.mutate({
      productId,
      userName: reviewForm.userName.trim(),
      rating: reviewForm.rating,
      comment: reviewForm.comment.trim()
    });
  };

  // Default empty reviews list if there's an error or no data
  const reviews = data?.data || [];

  // Create placeholder reviews for demonstration if there are errors
  const placeholderReviews = [
    {
      _id: 'sample-review-1',
      productId: productId,
      userName: 'Game Enthusiast',
      rating: 4.5,
      comment: 'This is an amazing product! Highly recommended for all gamers who appreciate quality.',
      createdAt: new Date()
    },
    {
      _id: 'sample-review-2',
      productId: productId,
      userName: 'Tech Reviewer',
      rating: 5,
      comment: 'Exceeded my expectations. The quality is top-notch and it arrived well packaged.',
      createdAt: new Date(Date.now() - 86400000) // 1 day ago
    }
  ];

  // Use placeholder reviews if there's an error
  const displayReviews = isError ? placeholderReviews : reviews;

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: 'rgba(13, 18, 30, 0.7)',
        borderRadius: 3,
        border: '1px solid rgba(255, 255, 255, 0.05)',
        overflow: 'hidden',
      }}
    >
      {/* Reviews Header */}
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

      {/* Error Message */}
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

      {/* Reviews Count and List */}
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
            {displayReviews.map((review: Review) => (
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
                  <Grid item xs={12} sm={3} md={2}>
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
                  <Grid item xs={12} sm={9} md={10}>
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

      {/* Write a Review Section */}
      <Box sx={{ 
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        p: 3,
        backgroundColor: 'rgba(15, 23, 42, 0.3)'
      }}>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 3,
            fontWeight: 600,
            color: 'white',
          }}
        >
          Write a Review
        </Typography>

        {formError && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 2,
              backgroundColor: 'rgba(244, 63, 94, 0.1)',
              border: '1px solid rgba(244, 63, 94, 0.2)',
            }}
          >
            {formError}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography 
                  component="label" 
                  htmlFor="userName" 
                  sx={{ 
                    display: 'block', 
                    mb: 1,
                    fontWeight: 500,
                    fontSize: '0.9rem'
                  }}
                >
                  Your Name *
                </Typography>
                <TextField
                  id="userName"
                  name="userName"
                  value={reviewForm.userName}
                  onChange={handleFormChange}
                  fullWidth
                  required
                  placeholder="Enter your name"
                  InputProps={{
                    sx: {
                      backgroundColor: 'rgba(11, 17, 32, 0.7)',
                      borderRadius: 2,
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#8B5CF6',
                        borderWidth: 2,
                      },
                    }
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography 
                  component="label" 
                  sx={{ 
                    display: 'block', 
                    mb: 1,
                    fontWeight: 500,
                    fontSize: '0.9rem'
                  }}
                >
                  Your Rating *
                </Typography>
                <Rating
                  name="rating"
                  value={reviewForm.rating}
                  onChange={handleRatingChange}
                  precision={0.5}
                  size="large"
                  sx={{
                    color: '#FFD700',
                    '& .MuiRating-iconEmpty': {
                      color: 'rgba(255, 215, 0, 0.2)'
                    }
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Typography 
                  component="label" 
                  htmlFor="comment" 
                  sx={{ 
                    display: 'block', 
                    mb: 1,
                    fontWeight: 500,
                    fontSize: '0.9rem'
                  }}
                >
                  Your Review *
                </Typography>
                <TextField
                  id="comment"
                  name="comment"
                  value={reviewForm.comment}
                  onChange={handleFormChange}
                  fullWidth
                  required
                  multiline
                  rows={4}
                  placeholder="Share your thoughts about this product..."
                  InputProps={{
                    sx: {
                      backgroundColor: 'rgba(11, 17, 32, 0.7)',
                      borderRadius: 2,
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#8B5CF6',
                        borderWidth: 2,
                      },
                    }
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box 
                component="button"
                type="submit"
                disabled={mutation.isPending}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px 30px',
                  backgroundColor: '#8B5CF6',
                  color: 'white',
                  fontWeight: 600,
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#7C3AED',
                  },
                  '&:disabled': {
                    backgroundColor: 'rgba(139, 92, 246, 0.5)',
                    cursor: 'not-allowed',
                  },
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: '1rem',
                  mt: 1
                }}
              >
                {mutation.isPending ? 'Submitting...' : 'Submit Review'}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProductReviews;