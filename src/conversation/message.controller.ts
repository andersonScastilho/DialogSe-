import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SendMessageUseCase } from './use-case/send-message.use-case';
import { SendMessageDto } from './dto/send-message.dto';
import { AuthGuard } from '@/auth/auth.guard';
import { ShowConversationPerIdDto } from './dto/show-conversation-per-id.dto';
import { ShowConversationPerIdUseCase } from './use-case/show-conversation-per-id.use-case';
import { IndexConversationPerUserUsecase } from './use-case/index-conversation-per-user.use-case';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateConversationUseCase } from './use-case/create-conversation.use-case';

@UseGuards(AuthGuard)
@Controller('conversations')
export class MessageController {
  constructor(
    private readonly sendMessageUseCase: SendMessageUseCase,
    private readonly showConversationPerIdUseCase: ShowConversationPerIdUseCase,
    private readonly indexConversationsPerUserUseCase: IndexConversationPerUserUsecase,
    private readonly createConversationUseCase: CreateConversationUseCase,
  ) {}

  @Post('message')
  async sendMessage(@Body() body: SendMessageDto) {
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

  @Get('conversations')
  async index(@Req() req: Request) {
    const userAuth = req['user-auth'];

    const conversations = await this.indexConversationsPerUserUseCase.execute(
      userAuth?.sub,
    );

    return conversations;
  }

  @Post('conversations')
  async create(usernames: CreateConversationDto) {
    await this.createConversationUseCase.execute(usernames);

    return;
  }
}
