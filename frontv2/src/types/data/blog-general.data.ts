import {
  BlogAffichageType,
  GridBlogType,
} from '@/types/general/blog-general.type';
import {TypeFeed} from '@/types/api/source_blog';
export const gridBlogType = [
  {
    value: GridBlogType.GRID,
    content: 'Grid',
  },
  {
    value: GridBlogType.LIST,
    content: 'List',
  },
];

export const blogAffichageType = [
  {
    value: BlogAffichageType.LATEST,
    content: 'Latest',
  },
];
