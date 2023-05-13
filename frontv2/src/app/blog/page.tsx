import React, {Fragment} from 'react';
import BlogsBody from '../../app-page-component/blog/BlogsBody';
import {TypeFeed} from '../../types/api/source_blog';

interface IBlogBodyTypeProps {
  params: {
    type: string;
  };
}

function Page(props: IBlogBodyTypeProps) {
  return (
    <Fragment>
      <div className={' w-full'}>
        <BlogsBody type={props.params.type as TypeFeed}></BlogsBody>
      </div>
    </Fragment>
  );
}

export default Page;
