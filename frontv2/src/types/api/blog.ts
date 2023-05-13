import {PageMeta} from './common';
import {SourceBlog} from './source_blog';
import {Tag} from './tag';

export interface GetBlogsResponse {
  data: Blog[];
  meta: PageMeta;
}

export interface Blog {
  blogId: number;
  title: string;
  thumbnail: string;
  permalink: string;
  publishDate: string;
  sourceBlog: SourceBlog;
  tags: Tag[];
}
