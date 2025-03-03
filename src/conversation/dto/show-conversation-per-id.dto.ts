import { IsString, IsUUID } from 'class-validator';

export class ShowConversationPerIdDto {
  @IsString()
  @IsUUID()
  id: string;
}
