import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async healthCheck() {
    try {
      // Query de teste BD
      await this.prisma.$queryRaw`SELECT 1`;

      return {
        status: 'ok' as const,
        database: 'connected' as const,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';

      return {
        status: 'error' as const,
        database: 'disconnected' as const,
        error: message,
      };
    }
  }
}
