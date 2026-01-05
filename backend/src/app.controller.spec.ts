import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

const mockQueryRaw = jest.fn().mockResolvedValue([{ result: 1 }]);

const mockPrismaService = {
  $queryRaw: mockQueryRaw,
  $connect: jest.fn(),
  $disconnect: jest.fn(),
} as unknown as PrismaService;

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('health', () => {
    it('should return ok status when database is connected', async () => {
      const result = await appController.healthCheck();

      expect(result.status).toBe('ok');
      expect(result.database).toBe('connected');
    });

    it('should return error status when database fails', async () => {
      mockQueryRaw.mockRejectedValueOnce(new Error('DB Error'));

      const result = await appController.healthCheck();

      expect(result.status).toBe('error');
      expect(result.database).toBe('disconnected');
    });
  });
});
