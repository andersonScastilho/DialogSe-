import { IsNotEmpty, IsString } from 'class-validator';
import { IMessageEntity } from '../entities/message.entity';

export class SendMessageDto implements Partial<IMessageEntity> {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  receiver: string;

  @IsString()
  @IsNotEmpty()
  sender: string;
}
