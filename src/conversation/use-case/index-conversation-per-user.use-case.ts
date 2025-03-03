import { Inject } from "@nestjs/common";
import { IIndexConversationsPerUserRepository } from "../database/repositories/index-conversations-per-user.repository";
import { IShowUserPerIdRepository } from "@/user/database/repositories/show-user-per-id.repository";

export class IndexConversationPerUserUsecase {
    constructor(
        @Inject('IndexConversationsPerUserRepository')
        private readonly indexConversationsPerUserRepository: IIndexConversationsPerUserRepository,
        @Inject('ShowUserPerIdRepository')
        private readonly showUserPerIdRepository: IShowUserPerIdRepository) { }
    async execute(userId: string) {
        const user = await this.showUserPerIdRepository.execute(userId)

        const conversations = await this.indexConversationsPerUserRepository.execute(user.username)

        return conversations
    }
}