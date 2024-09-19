import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { ConflictValidationError } from "../errors/conflict-validation.error";


@Catch(ConflictValidationError)
export class ConflictValidationFilter implements ExceptionFilter {
    catch(exception: ConflictValidationError, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()

        response.status(409).send({
            statusCode: 409,
            error: 'Conflcit Validation Error',
            message: exception.error
        })
    }

}