import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './account.model';
import { AccountDto } from './dto/account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('Account') private readonly AccountModel: Model<Account>,
    private UsersService: UsersService,
  ) { }

  async createAcct(AccountDto: AccountDto): Promise<Account> {
    const users = await this.UsersService.getUsers();
    const user = users.find((user) => user.id === AccountDto.userId);
    if (user) {
      const newAccount = new this.AccountModel({
        name: user.name,
        balance: 0,
        userId: user.id,
        accountNumber: user.phone_number,
      });
      const account = await newAccount.save();
      return account as Account;
    } else {
      return null;
    }
  }

  async getAccts(): Promise<Account[]> {
    const accounts = await this.AccountModel.find().exec();
    return accounts.map(
      (account): Account => ({
        id: account.id,
        name: account.name,
        balance: account.balance,
        userId: account.userId,
        accountNumber: account.accountNumber,
      }),
    );
  }

  async getAcct(acctId: string): Promise<Account> {
    const account = await this.AccountModel.findById(acctId);
    const user = await this.UsersService.getUser(account.userId);

    if (user.id === account.userId) {
      return {
        id: account.id,
        name: account.name,
        balance: account.balance,
        userId: account.userId,
        accountNumber: account.accountNumber,
      };
    } else {
      return null;
    }
  }
}
