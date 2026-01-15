import Link from "next/link";
import { useCart } from "./cartContext";

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

interface DashboardAccountOverviewProps {
  user: User;
  recentOrders: Order[];
}

export default function DashboardAccountOverview({ user, recentOrders }: DashboardAccountOverviewProps) {
  const { cartItems, getCartTotal, getCartItemsCount } = useCart();
    
    return (
        <>
            <div className="content_grid_container">
                {/* Account Overview */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3>
                    Account Overview
                    </h3>
                    <div className="space-y-2">
                    <p className='tracking-wider'>
                        <strong>Name:</strong> 
                        {user.firstName} {user.lastName}
                    </p>
                    <p  className='tracking-wider'>
                        <strong>Email:</strong> 
                        {user.email}
                    </p>
                    <p  className='tracking-wider'>
                        <strong>Current Cart:</strong> 
                        {getCartItemsCount()} items (${getCartTotal().toFixed(2)})
                    </p>
                    <p  className='tracking-wider'>
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
                        href="/order"
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
        </>
    )
}