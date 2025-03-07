export interface IConversationExistBetweenUsernames {
  execute(usernameA: string, usernameB: string): Promise<boolean>;
}
