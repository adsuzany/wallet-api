import { Module } from '@nestjs/common';
import { WalletController } from './api/controllers/wallet.controller';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [DomainModule],
  controllers: [WalletController],
})
export class AppModule {}
