import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IMessageEntity } from '../entities/message.entity';

export class SendMessageDto implements Partial<IMessageEntity> {
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
