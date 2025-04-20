'use client';

import React, { useState } from 'react';
import { Paper } from '@mui/material';
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

  const {
    data,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => reviewApi.getReviewsByProduct(productId),
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
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
    },
    onError: (err: any) => {
      setFormError(err.message || 'Failed to submit review');
    }
  });

  const handleSubmitReview = (formData) => {
    if (!formData.userName.trim()) {
      setFormError('Please enter your name');
      return;
    }
    
    if (!formData.comment.trim()) {
      setFormError('Please enter a comment');
      return;
    }
    
    setFormError('');
    
    mutation.mutate({
      productId,
      userName: formData.userName.trim(),
      rating: formData.rating,
      comment: formData.comment.trim()
    });
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
      />
    </Paper>
  );
};

export default ProductReviews;