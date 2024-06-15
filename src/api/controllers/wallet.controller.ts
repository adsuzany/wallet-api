import { AddMoneyService } from './../../domain/services/add-money.service';
import { AddMoneyRequestDto } from './../../application/dtos/requests/add-money.request.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { WithdrawMoneyService } from 'src/domain/services/withdraw-money.service';
import { WalletStatementService } from 'src/domain/services/wallet-statement.service';
import { WithdrawMoneyRequestDto } from 'src/application/dtos/requests/withdraw-money.request.dto';

@Controller('wallet')
export class WalletController {
  constructor(
    private readonly addMoneyService: AddMoneyService,
    private readonly witdrawMoneyService: WithdrawMoneyService,
    private readonly walletStatementService: WalletStatementService
  ) {}

  @Get('balance')
  async getWallatBalance(): Promise<string> {
    return 'OK';
  }

  @Get('statement')
  async getWallaStatement(): Promise<string> {
    return this.walletStatementService.getWalletStatement('');
  }

  @Post('deposit')
  async depositMoney(@Body() body: AddMoneyRequestDto): Promise<string> {
    return this.addMoneyService.addMoney(body);
  }

  @Post('withdraw')
  async withdrawMoney(@Body() body: WithdrawMoneyRequestDto): Promise<string> {
    return this.witdrawMoneyService.withdrawMoney(body);
  }

  @Post('purchase')
  async purchase(): Promise<string> {
    return 'Done';
  }

  @Post('cancel-purchase')
  async cancelPurchase(): Promise<string> {
    return 'Done';
  }

  @Post('refund-purchase')
  async refundPurchase(): Promise<string> {
    return 'Done';
  }
}
