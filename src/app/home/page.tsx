import Herosection from "../components/herosection";
import '../../styles/herosection.css';
import ProductGrid from "../components/productgrid";

export default function HomePage () {
    return (
        <>
            <main className='pt-20 pb-10'>
                <Herosection/>
            </main>

            <div className="my-10">
                <h3 className="text-center text-3xl font-semibold">
                    New Arrivals Of Our Product Items
                </h3>

                <ProductGrid/>
            </div>
        </>
    )
};