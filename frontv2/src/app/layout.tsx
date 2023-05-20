'use client';
import React from 'react';
import './globals.css';
import Script from 'next/script';
import {Provider} from 'react-redux';
import {store} from '@/redux/store';
import ToasterClient from '../components/ToasterClient';
import 'react-tooltip/dist/react-tooltip.css';
import {SessionProvider} from 'next-auth/react';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <Script strategy="lazyOnload" id={'script launcher'}>
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
      <head>
        <title>blog for community</title>
      </head>
      <body>
        <SessionProvider>
          <Provider store={store}>
            {children}
            <ToasterClient />
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
