import Link from 'next/link';
import OrderItem from './orderItem';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  id: number;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
}

function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Processing': 'bg-blue-100 text-blue-800',
    'Shipped': 'bg-purple-100 text-purple-800',
    'Delivered': 'bg-green-100 text-green-800',
    'Cancelled': 'bg-red-100 text-red-800',
  };
  return statusColors[status] || 'bg-gray-100 text-gray-800';
}

export default function OrderItemsDisplay({ order }: { order: Order }) {
    return (
        <>
            <div key={order.id} className="orderDisplay_card">
                <div className="bg-gray-50 px-6 py-4 border-b">
                    <div className="orderDisplay_StatusRow_Container">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                Order #{order.id}
                            </h3>
                            <p className="text-sm text-gray-600">
                                Placed on {new Date(order.date).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="orderDisplay_StatusRow_RightSide">
                            <span 
                            className={`px-3 py-1 text-sm rounded-full 
                            ${getStatusColor(order.status)}`
                            }>
                                {order.status}
                            </span>
                            <span className="text-lg font-bold text-gray-900">
                                ${order.total.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-4">
                    <h4 className="font-medium text-gray-900 mb-3">
                        Items
                    </h4>
                    <div className="space-y-3">
                        {order.items.map((item) => (
                           <OrderItem key={item.id} item={item} />
                        ))}
                    </div>
                </div>

                {/* Order Actions */}
                <div className="bg-gray-50 px-6 py-4 border-t">
                    <div className="flex space-x-4">
                        <Link
                        href={`/orders/${order.id}`}
                        className="link_button_orders"
                        >
                        View Details
                        </Link>
                        <button className="link_button_orders">
                        Track Order
                        </button>
                        {order.status === 'Delivered' && (
                        <button className="link_button_orders">
                            Buy Again
                        </button>
                        )}
                    </div>
                </div>
              </div>
        </>
    )
}