import { Body, Controller, Post, UseGuards } from '@nestjs/common';
// import { SendMessageUseCase } from './use-case/send-message.use-case';
// import { SendMessageDto } from './dto/send-message.dto';
import { AuthGuard } from '@/auth/auth.guard';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateConversationUseCase } from './use-case/create-conversation.use-case';

@UseGuards(AuthGuard)
@Controller('conversations')
export class MessageController {
  constructor(
    // private readonly sendMessageUseCase: SendMessageUseCase,
    private readonly createConversationUseCase: CreateConversationUseCase,
  ) {}

  // @Post('message')
  // async sendMessage(@Body() body: SendMessageDto) {
  //   await this.sendMessageUseCase.send(body);

  //   return;
  // }

  @Post()
  async create(@Body() body: CreateConversationDto) {
    await this.createConversationUseCase.execute(body);

    return;
  }
}
