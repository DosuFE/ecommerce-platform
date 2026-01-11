'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import '../../styles/nav.css';
import { FiX } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GrUser } from "react-icons/gr";
import { useCart } from "./cartContext";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  const { getCartItemsCount } = useCart();
  const cartItemsCount = getCartItemsCount();

  // Fetch all products for search
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:5000/users");
        if (res.ok) {
          const data = await res.json();
          setAllProducts(data);
        }
      } catch (error) {
        console.error("Failed to fetch products for search:", error);
      }
    }
    fetchProducts();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery("");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;

    // Search in local products first
    const foundProduct = allProducts.find(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (foundProduct) {
      // Redirect to product detail page
      router.push(`/Shop/${foundProduct.id}`);
      setIsSearchOpen(false);
    } else {
      // Redirect to external site (Amazon search)
      const amazonSearchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(searchQuery)}`;
      window.open(amazonSearchUrl, '_blank');
      setIsSearchOpen(false);
    }
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/Shop' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/About' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header>
        <div className="nav-container">
          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <div className="desktop-logo">
              <Link href="/">
                <Image
                  src="https://demo74.leotheme.com/prestashop/premiumo_demo/img/premiumo-logo-1591943899.jpg"
                  alt="Brand Logo"
                  width={160}
                  height={50}
                  priority
                  unoptimized
                />
              </Link>
            </div>

            <div className="desktop-nav-links">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`desktop-nav-link ${isActive(item.href) ? 'active' : ''}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="desktop-actions">
              <button 
                className="action-btn cursor-pointer" 
                aria-label="Search"
                onClick={toggleSearch}
              >
                <CiSearch size={20} />
              </button>
              <Link href="/cart" className="action-btn relative" aria-label="Shopping Cart">
                <HiOutlineShoppingBag size={20} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              <Link href="/account" className="action-btn" aria-label="User Account">
                <GrUser size={20} />
              </Link>
            </div>
          </nav>

          {/* Mobile Navigation */}
          <nav className="mobile-nav">
            <div className="mobile-logo">
              <Link href="/">
                <Image
                  src="https://demo74.leotheme.com/prestashop/premiumo_demo/img/premiumo-logo-1591943899.jpg"
                  alt="Brand Logo"
                  width={120}
                  height={40}
                  priority
                  unoptimized
                />
              </Link>
            </div>

            <div className="mobile-actions">
              <button 
                className="action-btn cursor-pointer" 
                aria-label="Search"
                onClick={toggleSearch}
              >
                <CiSearch size={20} />
              </button>
              <Link href="/cart" className="action-btn relative" aria-label="Shopping Cart">
                <HiOutlineShoppingBag size={20} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              <Link href="/account" className="action-btn" aria-label="User Account">
                <GrUser size={20} />
              </Link>
              
              {/* Hamburger Menu Button */}
              <button
                className={`hamburger-btn ${isSidebarOpen ? 'open' : ''}`}
                onClick={toggleSidebar}
                aria-label="Toggle menu"
              >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="search-modal show">
          <div className="search-container open">
            <div className="search-input-container">
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  autoFocus
                />
                <button type="submit" className="search-submit-btn">
                  <CiSearch size={20} />
                </button>
                <button
                  type="button"
                  className="search-close-btn cursor-pointer"
                  onClick={toggleSearch}
                  aria-label="Close search"
                >
                  <FiX size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Overlay */}
      <div
        className={`overlay ${isSidebarOpen ? 'show' : ''}`}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link href="/" onClick={closeSidebar}>
            <Image
              src="https://demo74.leotheme.com/prestashop/premiumo_demo/img/premiumo-logo-1591943899.jpg"
              alt="Brand Logo"
              width={100}
              height={35}
              priority
              unoptimized
            />
          </Link>
          <button
            className="close-btn"
            onClick={closeSidebar}
            aria-label="Close menu"
          >
            <FiX size={20} />
          </button>
        </div>

        <nav className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
              onClick={closeSidebar}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
}