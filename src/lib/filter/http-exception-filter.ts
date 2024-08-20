import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof BadRequestException) {
      response.status(status).json({
        status: false,
        statusCode: 400,
        path: request.url,
        message: exception.message,
        result: null,
      });
    } else {
      response.status(status).json({
        status: false,
        statusCode: exception.getStatus(),
        path: request.url,
        message: exception.message,
        result: null,
      });
    }
  }
}
