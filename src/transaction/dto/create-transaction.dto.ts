import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNumber()
  destinationAcctNumber?: number;
}
