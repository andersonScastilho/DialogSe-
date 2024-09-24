export class BadRequestError extends Error {
  constructor(public error: any) {
    super('Bad Request Error!');
    this.name = 'BadRequestError';
  }
}
