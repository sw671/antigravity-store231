import { Link } from 'react-router-dom';

export interface ProductProps {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    onAddToCart: (id: string) => void;
}

/**
 * A modern, reusable Product Card component.
 * Features a clean layout, subtle shadows, and interactive hover effects.
 */
export const ProductCard: React.FC<ProductProps> = ({
    id,
    title,
    price,
    imageUrl,
    onAddToCart,
}) => {
    return (
        <div className="group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 max-w-sm">
            {/* Image Section */}
            <Link to={`/product/${id}`} className="block relative h-48 w-full overflow-hidden">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-800 shadow-sm">
                        ${price.toFixed(2)}
                    </span>
                </div>
            </Link>

            {/* Content Section */}
            <div className="p-5">
                <Link to={`/product/${id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate hover:text-indigo-600 transition-colors">
                        {title}
                    </h3>
                </Link>

                <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                    Experience premium quality and style with this modern {title.toLowerCase()}.
                </p>

                {/* Action Button */}
                <button
                    onClick={() => onAddToCart(id)}
                    className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
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
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
