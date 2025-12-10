'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import { products } from "../lib/product";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import '../../styles/productcard.css';
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

export default function ProductCard({ product }: { product: typeof products[0] }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

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

    const toggleFavorite = () => {
        setIsFavorite((prev) => !prev);
    };

    const renderRating = (rating: number) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <div className="flex products-center">
                {Array.from({ length: fullStars }).map((_, index) => (
                    <BsStarFill key={`full-${index}`} className="text-yellow-500" />
                ))}
                {halfStar && <BsStarHalf className="text-yellow-500" />}
                {Array.from({ length: emptyStars }).map((_, index) => (
                    <BsStar key={`empty-${index}`} className="text-gray-300" />
                ))}
            </div>
        );
    }



    return (
        <article>
            <div className="relative w-full h-72 overflow-hidden group">
                <Image
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="w-full rounded-t-lg transform transition duration-300 group-hover:scale-110"
                />

                <button
                    onClick={toggleFavorite}
                    className="fav-btn"
                    aria-label="Add to Favorites"
                >
                    {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
                </button>
            </div>

            <div className="p-4 w-full">
                <h3 className="text-xl tracking-wider">{product.name}</h3>
                <p className="description tracking-wider">
                    {product.description}
                </p>
                <div className="sub-container">
                    <p>
                         <span className='text-black '>Brand: </span>
                        {product.brand}
                    </p>
                    <p>
                        <span className='text-black '>Category: </span>
                        {product.category}
                    </p>
                    <p>
                        <span className='text-black '>Price: </span>
                        ${product.price}
                    </p>
                    <p>
                        <span className='text-black '>Stock: </span> 
                        {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
                    </p>

                    <main className="flex products-center">
                        <span className='text-black '>Rating:</span>
                        {renderRating(4.5)} 
                    </main>
                </div>

                <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                    Add to Cart
                </button>
            </div>
        </article>
    );
}