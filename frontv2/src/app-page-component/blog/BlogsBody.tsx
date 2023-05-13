'use client';

import BlogList from './BlogList';
import {TypeFeed} from '../../types/api/source_blog';

export interface IBlogBodyProps {
  type: TypeFeed;
}

function BlogsBody(props: IBlogBodyProps) {
  return (
    <div className={'px-10 tn:px-2 sm:px-3 h-full flex flex-1 '}>
      <div className={'flex h-full flex-1 flex-col pt-5 justify-center'}>
        {<BlogList typeFeed={props.type}></BlogList>}
      </div>
    </div>
  );
}

export default BlogsBody;
