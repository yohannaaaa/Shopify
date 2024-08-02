'use client';
import React, { useContext } from 'react';
import CartContext, { CartItem }  from '@/context/CartContext';
import Link from 'next/link';
 
const SuccessMessage = () => {
  return (
    <div role="alert" className="alert alert-success">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>Your purchase has been confirmed!</span>
    </div>
  );
}; 

const Cart = () => {
  const context = useContext(CartContext);

  if (!context) {
    return <div>Error: Cart context is not available.</div>;
  }

  const { addItemToCart, updateItemQuantity, deleteItemFromCart, cart } = context;

  const increaseQty = (cartItem: CartItem) => {
    const newQty = (cartItem.quantity || 0) + 1;
    updateItemQuantity(cartItem.productId, newQty);
  };

  const decreaseQty = (cartItem: CartItem) => {
    const newQty = (cartItem.quantity || 0) - 1;
    if (newQty > 0) {
      updateItemQuantity(cartItem.productId, newQty);
    }
  };
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);

  const handleCheckout = (cartItem: CartItem) => {
    cartItem.quantity = 0
    cart.cartItems =  [];
    setShowSuccessMessage(true);
  };

 

  const totalAmount = cart?.cartItems?.reduce((acc, item) => {
    const itemPrice = parseFloat(item.price);
    if (isNaN(itemPrice)) {
      console.error(`Invalid price for item ${item.productName}: ${item.price}`);
      return acc;
    }
    return acc + itemPrice * (item.quantity || 0);
  }, 0) || 0;

  const taxAmount = (totalAmount * 0.15).toFixed(2);
  const finalAmount = (totalAmount + parseFloat(taxAmount)).toFixed(2);

  return (
    <>
      <section className="py-5 sm:py-7 text-blue-700 bg-slate-900">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-2">
            {cart?.cartItems?.length || 0} Item(s) in Cart
          </h2>
        </div>
      </section>
      {showSuccessMessage && <SuccessMessage />}
      {cart?.cartItems?.length > 0 ? (
        <section className="py-10">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              <main className="md:w-3/4">
                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                  {cart?.cartItems?.map((cartItem, index) => (
                    <div key={index}>
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

                      <hr className="my-4" />
                    </div>
                  ))}
                </article>
              </main>
              <aside className="md:w-1/4">
                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                  <ul className="mb-5">
                    <li className="flex justify-between text-gray-600 mb-1">
                      <span>Total Units:</span>
                      <span className="text-green-500">
                        {cart?.cartItems?.reduce(
                          (acc, item) => acc + (item.quantity || 0),
                          0
                        )} (Units)
                      </span>
                    </li>
                    <li className="flex justify-between text-gray-600 mb-1">
                      <span>TAX:</span>
                      <span>${taxAmount}</span>
                    </li>
                    <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                      <span>Total price:</span>
                      <span>${finalAmount}</span>
                    </li>
                  </ul>

                  <a className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer" onClick ={handleCheckout}>
                    Continue
                  </a>

                  <Link
                    href="/products"
                    className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100"
                  >
                    Back to shop
                  </Link>
                </article>
              </aside>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-10">
          <div className="container max-w-screen-xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
            <Link href="/products" className="px-4 py-3 inline-block text-lg text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700">
              Back to Shop
            </Link>
          </div>
        </section>
      )}
      
    </>
  );
};

export default Cart;
