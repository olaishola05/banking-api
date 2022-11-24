import { UsersService } from './../users/users.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './account.model';
import { AccountDto } from './dto/account.dto';
import { User } from 'src/users/users.model';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('Account') private readonly AccountModel: Model<Account>,
    private UsersService: UsersService,
  ) { }

  async createAcct(AccountDto: AccountDto, user: User): Promise<string> {
    const newAccount = new this.AccountModel(AccountDto);
    let result: string;
    newAccount.save((err, newAccount) => {
      if (err) {
        throw new NotFoundException('Could not create account.');
      }
      if (user.role === 'admin') {
        result = newAccount.id as string;
      }
    });
    return result;
  }

  async getAccts(user: User): Promise<Account[]> {
    const accounts = await this.AccountModel.find().exec();
    if (user.role === 'admin') {
      return accounts.map(
        (account): Account => ({
          id: account.id,
          name: account.name,
          balance: account.balance,
          userId: account.userId,
          accountNumber: account.accountNumber,
        }),
      );
    } else {
      throw new NotFoundException('Unauthorized to view all accounts.');
    }
  }

  // async getAcct(id: string): Promise<Account> {
  //   const account = await this.AccountModel.findById(id).exec();
  //   const user = await this.UsersService.getUser(id);
  //   console.log(account);

  //   if (user.id === account?.userId) {
  //     return {
  //       id: account.id,
  //       name: account.name,
  //       balance: account.balance,
  //       userId: account.userId,
  //       accountNumber: account.accountNumber,
  //     };
  //   } else {
  //     throw new NotFoundException('Account does not belong to user.');
  //   }
  // }

  async getAcct(acctId: string, user: User): Promise<Account> {
    const account = await this.AccountModel.findById(acctId).exec();
    console.log(account);
    if (user.id === account?.userId) {
      return {
        id: account.id,
        name: account.name,
        balance: account.balance,
        userId: account.userId,
        accountNumber: account.accountNumber,
      };
    } else {
      throw new NotFoundException('Account does not belong to user.');
    }
  }
}
