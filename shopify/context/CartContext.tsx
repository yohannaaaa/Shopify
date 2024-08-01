'use client';
import { useRouter } from "next/navigation";
import { createContext, useState, ReactNode } from "react";

interface CartItem {
  productId: string;
  productName: string;
  image: string;
  quantity: number;
}

interface CartProviderProps {
  children: ReactNode;
}

interface CartContextValue {
  cart: { cartItems: CartItem[] };
  addItemToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  deleteItemFromCart: (id: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<{ cartItems: CartItem[] }>({ cartItems: [] });
  const router = useRouter();

  const addItemToCart = async ({
    productId,
    productName,
    image,
    quantity = 1,
  }: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const item: CartItem = {
      productId,
      productName,
      image,
      quantity,
    };

    const isItemExist = cart?.cartItems?.find((i) => i.productId === item.productId);

    let newCartItems: CartItem[];

    if (isItemExist) {
      newCartItems = cart?.cartItems?.map((i) =>
        i.productId === isItemExist.productId ? item : i
      );
    } else {
      newCartItems = [...(cart?.cartItems || []), item];
    }

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const deleteItemFromCart = (id: string) => {
    const newCartItems = cart?.cartItems?.filter((i) => i.productId !== id);

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const setCartToState = () => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        deleteItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;