import React from 'react';
import Link from 'next/link';
import { ProductCategory } from '@/lib/types';

const Footer: React.FC = () => {
  const categories = [
    { id: ProductCategory.GAME, name: 'Games', path: `/category/${ProductCategory.GAME}` },
    { id: ProductCategory.HARDWARE, name: 'Hardware', path: `/category/${ProductCategory.HARDWARE}` },
    { id: ProductCategory.MERCHANDISE, name: 'Merchandise', path: `/category/${ProductCategory.MERCHANDISE}` },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-card pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div>
            <Link href="/" className="flex items-center">
              <span className="font-display text-2xl text-primary">GameStore</span>
            </Link>
            <p className="mt-4 text-text-secondary text-sm">
              Your one-stop shop for games, gaming hardware, and merchandise.
              Discover the latest releases and find the best gaming gear.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={category.path}
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Contact Us</h3>
            <ul className="space-y-2 text-text-secondary">
              <li>Email: support@gamestore.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Gaming Street, Pixel City</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-background-hover mt-8 pt-8 text-center text-text-secondary text-sm">
          <p>© {currentYear} GameStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;