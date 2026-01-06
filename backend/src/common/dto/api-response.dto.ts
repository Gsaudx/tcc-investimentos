import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Wrapper padrão para respostas de sucesso da API.
 * Uso: return ApiResponse.success(data) ou new ApiResponseDto({ data })
 */
export class ApiResponseDto<T> {
  @ApiProperty({
    description: 'Indica se a requisição foi bem-sucedida',
    example: true,
  })
  success: boolean;

  @ApiPropertyOptional({ description: 'Dados retornados pela requisição' })
  data?: T;

  @ApiPropertyOptional({
    description: 'Mensagem descritiva (opcional)',
    example: 'Operação realizada com sucesso',
  })
  message?: string;

  constructor(partial: Partial<ApiResponseDto<T>>) {
    Object.assign(this, partial);
  }

  /**
   * Factory method para resposta de sucesso
   */
  static success<T>(data: T, message?: string): ApiResponseDto<T> {
    return new ApiResponseDto({ success: true, data, message });
  }
}
