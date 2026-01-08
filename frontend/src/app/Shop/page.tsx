'use client';
import { useState, useEffect } from 'react';
import ProductGrid from "../components/productgrid";
import CategoryFilter from '../components/categoryFilter';
import { Product, api } from "../lib/api";

export default function ShopPage () {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await api.getProducts();
        setProducts(data);
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.map(product => product.category))
        ).sort();
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    }
    loadData();
  }, []);

  return (
    <div className="pt-20 pb-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
        <p className="text-gray-600 mt-2">Browse our complete collection</p>
        
        {/* Category Filter */}
        <div className="mt-6 flex justify-center">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Show selected category */}
        {selectedCategory && (
          <div className="mt-4">
            <p className="text-blue-600 font-medium">
              Showing: {selectedCategory}
            </p>
          </div>
        )}
      </div>
      
      <ProductGrid category={selectedCategory} />
    </div>
  );
};