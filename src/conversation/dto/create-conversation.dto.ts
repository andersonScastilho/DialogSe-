import { IsArray, IsBoolean } from 'class-validator';

class ParticipantInputDto {
  @IsArray()
  usernames: [];
}

export class CreateConversationDto {
  @IsBoolean()
  isGroup: boolean;

  @IsArray()
  participants: ParticipantInputDto[];
}
