'use client';
import './globals.css';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {Provider} from 'react-redux';
import {store} from '@/redux/store';

const inter = Inter({subsets: ['latin']});

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </Provider>
  );
}