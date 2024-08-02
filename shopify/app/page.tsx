'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; 

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="py-5 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to Shopify</h1>
          <p className="text-lg text-gray-600 mb-8">Your one-stop shop for the latest in electronic devices.</p>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product cards */}
          <ProductCard title="Laptops" description="Discover the latest laptops from top brands." imageSrc="/Laptop.jpg" />
          <ProductCard title="Smartphones" description="Find the perfect smartphone for your needs." imageSrc="/PantonyPhone.webp" />
          <ProductCard title="Headphones" description="Experience high-quality sound with our headphones." imageSrc="/Airpod-max.jpg" />
        </div>

        <div className="mt-12">
          <Link href="/sign-up" passHref>
            <span className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Shop Now</span>
          </Link>
        </div>
      </main>
    </div>
  );
};

function ProductCard({ title, description, imageSrc }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <Image src={imageSrc} alt={title} width={400} height={300} className="object-cover w-full h-48" />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="mt-2 text-gray-500">{description}</p>
      </div>
    </div>
  );
}

export default LandingPage;
