import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

interface OrderItem {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
}

interface Order {
    id: number;
    created_at: string;
    customer_email: string;
    total_price: number;
    items: OrderItem[];
}

const Orders: React.FC = () => {
    const { user, loading: authLoading } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const { data, error: supabaseError } = await supabase
                    .from('orders')
                    .select('*')
                    .eq('customer_email', user.email)
                    .order('created_at', { ascending: false });

                if (supabaseError) throw supabaseError;
                setOrders(data || []);
            } catch (err: unknown) {
                console.error('Error fetching orders:', err);
                const errorMessage = err instanceof Error ? err.message : 'Failed to fetch orders';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        if (!authLoading) {
            fetchOrders();
        }
    }, [user, authLoading]);

    if (authLoading || loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-indigo-50">
                    <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Please login</h2>
                    <p className="text-gray-600 mb-8">You need to be logged in to view your order history.</p>
                    <Link
                        to="/login"
                        className="inline-block w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg"
                    >
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">My Orders</h1>
                <p className="text-gray-500">Manage and track your recent purchases</p>
            </div>

            {error && (
                <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-center">
                    {error}
                </div>
            )}

            {orders.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">No orders found</h2>
                    <p className="text-gray-500 mb-8">Looks like you haven't placed any orders yet.</p>
                    <Link
                        to="/"
                        className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-md"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-6 sm:p-8">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-50">
                                    <div className="flex gap-8">
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Order Date</p>
                                            <p className="font-semibold text-gray-900">{new Date(order.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Amount</p>
                                            <p className="font-bold text-indigo-600">${order.total_price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Order ID</p>
                                        <p className="font-mono text-sm text-gray-600">#{order.id}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Items</p>
                                    <div className="flex flex-wrap gap-4">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                                                <img src={item.imageUrl} alt={item.title} className="w-8 h-8 object-contain" />
                                                <span className="text-sm font-medium text-gray-700">{item.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
