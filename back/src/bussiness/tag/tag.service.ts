import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {TagEntity} from './tag.entity';

@Injectable()
export class TagService {
  LOG = new Logger(TagService.name);
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
    this.LOG.log('tagFound', tagFound);
    if (!tagFound) {
      const tag = new TagEntity();
      tag.title = category;
      return this.createTag(tag);
    }
    return tagFound;
  }

  async createTag(tag: TagEntity) {
    return this.tagRepository.save(tag);
  }
}
