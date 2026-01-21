import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface CartContextType {
    cartCount: number;
    addToCart: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);

    const addToCart = (id: string) => {
        console.log(`Setting cart for product ID: ${id}`);
        setCartCount((prev) => prev + 1);
    };

    return (
        <CartContext.Provider value={{ cartCount, addToCart }}>
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
