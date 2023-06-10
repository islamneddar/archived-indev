'use client';

import BlogList from './BlogList';
import {GridBlogType} from '@/types/general/blog-general.type';

function BlogsBody() {
  return (
    <div className={'px-5 tn:px-2 sm:px-3 h-full flex flex-1 '}>
      <div className={'flex h-full flex-1 flex-col pt-5 justify-center'}>
        {
          <BlogList
            gridToShow={GridBlogType.GRID}
            showAd={true}
            showContainerOfGridAndFilter={true}></BlogList>
        }
      </div>
    </div>
  );
}

export default BlogsBody;
