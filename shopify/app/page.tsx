import React from 'react'
import Image from 'next/image';
const HomePage = () => {
  return (
   <main>
    <div className="h-screen">
    <Image src = '/Products.jpg' alt="" fill  />
    </div>
    <div className="absolute top-1/2 left-1/4 transform -translate-x-1/3 -translate-y-1/2 text-white text-center">
          <h2 className="text-6xl font-bold m-4 w-3/4 text-left font-mono">Shop The Top Brand Electronic</h2>
          <p className="text-1xl italic w-3/5 ml-3 text-left">
            Get the best electronic products at the best price
          </p>
          <button className="text-lg font-bold text-center mt-4 p-2 bg-blue-500 rounded-3xl w-32 ml-3">
          Shop Now       
          </button>
        </div>
   </main>
  );
}
export default HomePage;