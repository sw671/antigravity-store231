import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabaseClient';


const Checkout: React.FC = () => {
    const { cartItems, cartCount, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError(null); // Clear error when user types
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.email || !formData.address) {
            setError('Please fill in all fields before placing your order.');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const { error: supabaseError } = await supabase
                .from('orders')
                .insert([
                    {
                        customer_name: formData.name,
                        customer_email: formData.email,
                        total_price: totalPrice,
                        items: cartItems, // Supabase handles JSONB
                    },
                ]);

            if (supabaseError) {
                throw new Error(supabaseError.message);
            }

            // Success Flow
            setIsSubmitted(true);
            clearCart();
        } catch (err: any) {
            setError(err.message || 'An error occurred while placing your order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };


    if (isSubmitted) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-green-100">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Order Confirmed!</h2>
                    <p className="text-gray-600 mb-8">
                        Thank you <span className="font-bold text-indigo-600">{formData.name}</span>! Your order has been placed successfully.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    if (cartCount === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                    <p className="text-gray-500 mb-8">Add some items to your cart before checking out.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-md"
                    >
                        Explore Collection
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Form Section */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows={3}
                                placeholder="123 Street Name, City, Country"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                            ></textarea>
                        </div>
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700 text-sm animate-in fade-in slide-in-from-top-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {error}
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                        >
                            {isSubmitting ? 'Processing...' : 'Place Order'}
                        </button>

                    </form>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 h-fit">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                    <div className="space-y-4 mb-8">
                        {cartItems.map((item, index) => (
                            <div key={`${item.id} -${index} `} className="flex justify-between items-start text-sm">
                                <div className="flex gap-3">
                                    <img src={item.imageUrl} alt={item.title} className="w-10 h-10 object-contain bg-white rounded-md border border-gray-100 p-1" />
                                    <div>
                                        <p className="text-gray-900 font-medium line-clamp-1">{item.title}</p>
                                        <p className="text-gray-500">${item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping:</span>
                            <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Free</span>
                        </div>
                        <div className="pt-4 border-t border-gray-200 flex justify-between">
                            <span className="text-xl font-bold text-gray-900">Total:</span>
                            <span className="text-2xl font-bold text-indigo-600">${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-xl flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-indigo-800 leading-relaxed">
                            Your order will be processed immediately upon submission. Secure checkout powered by Antigravity Cloud.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
