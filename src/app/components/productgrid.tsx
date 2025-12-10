import ProductCard from "../components/productcard";
import { products } from "../lib/product"; 

export default function ProductGrid() {
    const items = products;
    return (
        <div className="mx-5 lg:mx-10 pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-4">
            {items.map((item) => (
                <ProductCard
                    key={item.id}
                    item={item}
                />
            ))}
        </div>
    );
}