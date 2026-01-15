import Link from "next/link";
import { useCart } from "./cartContext";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface DashboardHeaderProps {
  user: User;
  handleLogout: () => void;
}

export default function DashboardHeader({ user, handleLogout }: DashboardHeaderProps) {
  const { cartItems, getCartItemsCount } = useCart();
   
    return (
        <>
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
        </>
    )
}