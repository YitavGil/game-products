'use client';

import React, { useState, useEffect } from 'react';
import { getReviews } from '@/lib/api';
import { Review } from '@/lib/types';
import Rating from '@/components/common/Rating';
import Loader from '@/components/common/Loader';

interface ReviewListProps {
  productId: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await getReviews(productId, page);
        
        if (response.success) {
          setReviews(response.data);
          setTotalPages(response.totalPages);
        } else {
          setError('Failed to load reviews');
        }
      } catch (err) {
        setError('An error occurred while fetching reviews');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, [productId, page]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="bg-error bg-opacity-10 text-error p-4 rounded-md">
        {error}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-text-secondary">No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div 
          key={review._id} 
          className="bg-background-card p-4 rounded-lg shadow-sm"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-medium text-text-primary">{review.userName}</h4>
              <Rating value={review.rating} size="small" />
            </div>
            <span className="text-sm text-text-secondary">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-text-secondary">{review.comment}</p>
        </div>
      ))}
      
      {/* Simple pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 bg-background-card rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-1 bg-primary text-text-primary rounded">
              {page}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 bg-background-card rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewList;