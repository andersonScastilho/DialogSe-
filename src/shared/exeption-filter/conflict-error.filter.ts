import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { ConflictError } from "../errors/conflict.error";


@Catch(ConflictError)
export class ConflictFilter implements ExceptionFilter {
    catch(exception: ConflictError, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()

        response.status(409).send({
            statusCode: 409,
            error: 'Conflcit Validation Error',
            message: exception.error
        })
    }

}