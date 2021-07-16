import { Module } from '@nestjs/common';
import { AppLogger } from './logger.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  providers: [AppLogger, ConfigService],
  exports: [AppLogger],
})
export class AppLoggerModule {}
