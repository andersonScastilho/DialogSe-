import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { IUserEntity } from '../entities/user.entity';
import { ClassValidatorFields } from '@/shared/validators/class-validator.fields';

export class UserRules implements IUserEntity {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDateString()
  @IsOptional()
  created_at?: Date;

  constructor({
    email,
    firstName,
    lastName,
    created_at,
    password,
    id,
  }: IUserEntity) {
    Object.assign(this, {
      created_at,
      email,
      firstName,
      lastName,
      password,
      id,
    });
  }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
  validate(data: UserRules): boolean {
    return super.validate(new UserRules(data ?? ({} as IUserEntity)));
  }
}

export class UserValidatorFactory {
  static create(): UserValidator {
    return new UserValidator();
  }
}
