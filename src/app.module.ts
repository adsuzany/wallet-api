import { Module } from '@nestjs/common';
import { WalletController } from './api/controllers/wallet.controller';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [DomainModule, InfrastructureModule],
  controllers: [WalletController],
})
export class AppModule {}
