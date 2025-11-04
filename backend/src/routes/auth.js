import { Router } from 'express';
import passport from 'passport';
import { login, logout, oauthCallback, oauthToken, register } from '../controllers/authController.js';
import { loginValidation, registerValidation, validate } from '../utils/validators.js';

const router = Router();

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.post('/logout', logout);
router.post('/oauth/:provider', oauthToken);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), oauthCallback('google'));
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), oauthCallback('facebook'));

export default router;
