import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsNumberString,
} from 'class-validator';

export class AccountDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  balance: number;

  @IsNotEmpty()
  @IsNumberString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  accountNumber: number;
}
