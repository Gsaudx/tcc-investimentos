import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { HealthResponseDto } from '../dto';
import { HealthStatus, DatabaseStatus } from '../enums';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Verifica a saúde da aplicação.
   * @returns Dados de saúde se tudo OK
   * @throws Error se o banco estiver desconectado
   */
  async check(): Promise<HealthResponseDto> {
    await this.prisma.$queryRaw`SELECT 1`;

    return {
      status: HealthStatus.OK,
      database: DatabaseStatus.CONNECTED,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
