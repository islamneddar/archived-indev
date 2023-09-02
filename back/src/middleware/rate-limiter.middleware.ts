import {ThrottlerModule} from '@nestjs/throttler';

export const rateLimiterMiddleware = ThrottlerModule.forRoot({
  ttl: 60,
  limit: 25,
});
