import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {SourceBlogEntity} from './source_blog.entity';
import {PageOptionsDto} from '@/common/pagination/page_option.dto';
import {PageMetaDto} from '@/common/pagination/page_meta.dto';
import {PageDto} from '@/common/pagination/page.dto';
import {UserEntity} from '@/bussiness/user/user.entity';

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
  async findAllWithPagination(param: {
    paginationDto: PageOptionsDto;
    user: UserEntity;
  }) {
    const query = this.sourceBlogRepository
      .createQueryBuilder('sourceBlog')
      .leftJoin('sourceBlog.sourceBlogToUsers', 'sourceBlogToUsers')
      .leftJoin('sourceBlogToUsers.user', 'user', 'user.userId = :userId', {
        userId: param.user.userId,
      })
      .select('sourceBlog.name')
      .addSelect('sourceBlog.sourceBlogId')
      .addSelect('sourceBlog.image')
      .addSelect('sourceBlogToUsers.isFollow')
      .orderBy('sourceBlog.name', 'ASC')
      .where('sourceBlog.blackList = false')
      .skip(param.paginationDto.skip)
      .take(param.paginationDto.take);

    const itemCount = await query.getCount();
    const entities = await query.getMany();
    const entitiesToReturn = entities.map(sourceBlog => {
      if (sourceBlog.sourceBlogToUsers.length === 0) {
        return {
          sourceBlogId: sourceBlog.sourceBlogId,
          name: sourceBlog.name,
          image: sourceBlog.image,
          isFollow: false,
        };
      } else {
        return {
          sourceBlogId: sourceBlog.sourceBlogId,
          name: sourceBlog.name,
          image: sourceBlog.image,
          isFollow: sourceBlog.sourceBlogToUsers[0].isFollow,
        };
      }
    });
    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: param.paginationDto,
    });
    return new PageDto(entitiesToReturn, pageMetaDto);
  }

  findById(sourceBlogId: number) {
    return this.sourceBlogRepository.findOne({
      where: {
        sourceBlogId,
      },
    });
  }
}
