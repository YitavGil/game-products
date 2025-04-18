import { Router } from 'express';
import { 
  getReviewsByProduct, 
  createReview 
} from '../controllers/review.controller';
import { asyncHandler } from '../middleware/async.middleware';

const router = Router();
router.get('/product/:productId', asyncHandler(getReviewsByProduct));
router.post('/', asyncHandler(createReview));

export default router;