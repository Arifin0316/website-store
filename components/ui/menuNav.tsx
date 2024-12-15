'use client';

import Link from 'next/link';
import { Button } from './button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth'; // Sesuaikan path import
import { useRouter } from 'next/navigation';
import Profil from './profil';

const MenuNav = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth(); // Gunakan hook useAuth
  const router = useRouter();

  const handleAuthAction = async () => {
    if (user) {
      // Jika sudah login, maka logout
      try {
        await logout();
        router.push('/login'); // Redirect ke halaman login setelah logout
      } catch (error) {
        console.error('Logout error:', error);
      }
    } else {
      // Jika belum login, redirect ke halaman login
      router.push('/login');
    }
  };

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
        <div>
          <Profil />
        </div>

        {/* Separator */}
        <span className="bg-gray-300 w-[1px] h-6"></span>

        {/* Tombol Login/Logout */}
        <div className="flex items-center space-x-3">
          <Button 
            variant="elegant" 
            onClick={handleAuthAction}
          >
            {user ? 'Logout' : 'Login'}
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default MenuNav;