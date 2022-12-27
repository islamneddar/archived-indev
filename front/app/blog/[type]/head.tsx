import Script from "next/script";
import {NextSeo} from "next-seo";
import React from "react";

interface IHeadTypeProps{
    params : {
        type : string
    }
}

export default function Head(props : IHeadTypeProps) {
    const headTitle : string = props.params.type
    return (
        <>
            <NextSeo
                useAppDir={true}
                title={`Tech Blogs for ${props.params.type.toUpperCase()}`}
                description={`get the latest tech blogs from the `}
            ></NextSeo>
            <meta name={"keyword"} content={"software engineer, developer, java, c, javascript, typescript, tech blogs"}/>
            <meta content="width=device-width, initial-scale=1" name="viewport"/>
            <meta name="description" content="get the latest blogs from the "/>
            <link rel="icon" href="/favicon.ico"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
        </>
    )
}