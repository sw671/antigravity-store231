import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';



const Navbar: React.FC = () => {
    const { cartCount } = useCart();
    const { user, signOut } = useAuth();
    const navigate = useNavigate();


    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-indigo-200 shadow-lg group-hover:rotate-6 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                            Antigravity
                        </span>
                    </Link>

                    {/* Cart & Checkout Section */}
                    <div className="flex items-center gap-6">
                        {cartCount > 0 && (
                            <button
                                onClick={() => navigate('/checkout')}
                                className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 transition-all transform hover:scale-105 active:scale-95"
                            >
                                Checkout
                            </button>
                        )}

                        <div
                            onClick={() => cartCount > 0 && navigate('/checkout')}
                            className="relative p-2 bg-gray-50 rounded-full cursor-pointer hover:bg-gray-100 transition-colors group"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-700 transition-transform group-hover:scale-110"
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

                        {user && (
                            <Link
                                to="/orders"
                                className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-indigo-600 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                My Orders
                            </Link>
                        )}

                        {/* Auth Section */}
                        <div className="flex items-center gap-4 pl-4 border-l border-gray-100">
                            {user ? (
                                <div className="flex items-center gap-4">
                                    <span className="hidden md:block text-sm font-medium text-gray-600">
                                        {user.email}
                                    </span>
                                    <button
                                        onClick={() => signOut()}
                                        className="px-4 py-2 text-sm font-bold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => navigate('/login')}
                                    className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
                                >
                                    Login
                                </button>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
