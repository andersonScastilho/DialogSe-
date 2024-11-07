export interface IEmailAlreadyInUseRepository {
  execute(email: string): Promise<void>;
}
