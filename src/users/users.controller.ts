import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) { }

  @Post()
  async create(@Body() CreateUserDto: CreateUserDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(CreateUserDto.password, 10);
    CreateUserDto.password = hashedPassword;
    const userId = await this.UsersService.createUser(CreateUserDto);
    return { id: userId };
  }
}
