import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IMessage } from '../entities/message.entity';

export class SendMessageDto implements Partial<IMessage> {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsUUID()
  receiver: string;

  @IsString()
  @IsUUID()
  sender: string;
}
