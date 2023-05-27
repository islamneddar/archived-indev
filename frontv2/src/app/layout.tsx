'use client';
import React from 'react';
import './globals.css';
import Script from 'next/script';
import {Provider} from 'react-redux';
import {store} from '@/redux/store';
import ToasterClient from '../components/ToasterClient';
import {SessionProvider} from 'next-auth/react';

import 'react-tooltip/dist/react-tooltip.css';
//theme
import 'primereact/resources/themes/lara-light-indigo/theme.css';
//core
import 'primereact/resources/primereact.min.css';
import Head from 'next/head';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <title>Tech Hub</title>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
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
