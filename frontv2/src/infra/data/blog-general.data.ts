import {BlogAffichageType, GridBlogType} from '@/infra/enums/blog-general.type';
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
