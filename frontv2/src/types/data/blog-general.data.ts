import {
  BlogAffichageType,
  GridBlogType,
} from '@/types/general/blog-general.type';
import {SourceBlogTypeItemType, TypeFeed} from '@/types/api/source_blog';

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

export const typeFeed: SourceBlogTypeItemType[] = [
  {
    value: TypeFeed.COMMUNITY,
    content: 'Community',
    nbBlogs: 0,
    featuredBlog: {
      sourceBlogName: 'DEV Community',
      sourceBlogImage:
        'https://coinjournal.net/wp-content/uploads/2022/09/apple-touch-icon.png',
    },
  },
  {
    value: TypeFeed.ORIGINAL,
    content: 'Original',
    nbBlogs: 0,
    featuredBlog: {
      sourceBlogName: 'DEV Community',
      sourceBlogImage:
        'https://coinjournal.net/wp-content/uploads/2022/09/apple-touch-icon.png',
    },
  },
  {
    value: TypeFeed.NEWS,
    content: 'News',
    nbBlogs: 0,
    featuredBlog: {
      sourceBlogName: 'DEV Community',
      sourceBlogImage:
        'https://coinjournal.net/wp-content/uploads/2022/09/apple-touch-icon.png',
    },
  },
  {
    value: TypeFeed.DESIGN,
    content: 'Design',
    nbBlogs: 0,
    featuredBlog: {
      sourceBlogName: 'DEV Community',
      sourceBlogImage:
        'https://coinjournal.net/wp-content/uploads/2022/09/apple-touch-icon.png',
    },
  },
  {
    value: TypeFeed.DATA_SCIENCE,
    content: 'Data Science',
    nbBlogs: 0,
    featuredBlog: {
      sourceBlogName: 'DEV Community',
      sourceBlogImage:
        'https://coinjournal.net/wp-content/uploads/2022/09/apple-touch-icon.png',
    },
  },
  {
    value: TypeFeed.DEVOPS,
    content: 'DevOps',
    nbBlogs: 0,
    featuredBlog: {
      sourceBlogName: 'DEV Community',
      sourceBlogImage:
        'https://coinjournal.net/wp-content/uploads/2022/09/apple-touch-icon.png',
    },
  },
  {
    value: TypeFeed.CYBER_SECURITY,
    content: 'Cyber Security',
    nbBlogs: 0,
    featuredBlog: {
      sourceBlogName: 'DEV Community',
      sourceBlogImage:
        'https://coinjournal.net/wp-content/uploads/2022/09/apple-touch-icon.png',
    },
  },
  {
    value: TypeFeed.MIXED_REALITY,
    content: 'Mixed Reality',
    nbBlogs: 0,
    featuredBlog: {
      sourceBlogName: 'DEV Community',
      sourceBlogImage:
        'https://coinjournal.net/wp-content/uploads/2022/09/apple-touch-icon.png',
    },
  },
  {
    value: TypeFeed.CRYPTO_CURRENCY,
    content: 'Crypto Currency',
    nbBlogs: 0,
    featuredBlog: {
      sourceBlogName: 'DEV Community',
      sourceBlogImage:
        'https://coinjournal.net/wp-content/uploads/2022/09/apple-touch-icon.png',
    },
  },
  {
    value: TypeFeed.IOT,
    content: 'IOT',
    nbBlogs: 0,
    featuredBlog: {
      sourceBlogName: 'DEV Community',
      sourceBlogImage:
        'https://coinjournal.net/wp-content/uploads/2022/09/apple-touch-icon.png',
    },
  },
  {
    value: TypeFeed.MACHINE_LEARNING,
    content: 'Machine Learning',
    nbBlogs: 0,
    featuredBlog: {
      sourceBlogName: 'DEV Community',
      sourceBlogImage:
        'https://coinjournal.net/wp-content/uploads/2022/09/apple-touch-icon.png',
    },
  },
  {
    value: TypeFeed.SOFTWARE_ENGINEERING,
    content: 'Software Engineering',
    nbBlogs: 0,
    featuredBlog: {
      sourceBlogName: 'DEV Community',
      sourceBlogImage:
        'https://coinjournal.net/wp-content/uploads/2022/09/apple-touch-icon.png',
    },
  },
  {
    value: TypeFeed.FRONT_END_DEVELOPMENT,
    content: 'Front End Development',
    nbBlogs: 0,
    featuredBlog: {
      sourceBlogName: 'DEV Community',
      sourceBlogImage:
        'https://coinjournal.net/wp-content/uploads/2022/09/apple-touch-icon.png',
    },
  },
  {
    value: TypeFeed.BACK_END_DEVELOPMENT,
    content: 'Back End Development',
    nbBlogs: 0,
    featuredBlog: {
      sourceBlogName: 'DEV Community',
      sourceBlogImage:
        'https://coinjournal.net/wp-content/uploads/2022/09/apple-touch-icon.png',
    },
  },
  {
    value: TypeFeed.MOBILE_DEVELOPMENT,
    content: 'Mobile Development',
    nbBlogs: 0,
    featuredBlog: {
      sourceBlogName: 'DEV Community',
      sourceBlogImage:
        'https://coinjournal.net/wp-content/uploads/2022/09/apple-touch-icon.png',
    },
  },
];
