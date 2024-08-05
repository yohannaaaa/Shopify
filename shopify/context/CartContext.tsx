import { createContext } from 'react';

interface CartItem {
  productId: string;
  productName: string;
  image: string;
  quantity: number;
  price: string;
}
export type { CartItem };

interface CartContextValue {
  cart: { cartItems: CartItem[] };
  addItemToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  deleteItemFromCart: (id: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export default CartContext;
