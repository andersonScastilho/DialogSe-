export class ConflictError extends Error {
    constructor(public error: any) {
        super('Conflict validation error!')
        this.name = 'ConflictError'
    }
}