
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from '../create-user.use-case';
import { UserDataBuilder } from '@/user/__tests__/helpers/user-data-builder';
import { UserEntity } from '@/user/entities/user.entity';
import { BcryptPasswordHashProvider } from '@/user/providers/bcrypt-password-hash-provider';
import { UserInMemoryDatabase } from '@/user/database/repositories/in-memory/in-memory.database';

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
    })

    it('Deveria ser possivel criar um usuario', async () => {
        const user = await sut.create(UserDataBuilder({
            password: 'Teste123@'
        }))
        console.log(user)
        expect(user).toBeInstanceOf(UserEntity)
    })
})