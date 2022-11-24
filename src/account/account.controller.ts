import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountDto } from './dto/account.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorator/get-user.decorator';
import { User } from 'src/users/users.model';

@Controller('/api/v1/accounts')
export class AccountController {
  constructor(private AccountService: AccountService) { }

  @Post()
  @UseGuards(AuthGuard())
  async createAcct(
    @Body() AccountDto: AccountDto,
    @GetUser() user: User,
  ): Promise<string> {
    await this.AccountService.createAcct(AccountDto, user);
    return `Account created successfully`;
  }

  @Get()
  @UseGuards(AuthGuard())
  async getAccounts(@GetUser() user: User) {
    const accounts = await this.AccountService.getAccts(user);
    return accounts;
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getASingleAccount(@Param('id') id: string, @GetUser() user: User) {
    const account = await this.AccountService.getAcct(id, user);
    return account;
  }
}
