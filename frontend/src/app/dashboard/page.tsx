'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../components/cartContext';
import '../../styles/dashboard.css'

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
      // Fetch recent orders
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

      // You can also fetch user-specific data here
      const userResponse = await fetch(`http://localhost:5000/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        // Update user data if needed
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
      <header className="bg-white shadow-sm w-full">
        <div className="dashboard_container">
          <div className="flex justify-between items-center">
            <h1>
              Dashboard
            </h1>

            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, {user.firstName}
              </span>

              {/* Show cart badge if items in cart */}
              {cartItems.length > 0 && (
                <Link href="/cart" className="relative">
                  <span className="cart_badge">
                    {getCartItemsCount()}
                  </span>
                  <span className="text-gray-700 ml-1">Cart</span>
                </Link>
              )}

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
      <section className="content_container">
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
                <strong>Current Cart:</strong> 
                {getCartItemsCount()} items (${getCartTotal().toFixed(2)})
              </p>
              <p>
                <strong>Total Orders:</strong> 
                {recentOrders.length}
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
                View Cart ({getCartItemsCount()} items)
              </Link>

              {cartItems.length > 0 && (
                <Link
                  href="/checkout"
                  className="checkout_link"
                >
                  Checkout (${getCartTotal().toFixed(2)})
                </Link>
              )}

              <Link
                href="/orders"
                className="orders_link"
              >
                Order History ({recentOrders.length})
              </Link>
            </div>
          </div>

          {/* Current Cart Summary */}
          <div className="recent_container">
            <h3>Current Cart</h3>
            {cartItems.length === 0 ? (
              <p className="recent_details">Your cart is empty</p>
            ) : (
              <div className="space-y-2">
                <p className="recent_details">
                  <strong>Items:</strong> {getCartItemsCount()}
                </p>
                <p className="recent_details">
                  <strong>Total:</strong> ${getCartTotal().toFixed(2)}
                </p>
                <div className="mt-2">
                  <h4 className="font-medium mb-1">Top items:</h4>
                  {cartItems.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="truncate max-w-xs">{item.name}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  {cartItems.length > 3 && (
                    <p className="text-xs text-gray-600 mt-1">
                      +{cartItems.length - 3} more items
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="recent_ordersContainer">
          <h3>
            Recent Orders ({recentOrders.length})
          </h3>
          {recentOrders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No orders yet</p>
              <Link
                href="/Shop"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table>
                <thead className="bg-gray-50">
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Items</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.slice(0, 5).map((order) => (
                    <tr key={order.id}>
                      <td className="table_data">#{order.id}</td>
                      <td className="table_data">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="table_data">${order.total.toFixed(2)}</td>
                      <td>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="table_data">
                        {order.items.length} items
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

          <div className="bg-green-100 p-6 rounded-lg text-center">
            <h4 className="text-2xl font-bold text-green-800 mb-2">
              ${recentOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
            </h4>
            <p className="text-green-600">Total Spent</p>
          </div>

          <div className="bg-purple-100 p-6 rounded-lg text-center">
            <h4 className="text-2xl font-bold text-purple-800 mb-2">
              {recentOrders.filter(order => order.status === 'Delivered').length}
            </h4>
            <p className="text-purple-600">Completed Orders</p>
          </div>

          <div className="bg-orange-100 p-6 rounded-lg text-center">
            <h4 className="text-2xl font-bold text-orange-800 mb-2">
              {getCartItemsCount()}
            </h4>
            <p className="text-orange-600">Cart Items</p>
          </div>
        </div>

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
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded"
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