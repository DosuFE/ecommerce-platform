'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { products } from "../lib/product";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import '../../styles/productcard.css';
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { useCart } from "./cartContext";

export default function ProductCard({ product }: { product: typeof products[0] }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const router = useRouter();
    const { addToCart } = useCart();

    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        async function loadProducts () {
            const res = await fetch('http://localhost:5000/users');
            const data = await res.json();
            console.log("API DATA:", data);
            setProducts(data);
        } loadProducts();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [product.images.length]);

    const toggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFavorite((prev) => !prev);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart(product);
        console.log('Added To Cart:', product.name);
        
    }

    const handleCardClick = () => {
        router.push(`/Shop/${product.id}`);
    };

    const renderRating = (rating: number) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <div className="flex items-center gap-0.5">
                {Array.from({ length: fullStars }).map((_, index) => (
                    <BsStarFill key={`full-${index}`} className="text-yellow-400 w-3 h-3" />
                ))}
                {halfStar && <BsStarHalf className="text-yellow-400 w-3 h-3" />}
                {Array.from({ length: emptyStars }).map((_, index) => (
                    <BsStar key={`empty-${index}`} className="text-gray-300 w-3 h-3" />
                ))}
                <span className="text-xs text-gray-500 ml-1">({rating})</span>
            </div>
        );
    }

    return (
        <article 
            className="product-card group"
            onClick={handleCardClick}
        >
            <div className="product-image-container">
                <Image
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    fill
                    className="product-image"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                <button
                    onClick={toggleFavorite}
                    className="favorite-btn"
                    aria-label="Add to Favorites"
                >
                    {isFavorite ? 
                        <AiFillHeart className="text-red-500 w-5 h-5" /> : 
                        <AiOutlineHeart className="text-gray-600 w-5 h-5 hover:text-red-500" />
                    }
                </button>
            </div>

            <div className="product-content">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">
                    {product.description}
                </p>
                
                <div className="product-details">
                    <div className="detail-item">
                        <span className="detail-label">Brand:</span>
                        <span className="detail-value">{product.brand}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Category:</span>
                        <span className="detail-value">{product.category}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Price:</span>
                        <span className="detail-value font-semibold text-blue-600">${product.price}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Stock:</span>
                        <span className={`detail-value ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
                        </span>
                    </div>
                </div>

                <div className="rating-container">
                    <span className="detail-label">Rating:</span>
                    {renderRating(product.rating || 4.5)}
                </div>

                <button 
                    className="add-to-cart-btn"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                >
                   {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        </article>
    );
}