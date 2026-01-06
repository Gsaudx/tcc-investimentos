import { Module } from '@nestjs/common';
import { HealthController } from './controllers';
import { HealthService } from './services';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
