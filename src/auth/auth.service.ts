import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private UsersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUserByPassword(loginAttempt: LoginUserDto): Promise<any> {
    const userToAttempt = await this.UsersService.getUserByEmail(
      loginAttempt.email,
    );
    if (userToAttempt) {
      const { password } = userToAttempt;
      const match = await this.UsersService.comparePasswords(
        loginAttempt.password,
        password,
      );
      if (match) {
        return this.createJwtPayload(userToAttempt);
      } else {
        throw new UnauthorizedException('Invalid credentials');
      }
    } else {
      throw new UnauthorizedException('User does not exist');
    }
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.UsersService.getUserByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException(
        'Invalid credentials or user does not exist',
      );
    }
    return this.createJwtPayload(user);
  }

  createJwtPayload(user: any) {
    const data: JwtPayload = {
      email: user.email,
    };
    const jwt = this.jwtService.sign(data);
    return {
      expiresIn: 3600,
      token: jwt,
    };
  }
}
