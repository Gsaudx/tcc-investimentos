import { ApiProperty } from '@nestjs/swagger';
import { HealthResponseDto } from './health-response.dto';

/**
 * Resposta completa do endpoint /health
 * Wrapper ApiResponseDto<HealthResponseDto>
 */
export class HealthApiResponseDto {
  @ApiProperty({
    description: 'Indica se a requisição foi bem-sucedida',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Dados de saúde da aplicação',
    type: HealthResponseDto,
  })
  data: HealthResponseDto;

  @ApiProperty({
    description: 'Mensagem descritiva (opcional)',
    example: 'Operação realizada com sucesso',
    required: false,
  })
  message?: string;
}
