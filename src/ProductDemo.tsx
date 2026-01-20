import React, { useState } from 'react';
import ProductCard from './components/ProductCard';

const ProductDemo: React.FC = () => {
    // 1. Add useState hook at the top of the component
    const [cartCount, setCartCount] = useState(0);

    const products = [
        {
            id: '1',
            title: 'Premium Wireless Headphones',
            price: 299.99,
            imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        },
        {
            id: '2',
            title: 'Minimalist Mechanical Keyboard',
            price: 159.50,
            imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80',
        },
        {
            id: '3',
            title: 'Ergonomic Designer Chair',
            price: 450.00,
            imageUrl: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80',
        },
    ];

    const handleAddToCart = (id: string) => {
        const product = products.find(p => p.id === id);
        console.log(`Added to cart: ${product?.title} (ID: ${id})`);

        // 2. Increment the cart count
        setCartCount(prev => prev + 1);
    };

    return (
        <div className="relative min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            {/* 3. Shopping Cart Icon with Badge */}
            <div className="fixed top-6 right-6 z-50">
                <div className="relative p-3 bg-white rounded-full shadow-lg border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors group">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7 text-indigo-600 transition-transform group-hover:scale-110"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full animate-in zoom-in-50 duration-300">
                            {cartCount}
                        </span>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                        Our Premium Collection
                    </h1>
                    <p className="mt-4 text-xl text-gray-500">
                        Curated products designed for modern living.
                    </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            {...product}
                            onAddToCart={handleAddToCart}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDemo;
