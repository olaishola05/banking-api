import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountDto } from './dto/account.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('account')
export class AccountController {
  constructor(private AccountService: AccountService) { }

  @Post('create')
  @UseGuards(AuthGuard())
  async createAcct(@Body() AccountDto: AccountDto) {
    const Account = await this.AccountService.createAcct(AccountDto);
    return Account;
  }
}
