import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailNewsletterController } from './email_newsletter.controller';
import { EmailNewsletterService } from './email_newsletter.service';
import { NewsletterEmailEntity } from './email_newsletter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NewsletterEmailEntity])],
  controllers: [EmailNewsletterController],
  providers: [EmailNewsletterService],
})
export class EmailNewsletterModule {}
