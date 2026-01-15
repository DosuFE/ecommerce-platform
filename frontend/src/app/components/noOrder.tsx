import Link from "next/link";

export default function NoOrderYet () {
    return (
        <>
            <div className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <h2 className="noOrder_title">
                    No orders yet
                </h2>
                <p className="text-gray-600 mb-8">
                    Start shopping to see your orders here
                </p>
                <Link
                href="/shop"
                className="continueShopping_link"
                >
                    Start Shopping
                </Link>
            </div>
        </>
    )
}