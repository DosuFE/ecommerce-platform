'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import '../../styles/order.css';
import OrderHeader from '../components/oderHeader';
import NoOrderYet from '../components/noOrder';
import OrderItemsDisplay from '../components/orderItemsDisplay';

interface Order {
  id: number;
  date: string;
  total: number;
  status: string;
  items: OrderItem[];
}

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!userData || !token) {
      router.push('/login');
      return;
    }

    fetchOrders(token);
  }, [router]);

  const fetchOrders = async (token: string) => {
    try {
      setIsLoading(true);
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      const response = await fetch(`http://localhost:5000/orders/user/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const ordersData = await response.json();
        setOrders(ordersData);
      } else {
        setError('Failed to fetch orders');
      }
    } catch (error) {
      setError('An error occurred while fetching orders');
      console.error('Orders fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case 'Delivered':
  //       return 'bg-green-100 text-green-800';
  //     case 'Shipped':
  //       return 'bg-blue-100 text-blue-800';
  //     case 'Processing':
  //       return 'bg-yellow-100 text-yellow-800';
  //     case 'Cancelled':
  //       return 'bg-red-100 text-red-800';
  //     default:
  //       return 'bg-gray-100 text-gray-800';
  //   }
  // };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="order_container">
      {/* Order Header */}
      <OrderHeader/>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="error_message">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <NoOrderYet/>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderItemsDisplay
                key={order.id}
                order={order}
              />
            ))}
          </div>
        )}

        {/* Order Statistics */}
        {orders.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="text-2xl font-bold text-blue-600">{orders.length}</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="text-2xl font-bold text-green-600">
                {orders.filter(o => o.status === 'Delivered').length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {orders.filter(o => o.status === 'Processing').length}
              </div>
              <div className="text-sm text-gray-600">Processing</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="text-2xl font-bold text-gray-600">
                ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}