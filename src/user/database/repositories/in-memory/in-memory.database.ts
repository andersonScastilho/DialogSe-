import { IUserEntity } from "@/user/entities/user.entity";
import { IUserRepository } from "../user.repository";

export class InMemoryDatabase implements IUserRepository {
    users: IUserEntity[]

    async create(input: IUserEntity): Promise<void> {
        this.users.push(input)

        return
    }

}