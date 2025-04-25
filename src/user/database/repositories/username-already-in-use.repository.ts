export interface IUsernameAlreadyInUseRepository {
  execute(username: string): Promise<void>;
}
