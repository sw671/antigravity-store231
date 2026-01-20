import React from 'react';
import ProductCard from './components/ProductCard';

const ProductDemo: React.FC = () => {
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
        alert(`Added to cart: ${product?.title}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
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
