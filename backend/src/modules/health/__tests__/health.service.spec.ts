import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from '../services/health.service';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { HealthStatus, DatabaseStatus } from '../enums';

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
    mockQueryRaw.mockClear();
  });

  describe('check', () => {
    it('should return ok status when database is connected', async () => {
      mockQueryRaw.mockResolvedValueOnce([{ result: 1 }]);

      const result = await healthService.check();

      expect(result.status).toBe(HealthStatus.OK);
      expect(result.database).toBe(DatabaseStatus.CONNECTED);
      expect(result.timestamp).toBeDefined();
    });

    it('should throw error when database fails', async () => {
      mockQueryRaw.mockRejectedValueOnce(new Error('DB Error'));

      await expect(healthService.check()).rejects.toThrow('DB Error');
    });
  });
});
