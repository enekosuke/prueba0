import { Router } from 'express';
import {
  getProductById,
  getProductBySlug,
  listProducts,
  suggestions
} from '../controllers/productController.js';

const router = Router();

router.get('/', listProducts);
router.get('/suggestions', suggestions);
router.get('/slug/:slug', getProductBySlug);
router.get('/:id', getProductById);

export default router;
