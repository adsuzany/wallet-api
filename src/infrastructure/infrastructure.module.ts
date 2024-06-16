import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { UserRepository } from './repositories/user.repository';
import { OperationRepository } from './repositories/operation.repository';

@Module({
  providers: [PrismaService, UserRepository, OperationRepository],
  exports: [PrismaService, UserRepository, OperationRepository],
})
export class InfrastructureModule {}
