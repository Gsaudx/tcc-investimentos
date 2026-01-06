import { Module } from '@nestjs/common';
import { SharedModule } from '@/shared';
import { HealthModule } from '@/modules/health';

@Module({
  imports: [SharedModule, HealthModule],
})
export class AppModule {}
