import Link from "next/link";
import Image from "next/image";

export default function DashboardRecentOrders () {
    return (
        <>
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
        </>
    )
}