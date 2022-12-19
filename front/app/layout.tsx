import '../styles/globals.css'
import Script from "next/script";
import ToasterClient from "../components/ToasterClient";
import NavBar from "../layouts/NavBar";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <Script strategy="lazyOnload">
            {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
        </Script>
        <head/>
        <body>
            <NavBar></NavBar>
            {children}
            <ToasterClient />
        </body>
        </html>
    )
}
