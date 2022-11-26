import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorator/get-user.decorator';
import { User } from './users.model';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('api/v1/auth')
export class UsersController {
  constructor(private readonly UsersService: UsersService) { }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'User created successful.' })
  @Post('signup')
  async create(@Body() CreateUserDto: CreateUserDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(CreateUserDto.password, 10);
    CreateUserDto.password = hashedPassword;
    const userId = await this.UsersService.createUser(CreateUserDto);
    return 'User created successfully with and id: ' + userId;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Returns array of registered users',
  })
  @Get('users')
  @UseGuards(AuthGuard())
  async getUsers(@GetUser() user: User): Promise<any> {
    const users = await this.UsersService.getUsers(user);
    return users;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a user' })
  @ApiResponse({
    status: 200,
    description: 'Returns a user with the given id',
  })
  @Get('users/:id')
  @UseGuards(AuthGuard())
  async getUser(@Param('id') id: string): Promise<any> {
    const user = await this.UsersService.getUser(id);
    return user;
  }
}
