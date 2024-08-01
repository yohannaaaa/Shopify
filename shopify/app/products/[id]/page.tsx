'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import HeroImage from '@/app/components/Homepage/Hero/HeroImage';


const ProductDetails = ({params:{id}}:{params:
  {id: string}
}) => {
  

  const product = HeroImage.find((image)=>(
     image.id == parseInt(id, 10)
  ))
  

  const [quantity, setQuantity] = useState(1);

  return (
    <div className="h-screen">
       { product?(<div key={id} className="grid grid-cols-2 h-full items-center">
        
          <div className="relative w-3/4 h-1/2 m-5 ml-12">
            
            <Image src={product.src} alt={product.title} layout="fill" objectFit="cover" />
          </div>

         
          <div className="flex flex-col p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold py-5">{product.title}</h2>
            <p className="mt-2 text-lg pb-5">{product.price}</p>

            <p className='my-4'>{product.description}</p>

          
            <h1>Quantity</h1>
            <div className="flex items-center mt-4 pb-5">
                
              <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} className="px-5 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
              <span className="mx-2 p-4">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-5 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
            </div>

            
            <div className="flex mt-4 space-x-2">
              <button  className="neutral px-4 py-2 bg-blue-500 text-white rounded-3xl btn-wide hover:bg-blue-600">Add to Cart</button>
              <button className=" primary px-4 py-2 bg-slate-950 text-white rounded-3xl btn-wide">Buy Now</button>
              
            </div>
          </div>
        </div>
        )
        :
        (
<div>No product available</div>
        )}
    </div>
  );
};

export default ProductDetails;
