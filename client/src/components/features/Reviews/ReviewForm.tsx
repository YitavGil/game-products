'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Rating,
  Alert
} from '@mui/material';

interface ReviewFormProps {
  productId: string;
  onSubmit: (formData: { userName: string; rating: number; comment: string }) => void;
  isPending: boolean;
  formError: string;
  resetForm: boolean; // New prop to signal when to reset the form
}

const ReviewForm: React.FC<ReviewFormProps> = ({ 
  productId, 
  onSubmit, 
  isPending, 
  formError,
  resetForm 
}) => {
  const [reviewForm, setReviewForm] = useState({
    userName: '',
    rating: 5,
    comment: ''
  });

  // Reset form when resetForm prop changes to true
  useEffect(() => {
    if (resetForm) {
      setReviewForm({
        userName: '',
        rating: 5,
        comment: ''
      });
    }
  }, [resetForm]);

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
    onSubmit(reviewForm);
  };

  return (
    <Box sx={{ 
      p: 4,
      backgroundColor: 'rgba(13, 18, 30, 0.8)',
      borderTop: '1px solid rgba(139, 92, 246, 0.3)',
    }}>
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 3,
          fontWeight: 700,
          color: '#A78BFA',
          fontSize: '1.5rem',
          borderBottom: '2px solid #8B5CF6',
          paddingBottom: '10px',
          width: '200px'
        }}
      >
        Write a Review
      </Typography>

      {formError && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 3,
            backgroundColor: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid rgba(244, 63, 94, 0.2)',
            borderRadius: 2
          }}
        >
          {formError}
        </Alert>
      )}

      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: 'rgba(11, 17, 32, 0.4)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          p: 3
        }}
      >
        {/* Row 1: Name and Rating side by side */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: {xs: 'column', sm: 'row'},
          gap: 3,
          mb: 3
        }}>
          {/* Name Field */}
          <Box sx={{ flex: 1 }}>
            <Typography 
              component="label" 
              htmlFor="userName" 
              sx={{ 
                display: 'block', 
                mb: 1,
                fontWeight: 600,
                fontSize: '0.95rem',
                color: '#E2E8F0'
              }}
            >
              Your Name <Box component="span" sx={{ color: '#8B5CF6' }}>*</Box>
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
                  height: '56px',
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#8B5CF6',
                    borderWidth: 2,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(139, 92, 246, 0.5)',
                  }
                }
              }}
            />
          </Box>

          {/* Rating */}
          <Box sx={{ flex: 1 }}>
            <Typography 
              component="label" 
              sx={{ 
                display: 'block', 
                mb: 1,
                fontWeight: 600,
                fontSize: '0.95rem',
                color: '#E2E8F0'
              }}
            >
              Your Rating <Box component="span" sx={{ color: '#8B5CF6' }}>*</Box>
            </Typography>
            <Box sx={{ 
              p: 2, 
              borderRadius: 2, 
              backgroundColor: 'rgba(11, 17, 32, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              height: '56px',
              display: 'flex',
              alignItems: 'center'
            }}>
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
          </Box>
        </Box>

        {/* Row 2: Review Text Area */}
        <Box sx={{ mb: 3 }}>
          <Typography 
            component="label" 
            htmlFor="comment" 
            sx={{ 
              display: 'block', 
              mb: 1,
              fontWeight: 600,
              fontSize: '0.95rem',
              color: '#E2E8F0'
            }}
          >
            Your Review <Box component="span" sx={{ color: '#8B5CF6' }}>*</Box>
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
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(139, 92, 246, 0.5)',
                }
              }
            }}
          />
        </Box>

        {/* Row 3: Submit Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Box 
            component="button"
            type="submit"
            disabled={isPending}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '14px 36px',
              backgroundColor: '#8B5CF6',
              color: 'white',
              fontWeight: 600,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 10px rgba(139, 92, 246, 0.3)',
              '&:hover': {
                backgroundColor: '#7C3AED',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 15px rgba(139, 92, 246, 0.4)',
              },
              '&:active': {
                transform: 'translateY(0)',
                boxShadow: '0 2px 5px rgba(139, 92, 246, 0.4)',
              },
              '&:disabled': {
                backgroundColor: 'rgba(139, 92, 246, 0.5)',
                cursor: 'not-allowed',
                transform: 'none',
                boxShadow: 'none',
              },
              fontFamily: '"Poppins", sans-serif',
              fontSize: '1rem',
            }}
          >
            {isPending ? 'Submitting...' : 'Submit Review'}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewForm;