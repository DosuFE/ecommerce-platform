'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: number;
  date: string;
  total: number;
  status: string;
  items: OrderItem[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!user || !token) {
      router.push('/login');
      return;
    }

    fetchOrders();
  }, [router]);

  const fetchOrders = async () => {
    try {
      const mockOrders: Order[] = [
        {
          id: 1,
          date: '2024-01-15',
          total: 205,
          status: 'Delivered',
          items: [
            {
              id: 1,
              name: 'Wireless Bluetooth Headphones',
              price: 120,
              quantity: 1,
              image: '/bluetooth-headphone.jpg',
            },
            {
              id: 2,
              name: 'Phone Case',
              price: 25,
              quantity: 1,
              image: '/phone-case.jpg',
            },
            {
              id: 3,
              name: 'Screen Protector',
              price: 15,
              quantity: 2,
              image: '/screen-protector.jpg',
            },
          ],
        },
        {
          id: 2,
          date: '2024-01-10',
          total: 85,
          status: 'Shipped',
          items: [
            {
              id: 4,
              name: "Men's Running Sneakers",
              price: 85,
              quantity: 1,
              image: '/sneakers-1.jpg',
            },
          ],
        },
        {
          id: 3,
          date: '2024-01-05',
          total: 200,
          status: 'Processing',
          items: [
            {
              id: 5,
              name: "Women's Designer Handbag",
              price: 200,
              quantity: 1,
              image: '/tote-ted-baker.jpg',
            },
          ],
        },
      ];

      setOrders(mockOrders);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin h-16 w-16 rounded-full border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Order History</h1>
            <p className="text-gray-600">View your past orders</p>
          </div>
          <Link
            href="/Shop"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </header>

      {/* Orders */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-lg shadow-md">
            {/* Order Header */}
            <div className="bg-gray-50 px-6 py-4 border-b flex justify-between">
              <div>
                <h3 className="font-semibold">Order #{order.id}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </span>
                <span className="font-bold">${order.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Items */}
            <div className="px-6 py-4 space-y-3">
              {order.items.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <Stat label="Total Orders" value={orders.length} />
          <Stat
            label="Delivered"
            value={orders.filter(o => o.status === 'Delivered').length}
          />
          <Stat
            label="Processing"
            value={orders.filter(o => o.status === 'Processing').length}
          />
          <Stat
            label="Total Spent"
            value={`$${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}`}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-6">
        <div className="max-w-7xl mx-auto px-6 flex justify-between">
          <p className="text-sm text-gray-600">
            Need help?{' '}
            <Link href="/contact" className="text-blue-600">
              Contact support
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm text-center">
      <div className="text-2xl font-bold text-blue-600">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}
