import { Router } from 'express';
import { createCheckout, listOrders } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
import { checkoutValidation, validate } from '../utils/validators.js';

const router = Router();

router.use(protect);
router.post('/', checkoutValidation, validate, createCheckout);
router.get('/', listOrders);

export default router;
