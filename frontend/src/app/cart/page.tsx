'use client';
import Image from "next/image";
import { useCart } from "../components/cartContext";
import { useState } from "react";
import '../../styles/cart.css';
import Link from "next/link";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [hover, setHover] = useState(false);

  return (
    <article className="container mt-20 mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Shopping Cart
      </h1>
      
      {cartItems.length === 0 ? (
        <div
          className="text-center py-12"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div
            className={`transition-transform duration-500 ${hover ? "scale-110" : "scale-100"}`}
            style={{ display: "inline-block" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-24 h-24 text-gray-400 mx-auto"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>
          <p className="text-gray-600 text-lg mt-4 text-center">
            Your cart is empty
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {cartItems.map((item) => (
              <div key={item.id} className="product_item">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-blue-600 font-bold">${item.price}</p>
                    </div>
                  </div>
                    
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="order_summary">
            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>
            <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>
                        ${getCartTotal().toFixed(2)}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>$25.00</span>
                </div>
                <div className="container_total">
                    <span>Total:</span>
                    <span>${(getCartTotal() + 25).toFixed(2)}</span>
                </div>
            </div>
            <button className="btn_checkout">
              <Link href='/checkout'>
                Checkout
              </Link>
            </button>
          </div>
        </div>
      )}
    </article>
  );
};