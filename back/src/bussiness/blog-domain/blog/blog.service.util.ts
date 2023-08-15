import {UserEntity} from '@/bussiness/user/user.entity';
import {BlogEntity} from '@/bussiness/blog-domain/blog/blog.entity';
import {SourceBlogEntity} from '@/bussiness/blog-domain/source-blog/source_blog.entity';
import {TagEntity} from '@/bussiness/blog-domain/tag/tag.entity';
import {DataSource} from 'typeorm';
import {PageOptionsDto} from '@/common/pagination/page_option.dto';

const fromDbToBlogEntity = (param: {
  blogFromDb: any;
  user: UserEntity | null;
}) => {
  const blogFromDb = param.blogFromDb;
  const blog = new BlogEntity();
  blog.blogId = blogFromDb.blogid;
  blog.title = blogFromDb.blogtitle;
  blog.publishDate = blogFromDb.publishdate;
  blog.thumbnail = blogFromDb.thumbnail;
  blog.permalink = blogFromDb.permalink;
  blog.sourceBlog = new SourceBlogEntity();
  blog.sourceBlog.name = blogFromDb.sourceblogname;
  blog.sourceBlog.image = blogFromDb.sourceblogimage;
  blog.tags = blogFromDb.tags
    ? blogFromDb.tags.split(',').map(tag => {
        const tagEntity = new TagEntity();
        tagEntity.title = tag;
        return tagEntity;
      })
    : [];
  blog.totalLike = blogFromDb.totallikes ? Number(blogFromDb.totallikes) : 0;
  if (param.user) {
    blog.isLiked = blogFromDb.isliked === 1;
    blog.isBookmarked = blogFromDb.isbookmarked === 1;
    blog.bookmarkTime = blogFromDb.bookmarktime;
  }
  return blog;
};

const generateQueryForGettingBlogs = async (param: {
  dataSource: DataSource;
  user: UserEntity | null;
  typeOfGet: {
    all?: boolean;
    ofUserOnly: boolean;
  };
  pagination: {
    pageOptionsDto: PageOptionsDto;
    applyPagination: boolean;
  };
  likes: {
    getLikes: boolean;
    getIsLiked: boolean;
  };
  getTags: boolean | null;
  bookmarkInfo: {
    dateToCompareInBookmark: string | null;
    isOrderedByBlogBookmarkDate: boolean | null;
    getIsBookmarked: boolean | null;
  };
  isOrderedByBlogPublishDate: boolean | null;
}) => {
  const query = (await param.dataSource.query(`
      SELECT blogs.blog_id             as blogid,
             blogs.title               as blogtitle,
             blogs.publish_date        as publishdate,
             blogs.thumbnail           as thumbnail,
             blogs.permalink           as permalink,
             source_blogs.name         as sourceblogname,
             source_blogs.image        as sourceblogimage
             ${param.getTags ? ", STRING_AGG(t.title, ', ') AS tags " : ''}
             ${
               param.likes.getLikes
                 ? `, likes.totalLikes          as totalLikes `
                 : ''
             }
             ${
               param.user && param.likes.getIsLiked
                 ? ', blog_to_user.is_liked as isliked, blog_to_user.user_id as userid '
                 : ''
             }
             ${
               param.user && param.bookmarkInfo.getIsBookmarked
                 ? ', blog_to_user.is_bookmarked as isbookmarked, blog_to_user.bookmark_time as bookmarkTime '
                 : ''
             }
      from blogs
               left join source_blogs on blogs.source_blog_id = source_blogs.source_blog_id
               left join blog_tags on blogs.blog_id = blog_tags.blog_id
               ${
                 param.getTags
                   ? 'left join tags t on blog_tags.tag_id = t.tag_id '
                   : ''
               }
               ${
                 param.likes.getLikes
                   ? 'left join (select blog_id, SUM(is_liked) as totalLikes from blog_to_user group by blog_id) likes on blogs.blog_id = likes.blog_id '
                   : ''
               }
               ${
                 param.user
                   ? 'left join blog_to_user on blogs.blog_id = blog_to_user.blog_id and blog_to_user.user_id = ' +
                     param.user.userId +
                     ' '
                   : ''
               }
      where source_blogs.black_list = false
      ${
        param.typeOfGet.ofUserOnly
          ? 'and blog_to_user.user_id = ' +
            param.user?.userId +
            ' and blog_to_user.is_bookmarked = 1 ' +
            (param.bookmarkInfo.dateToCompareInBookmark
              ? "and blog_to_user.bookmark_time < '" +
                param.bookmarkInfo.dateToCompareInBookmark +
                "' "
              : '')
          : ''
      }
      group by blogs.blog_id, source_blogs.name, source_blogs.image
              ${param.likes.getLikes ? ', totalLikes ' : ''}
              ${
                param.user && param.likes.getIsLiked
                  ? ', blog_to_user.is_liked, blog_to_user.user_id '
                  : ''
              }
              ${
                param.user && param.bookmarkInfo.getIsBookmarked
                  ? ', blog_to_user.is_bookmarked, blog_to_user.bookmark_time '
                  : ''
              }
      ${
        param.isOrderedByBlogPublishDate
          ? 'order by blogs.publish_date desc'
          : ''
      }
      ${
        param.bookmarkInfo.isOrderedByBlogBookmarkDate
          ? 'order by blog_to_user.bookmark_time desc'
          : ''
      }
      ${
        param.pagination.applyPagination
          ? `limit ${param.pagination.pageOptionsDto.take}`
          : ''
      }
  `)) as any[];
  return query;
};

export const BlogServiceUtil = {
  fromDbToBlogEntity,
  generateQueryForGettingBlogs,
};
