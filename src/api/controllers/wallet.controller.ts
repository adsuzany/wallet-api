import { RefundCancelPurchaseDto } from 'src/application/dtos/requests/refund-cancel-purchase.request.dto';
import { RefundCancelService } from '../../domain/services/refund-cancel-service/refund-cancel.service';
import { ConsultBalanceService } from './../../domain/services/consult-balance-service/consult-balance.service';
import { PurchaseService } from './../../domain/services/purchase-service/purchase.service';
import { AddMoneyService } from '../../domain/services/add-money-service/add-money.service';
import { AddMoneyRequestDto } from './../../application/dtos/requests/add-money.request.dto';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { WithdrawalMoneyService } from 'src/domain/services/withdrawal-money-service/withdrawal-money.service';
import { WalletStatementService } from 'src/domain/services/wallet-statement-service/wallet-statement.service';
import { WithdrawalMoneyRequestDto } from 'src/application/dtos/requests/withdrawal-money.request.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SWAGGER } from 'src/common/constants/swagger-descriptions.constants';
import { RESPONSE } from 'src/common/constants/response.constants';
import { StatementResponseDto } from 'src/application/dtos/responses/statement.response';
import { ATTRUBUTES } from 'src/common/constants/attributes.constants';

@ApiTags(SWAGGER.TAG)
@Controller('wallet')
export class WalletController {
  constructor(
    private readonly addMoneyService: AddMoneyService,
    private readonly witdrawMoneyService: WithdrawalMoneyService,
    private readonly walletStatementService: WalletStatementService,
    private readonly purchaseService: PurchaseService,
    private readonly consultBalanceService: ConsultBalanceService,
    private readonly refundCancelService: RefundCancelService
  ) {}

  @ApiOperation({
    description: SWAGGER.GET_BALANCE.DESCRIPTION,
  })
  @ApiOkResponse({
    description: RESPONSE.BALANCE(0),
    type: String,
  })
  @ApiNotFoundResponse({
    description: RESPONSE.NOT_FOUND,
    type: NotFoundException,
  })
  @ApiParam({
    name: 'userId',
    description: ATTRUBUTES.USER_ID.DESCRIPTION,
    example: ATTRUBUTES.USER_ID.EXAMPLE,
  })
  @Get('balance/:userId')
  async getWallatBalance(@Param('userId') userId: string): Promise<string> {
    return this.consultBalanceService.getBalance(userId);
  }

  @ApiOperation({
    description: SWAGGER.GET_STATEMENT.DESCRIPTION,
  })
  @ApiOkResponse({
    description: RESPONSE.SUCCESS,
    type: StatementResponseDto,
  })
  @ApiNotFoundResponse({
    description: RESPONSE.NOT_FOUND,
    type: NotFoundException,
  })
  @ApiParam({
    name: 'userId',
    description: ATTRUBUTES.USER_ID.DESCRIPTION,
    example: ATTRUBUTES.USER_ID.EXAMPLE,
  })
  @Get('statement/:userId')
  async getWallaStatement(
    @Param('userId') userId: string
  ): Promise<StatementResponseDto[]> {
    return this.walletStatementService.getWalletStatement(userId);
  }

  @ApiOperation({
    description: SWAGGER.DEPOSIT.DESCRIPTION,
  })
  @ApiBody({ type: AddMoneyRequestDto })
  @ApiCreatedResponse({
    type: String,
    description: RESPONSE.SUCCESS,
  })
  @ApiInternalServerErrorResponse({
    type: Error,
  })
  @Put('deposit')
  async depositMoney(@Body() body: AddMoneyRequestDto): Promise<string> {
    return this.addMoneyService.addMoney(body);
  }

  @ApiOperation({
    description: SWAGGER.WITHDRAWAL.DESCRIPTION,
  })
  @ApiBody({ type: WithdrawalMoneyRequestDto })
  @ApiCreatedResponse({
    type: String,
    description: RESPONSE.SUCCESS,
  })
  @ApiInternalServerErrorResponse({
    type: Error,
  })
  @Put('withdraw')
  async withdrawMoney(
    @Body() body: WithdrawalMoneyRequestDto
  ): Promise<string> {
    return this.witdrawMoneyService.withdrawMoney(body);
  }

  @ApiOperation({
    description: SWAGGER.PURCHASE.DESCRIPTION,
  })
  @ApiInternalServerErrorResponse({
    type: Error,
  })
  @ApiBody({ type: WithdrawalMoneyRequestDto })
  @Put('purchase')
  async purchase(@Body() body: WithdrawalMoneyRequestDto): Promise<string> {
    return this.purchaseService.recordPurchase(body);
  }

  @ApiOperation({
    description: SWAGGER.REFUND_CANCEL.DESCRIPTION,
  })
  @ApiBody({ type: RefundCancelPurchaseDto })
  @ApiCreatedResponse({
    type: String,
    description: RESPONSE.SUCCESS,
  })
  @ApiInternalServerErrorResponse({
    type: Error,
  })
  @ApiNotFoundResponse({
    description: RESPONSE.NOT_FOUND,
    type: NotFoundException,
  })
  @Post('purchase/cancel-refund')
  async cancelRefundPurchase(
    @Body() body: RefundCancelPurchaseDto
  ): Promise<string> {
    return this.refundCancelService.refundCancelPurchase(body);
  }
}
