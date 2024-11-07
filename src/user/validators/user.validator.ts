import {
  IsDate,
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
  password_hash: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  constructor({
    email,
    firstName,
    lastName,
    createdAt,
    password_hash,
    id,
  }: IUserEntity) {
    Object.assign(this, {
      createdAt,
      email,
      firstName,
      lastName,
      password_hash,
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
