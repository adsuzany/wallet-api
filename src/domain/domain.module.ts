import { Module } from '@nestjs/common';
import { AddMoneyService } from './services/add-money.service';
import { WithdrawMoneyService } from './services/withdraw-money.service';
import { WalletStatementService } from './services/wallet-statement.service';

@Module({
  imports: [],
  providers: [AddMoneyService, WithdrawMoneyService, WalletStatementService],
  exports: [AddMoneyService, WithdrawMoneyService, WalletStatementService],
})
export class DomainModule {}
