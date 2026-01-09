import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseDto, ApiErrorResponseDto } from '@/common/dto';
import type { ApiResponse as ApiResponseType } from '@/common/dto';
import { HealthService } from '../services/health.service';
import { HealthApiResponseDto } from '../dto';
import type { HealthResponse } from '../dto';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({
    summary: 'Verifica status da API',
    description:
      'Retorna o status da aplicação e a conexão com o banco de dados. ' +
      'Use este endpoint para monitoramento e health checks de infraestrutura.',
  })
  @ApiResponse({
    status: 200,
    description: 'Sistema operacional',
    type: HealthApiResponseDto,
  })
  @ApiResponse({
    status: 503,
    description: 'Sistema com falha (banco desconectado)',
    type: ApiErrorResponseDto,
  })
  async check(): Promise<ApiResponseType<HealthResponse>> {
    try {
      const data = await this.healthService.check();
      return ApiResponseDto.success(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new ServiceUnavailableException(message);
    }
  }
}
