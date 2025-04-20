// Reviews API URL - For client-side fetching only
const REVIEWS_API_URL = process.env.NEXT_PUBLIC_REVIEWS_API_URL || 'http://localhost:5001/api';

// Review-related API calls - these run client-side
export const getReviews = async (productId: string, page = 1, limit = 5) => {
  const response = await fetch(
    `${REVIEWS_API_URL}/reviews/product/${productId}?page=${page}&limit=${limit}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch reviews');
  }
  
  return response.json();
};

export const createReview = async (reviewData: {
  productId: string;
  userName: string;
  rating: number;
  comment: string;
}) => {
  const response = await fetch(`${REVIEWS_API_URL}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to submit review');
  }
  
  return response.json();
};