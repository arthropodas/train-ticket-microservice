import bcrypt from 'bcrypt';
import { UserRepository } from '../repository/user.reposiotry.js';
import { UserEntity } from '../entity/user.entity.js';
import { AuthService } from './auth.service.js';

export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
    this.authService = new AuthService();
  }

  async register(userData) {
    // Create user entity for validation
    const userEntity = new UserEntity(userData);
    // const validationErrors = userEntity.validate();
    
    // if (validationErrors.length > 0) {
    //   throw new Error(validationErrors.join(', '));
    // }

    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const existingUsername = await this.userRepository.findByUsername(userData.username);
    if (existingUsername) {
      throw new Error('Username already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    // Create user
    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword
    });

    return {
      user: user.withoutPassword()
    };
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate tokens
    const tokens = this.authService.generateTokenPair(user);

    return {
      user: user.withoutPassword(),
      tokens
    };
  }

  async refreshUserTokens(refreshToken) {
    const tokens = this.authService.refreshTokens(refreshToken);
    
    // Get user data for the response
    const decoded = this.authService.decodeToken(refreshToken);
    const user = await this.userRepository.findById(decoded.sub);

    return {
      user: user.withoutPassword(),
      tokens
    };
  }

  async getUserProfile(userId) {
    const user = await this.userRepository.findById(userId);
    return user.withoutPassword();
  }

  async updateProfile(userId, updateData) {
    const user = await this.userRepository.update(userId, updateData);
    return user.withoutPassword();
  }
}