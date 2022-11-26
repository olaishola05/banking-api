import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AuthGuard } from '@nestjs/passport';
import { Transaction } from './transaction.model';
import { User } from 'src/users/users.model';
import { GetUser } from 'src/decorator/get-user.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Transaction')
@Controller('/api/v1/transactions')
export class TransactionController {
  constructor(private TransactionService: TransactionService) { }

  @ApiOperation({ summary: 'Create a transaction, with transaction types' })
  @ApiResponse({ status: 201, description: 'Transaction created successful.' })
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

  @ApiOperation({ summary: 'Get all user transactions' })
  @ApiResponse({
    status: 200,
    description: 'Returns array of user transactions',
  })
  @Get()
  @UseGuards(AuthGuard())
  async getUserTransactions(@GetUser() user: User): Promise<Transaction[]> {
    return this.TransactionService.getTransactionsByUser(user.id);
  }
}
