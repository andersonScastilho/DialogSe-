import { IsArray, IsBoolean, IsString } from 'class-validator';

class ParticipantConversationDto {
  @IsString()
  username: string
}

export class CreateConversationDto {
  @IsBoolean()
  isGroup: boolean;

  @IsArray()
  participants: ParticipantConversationDto[]
}
