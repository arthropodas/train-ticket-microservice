import express from 'express';
import { AuthController } from '../controller/auth.controller.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateRegister, validateLogin } from '../middleware/validation.js';

const router = express.Router();
const authController = new AuthController();

// Public routes
router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);

// Protected routes
router.get('/me', authenticateToken, authController.getProfile);
router.get('/validate', authenticateToken, authController.validateToken);

export default router;