
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from '../create-user.use-case';
import { UserDataBuilder } from '@/user/__tests__/helpers/user-data-builder';
import { UserEntity } from '@/user/entities/user.entity';
import { UserInMemoryDatabase } from '@/user/database/repositories/in-memory/in-memory.database';
import { ConflictError } from '@/shared/errors/conflict.error';
import { BcryptPasswordHashProvider } from '@/user/providers/bcrypt-password-hash-provider';

describe('Create User Use Case', () => {
    let sut: CreateUserUseCase

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CreateUserUseCase, {
                provide: 'HashProvider',
                useClass: BcryptPasswordHashProvider
            }, {
                    provide: 'UserRepository',
                    useClass: UserInMemoryDatabase
                }]

        }).compile()

        sut = module.get<CreateUserUseCase>(CreateUserUseCase)

        await sut.create(UserDataBuilder({}))

    })

    it('It should be possible to create a user', async () => {
        const user = await sut.create(UserDataBuilder({}))

        expect(user).toBeInstanceOf(UserEntity)
    })

    it('It is not possible to create a user, as the email is already being used', async () => {
        expect(async () => await sut.create(UserDataBuilder({}))).rejects.toBeInstanceOf(ConflictError)
    })

})