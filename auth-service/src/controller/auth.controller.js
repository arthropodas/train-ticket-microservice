import { UserService } from '../service/user.service.js';

export class AuthController {
  constructor() {
    this.userService = new UserService();
  }

  register = async (req, res) => {
    try {
      const result = await this.userService.register(req.body);
      
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: result
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const result = await this.userService.login(email, password);

      res.json({
        success: true,
        message: 'Login successful',
        data: result
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message
      });
    }
  };

  getProfile = async (req, res) => {
    try {
      const user = await this.userService.getUserProfile(req.user.sub);
      
      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  };

  refreshToken = async (req, res) => {
    try {
      const { refreshToken } = req.body;
      
      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: 'Refresh token is required'
        });
      }

      const result = await this.userService.refreshUserTokens(refreshToken);

      res.json({
        success: true,
        message: 'Tokens refreshed successfully',
        data: result
      });
    } catch (error) {
      let statusCode = 401;
      
      if (error.message === 'REFRESH_TOKEN_EXPIRED') {
        statusCode = 403;
      } else if (error.message === 'INVALID_REFRESH_TOKEN') {
        statusCode = 401;
      }

      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  };

  logout = async (req, res) => {
    // Since we're not storing tokens server-side, 
    // logout is handled client-side by removing tokens from localStorage
    res.json({
      success: true,
      message: 'Logout successful - Please remove tokens from client storage'
    });
  };

  // New endpoint to validate token
  validateToken = async (req, res) => {
    try {
      // If middleware passed, token is valid
      const user = await this.userService.getUserProfile(req.user.sub);
      
      res.json({
        success: true,
        message: 'Token is valid',
        data: {
          user,
          tokenExpires: req.user.exp
        }
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: 'Token validation failed'
      });
    }
  };
}