import { IUserEntity } from "@/user/entities/user.entity";

export interface IUserRepository {
    create(input: IUserEntity): Promise<void>
}