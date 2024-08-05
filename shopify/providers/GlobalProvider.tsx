'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import CartContext, { CartItem } from '@/context/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [cart, setCart] = useState<{ cartItems: CartItem[] }>({ cartItems: [] });
  const userId = currentUser?.uid;
  const storageKey = `cart_${userId}`;

  useEffect(() => {
    const storedCart = localStorage.getItem(storageKey);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [currentUser]);

  const updateCartInLocalStorage = (updatedCart: { cartItems: CartItem[] }) => {
    localStorage.setItem(storageKey, JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const addItemToCart = ({
    productId,
    productName,
    image,
    quantity = 1,
    price,
  }: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const item: CartItem = { productId, productName, image, quantity, price };
    const existingCartItems = [...cart.cartItems];
    const itemIndex = existingCartItems.findIndex(i => i.productId === item.productId);

    if (itemIndex > -1) {
      existingCartItems[itemIndex].quantity += quantity;
    } else {
      existingCartItems.push(item);
    }

    updateCartInLocalStorage({ cartItems: existingCartItems });
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    const existingCartItems = [...cart.cartItems];
    const itemIndex = existingCartItems.findIndex(i => i.productId === id);

    if (itemIndex > -1) {
      existingCartItems[itemIndex].quantity = quantity;
      updateCartInLocalStorage({ cartItems: existingCartItems });
    }
  };

  const deleteItemFromCart = (id: string) => {
    const updatedCartItems = cart.cartItems.filter(i => i.productId !== id);
    updateCartInLocalStorage({ cartItems: updatedCartItems });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        updateItemQuantity,
        deleteItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
