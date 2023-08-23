import {ConfigModule} from '@nestjs/config';
import {Module} from '@nestjs/common';
import {ScheduleModule} from '@nestjs/schedule';
import {ThrottlerGuard} from '@nestjs/throttler';
import {APP_GUARD} from '@nestjs/core';
import DBModule from './database/db.config';
import {MailingConfig} from '@/external-services/mailing/mailing.config';
import {adminJsMiddleware} from '@/middleware/admin.middleware';
import {rateLimiterMiddleware} from '@/middleware/rate-limiter.middleware';
import {modules} from '@/middleware/module-domain-listing.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailingConfig,
    adminJsMiddleware,
    rateLimiterMiddleware,
    ScheduleModule.forRoot(),
    DBModule,
    ...modules,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [],
})
export default class AppModule {}
