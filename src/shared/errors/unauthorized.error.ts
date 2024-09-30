export class UnauthorizedError extends Error {
    constructor(public error: any) {
        super('Unauthorized Error')
        this.name = 'Unauthorized Error'
    }
}