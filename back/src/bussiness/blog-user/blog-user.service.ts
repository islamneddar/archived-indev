import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BlogToUserEntity} from '@/bussiness/blog-user/blog-user.entity';
import {BlogEntity} from '@/bussiness/blog/blog.entity';
import {UserEntity} from '@/bussiness/user/user.entity';
import {TinyIntEnum} from '@/database/db.types';

@Injectable()
export class BlogToUserService {
  constructor(
    @InjectRepository(BlogToUserEntity)
    private readonly blogUserRepository: typeof BlogToUserEntity,
  ) {}

  async getByBlogIdAndUserId(param: {blogId: number; userId: number}) {
    return this.blogUserRepository.findOne({
      where: {
        blog: {
          blogId: param.blogId,
        },
        user: {
          userId: param.userId,
        },
      },
    });
  }

  async create(param: {
    blog: BlogEntity;
    user: UserEntity;
    isLiked?: boolean;
    isBookmarked?: boolean;
  }) {
    const blogUser = new BlogToUserEntity();
    blogUser.blog = param.blog;
    blogUser.user = param.user;
    blogUser.isLiked = param.isLiked ? TinyIntEnum.TRUE : TinyIntEnum.FALSE;
    blogUser.isBookmarked = param.isBookmarked
      ? TinyIntEnum.TRUE
      : TinyIntEnum.FALSE;
    blogUser.bookmarkTime = param.isBookmarked
      ? new Date().toISOString()
      : null;
    return this.blogUserRepository.save(blogUser);
  }

  async updateLike(param: {blogToUser: BlogToUserEntity; isLiked: boolean}) {
    param.blogToUser.isLiked = param.isLiked
      ? TinyIntEnum.TRUE
      : TinyIntEnum.FALSE;
    param.blogToUser.updatedAt = new Date();
    return this.blogUserRepository.save(param.blogToUser);
  }

  queryTotalLikes() {
    return this.blogUserRepository
      .createQueryBuilder('blogUser')
      .select('blogUser.blogId', 'blogId')
      .addSelect('SUM(blogUser.isLiked)', 'totalLikes')
      .groupBy('blogUser.blogId');
  }

  async updateBookmark(param: {
    isBookmarked: boolean;
    blogToUser: BlogToUserEntity;
  }) {
    param.blogToUser.isBookmarked = param.isBookmarked
      ? TinyIntEnum.TRUE
      : TinyIntEnum.FALSE;
    param.blogToUser.bookmarkTime = param.isBookmarked
      ? new Date().toISOString()
      : null;
    param.blogToUser.updatedAt = new Date();
    return this.blogUserRepository.save(param.blogToUser);
  }
}
