import { IUserEntity } from "../entities/user.entity";
import {
    IsDateString,
    IsEmail,
    IsOptional,
    IsString,
    IsStrongPassword,
} from 'class-validator';

export class CreateUserDto implements IUserEntity {
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
}