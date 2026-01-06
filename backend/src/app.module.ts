import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared';
import { HealthModule } from './modules/health';

@Module({
  imports: [SharedModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
