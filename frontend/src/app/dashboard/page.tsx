'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../components/cartContext';
import '../../styles/dashboard.css'
import DashboardHeader from '../components/dashboardHeader';
import DashboardAccountOverview from '../components/dashboardAccountOverview';
import DashboardRecentOrders from '../components/DashboardRecentOrders';
import DashboardQuickStats from '../components/dashboardQuickStats';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

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
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { cartItems, getCartTotal, getCartItemsCount } = useCart();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!userData || !token) {
      router.push('/login');
      return;
    }

    const userObj = JSON.parse(userData);
    setUser(userObj);
    fetchUserData(userObj.id, token);
  }, [router]);

  const fetchUserData = async (userId: number, token: string) => {
    try {
      const ordersResponse = await fetch(`http://localhost:5000/orders/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (ordersResponse.ok) {
        const ordersData = await ordersResponse.json();
        setRecentOrders(ordersData);
      } else {
        console.error('Failed to fetch orders');
      }

      const userResponse = await fetch(`http://localhost:5000/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
      }

    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="isLoading_container">
        <div className="loading_spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="isLoading_container">
        <div className="loading_spin"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader 
        user={user!} 
        handleLogout={handleLogout} 
      />

      {/* Main Content */}
      <section className="content_container">
        <DashboardAccountOverview 
          user={user!} 
          recentOrders={recentOrders} 
        />

        {/* Recent Orders */}
        <DashboardRecentOrders 
          recentOrders={recentOrders} 
        />

        {/* Quick Stats */}
        <DashboardQuickStats 
          recentOrders={recentOrders} 
        />

        {cartItems.length > 0 && (
          <div className="recent_ordersContainer mt-6">
            <h3>
              Your Shopping Cart ({getCartItemsCount()} items)
            </h3>
            <div className="overflow-x-auto">
              <table>
                <thead className="bg-gray-50">
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="table_data">
                        <div className="flex items-center space-x-3">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="object-cover rounded"
                          />
                          <span className="font-medium">{item.name}</span>
                        </div>
                      </td>
                      <td className="table_data">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="table_data">
                        {item.quantity}
                      </td>
                      <td className="table_data font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="text-right font-semibold pr-4">
                      Cart Total:
                    </td>
                    <td className="font-semibold text-lg">
                      ${getCartTotal().toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            <div className="mt-4 flex justify-end space-x-4">
              <Link
                href="/cart"
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
              >
                Edit Cart
              </Link>
              <Link
                href="/checkout"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}