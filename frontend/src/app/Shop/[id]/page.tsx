'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import '../../../styles/productdetails.css';
import { useCart } from '@/app/components/cartContext';

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  stock: number;
};

export default function ProductDetails() {
  const { id } = useParams(); 
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart()

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`http://localhost:5000/users/${id}`);

        if (!res.ok) {
          throw new Error('Product not found');
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError('Product not found');
      }
    }

    fetchProduct();
  }, [id]);
  

  if (error) return <p className="p-10 text-red-500">{error}</p>;
  if (!product) return <p className="p-10">Loading...</p>;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    console.log('Added To Cart:', product.name);
        
  }

  return (
    <div className="container">
      <div className="sub_container">
        <div className="space-y-4">
          <div className="img_container h-96">
            <Image
              src={product.images[currentImageIndex]}
              alt={product.name}
              fill
              className="object-cover h-4/5"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`btn ${
                  currentImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">
            {product.name}
          </h1>
          <p className="text-xl font-semibold text-blue-600">
            ${product.price}
          </p>
          <p className="text-gray-700 tracking-wider leading-relaxed">
            {product.description}
          </p>

          <div className="quantity_container">
            <div className="sub_quantity_container">
              <button
                className="btn_subtraction"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="px-4 py-2 border-x">
                {quantity}
              </span>
              <button
                className="btn_addition"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            
            <button
              className="cart_btn"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
            
            <button className="fav_btn">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Product Details
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p className='tracking-wider'>
                <span className="font-semibold">SKU:</span> 
                {product.id}
              </p>
              <p className='tracking-wider'>
                <span className="font-semibold">Shipping:</span> 
                Free shipping on orders over $50
              </p>
              <p className='tracking-wider'>
                <span className="font-semibold">Returns:</span> 
                30-day return policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
