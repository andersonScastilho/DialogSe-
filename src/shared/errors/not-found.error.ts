export class NotFoundError extends Error {
  constructor(public error: any) {
    super('Not Found error!');
    this.name = 'NotFoundError';
  }
}
