import { Module } from '@nestjs/common';
import { WalletsController } from './controllers';
import { WalletsService, AuditService, AssetResolverService } from './services';
import { YahooMarketService } from './providers';

@Module({
  controllers: [WalletsController],
  providers: [
    WalletsService,
    AuditService,
    AssetResolverService,
    {
      provide: 'MARKET_DATA_PROVIDER',
      useClass: YahooMarketService,
    },
  ],
  exports: [WalletsService],
})
export class WalletsModule {}
