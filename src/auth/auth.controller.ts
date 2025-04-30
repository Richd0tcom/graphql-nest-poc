import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthInput, LoginInput } from './dto/create-auth.input';
import { AuthResponse } from './entities/auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerInput: CreateAuthInput): Promise<AuthResponse> {
    return this.authService.register(registerInput);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginInput: LoginInput): Promise<AuthResponse> {
    return this.authService.login(loginInput);
  }
} 