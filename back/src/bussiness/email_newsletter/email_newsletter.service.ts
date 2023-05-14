import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsletterEmailEntity } from './email_newsletter.entity';

@Injectable()
export class EmailNewsletterService {
  private readonly logger = new Logger(EmailNewsletterService.name);

  constructor(
    @InjectRepository(NewsletterEmailEntity)
    private emailNewsletter: Repository<NewsletterEmailEntity>,
  ) {}
}
