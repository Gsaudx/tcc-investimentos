import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HealthStatus, DatabaseStatus } from '../enums';

export class HealthResponseDto {
  @ApiProperty({
    description: 'Status geral da aplicação',
    enum: HealthStatus,
    example: HealthStatus.OK,
  })
  status: HealthStatus;

  @ApiProperty({
    description: 'Status da conexão com o banco de dados',
    enum: DatabaseStatus,
    example: DatabaseStatus.CONNECTED,
  })
  database: DatabaseStatus;

  @ApiPropertyOptional({
    description: 'Data/hora da verificação (ISO 8601)',
    example: '2026-01-06T15:30:00.000Z',
  })
  timestamp?: string;

  @ApiPropertyOptional({
    description: 'Ambiente de execução',
    example: 'development',
  })
  environment?: string;

  @ApiPropertyOptional({
    description: 'Mensagem de erro (apenas quando status = error)',
    example: 'Connection refused',
  })
  error?: string;
}
