import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {SourceBlogEntity} from './source_blog.entity';
import {PageOptionsDto} from '@/common/pagination/page_option.dto';
import {PageMetaDto} from '@/common/pagination/page_meta.dto';
import {PageDto} from '@/common/pagination/page.dto';

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
  async findAllWithPagination(paginationDto: PageOptionsDto) {
    const query = this.sourceBlogRepository
      .createQueryBuilder('source_blog')
      .select('source_blog.name')
      .addSelect('source_blog.sourceBlogId')
      .addSelect('source_blog.image')
      .orderBy('source_blog.name', 'ASC')
      .where('source_blog.blackList = false')
      .skip(paginationDto.skip)
      .take(paginationDto.take);

    const itemCount = await query.getCount();
    const entities = await query.getMany();
    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: paginationDto,
    });
    return new PageDto(entities, pageMetaDto);
  }
}
