import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountDto } from './dto/account.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorator/get-user.decorator';
import { User } from 'src/users/users.model';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Account')
@Controller('/api/v1/accounts')
export class AccountController {
  constructor(private AccountService: AccountService) { }

  @ApiOperation({ summary: 'Create an account' })
  @ApiResponse({ status: 201, description: 'Account created successful.' })
  @Post()
  @UseGuards(AuthGuard())
  async createAcct(
    @Body() AccountDto: AccountDto,
    @GetUser() user: User,
  ): Promise<string> {
    await this.AccountService.createAcct(AccountDto, user);
    return `Account created successfully`;
  }

  @ApiOperation({ summary: 'Get all user accounts' })
  @ApiResponse({
    status: 200,
    description: 'Returns array of user accounts',
  })
  @Get()
  @UseGuards(AuthGuard())
  async getAccounts(@GetUser() user: User) {
    const accounts = await this.AccountService.getAccts(user);
    return accounts;
  }

  @ApiOperation({ summary: 'Get account' })
  @ApiResponse({
    status: 200,
    description: 'Returns account',
  })
  @Get(':id')
  @UseGuards(AuthGuard())
  async getAccount(@Param('id') id: string) {
    const account = await this.AccountService.getAcct(id);
    return account;
  }
}
