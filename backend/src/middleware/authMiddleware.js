import { verifyToken } from '../utils/token.js';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No autorizado' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    req.user = await User.findById(decoded.sub).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }
    next();
  } catch (error) {
    next(error);
  }
};
