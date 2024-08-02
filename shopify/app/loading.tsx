import React, { FC } from 'react';
import Head from 'next/head';

interface LoadingPageProps {
  message?: string;
}

const LoadingPage: FC<LoadingPageProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <Head>
        <title>Loading</title>
      </Head>
      <div className="text-center">
        <span className="loading loading-dots loading-sm"></span>
        <div className="border-4 border-gray-700 border-t-transparent rounded-full w-8 h-8 animate-spin"></div>
        <p className="mt-4 font-bold text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default LoadingPage;