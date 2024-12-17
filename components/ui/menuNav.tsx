'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Profil from './profil';

const MenuNav = () => {
  const pathname = usePathname();
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAuthAction = async () => {
    if (user) {
      try {
        await logout();
        router.push('/login');
        setIsMobileMenuOpen(false);
      } catch (error) {
        console.error('Logout error:', error);
      }
    } else {
      router.push('/login');
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm">
        {/* Hamburger Menu Button */}
        <button 
          className="z-50"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X className="w-8 h-8 text-gray-800" /> : <Menu className="w-8 h-8 text-gray-800" />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        <span className="bg-gray-300 w-[1px] h-6"></span>
        <Link href="/about">
          <p className={`transition duration-300 ${pathname === '/about' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>About</p>
        </Link>
        <Link href="/contact">
          <p className={`transition duration-300 ${pathname === '/contact' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>Contact</p>
        </Link>
        <Link href="/card" className="flex items-center">
          <p className={`transition duration-300 mr-2 ${pathname === '/card' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
            <ShoppingCart className="w-6 h-6" />
          </p>
          {cart.length > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </Link>
        <div>
          <Profil />
        </div>

        <span className="bg-gray-300 w-[1px] h-6"></span>

        <div className="flex items-center space-x-3">
          <Button 
            variant="elegant" 
            onClick={handleAuthAction}
          >
            {user ? 'Logout' : 'Login'}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div 
        className={`
          fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="p-6 space-y-6 mt-16">
          {/* Mobile Menu Profile */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-full">
              <Profil />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <Link href="/about" onClick={closeMobileMenu}>
              <div className={`flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-md transition duration-300 ${pathname === '/about' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}>
                <span>About</span>
              </div>
            </Link>
            <Link href="/contact" onClick={closeMobileMenu}>
              <div className={`flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-md transition duration-300 ${pathname === '/contact' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}>
                <span>Contact</span>
              </div>
            </Link>
            <Link href="/card" onClick={closeMobileMenu}>
              <div className={`flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-md transition duration-300 ${pathname === '/card' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}>
                <ShoppingCart className="w-5 h-5" />
                <span>Cart</span>
                {cart.length > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-2">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </div>
            </Link>
          </div>

          {/* Login/Logout Button */}
          <div className="mt-6">
            <Button 
              variant="elegant" 
              className="w-full"
              onClick={handleAuthAction}
            >
              {user ? 'Logout' : 'Login'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuNav;