import { Body, Controller, Post } from '@nestjs/common';
import { MessageUseCase } from './use-case/send-message.use-case';
import { SendMessageDto } from './dto/send-message.dto';

@Controller('conversation')
export class MessageController {
  constructor(private readonly messageUseCase: MessageUseCase) {}

  @Post('message')
  async create(@Body() body: SendMessageDto) {
    await this.messageUseCase.send(body);

    return;
  }
}
