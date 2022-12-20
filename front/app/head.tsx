import Script from "next/script";

export default function Head() {
    return (
        <>
            <title>inDevx</title>
            <meta content="width=device-width, initial-scale=1" name="viewport"/>
            <meta name="description" content="be up to date with the all updated from big tech industry and community"/>
            <link rel="icon" href="/favicon.ico"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
        </>
    )
}
