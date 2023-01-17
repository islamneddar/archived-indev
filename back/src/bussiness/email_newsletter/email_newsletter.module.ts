import { Module } from '@nestjs/common';
import { EmailNewsletterController } from './email_newsletter.controller';
import { EmailNewsletterService } from './email_newsletter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsletterEmailEntity } from './email_newsletter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NewsletterEmailEntity])],
  controllers: [EmailNewsletterController],
  providers: [EmailNewsletterService],
})
export class EmailNewsletterModule {}
