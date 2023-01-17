import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from './tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>,
  ) {}

  async getByTitleOrCreate(category: string) {
    const tagFound = await this.tagRepository.findOne({
      where: {
        title: category,
      },
    });
    if (!tagFound) {
      const tag = new TagEntity();
      tag.title = category;
      return this.createTag(tag);
    }
    return tagFound;
  }

  async createTag(tag: TagEntity) {
    return await this.tagRepository.save(tag);
  }
}
