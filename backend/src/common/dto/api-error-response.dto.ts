import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Wrapper padrão para respostas de erro da API.
 * Usado automaticamente pelo HttpExceptionFilter.
 */
export class ApiErrorResponseDto {
  @ApiProperty({
    description: 'Indica que houve erro',
    example: false,
  })
  success: boolean;

  @ApiProperty({
    description: 'Código HTTP do erro',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensagem de erro',
    example: 'Dados inválidos',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Detalhes do erro (validação, etc.)',
    example: ['email deve ser um email válido'],
    type: [String],
  })
  errors?: string[];

  @ApiProperty({
    description: 'Timestamp do erro',
    example: '2026-01-06T15:30:00.000Z',
  })
  timestamp: string;

  @ApiPropertyOptional({
    description: 'Caminho da requisição',
    example: '/api/clients',
  })
  path?: string;

  constructor(partial: Partial<ApiErrorResponseDto>) {
    Object.assign(this, partial);
  }
}
