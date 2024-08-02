'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useRouter } from 'next/navigation'; 


const LandingPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
    
   
      <main className="flex-grow container mx-auto p-4 text-center">
        
        <h1 className="text-4xl font-bold mb-4">Welcome to Shopify</h1>
        <p className="text-lg mb-8">Your one-stop shop for the latest in electronic devices.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        
          <div className="bg-white shadow-lg rounded-lg p-2">
            <Image src="/SmartWatch.webp" alt="Headphones" width={400} height={300} className="rounded-lg mb-4"/>
            <h2 className="text-xl font-semibold">Watches</h2>
            <p className="text-gray-600">Experience high-quality from the perfect brands </p>
          </div>
           
          <div className="bg-white shadow-lg rounded-lg p-2">
            <Image src="/PantonyPhone.webp" alt="Smartphone" width={400} height={300} className="rounded-lg mb-4"/>
            <h2 className="text-xl font-semibold">Smartphones</h2>
            <p className="text-gray-600">Find the perfect smartphone for your needs.</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-2">
            <Image src="/RoundMini.webp" alt="Laptop" width={400} height={300} className="rounded-lg mb-4"/>
            <h2 className="text-xl font-semibold">RoundMini</h2>
            <p className="text-gray-600">Discover the latest from top brands.</p>
          </div>
          
        </div>
         
        <Link href="/sign-up" className="btn btn-primary">Shop Now</Link>

      </main>
    </div>
  );
};

export default LandingPage;
