import { RefundCancelPurchaseDto } from 'src/application/dtos/requests/refund-cancel-purchase.request.dto';
import { RefundCancelService } from '../../domain/services/refund-cancel-service/refund-cancel.service';
import { ConsultBalanceService } from './../../domain/services/consult-balance-service/consult-balance.service';
import { PurchaseService } from './../../domain/services/purchase-service/purchase.service';
import { AddMoneyService } from '../../domain/services/add-money-service/add-money.service';
import { AddMoneyRequestDto } from './../../application/dtos/requests/add-money.request.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WithdrawMoneyService } from 'src/domain/services/withdraw-money-service/withdraw-money.service';
import { WalletStatementService } from 'src/domain/services/wallet-statement-service/wallet-statement.service';
import { WithdrawMoneyRequestDto } from 'src/application/dtos/requests/withdraw-money.request.dto';

@Controller('wallet')
export class WalletController {
  constructor(
    private readonly addMoneyService: AddMoneyService,
    private readonly witdrawMoneyService: WithdrawMoneyService,
    private readonly walletStatementService: WalletStatementService,
    private readonly purchaseService: PurchaseService,
    private readonly consultBalanceService: ConsultBalanceService,
    private readonly refundCancelService: RefundCancelService
  ) {}

  @Get('balance/:userId')
  async getWallatBalance(@Param('userId') userId: string): Promise<string> {
    return this.consultBalanceService.getBalance(userId);
  }

  @Get('statement/:userId')
  async getWallaStatement(@Param('userId') userId: string): Promise<any[]> {
    return this.walletStatementService.getWalletStatement(userId);
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
  async purchase(@Body() body: WithdrawMoneyRequestDto): Promise<any> {
    return this.purchaseService.recordPurchase(body);
  }

  @Post('purchase/cancel-refund')
  async cancelRefundPurchase(
    @Body() body: RefundCancelPurchaseDto
  ): Promise<string> {
    return this.refundCancelService.refundCancelPurchase(body);
  }
}
