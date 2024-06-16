import { Module } from '@nestjs/common';
import { AddMoneyService } from './services/add-money-service/add-money.service';
import { WithdrawMoneyService } from './services/withdraw-money-service/withdraw-money.service';
import { WalletStatementService } from './services/wallet-statement-service/wallet-statement.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { PurchaseService } from './services/purchase-service/purchase.service';
import { RefundCancelService } from './services/refund-cancel-service/refund-cancel.service';
import { ConsultBalanceService } from './services/consult-balance-service/consult-balance.service';

@Module({
  imports: [InfrastructureModule],
  providers: [
    AddMoneyService,
    WithdrawMoneyService,
    WalletStatementService,
    PurchaseService,
    RefundCancelService,
    ConsultBalanceService,
  ],
  exports: [
    AddMoneyService,
    WithdrawMoneyService,
    WalletStatementService,
    PurchaseService,
    RefundCancelService,
    ConsultBalanceService,
  ],
})
export class DomainModule {}
