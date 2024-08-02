'use client';
import { createContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CartItem {
  productId: string;
  productName: string;
  image: string;
  quantity: number;
  price: string; 
}

export type { CartItem };

interface CartProviderProps {
  children: ReactNode;
}

interface CartContextValue {
  cart: { cartItems: CartItem[] };
  addItemToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  deleteItemFromCart: (id: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<{ cartItems: CartItem[] }>({ cartItems: [] });
  const router = useRouter();

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const updateCartInLocalStorage = (updatedCart: { cartItems: CartItem[] }) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
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

  const updateItemQuantity = (productId: string, quantity: number) => {
    const existingCartItems = [...cart.cartItems];
    const itemIndex = existingCartItems.findIndex(i => i.productId === productId);

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

export default CartContext;
