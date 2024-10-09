import { IsString, IsUUID } from "class-validator";

export class CreateConversationDto {
    @IsString()
    @IsUUID()
    participant1Id: string;

    @IsString()
    @IsUUID()
    participant2Id: string;
}