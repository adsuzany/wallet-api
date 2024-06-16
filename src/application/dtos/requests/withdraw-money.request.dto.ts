import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class WithdrawMoneyRequestDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0.1)
  value: number;
}
