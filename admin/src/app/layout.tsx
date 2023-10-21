'use client';
import './globals.css';
import {Inter} from 'next/font/google';
import {Provider} from 'react-redux';
import {store} from '@/redux/store';
import {SessionProvider} from 'next-auth/react';
import {Toaster} from 'react-hot-toast';
import React from 'react';
import {PrimeReactProvider} from 'primereact/api';
//theme
import 'primereact/resources/themes/lara-light-indigo/theme.css';

//core
import 'primereact/resources/primereact.min.css';

const inter = Inter({subsets: ['latin']});

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <PrimeReactProvider>
          <html lang="en">
            <body className={inter.className}>{children}</body>
            <Toaster></Toaster>
          </html>
        </PrimeReactProvider>
      </Provider>
    </SessionProvider>
  );
}
