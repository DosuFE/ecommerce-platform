import Link from "next/link";

export default function OrderHeader() {
    return (
        <>
            <header className='pt-20'>
                <div className="headerSub_container">
                <div className="orderHistory_container">
                    <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Order History
                    </h1>
                    <p className="text-gray-600">
                        View your past orders and track current ones
                    </p>
                    </div>
                    <Link
                    href="/Shop"
                    className="continueShopping_link"
                    >
                    Continue Shopping
                    </Link>
                </div>
                </div>
            </header>
        </>
    )
}