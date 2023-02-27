import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SourceBlogEntity } from './source_blog.entity';

@Injectable()
export class SourceBlogService {
  constructor(
    @InjectRepository(SourceBlogEntity)
    private sourceBlogRepository: Repository<SourceBlogEntity>,
  ) {}

  async save(sourceBlog: SourceBlogEntity): Promise<SourceBlogEntity> {
    return this.sourceBlogRepository.save(sourceBlog);
  }

  findAll(): Promise<SourceBlogEntity[]> {
    return this.sourceBlogRepository.find();
  }

  async getByTitle(titleFeed: string) {
    return this.sourceBlogRepository.findOne({
      where: {
        name: titleFeed,
      },
    });
  }
}
