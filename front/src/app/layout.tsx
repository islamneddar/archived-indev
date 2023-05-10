"use client";

import React from "react";
import "../styles/globals.css";
import Script from "next/script";
import { Provider } from "react-redux";
import ToasterClient from "../components/ToasterClient";
import NavBar from "../layouts/NavBar";
import { store } from "../redux/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
      <head />
      <body>
        <Provider store={store}>
          <NavBar />
          {
            // children
          }
          <div className="bg-secondary h-[calc(100vh_-_96px)]">
            <div className="flex flex-col h-full w-full justify-center items-center">
              <div className="bg-white w-full">
                <div className="mx-auto max-w-7xl py-12 px-6 lg:py-16 lg:px-8">
                  <h2 className="inline text-3xl font-bold tracking-tight text-gray-900 sm:block sm:text-4xl">
                    Want product news and updates?
                  </h2>
                  <p className="inline text-3xl font-bold tracking-tight text-indigo-600 sm:block sm:text-4xl">
                    Sign up for our newsletter.
                  </p>
                  <div className="mt-8 sm:flex">
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="w-full rounded-md border-gray-300 text-black px-5 py-3 placeholder-gray-500 border-indigo-500 ring-indigo-500 focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs"
                      placeholder="Enter your email"
                    />
                    <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                      <button
                        type="submit"
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Notify me
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ToasterClient />
        </Provider>
      </body>
    </html>
  );
}
