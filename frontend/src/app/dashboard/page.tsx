'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import '../../styles/dashboard.css'

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!userData || !token) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userData));
    fetchRecentOrders();
  }, [router]);

  const fetchRecentOrders = async () => {
    try {
      const orders = [
        { id: 1, date: '2024-01-15', total: 120.00, status: 'Delivered' },
        { id: 2, date: '2024-01-10', total: 85.00, status: 'Shipped' },
        { id: 3, date: '2024-01-05', total: 200.00, status: 'Processing' }
      ];
      setRecentOrders(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

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
      <header className="bg-white shadow-sm">
        <div className="dashboard_container">
          <div className="flex justify-between items-center">
            <h1>
              Dashboard
            </h1>

            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, {user.firstName}
              </span>

              <button
                onClick={handleLogout}
                className="btn_logout"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="content_container">
        <div className="content_grid_container">
          {/* Account Overview */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3>
              Account Overview
            </h3>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> 
                {user.firstName} {user.lastName}
              </p>
              <p>
                <strong>Email:</strong> 
                {user.email}
              </p>
              <p>
                <strong>Member since:</strong> 
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="actions-container">
            <h3>
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                href="/Shop"
                className="shop_link"
              >
                Continue Shopping
              </Link>

              <Link
                href="/cart"
                className="cart_link"
              >
                View Cart
              </Link>

              <Link
                href="/orders"
                className="orders_link"
              >
                Order History
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="recent_container">
            <h3>Recent Activity</h3>
            <div className="space-y-2">
              <p className="recent_details">
                Last login: Today
              </p>
              <p className="recent_details">
                Orders placed: {recentOrders.length}
              </p>
              <p className="recent_details">
                Total spent: 
                ${recentOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="recent_ordersContainer">
          <h3>
            Recent Orders
          </h3>
          {recentOrders.length === 0 ? (
            <p className="text-gray-600">No recent orders</p>
          ) : (
            <div className="overflow-x-auto">
              <table>
                <thead className="bg-gray-50">
                  <tr>
                    <th>
                      Order ID
                    </th>
                    <th>
                      Date
                    </th>
                    <th>
                      Total
                    </th>
                    <th>
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="table_data">
                        #{order.id}
                      </td>

                      <td className="table_data">
                        {order.date}
                      </td>

                      <td className="table_data">
                        ${order.total.toFixed(2)}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span 
                          className={`px-2 py-1 text-xs rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="quick_statsContainer">
          <div className="bg-blue-100 p-6 rounded-lg text-center">
            <h4 className="recent_orders_length">
              {recentOrders.length}
            </h4>
            <p className="text-blue-600">Total Orders</p>
          </div>

          <div 
            className="bg-green-100 p-6 rounded-lg text-center"
          >
            <h4 
              className="text-2xl font-bold text-green-800 mb-2"
            >
              ${recentOrders.reduce((sum, order) => 
              sum + order.total, 0).toFixed(2)}
            </h4>
            <p className="text-green-600">Total Spent</p>
          </div>
          <div 
            className="bg-purple-100 p-6 rounded-lg text-center"
          >
            <h4 
              className="text-2xl font-bold text-purple-800 mb-2"
            >
              {
                recentOrders.filter(order => order.status === 'Delivered').length
              }
            </h4>
            <p className="text-purple-600">Completed Orders</p>
          </div>
        </div>
      </main>
    </div>
  );
}