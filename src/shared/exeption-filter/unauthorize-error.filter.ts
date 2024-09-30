import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { UnauthorizedError } from "../errors/unauthorized.error";

@Catch(UnauthorizedError)
export class UnauthorizedFilter implements ExceptionFilter {
    catch(exception: UnauthorizedError, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()


        response.status(401).send({
            statusConde: 401,
            error: 'Unauthorized Error',
            message: exception.error
        })
    }
}