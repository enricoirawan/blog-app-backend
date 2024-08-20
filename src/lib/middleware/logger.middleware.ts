import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private logger: Logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body } = req;
    const start = Date.now();

    // Temporary variable to capture the response body
    const oldWrite = res.write;
    const oldEnd = res.end;
    const chunks: Buffer[] = [];

    this.logger.log(
      `[Request] ${method} ${originalUrl} - Body: ${JSON.stringify(body)}`,
    );

    res.write = (...restArgs: any[]): any => {
      chunks.push(Buffer.from(restArgs[0]));
      return oldWrite.apply(res, restArgs);
    };

    res.end = (...restArgs: any[]): any => {
      if (restArgs[0]) {
        chunks.push(Buffer.from(restArgs[0]));
      }
      const body = Buffer.concat(chunks).toString('utf8');
      const { statusCode } = res;
      const duration = Date.now() - start;

      this.logger.log(
        `[Response] ${method} ${originalUrl} ${statusCode} ${duration}ms - Body:${body}`,
      );
      return oldEnd.apply(res, restArgs);
    };

    next();
  }
}
