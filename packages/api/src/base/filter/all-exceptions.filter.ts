import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { toErrorDetailsHttpException } from '../error/error-details';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('AllExceptionsFilter');
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const statusDetails = toErrorDetailsHttpException(exception);
    const { debugInfos, apiError } = statusDetails;
    let data = apiError;

    if (process.env.ENABLE_DEBUG_INFO) {
      data = {
        error: {
          ...apiError.error,
          details: [...apiError.error.details, ...debugInfos],
        },
      };
    }

    try {
      response.status(statusDetails.getStatus()).json(data);
    } catch (e: any) {
      this.logger.error(
        `Fail to set error response for request ${request.url}, ${
          e?.stack ?? e
        }`,
      );
    }
  }
}
