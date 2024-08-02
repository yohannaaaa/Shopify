import React from 'react';
import Image from 'next/image';
interface CardWithTextProps {
  src: string;
  title: string;
  price: string;
}

function CardWithText(props: CardWithTextProps) {
  return (
    <div className="card bg-gray-50 h-[400px] w-64  shadow-sm rounded-lg ml-4">
      <figure className='h-[380px] transition-all duration-300 ease-in-out transform hover:scale-110 sca'>
        <img src={props.src} alt=""  style={{objectFit: 'contain'}} className='rounded'/>
      </figure>
      <div className="text-black text-light p-5 bg-white outline-none">
        <h2 className="card-title">{props.title}</h2>
        <p className='text-sm text-gray-400 '>${props.price}</p>
      </div>
    </div>
  );
}

export default CardWithText;