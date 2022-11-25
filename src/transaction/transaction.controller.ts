import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AuthGuard } from '@nestjs/passport';
import { Transaction } from './transaction.model';
import { User } from 'src/users/users.model';
import { GetUser } from 'src/decorator/get-user.decorator';
import { NotFoundError } from 'rxjs';

@Controller('/api/v1/transactions')
export class TransactionController {
  constructor(private TransactionService: TransactionService) { }

  @Post()
  @UseGuards(AuthGuard())
  async Transactions(
    @Body() CreateTransactionDto: CreateTransactionDto,
    @GetUser() user: User,
  ): Promise<Transaction> {
    return this.TransactionService.createTransaction(
      user.id,
      CreateTransactionDto,
    );
  }

  @Get()
  @UseGuards(AuthGuard())
  async getUserTransactions(@GetUser() user: User): Promise<Transaction[]> {
    return this.TransactionService.getTransactionsByUser(user.id);
  }
}
