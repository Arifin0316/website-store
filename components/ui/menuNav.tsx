'use client';

import Link from 'next/link';
import { Button } from './button';
import { useCart } from '@/context/CartContext'; // Pastikan path import benar
import { ShoppingCart } from 'lucide-react';

const MenuNav = () => {
  const { cart } = useCart(); // Ambil cart dari context

  return (
    <div>
      <nav className="flex items-center space-x-6">
        <span className="bg-gray-300 w-[1px] h-6"></span>
        {/* Menu Navigasi */}
        <Link href="/about">
          <p className="text-gray-600 hover:text-blue-600 transition duration-300">About</p>
        </Link>
        <Link href="/contact">
          <p className="text-gray-600 hover:text-blue-600 transition duration-300">Contact</p>
        </Link>
        <Link href="/card" className="flex items-center">
          <p className="text-gray-600 hover:text-blue-600 transition duration-300 mr-2"><ShoppingCart className="w-6 h-6" /></p>
          {cart.length > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </Link>

        {/* Separator */}
        <span className="bg-gray-300 w-[1px] h-6"></span>

        {/* Tombol Login */}
        <div className="flex items-center space-x-3">
          <Link href="/login">
            <Button variant="elegant">login</Button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default MenuNav;