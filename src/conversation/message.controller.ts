import { Body, Controller, Post } from '@nestjs/common';
import { SendMessageUseCase } from './use-case/send-message.use-case';
import { SendMessageDto } from './dto/send-message.dto';

@Controller('conversations')
export class MessageController {
  constructor(private readonly sendMessageUseCase: SendMessageUseCase) { }

  @Post('message')
  async create(@Body() body: SendMessageDto) {
    await this.sendMessageUseCase.send(body);

    return;
  }
}
