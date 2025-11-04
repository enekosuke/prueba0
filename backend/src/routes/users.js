import { Router } from 'express';
import { me, toggleFavourite, updateProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect);
router.get('/me', me);
router.patch('/me', updateProfile);
router.post('/favourites/:productId', toggleFavourite);

export default router;
