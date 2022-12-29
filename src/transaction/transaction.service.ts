import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './transaction.model';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('Transaction')
    private readonly TransactionModel: Model<Transaction>,
    private AccountService: AccountService,
  ) { }

  async createTransaction(
    userId: string,
    CreateTransactionDto: CreateTransactionDto,
  ): Promise<any> {
    const account = await this.AccountService.getAcct(userId);
    const { balance } = account;
    const { amount, type } = CreateTransactionDto;

    if (type === 'credit') {
      const newTransaction = new this.TransactionModel({
        ...CreateTransactionDto,
        userId,
      });
      const result = await newTransaction.save();
      const newBalance = balance + amount;
      await this.AccountService.updateAcct(userId, newBalance);
      return result;
    }

    if (type === 'debit') {
      if (balance < amount) {
        throw new NotFoundException('Insufficient funds.');
      }
      const newTransaction = new this.TransactionModel({
        ...CreateTransactionDto,
        userId,
      });
      const result = await newTransaction.save();
      const newBalance = balance - amount;
      await this.AccountService.updateAcct(userId, newBalance);
      return result;
    }

    if (type === 'transfer') {
      const getDesinationAcct = await this.AccountService.getAcctByAcctNumber(
        CreateTransactionDto.destinationAcctNumber,
      );

      const { balance: sourceBalance } = account;
      const { balance: destinationBalance, userId: acctUserId } =
        getDesinationAcct;
      if (sourceBalance < amount || !getDesinationAcct) {
        throw new NotFoundException('Insufficient funds.');
      }
      const newTransaction = new this.TransactionModel({
        ...CreateTransactionDto,
        userId,
      });
      const result = await newTransaction.save();
      const newBalance = sourceBalance - amount;
      const newDestinationBalance = destinationBalance + amount;
      await this.AccountService.updateAcct(userId, newBalance);
      await this.AccountService.updateAcct(acctUserId, newDestinationBalance);
      return result;
    }
  }

  async getTransactionsByUser(id: string): Promise<Transaction[]> {
    const transactions = await this.TransactionModel.find({
      userId: id,
    }).exec();
    if (!transactions) {
      throw new NotFoundException('User has no transactions histories.');
    }
    return transactions;
  }
}
