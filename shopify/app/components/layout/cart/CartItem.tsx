import React from 'react';
import { CartItem as CartItemType } from '@/context/CartContext';

interface CartItemProps {
  cartItem: CartItemType;
  increaseQty: (cartItem: CartItemType) => void;
  decreaseQty: (cartItem: CartItemType) => void;
  deleteItemFromCart: (id: string) => void;
}

const CartItem = ({ cartItem, increaseQty, decreaseQty, deleteItemFromCart }: CartItemProps) => {
  return (
    <div className="flex flex-wrap lg:flex-row gap-5 mb-4">
      <div className="w-full lg:w-2/5 xl:w-2/4">
        <figure className="flex leading-5">
          <div>
            <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
              <img src={cartItem.image} alt={cartItem.productName} />
            </div>
          </div>
          <figcaption className="ml-3 text-blue-900">
            <p>
              <a href="#" className="hover:text-blue-600">
                {cartItem.productName}
              </a>
            </p>
          </figcaption>
        </figure>
      </div>
      <div className="w-24">
        <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
          <button
            className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
            onClick={() => decreaseQty(cartItem)}
          >
            <span className="m-auto text-2xl font-thin">−</span>
          </button>
          <input
            type="number"
            className="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-900 outline-none"
            name="custom-input-number"
            value={cartItem.quantity}
            readOnly
          />
          <button
            className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
            onClick={() => increaseQty(cartItem)}
          >
            <span className="m-auto text-2xl font-thin">+</span>
          </button>
        </div>
      </div>
      <div>
        <div className="leading-5 text-slate-600">
          <p className="font-semibold not-italic">
            ${(parseFloat(cartItem.price) * (cartItem.quantity || 0)).toFixed(2)}
          </p>
          <small className="text-gray-400">
            ${parseFloat(cartItem.price).toFixed(2)} / per item
          </small>
        </div>
      </div>
      <div className="flex-auto">
        <div className="float-right">
          <a
            className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
            onClick={() => deleteItemFromCart(cartItem.productId)}
          >
            Remove
          </a>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
