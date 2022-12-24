import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Error } from 'mongoose';
import ValidationError = Error.ValidationError;

@Catch(ValidationError)
export class MongooseErrorFilter implements ExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;

    let message = exception.message || 'Internal Error';
    const errors = [];
    for (const name in exception.errors) {
      if (exception.errors[name]) {
        errors.push(exception.errors[name].message);
      }
    }

    if (errors.length > 0) {
      message = errors.reverse().join('; ');
    }

    response.status(status).json({
      code: status,
      err: true,
      msg: message,
    });
  }
}
