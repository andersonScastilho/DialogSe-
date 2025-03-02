import { IMessageEntity } from '@/conversation/entities/message.entity';

export interface ICreateMessageRepository {
  execute(message: IMessageEntity): Promise<void>;
}
