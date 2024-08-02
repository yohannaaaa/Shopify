'use client';
import React, { useState, useContext } from 'react';
import Image from 'next/image';
import HeroImage from '@/app/components/layout/Hero/HeroImage';
import CartContext from '@/context/CartContext';
import { useRouter } from 'next/navigation';

const ProductDetails = ({ params: { id } }: { params: { id: string } }) => {
  const context = useContext(CartContext);
  const addItemToCart = context?.addItemToCart;
  const router = useRouter();
  function handleSubmit(){
   router.push('/cart')
  }

  const product = HeroImage.find((image) => image.id === parseInt(id, 10));

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (addItemToCart && product) {
      addItemToCart({
        productId: product.id.toString(),
        productName: product.title,
        image: product.src,
        quantity,
        price: product.price
      });
    } else {
      console.error('Add to cart function or product is undefined');
    }
  };

  return (
    <div className="h-screen relative">
      {product ? (
        <div key={id} className="grid grid-cols-2 h-full items-center">
          
          <div className="relative col-span-1 h-screen z-10">
            <Image src={product.src} alt={product.title} layout="fill" className='object-cover '/>
          </div>

          <div className="flex flex-col p-4 ">
            <h2 className="text-xl text-body font-semibold py-5">{product.title}</h2>
            <p className="mt-2 text-lg text-body pb-5">{product.price}</p>
            <p className="my-4 text-body">{product.description}</p>

            <h1>Quantity</h1>
            <div className="flex items-center mt-4 pb-5">
              <button
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                className="px-5 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span className="mx-2 p-4">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-5 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>

            <div className="flex mt-4 space-x-2">
              <button
                onClick={handleAddToCart}
                className="neutral px-4 py-2 bg-blue-500 text-white rounded-3xl btn-wide hover:bg-blue-600"
              >
                Add to Cart
              </button>
              <div onClick={() => handleSubmit()}>
                <button
                  className="primary px-4 py-2 bg-slate-950 text-white rounded-3xl btn-wide"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No product available</div>
      )}
    </div>
  );
};

export default ProductDetails;
