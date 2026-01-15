import { useCart } from "./cartContext";

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

interface DashboardQuickStatsProps {
  recentOrders: Order[];
}

export default function  DashboardQuickStats({ recentOrders }: DashboardQuickStatsProps) {
  const { getCartItemsCount } = useCart();
    
    return (
        <>
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
        </>
    )
}