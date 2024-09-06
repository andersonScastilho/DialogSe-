import { IHashProvider } from "@/shared/providers/hash-provider.interface"
import { compare, hash } from "bcrypt"

export class BcryptPasswordHashProvider implements IHashProvider {
    async compare(payload: string, hash: string): Promise<boolean> {
        const passwordIsMatch = await compare(payload, hash)

        return passwordIsMatch
    }

    async hash(payload: string): Promise<string> {
        const password_hash = await hash(payload, 6)

        return password_hash
    }
}