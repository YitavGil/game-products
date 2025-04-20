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
      userName: reviewForm.userName,
      rating: reviewForm.rating,
      comment: reviewForm.comment
    });
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        Error loading reviews: {(error as Error).message}
      </Alert>
    );
  }

  const reviews = data?.data || [];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        backgroundColor: 'background.paper',
        borderRadius: 2
      }}
    >
      <Typography variant="h5" gutterBottom>
        Reviews
      </Typography>

      {/* Write a review form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mb: 4, mt: 2 }}
      >
        <Typography variant="h6" gutterBottom>
          Write a Review
        </Typography>

        {formError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formError}
          </Alert>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="userName"
              label="Your Name"
              value={reviewForm.userName}
              onChange={handleFormChange}
              fullWidth
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ mt: 2 }}>
              <Typography component="legend">Rating</Typography>
              <Rating
                name="rating"
                value={reviewForm.rating}
                onChange={handleRatingChange}
                precision={0.5}
                size="large"
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="comment"
              label="Your Review"
              value={reviewForm.comment}
              onChange={handleFormChange}
              fullWidth
              required
              multiline
              rows={4}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="primary"
              disabled={mutation.isPending}
              sx={{ mt: 1 }}
            >
              {mutation.isPending ? 'Submitting...' : 'Submit Review'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Reviews list */}
      <Typography variant="h6" gutterBottom>
        {reviews.length === 0
          ? 'No reviews yet. Be the first to review this product!'
          : `${reviews.length} Review${reviews.length !== 1 ? 's' : ''}`}
      </Typography>

      {reviews.map((review: Review) => (
        <Paper
          key={review._id}
          elevation={0}
          sx={{
            p: 2,
            mb: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 1
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
              {review.userName.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="subtitle1">{review.userName}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Rating value={review.rating} readOnly size="small" />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  {format(new Date(review.createdAt), 'MMMM d, yyyy')}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Typography variant="body2" paragraph sx={{ mt: 1 }}>
            {review.comment}
          </Typography>
        </Paper>
      ))}
    </Paper>
  );
};

export default ProductReviews;