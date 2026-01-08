import Herosection from "../components/herosection";
import '../../styles/herosection.css';
import ProductGrid from "../components/productgrid";
import Link from "next/link";
import FeaturesSection from "../components/FeaturesSection";
import NewsletterSection from "../components/NewsletterSection";
import BlogSection from "../components/BlogSection";

export default function HomePage () {
    return (
        <>
            <main className='pt-20 pb-10'>
                <Herosection/>
            </main>

            <div className="my-10 mx-5 lg:mx-0">
                <h3 className="text-center text-3xl font-semibold">
                    New Arrivals Of Our Product Items
                </h3>

                <ProductGrid 
                    limit={9}
                />
                <div className="text-center mt-8">
                    <Link href="/Shop" 
                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        View All Products
                    </Link>
                </div>

                {/* <BlogSection/> */}
                <div className="my-10">
                    <FeaturesSection/>
                </div>
                <section>
                    <NewsletterSection/>
                </section>
            </div>
        </>
    )
};