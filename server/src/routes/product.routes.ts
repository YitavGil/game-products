import { Router } from 'express';
import { 
  getProducts, 
  getProductById, 
  getProductsByCategory 
} from '../controllers/product.controller';
import { asyncHandler } from '../middleware/async.middleware';

const router = Router();

router.get('/', asyncHandler(getProducts));
router.get('/:id', asyncHandler(getProductById));
router.get('/category/:category', asyncHandler(getProductsByCategory));

export default router;