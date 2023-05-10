import React, { Fragment } from "react";
import BlogsBody from "./BlogsBody";
import { TypeFeed } from "../../../proto/source_blog";
import { NextSeo } from "next-seo";

interface IBlogBodyTypeProps {
  params: {
    type: string;
  };
}

function Page(props: IBlogBodyTypeProps) {
  return (
    <Fragment>
      <div className={" w-full"}>
        <BlogsBody type={props.params.type as TypeFeed}></BlogsBody>
      </div>
    </Fragment>
  );
}

export default Page;
