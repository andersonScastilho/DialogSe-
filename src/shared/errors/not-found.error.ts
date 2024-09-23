export class NotFoundError extends Error {
    constructor(public error: any) {
        super('Ñot Found error!')
        this.name = 'NotFoundError'
    }
}