'use client';
import { useEffect, useState } from "react";
import ProductCard from "../components/productcard";
import { products as localProducts } from "../lib/product";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
  description: string;
  stock: number;
  images: string[];
  rating?: number;
  isNew?: boolean;
  createdAt?: string;
};

export default function ProductGrid({ 
  category = '', 
  sort = '', 
  filter = '', 
  limit 
}: { 
  category?: string; 
  sort?: string;
  filter?: string;
  limit?: number 
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:5000/users", {
          cache: "no-store",
        });
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log("API DATA:", data);
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products from API, using local data:", error);
        setProducts(localProducts);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  let filteredProducts = category 
    ? products.filter(product => product.category === category)
    : products;

  if (filter) {
    switch (filter) {
      case 'in-stock':
        filteredProducts = filteredProducts.filter(product => product.stock > 0);
        break;
      case 'new':
        filteredProducts = filteredProducts.filter(product => 
          product.isNew || (product.createdAt && isNewProduct(product.createdAt))
        );
        break;
      case 'popular':
        filteredProducts = filteredProducts.filter(product => 
          product.rating && product.rating >= 4.0
      );
        break;
        default:
      break;
    }
  }

  const sortedProducts = [...filteredProducts];
  switch (sort) {
    case 'price-asc':
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
    break;
  }

  const displayedProducts = limit 
    ? sortedProducts.slice(0, limit)
    : sortedProducts;

  function isNewProduct(createdAt: string): boolean {
    const createdDate = new Date(createdAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return createdDate > thirtyDaysAgo;
  }

  if (isLoading) {
    return (
      <div className="mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: limit || 8 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
              <div className="bg-gray-300 h-4 rounded mb-2"></div>
              <div className="bg-gray-300 h-4 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      {displayedProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">
            No products found matching your criteria
          </p>
          <p className="text-gray-500">
            Try adjusting your filters or browse all products
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
              />
            ))}
          </div>
          
          {/* {limit && sortedProducts.length > limit && (
            <div className="text-center mt-8">
              <p className="text-gray-600">
                Showing {displayedProducts.length} of {sortedProducts.length} products
              </p>
            </div>
          )} */}
        </>
      )}
    </div>
  );
}