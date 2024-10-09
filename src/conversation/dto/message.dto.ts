import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IMessage } from '../entities/message.entity';

export class MessageDto implements Partial<IMessage> {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  receiver: string;
}
