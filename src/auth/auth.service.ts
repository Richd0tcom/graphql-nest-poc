import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import {
  CreateAuthInput,
  LoginInput,
} from "./dto/create-auth.input";
import * as bcrypt from "bcrypt";
import { AuthResponse } from "./entities/auth.entity";
import { hash } from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerInput: CreateAuthInput): Promise<AuthResponse> {
    const { username, password } = registerInput;

    // Check if the user already exists
    const existingUser = await this.usersService.findByUsername(username);
    if (existingUser) {
      throw new ConflictException("User with this email already exists");
    }

    const hashedPassword = await hash(password, 10)

    // Create a new user
    const user = await this.usersService.create(username, hashedPassword);

    // Generate JWT token
    const token = this.jwtService.sign({ id: user.id, username: user.username });

    return {
      token,
      user,
    };
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const { username, password } = loginInput;

    // Find the user by email
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // Generate JWT token
    const token = this.jwtService.sign({ id: user.id, username: user.username });

    return {
      token,
      user,
    };
  }
}
