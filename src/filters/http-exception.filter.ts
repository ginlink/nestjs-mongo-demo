import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import type { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    let message =
      exception?.getResponse()['message'] ||
      exception?.message ||
      'Internal Error';
    if (Array.isArray(message)) {
      message = message.join('；');
    }

    response.status(status).json({
      code: status,
      err: true,
      msg: message,
    });
  }
}
