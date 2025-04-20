'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ProductCategory } from '@/lib/types';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const categories = [
    { id: ProductCategory.GAME, name: 'Games', path: `/category/${ProductCategory.GAME}` },
    { id: ProductCategory.HARDWARE, name: 'Hardware', path: `/category/${ProductCategory.HARDWARE}` },
    { id: ProductCategory.MERCHANDISE, name: 'Merchandise', path: `/category/${ProductCategory.MERCHANDISE}` },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-background-card shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="font-display text-2xl text-primary">GameStore</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.path}
                className={`px-3 py-2 text-sm font-medium hover:text-primary transition-colors ${
                  pathname === category.path ? 'text-primary' : 'text-text-secondary'
                }`}
              >
                {category.name}
              </Link>
            ))}
            
            <Link
              href="/products"
              className={`px-3 py-2 text-sm font-medium hover:text-primary transition-colors ${
                pathname === '/products' ? 'text-primary' : 'text-text-secondary'
              }`}
            >
              All Products
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-primary hover:bg-background-hover focus:outline-none"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Menu icon */}
              <svg
                className={`${menuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${menuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${menuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.path}
              className={`block px-3 py-2 text-base font-medium ${
                pathname === category.path
                  ? 'bg-background-hover text-primary'
                  : 'text-text-secondary hover:bg-background-hover hover:text-primary'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {category.name}
            </Link>
          ))}
          
          <Link
            href="/products"
            className={`block px-3 py-2 text-base font-medium ${
              pathname === '/products'
                ? 'bg-background-hover text-primary'
                : 'text-text-secondary hover:bg-background-hover hover:text-primary'
            }`}
            onClick={() => setMenuOpen(false)}
          >
            All Products
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;