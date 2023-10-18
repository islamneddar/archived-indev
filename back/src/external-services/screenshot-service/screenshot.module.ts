import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {ScreenshotService} from '@/external-services/screenshot-service/screenshot.service';

@Module({
  imports: [ConfigModule],
  providers: [ScreenshotService],
  exports: [ScreenshotService],
})
export class ScreenshotModule {}
