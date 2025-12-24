'use client';
import { useEffect, useState } from "react";
import ProductCard from "../components/productcard";
import { Product, api } from "../lib/api";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const data = await api.getProducts();
        console.log("API DATA:", data);
        setProducts(data);
        setError('');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
        console.error("Error loading products:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-12 mx-10 flex justify-center">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-12 mx-10">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 mx-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}