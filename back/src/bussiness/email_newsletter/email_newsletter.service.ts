import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsletterEmailEntity } from './email_newsletter.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmailNewsletterService {
  private readonly logger = new Logger(EmailNewsletterService.name);

  constructor(
    @InjectRepository(NewsletterEmailEntity)
    private emailNewsletter: Repository<NewsletterEmailEntity>,
  ) {}
}
