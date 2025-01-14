import { IsOptional, IsString } from 'class-validator';

export class SearchUserDto {
  @IsString()
  filter: string;

  @IsString()
  @IsOptional()
  sort: string | null;

  @IsString()
  @IsOptional()
  sortDir: string;
}
