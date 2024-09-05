import { IUserEntity } from "../entities/user.entity";
import {
    IsDateString,
    IsEmail,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateUserDto implements IUserEntity {
    @IsString()
    firstName: string;

    @IsString()
    surname: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}