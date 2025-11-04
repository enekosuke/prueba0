import { Router } from 'express';
import { addItem, getCart, removeItem } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect);
router.get('/', getCart);
router.post('/items', addItem);
router.delete('/items/:itemId', removeItem);

export default router;
