import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from '../services/health.service';
import { PrismaService } from '../../../shared/prisma/prisma.service';

const mockQueryRaw = jest.fn().mockResolvedValue([{ result: 1 }]);

const mockPrismaService = {
  $queryRaw: mockQueryRaw,
  $connect: jest.fn(),
  $disconnect: jest.fn(),
} as unknown as PrismaService;

describe('HealthService', () => {
  let healthService: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    healthService = module.get<HealthService>(HealthService);
  });

  describe('check', () => {
    it('should return ok status when database is connected', async () => {
      const result = await healthService.check();

      expect(result.status).toBe('ok');
      expect(result.database).toBe('connected');
      expect(result.timestamp).toBeDefined();
    });

    it('should return error status when database fails', async () => {
      mockQueryRaw.mockRejectedValueOnce(new Error('DB Error'));

      const result = await healthService.check();

      expect(result.status).toBe('error');
      expect(result.database).toBe('disconnected');
      expect(result.error).toBe('DB Error');
    });
  });
});
