'use client';
import { useEffect, useState } from "react";
import ProductCard from "../components/productcard";
import { Product, api } from "../lib/api";

interface ProductGridProps {
  limit?: number;
  category?: string;
}

export default function ProductGrid({ limit, category }: ProductGridProps) {
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

  const filteredProducts = Array.isArray(products) 
    ? (category ? products.filter(product => product.category === category) : products)
  : [];

  const displayedProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {displayedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found{category ? ` in ${category}` : ''}.</p>
        </div>
      )}
    </div>
  );
}