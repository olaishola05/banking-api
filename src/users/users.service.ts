import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  async createUser(CreateUserDto: CreateUserDto): Promise<string> {
    const newUser = new this.userModel(CreateUserDto);
    const result = await newUser.save();
    return result.id as string;
  }

  async comparePasswords(
    attemptPassword: string,
    password: string,
  ): Promise<boolean> {
    return await bcrypt.compare(attemptPassword, password);
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      phone_number: user.phone_number,
      role: user.role,
    }));
  }

  async getUser(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      phone_number: user.phone_number,
      role: user.role,
    };
  }

  async updateUser(
    userId: string,
    UpdateUserDto: UpdateUserDto,
  ): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      UpdateUserDto,
    );
    return updatedUser;
  }

  async deleteUser(userId: string): Promise<any> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
    return deletedUser;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }
}
