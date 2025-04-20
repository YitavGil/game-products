'use client';

import React, { useState } from 'react';
import { Paper, Alert, Snackbar } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewApi } from '@/lib/api';
import { Review } from '@/types';
import DisplayReviews from '../Reviews/DisplayReviews';
import ReviewForm from '../Reviews/ReviewForm';

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const queryClient = useQueryClient();
  const [formError, setFormError] = useState('');
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const {
    data,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => reviewApi.getReviewsByProduct(productId),
    retry: 1,
    retryDelay: 1000,
    onError: (error: any) => {
      console.error("Error fetching reviews:", error);
    }
  });

  const mutation = useMutation({
    mutationFn: (newReview: { productId: string; userName: string; rating: number; comment: string }) => 
      reviewApi.createReview(newReview),
    onSuccess: () => {
      // Reset the form and show success message
      setShouldResetForm(true);
      setShowSuccessMessage(true);
      
      // Refresh the reviews list
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
    },
    onError: (err: any) => {
      console.error("Review submission error:", err);
      if (err.response) {
        // Handle API error response
        setFormError(err.response.data?.error || 'Failed to submit review. Please try again.');
      } else if (err.request) {
        // Handle network error
        setFormError('Network error. Please check your connection and try again.');
      } else {
        // Handle other errors
        setFormError(err.message || 'Failed to submit review');
      }
      
      // Don't reset form on error
      setShouldResetForm(false);
    }
  });

  const handleSubmitReview = (formData: { userName: string; rating: number; comment: string }) => {
    // Reset the "should reset" flag first (will be set to true on success)
    setShouldResetForm(false);
    
    if (!formData.userName.trim()) {
      setFormError('Please enter your name');
      return;
    }
    
    if (!formData.comment.trim()) {
      setFormError('Please enter a comment');
      return;
    }
    
    // Clear previous errors
    setFormError('');
    
    mutation.mutate({
      productId,
      userName: formData.userName.trim(),
      rating: formData.rating,
      comment: formData.comment.trim()
    });
  };

  const handleCloseSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  const reviews = data?.data || [];

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
      createdAt: new Date(Date.now() - 86400000)
    }
  ];

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
      {/* Success Message */}
      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={6000}
        onClose={handleCloseSuccessMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSuccessMessage} 
          severity="success" 
          sx={{ 
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            color: '#10B981',
            mt: "50px"
          }}
        >
          Your review has been submitted successfully!
        </Alert>
      </Snackbar>
      
      <DisplayReviews 
        productId={productId}
        isLoading={isLoading}
        isError={isError}  
        displayReviews={displayReviews}
      />
      
      <ReviewForm 
        productId={productId}
        onSubmit={handleSubmitReview}
        isPending={mutation.isPending}
        formError={formError}
        resetForm={shouldResetForm}
      />
    </Paper>
  );
};

export default ProductReviews;