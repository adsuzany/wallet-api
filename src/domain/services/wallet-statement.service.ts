import { Injectable } from '@nestjs/common';

@Injectable()
export class WalletStatementService {
  constructor() {}

  async getWalletStatement(payload: string): Promise<string> {
    return 'running';
  }
}
