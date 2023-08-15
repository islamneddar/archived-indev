import {Injectable} from '@nestjs/common';
import {SourceBlogToUserEntity} from '@/bussiness/blog-domain/source-blog-user/source-blog-to-user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {SourceBlogEntity} from '@/bussiness/blog-domain/source-blog/source_blog.entity';
import {UserEntity} from '@/bussiness/user/user.entity';

@Injectable()
export class SourceBlogToUserService {
  constructor(
    @InjectRepository(SourceBlogToUserEntity)
    private readonly sourceBlogToUserRepository: typeof SourceBlogToUserEntity,
  ) {}

  getByUserIdAndSourceBlogId(param: {sourceBlogId: number; userId: number}) {
    return this.sourceBlogToUserRepository.findOne({
      where: {
        sourceBlog: {
          sourceBlogId: param.sourceBlogId,
        },
        user: {
          userId: param.userId,
        },
      },
    });
  }

  async updateFollow(param: {
    sourceBlogToUser: SourceBlogToUserEntity;
    userId: number;
    isFollow: boolean;
  }) {
    const sourceBlogToUser = param.sourceBlogToUser;
    sourceBlogToUser.isFollow = param.isFollow;
    return await this.sourceBlogToUserRepository.save(sourceBlogToUser);
  }

  async create(param: {
    isFollow: boolean;
    sourceBlog: SourceBlogEntity;
    user: UserEntity;
  }) {
    const sourceBlogToUser = new SourceBlogToUserEntity();
    sourceBlogToUser.isFollow = param.isFollow;
    sourceBlogToUser.sourceBlog = param.sourceBlog;
    sourceBlogToUser.user = param.user;
    return await this.sourceBlogToUserRepository.save(sourceBlogToUser);
  }
}
