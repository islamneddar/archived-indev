import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedBlogEntity } from './feed_blog.entity';
import { CreateFeedBlogRequest } from './interface';

@Injectable()
export class FeedBlogService {
  constructor(
    @InjectRepository(FeedBlogEntity)
    private feedBlogRepository: Repository<FeedBlogEntity>,
  ) {}

  async save(createFeedBlogRequest: CreateFeedBlogRequest) {
    await this.feedBlogRepository.save(createFeedBlogRequest);
  }

  async getAll(): Promise<FeedBlogEntity[]> {
    return this.feedBlogRepository.find({});
  }

  async findOne(createFeedBlogRequest: CreateFeedBlogRequest) {
    return this.feedBlogRepository.findOne({
      where: {
        urlFeed: createFeedBlogRequest.urlFeed,
      },
    });
  }
}
