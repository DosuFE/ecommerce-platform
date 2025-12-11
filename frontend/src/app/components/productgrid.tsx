'use client';
import { useEffect, useState } from "react";
import ProductCard from "../components/productcard";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
  description: string;
  stock: number;
  images: string[];
};

export default function ProductGrid() {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const res = await fetch("http://localhost:5000/users", {
        cache: "no-store",
      });
      const data = await res.json();
      console.log("API DATA:", data);
      setProducts(data);
    }
    loadProducts();
  }, []);

  return (
    <div className="mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
