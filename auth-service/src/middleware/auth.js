import { AuthService } from '../service/auth.service.js';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  try {
    const authService = new AuthService();
    const decoded = authService.verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.message === 'ACCESS_TOKEN_EXPIRED') {
      return res.status(401).json({
        success: false,
        message: 'Access token expired',
        code: 'ACCESS_TOKEN_EXPIRED'
      });
    }

    return res.status(403).json({
      success: false,
      message: 'Invalid access token'
    });
  }
};

// Optional: Middleware that doesn't fail on expired token
export const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next();
  }

  try {
    const authService = new AuthService();
    const decoded = authService.verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    // Continue without user info if token is invalid/expired
    next();
  }
};