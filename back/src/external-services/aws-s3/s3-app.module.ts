import {Module} from '@nestjs/common';
import {S3AppService} from '@/external-services/aws-s3/s3-app.service';

@Module({
  providers: [S3AppService],
  exports: [S3AppService],
})
export class S3AppModule {}
