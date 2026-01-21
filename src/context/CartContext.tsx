import React, { createContext, useContext, useState, type ReactNode } from 'react';

export interface CartItem {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
}

interface CartContextType {
    cartItems: CartItem[];
    cartCount: number;
    totalPrice: number;
    addToCart: (item: CartItem) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const cartCount = cartItems.length;
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

    const addToCart = (item: CartItem) => {
        console.log(`Adding to cart: ${item.title}`);
        setCartItems((prev) => [...prev, item]);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, cartCount, totalPrice, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
