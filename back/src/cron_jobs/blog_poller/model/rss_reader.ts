import Parser from 'rss-parser';
import { SourceBlogEntity } from '../../../bussiness/source_blog/source_blog.entity';

export class RssReader {
  /*public writeSourceBlogInfo() {
        LOG.info("feed title " + this.feed.title);
        if (this.feed.image !== undefined) {
            LOG.info(this.feed.image?.url)
        } else {
            LOG.info("image : " + "https://ui-avatars.com/api/?name=" + this.feed.title)
        }
    }*/
  /*public writeBlogInfo() {
        const blog = this.feed.items[0]
        LOG.info("title : " + blog.title)
        LOG.info("pub date : " + blog.pubDate)

        LOG.info("image : ", this.retrieveImageFromFeed(blog))
        LOG.info("link : ", blog.link)
        if (blog.categories !== undefined) {
            for (let category of blog.categories) {
                if (typeof category == "object") {
                    LOG.info("is object")
                    category = category._
                }
                LOG.info("category : ", category)
            }
        }
    }*/
  /*private async retrieveBlogTags(item: any) {
        const blogTags: BlogTag[] = []
        if (item.categories !== undefined) {
            for (let category of item.categories) {
                if (typeof category == "object") {
                    category = category._
                }
                const blogTag = new BlogTag()
                blogTag.tagId = (await TagRepositories.getInstance().getByTitleOrCreate(category)).tagId
                blogTags.push(blogTag)
            }
        }
        return blogTags
    }*/
}
