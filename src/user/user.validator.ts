import {
    IsDateString,
    IsEmail,
    IsOptional,
    IsString,
    validateSync,
} from 'class-validator';
import { IUserEntity } from './user.entity';

export class UserRules implements IUserEntity {
    @IsString()
    firstName: string;

    @IsString()
    surname: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    password?: string;

    @IsDateString()
    @IsOptional()
    created_at?: Date;

    constructor({
        email,
        firstName,
        surname,
        created_at,
    }: IUserEntity) {
        Object.assign(this, {
            created_at,
            email,
            firstName,
            surname,
        });
    }
}

export class UserValidator {
    errors: { [field: string]: string[] } = null
    validatedData: IUserEntity = null
    validate(data: UserRules) {
        const errors = validateSync(new UserRules(data));

        if (errors.length) {
            this.errors = {}
            for (const error of errors) {
                const field = error.property
                this.errors[field] = Object.values(error.constraints)
            }
        } else {
            this.validatedData = data
        }

        return !errors.length

    }
}

