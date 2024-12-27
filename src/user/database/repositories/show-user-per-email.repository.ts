import { IUserEntity } from "@/user/entities/user.entity";

export interface IShowUserPerEmailRepository {
    execute(userEmail: string): Promise<IUserEntity>
}