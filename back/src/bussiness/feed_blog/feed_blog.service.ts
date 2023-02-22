import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedBlogEntity } from './feed_blog.entity';
import { Repository } from 'typeorm';
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
    return await this.feedBlogRepository.find({});
  }

  async findOne(createFeedBlogRequest: CreateFeedBlogRequest) {
    return await this.feedBlogRepository.findOne({
      where: {
        urlFeed: createFeedBlogRequest.urlFeed,
      },
    });
  }
}
