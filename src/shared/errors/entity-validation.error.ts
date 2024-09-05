export class EntityValidationError extends Error {
  constructor(public error: any) {
    super('Entity validation error.');
    this.name = 'EntityValidationError';
  }
}
