import { IsString } from 'class-validator';

export class CreateConversationDto {
  @IsString()
  usernameA: string;

  @IsString()
  usernameB: string;
}
