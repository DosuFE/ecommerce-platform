import Herosection from "../components/herosection";
import '../../styles/herosection.css';
import ProductGrid from "../components/productgrid";
import Link from "next/link";

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

                <ProductGrid/>
                <Link href="/Shop" 
                    className="mt-6 flex justify-center text-blue-600 font-medium hover:underline"
                >
                    Shop More
                </Link>

                <section className="text-center bg-slate-50 text-2xl my-20 py-10">
                    <h3 className="">Our Blog</h3>
                </section>
            </div>
        </>
    )
};