import React, { useState, useEffect } from 'react';
import ProductCard, { type ProductProps } from './components/ProductCard';
import { useCart } from './context/CartContext';

const ProductDemo: React.FC = () => {
    const { addToCart } = useCart();

    const [products, setProducts] = useState<Omit<ProductProps, 'onAddToCart'>[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products?limit=3');
                const data = await response.json();

                // Map API data to match ProductProps interface
                const mappedProducts = data.map((item: any) => ({
                    id: item.id.toString(),
                    title: item.title,
                    price: item.price,
                    imageUrl: item.image, // Map 'image' to 'imageUrl'
                }));

                setProducts(mappedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (id: string) => {
        addToCart(id);
    };

    return (
        <div className="relative min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

            <div className="max-w-7xl mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                        Our Premium Collection
                    </h1>
                    <p className="mt-4 text-xl text-gray-500">
                        Curated products designed for modern living.
                    </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center min-h-[400px]">
                    {isLoading ? (
                        <div className="col-span-full flex flex-col items-center justify-center p-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                            <p className="text-xl text-gray-500 font-medium">Loading...</p>
                        </div>
                    ) : (
                        products.map((product) => (
                            <ProductCard
                                key={product.id}
                                {...product}
                                onAddToCart={handleAddToCart}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDemo;
