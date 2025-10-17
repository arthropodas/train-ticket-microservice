import jwt from 'jsonwebtoken';

export class AuthService {
  generateAccessToken(payload) {
    console.log("access token "+process.env.JWT_SECRET);
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
  }

  generateRefreshToken(payload) {
    console.log("access token "+process.env.JWT_REFRESH_SECRET);
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '3d' });
  }

  verifyAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('ACCESS_TOKEN_EXPIRED');
      }
      throw new Error('INVALID_ACCESS_TOKEN');
    }
  }

  verifyRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('REFRESH_TOKEN_EXPIRED');
      }
      throw new Error('INVALID_REFRESH_TOKEN');
    }
  }

  decodeToken(token) {
    try {
      return jwt.decode(token);
    } catch (error) {
      throw new Error('INVALID_TOKEN');
    }
  }

  // Check if token is expired without throwing error
  isTokenExpired(token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return false;
    } catch (error) {
      return error.name === 'TokenExpiredError';
    }
  }

  // Generate new tokens pair
  generateTokenPair(user) {
    const accessToken = this.generateAccessToken({ 
      sub: user.id, 
      email: user.email,
      username: user.username
    });
    
    const refreshToken = this.generateRefreshToken({ 
      sub: user.id 
    });

    return { accessToken, refreshToken };
  }

  // Refresh tokens using valid refresh token
  refreshTokens(refreshToken) {
    const decoded = this.verifyRefreshToken(refreshToken);
    
    const newAccessToken = this.generateAccessToken({ 
      sub: decoded.sub, 
      email: decoded.email,
      username: decoded.username
    });
    
    const newRefreshToken = this.generateRefreshToken({ 
      sub: decoded.sub 
    });

    return { 
      accessToken: newAccessToken, 
      refreshToken: newRefreshToken 
    };
  }
}