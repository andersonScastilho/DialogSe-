import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BadRequestError } from '../errors/bad-request.error';

@Catch(BadRequestError)
export class BadRequestErrorFilter implements ExceptionFilter {
  catch(exception: BadRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(400).send({
      statusCode: 400,
      error: 'Bad Request Error',
      message: exception.error,
    });
  }
}
