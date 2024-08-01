'use client'
import React, { useState } from 'react';
import Image from 'next/image';


const ProductDetails = () => {
  const products = [
    {
      title: 'Round Mini Portable Bluetooth Speaker',
      src: '/Airpod-max.jpg', 
      price: "$85.00",
      addToCart: () => console.log('Add to Cart'),
      buyNow: () => console.log('Buy Now')
    },
  ];

  const [quantity, setQuantity] = useState(1);

  return (
    <div className="h-screen">
      {products.map((product, index) => (
        <div key={index} className="grid grid-cols-2 h-full items-center">
        
          <div className="relative w-3/4 h-1/2 m-5 ml-12">
            
            <Image src={product.src} alt={product.title} layout="fill" objectFit="cover" />
          </div>

         
          <div className="flex flex-col p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold py-5">{product.title}</h2>
            <p className="mt-2 text-lg pb-5">{product.price}</p>

          
            <h1>Quantity</h1>
            <div className="flex items-center mt-4 pb-5">
                
              <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} className="px-5 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
              <span className="mx-2 p-4">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-5 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
            </div>

            
            <div className="flex mt-4 space-x-2">
              <button onClick={product.addToCart} className="neutral px-4 py-2 bg-blue-500 text-white rounded-3xl btn-wide hover:bg-blue-600">Add to Cart</button>
              <button onClick={product.buyNow} className=" primary px-4 py-2 bg-slate-950 text-white rounded-3xl btn-wide">Buy Now</button>
              
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDetails;
