'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Rating,
  Grid,
  Avatar,
  Paper,
  CircularProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, TextField } from '@/components/common';
import { reviewApi } from '@/lib/api';
import { Review } from '@/types';
import { formatDate } from '@/utils/date-formatters';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { styled } from '@mui/material/styles';

interface ProductReviewsSectionProps {
  productId: string;
}

const ReviewCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  border: '1px solid rgba(255, 255, 255, 0.05)',
  borderRadius: theme.spacing(1.5),
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: 40,
  height: 40,
  fontWeight: 'bold',
}));

const ReviewFormSchema = Yup.object().shape({
  userName: Yup.string().required('Name is required'),
  rating: Yup.number().min(1, 'Please select a rating').max(5).required('Rating is required'),
  comment: Yup.string().required('Please write a review'),
});

export const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({ productId }) => {
  const queryClient = useQueryClient();
  const [expanded, setExpanded] = useState(false);
  
  const { 
    data: reviewsData, 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => reviewApi.getReviewsByProduct(productId),
  });

  const reviewMutation = useMutation({
    mutationFn: reviewApi.createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
      formik.resetForm();
      setExpanded(false);
    },
  });

  const formik = useFormik({
    initialValues: {
      userName: '',
      rating: 0,
      comment: '',
    },
    validationSchema: ReviewFormSchema,
    onSubmit: (values) => {
      reviewMutation.mutate({
        productId,
        userName: values.userName,
        rating: values.rating,
        comment: values.comment,
      });
    },
  });

  const handleExpandChange = () => {
    setExpanded(!expanded);
  };

  const renderReviews = () => {
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

    const reviews = reviewsData?.data || [];

    if (reviews.length === 0) {
      return (
        <Box sx={{ py: 2 }}>
          <Typography variant="body1" color="text.secondary" align="center">
            No reviews yet. Be the first to review this product!
          </Typography>
        </Box>
      );
    }

    return reviews.map((review: Review) => (
      <ReviewCard key={review._id} elevation={0}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <UserAvatar>{review.userName.charAt(0).toUpperCase()}</UserAvatar>
          <Box sx={{ ml: 2, flexGrow: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {review.userName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatDate(new Date(review.createdAt))}
              </Typography>
            </Box>
            <Rating value={review.rating} precision={0.5} readOnly size="small" />
            <Typography variant="body2" mt={1} sx={{ color: 'text.secondary' }}>
              {review.comment}
            </Typography>
          </Box>
        </Box>
      </ReviewCard>
    ));
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Customer Reviews
      </Typography>
      <Divider sx={{ mb: 3 }} />
      
      <Accordion 
        expanded={expanded} 
        onChange={handleExpandChange}
        sx={{ 
          mb: 4, 
          backgroundColor: 'background.paper',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          '&:before': { display: 'none' },
          borderRadius: '12px !important',
          overflow: 'hidden'
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" fontWeight="bold">
            Write a Review
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="userName"
                  name="userName"
                  label="Your Name"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  error={formik.touched.userName && Boolean(formik.errors.userName)}
                  helperText={formik.touched.userName && formik.errors.userName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography variant="body2" gutterBottom>
                    Rating
                  </Typography>
                  <Rating
                    name="rating"
                    value={formik.values.rating}
                    onChange={(_, newValue) => {
                      formik.setFieldValue('rating', newValue);
                    }}
                    precision={0.5}
                  />
                  {formik.touched.rating && formik.errors.rating && (
                    <Typography variant="caption" color="error">
                      {formik.errors.rating as string}
                    </Typography>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="comment"
                  name="comment"
                  label="Your Review"
                  multiline
                  rows={4}
                  value={formik.values.comment}
                  onChange={formik.handleChange}
                  error={formik.touched.comment && Boolean(formik.errors.comment)}
                  helperText={formik.touched.comment && formik.errors.comment}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="primary"
                  type="submit"
                  loading={reviewMutation.isPending}
                  disabled={reviewMutation.isPending}
                >
                  Submit Review
                </Button>
              </Grid>
            </Grid>
          </form>
        </AccordionDetails>
      </Accordion>
      
      {renderReviews()}
    </Box>
  );
};

export default ProductReviewsSection;