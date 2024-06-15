import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class EventsService {
  constructor() {}

  @OnEvent('order.created', { async: true })
  get(payload: string): string {
    return 'listened';
  }
}
