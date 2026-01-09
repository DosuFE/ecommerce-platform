'use client';
import { useEffect, useState } from "react";
import Herosection from "../components/herosection";
import '../../styles/herosection.css';
import ProductGrid from "../components/productgrid";
import Link from "next/link";
import FeaturesSection from "../components/FeaturesSection";
import NewsletterSection from "../components/NewsletterSection";
import CategoryFilter from "../components/categoryFilter";
import SortFilter from "../components/SortAndFilter";
import { products as localProducts } from "../lib/product";
// import BlogSection from "../components/BlogSection";

const filterOptions = [
  { value: '', label: 'All Products' },
  { value: 'in-stock', label: 'In Stock' },
  { value: 'new', label: 'New Arrivals' },
  { value: 'popular', label: 'Most Popular' }
];

export default function HomePage () {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSort, setSelectedSort] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('');
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        async function loadCategories() {
            try {
                const res = await fetch("http://localhost:5000/users");
                if (res.ok) {
                    const data = await res.json();
                    // Extract unique categories
                    const uniqueCategories = Array.from(
                        new Set(data.map((product: any) => product.category))
                    ).sort();
                    setCategories(uniqueCategories);
                }
            } catch (error) {
                console.error('Error loading categories:', error);
                // Fallback to local categories
                const localCategories = Array.from(
                    new Set(localProducts.map(product => product.category))
                ).sort();
                setCategories(localCategories);
            }
        }
        loadCategories();
    }, []);

    return (
        <>
            <main className='pt-20 pb-10'>
                <Herosection/>
            </main>

            <div className="my-10 mx-5 lg:mx-0">
                <h3 className="text-center text-3xl font-semibold">
                    New Arrivals Of Our Product Items
                </h3>

                {/* Category Filter */}
                <div className="flex justify-center mb-4">
                    <CategoryFilter
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                    />
                </div>

                {/* Sort and Filter Options */}
                <SortFilter
                    selectedSort={selectedSort}
                    onSortChange={setSelectedSort}
                    selectedFilter={selectedFilter}
                    onFilterChange={setSelectedFilter}
                />

                {/* Show selected filters */}
                {(selectedCategory || selectedFilter) && (
                    <div className="text-center mb-6">
                        <p className="text-blue-600 font-medium">
                            {selectedCategory && `Category: ${selectedCategory}`}
                            {selectedCategory && selectedFilter && ' • '}
                            {selectedFilter && `Filter: ${filterOptions.find(opt => opt.value === selectedFilter)?.label}`}
                        </p>
                    </div>
                )}

                <ProductGrid 
                    category={selectedCategory}
                    sort={selectedSort}
                    filter={selectedFilter}
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