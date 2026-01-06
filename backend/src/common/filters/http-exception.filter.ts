import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiErrorResponseDto } from '../dto';

interface ExceptionResponse {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

/**
 * Filtro global para padronizar todas as respostas de erro da API.
 * Captura HttpExceptions e erros não tratados.
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = this.extractMessage(exception);
    const errors = this.extractErrors(exception);

    const errorResponse = new ApiErrorResponseDto({
      success: false,
      statusCode: status,
      message,
      errors,
      timestamp: new Date().toISOString(),
      path: request.url,
    });

    response.status(status).json(errorResponse);
  }

  private extractMessage(exception: unknown): string {
    if (exception instanceof HttpException) {
      const response = exception.getResponse() as ExceptionResponse;
      if (typeof response === 'string') return response;
      if (response.message) {
        return Array.isArray(response.message)
          ? response.message[0]
          : response.message;
      }
    }
    return 'Erro interno do servidor';
  }

  private extractErrors(exception: unknown): string[] | undefined {
    if (exception instanceof HttpException) {
      const response = exception.getResponse() as ExceptionResponse;
      if (response.message && Array.isArray(response.message)) {
        return response.message;
      }
    }
    if (exception instanceof Error) {
      return [exception.message];
    }
    return undefined;
  }
}
