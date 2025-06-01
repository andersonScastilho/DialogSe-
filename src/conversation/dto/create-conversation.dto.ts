import { IsArray, IsBoolean } from 'class-validator';
import { ParticipantConversationDto } from './participant-conversation.dto';

export class CreateConversationDto {
  @IsBoolean()
  isGroup: boolean;

  @IsArray()
  participants: ParticipantConversationDto[];
}
