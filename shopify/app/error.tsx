"use client"
import React from 'react';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';

interface ErrorPageProps {
  statusCode?: number;
}

const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode }) => {
  return (
    <div>
      <Head>
        <title>Error Page</title>
      </Head>
      <main>
        <h1>
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : 'An unexpected error occurred on the client'}
        </h1>
        <p>
          <Link href="/">
            <a>Go back home</a>
          </Link>
        </p>
      </main>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext): ErrorPageProps => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;