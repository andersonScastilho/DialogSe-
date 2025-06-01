import { IsString, IsUUID } from 'class-validator';

export class ParticipantConversationDto {
  @IsString()
  @IsUUID()
  userId: string;
}
