import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class SignUpUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsString()
  username: string;
}
