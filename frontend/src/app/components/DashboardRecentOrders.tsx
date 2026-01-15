import Link from "next/link";

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

interface DashboardRecentOrdersProps {
  recentOrders: Order[];
}

export default function DashboardRecentOrders({ recentOrders }: DashboardRecentOrdersProps) {
    return (
        <>
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
        </>
    )
}