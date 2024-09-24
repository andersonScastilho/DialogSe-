import { IsString, IsUUID } from 'class-validator';

export class ShowUserDto {
  @IsString()
  @IsUUID()
  id: string;
}
