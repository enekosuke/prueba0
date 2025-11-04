import { Router } from 'express';
import { getProduct, listProducts, suggestions } from '../controllers/productController.js';

const router = Router();

router.get('/', listProducts);
router.get('/suggestions', suggestions);
router.get('/:id', getProduct);

export default router;
