'use client';
import React, { useContext, useState }from 'react';
import CartContext, { CartItem }  from '@/context/CartContext';
import Link from 'next/link';
import SuccessMessage from '../components/ui/SuccessMessage';
import CartItem from '../components/layout/cart/CartItem';
import CartSummary from '../components/layout/cart/CartSummary';

const Cart = () => {
  const context = useContext(CartContext);

  if (!context) {
    return <div>Error: Cart context is not available.</div>;
  }

  const { addItemToCart, updateItemQuantity, deleteItemFromCart, cart } = context;
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const increaseQty = (cartItem: CartItemType) => {
    const newQty = (cartItem.quantity || 0) + 1;
    updateItemQuantity(cartItem.productId, newQty);
  };

  const decreaseQty = (cartItem: CartItemType) => {
    const newQty = (cartItem.quantity || 0) - 1;
    if (newQty > 0) {
      updateItemQuantity(cartItem.productId, newQty);
    }
  };
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleCheckout = () => {
    cart.cartItems = [];
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
                    <CartItem
                      key={index}
                      cartItem={cartItem}
                      increaseQty={increaseQty}
                      decreaseQty={decreaseQty}
                      deleteItemFromCart={deleteItemFromCart}
                    />
                  ))}
                </article>
              </main>
              <CartSummary
                totalUnits={cart?.cartItems?.reduce((acc, item) => acc + (item.quantity || 0), 0)}
                taxAmount={taxAmount}
                finalAmount={finalAmount}
                handleCheckout={handleCheckout}
              />
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
