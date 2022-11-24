import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/auth')
export class UsersController {
  constructor(private readonly UsersService: UsersService) { }

  @Post('signup')
  async create(@Body() CreateUserDto: CreateUserDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(CreateUserDto.password, 10);
    CreateUserDto.password = hashedPassword;
    const userId = await this.UsersService.createUser(CreateUserDto);
    return 'User created successfully with and id: ' + userId;
  }

  @Get('users')
  @UseGuards(AuthGuard())
  async getUsers(): Promise<any> {
    const users = await this.UsersService.getUsers();
    return users;
  }

  @Get('users/:id')
  @UseGuards(AuthGuard())
  async getUser(@Param('id') id: string): Promise<any> {
    const user = await this.UsersService.getUser(id);
    return user;
  }
}
