'use client';

import React, { useState } from 'react';
import { createReview } from '@/lib/api';
import Button from '@/components/common/Button';
import Rating from '@/components/common/Rating';

interface ReviewFormProps {
  productId: string;
  onReviewSubmitted?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ 
  productId,
  onReviewSubmitted
}) => {
  const [formData, setFormData] = useState({
    userName: '',
    rating: 0,
    comment: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleRatingChange = (value: number) => {
    setFormData((prev) => ({
      ...prev,
      rating: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.userName.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (formData.rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    if (!formData.comment.trim()) {
      setError('Please enter a comment');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await createReview({
        productId,
        userName: formData.userName,
        rating: formData.rating,
        comment: formData.comment
      });
      
      if (response.success) {
        setSuccess(true);
        setFormData({
          userName: '',
          rating: 0,
          comment: ''
        });
        
        // Notify parent component about successful submission
        if (onReviewSubmitted) {
          onReviewSubmitted();
        }
      } else {
        setError(response.error || 'Failed to submit review');
      }
    } catch (err) {
      setError('An error occurred while submitting your review');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-background-card p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
      
      {success ? (
        <div className="bg-success bg-opacity-10 text-success p-4 rounded-md mb-4">
          Thank you for your review! It has been submitted successfully.
          <div className="mt-2">
            <Button 
              variant="outline" 
              size="small"
              onClick={() => setSuccess(false)}
            >
              Write Another Review
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-error bg-opacity-10 text-error p-4 rounded-md mb-4">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="userName" className="block text-text-primary mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="w-full bg-background-dark border border-background-hover rounded-md p-2 text-text-primary focus:border-primary focus:outline-none"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-text-primary mb-1">
              Rating
            </label>
            <Rating
              value={formData.rating}
              onChange={handleRatingChange}
              editable
              size="large"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="comment" className="block text-text-primary mb-1">
              Your Review
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows={4}
              className="w-full bg-background-dark border border-background-hover rounded-md p-2 text-text-primary focus:border-primary focus:outline-none"
              placeholder="Share your thoughts about this product..."
            />
          </div>
          
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;