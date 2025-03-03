import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SendMessageUseCase } from './use-case/send-message.use-case';
import { SendMessageDto } from './dto/send-message.dto';
import { AuthGuard } from '@/auth/auth.guard';
import { ShowConversationPerIdDto } from './dto/show-conversation-per-id.dto';
import { ShowConversationPerIdUseCase } from './use-case/show-conversation-per-id.use-case';

@UseGuards(AuthGuard)
@Controller('conversations')
export class MessageController {
  constructor(
    private readonly sendMessageUseCase: SendMessageUseCase,
    private readonly showConversationPerIdUseCase: ShowConversationPerIdUseCase,
  ) { }

  @Post('message')
  async create(@Body() body: SendMessageDto) {
    await this.sendMessageUseCase.send(body);

    return;
  }

  @Get('message/:id')
  async show(@Param() param: ShowConversationPerIdDto) {
    const conversation = await this.showConversationPerIdUseCase.execute(
      param.id,
    );

    return conversation;
  }
}
