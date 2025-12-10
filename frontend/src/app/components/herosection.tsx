'use client';
import '../../styles/herosection.css';
import Image from 'next/image';
import bluetoothHeadphone from '../../../public/bluetooth-headphone.jpg';
import laptop from '../../../public/hummingbird-printed-t-laptop.jpg';
import projector from '../../../public/hummingbird-printed-t-shirt.jpg';
import earPhone from '../../../public/bluetooth-earphone.jpg';
import oilFreeFryer from '../../../public/oil-free-fryer.jpg';
import { useEffect, useState } from 'react';

export default function Herosection () {
    const images = [
        bluetoothHeadphone,
        laptop,
        projector,
        earPhone,
        oilFreeFryer
    ];

    const colors = [
        '#F1E9EF', 
        '#C0C4CA', 
        '#4A4F57',
        '#6A6F75', 
        '#C7C9CC'  
    ];

    const [currentImageIndex, setCurrentImageindex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageindex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section>
            <div>
                <h1>
                    Shop Smarter. Live Better.
                </h1>

                <p>
                    Discover unbeatable deals and exclusive offers on top-quality products. 
                    Your one-stop shop for everything you need, all in one place.Explore thousands of quality products from verified sellers worldwide.
                    Secure shopping, great deals, and everything you need — all in one modern 
                    marketplace.
                </p>
            </div>

            <div 
                className='hidden lg:inline-block border-2 rounded-2xl shadow-md'
                style={{
                    borderColor: colors[currentImageIndex], 
                    animation: `glow-animation 3s infinite`, 
                    boxShadow: `0 0 10px ${colors[currentImageIndex]}, 0 0 20px ${colors[currentImageIndex]}, 0 0 30px ${colors[currentImageIndex]}`
                }}
            >
                <Image
                    src={images[currentImageIndex]} 
                    alt={`Image ${currentImageIndex + 1}`}
                    width={400}
                    height={400}
                    className='rounded-2xl'
                />
            </div>

            <style jsx>
                {`
                    @keyframes glow-animation {
                        0% {
                            box-shadow: 0 0 10px ${colors[currentImageIndex]}, 0 0 20px ${colors[currentImageIndex]}, 0 0 30px ${colors[currentImageIndex]};
                        }
                        50% {
                            box-shadow: 0 0 20px ${colors[currentImageIndex]}, 0 0 30px ${colors[currentImageIndex]}, 0 0 40px ${colors[currentImageIndex]};
                        }
                        100% {
                            box-shadow: 0 0 10px ${colors[currentImageIndex]}, 0 0 20px ${colors[currentImageIndex]}, 0 0 30px ${colors[currentImageIndex]};
                        }
                    }
                `}
            </style>
        </section>
    );
}