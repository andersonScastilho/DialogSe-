export class ConflictValidationError extends Error {
    constructor(public error: any) {
        super('Conflict validation error!')
        this.name = 'ConflictValidationError'
    }
}