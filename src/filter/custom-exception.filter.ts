import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    response.statusCode = exception.getStatus();

    const res = exception.getResponse() as { message: string[] };

    response
      .json({
        statusCode: exception.getStatus(),
        message: 'fail',
        data: res?.message?.[0] ?? exception.message,
      })
      .end();
  }
}
