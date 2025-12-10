'use client';
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import '../../styles/nav.css';
import { FiX } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GrUser } from "react-icons/gr";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/Shop' },
    { name: 'Blog', href: '/blog' },
    { name: 'Page', href: '/page' },
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
              <button className="action-btn" aria-label="Search">
                <CiSearch size={20} />
              </button>
              <button className="action-btn" aria-label="Shopping Cart">
                <HiOutlineShoppingBag size={20} />
              </button>
              <button className="action-btn" aria-label="User Account">
                <GrUser size={20} />
              </button>
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
              <button className="action-btn" aria-label="Search">
                <CiSearch size={20} />
              </button>
              <button className="action-btn" aria-label="Shopping Cart">
                <HiOutlineShoppingBag size={20} />
              </button>
              <button className="action-btn" aria-label="User Account">
                <GrUser size={20} />
              </button>
              
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
}