import { Transform, TransformFnParams } from "class-transformer"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SignInUserDto {

    @IsString()
    @IsEmail()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    email: string

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    password: string
}