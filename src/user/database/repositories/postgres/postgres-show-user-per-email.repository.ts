import { IUserEntity } from "@/user/entities/user.entity";
import { IShowUserPerEmailRepository } from "../show-user-per-email.repository";
import { prismaClient } from "@/shared/database/prisma-client";
import { NotFoundError } from "@/shared/errors/not-found.error";

export class PostgresShowUserPerEmailRepository implements IShowUserPerEmailRepository {
    async execute(userEmail: string): Promise<IUserEntity> {
        const user = await prismaClient.user.findUnique({
            where: {
                email: userEmail
            }
        })
        if (!user) {
            throw new NotFoundError('User not found');
        }

        return user
    }
}   