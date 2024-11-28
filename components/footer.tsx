'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-4">Tentang Kami</h4>
            <p className="text-sm text-gray-600">Toko online terpercaya dengan kualitas produk terbaik</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Layanan Pelanggan</h4>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-sm hover:text-blue-600">FAQ</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-blue-600">Hubungi Kami</Link></li>
              <li><Link href="/pengiriman" className="text-sm hover:text-blue-600">Informasi Pengiriman</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Akun Saya</h4>
            <ul className="space-y-2">
              <li><Link href="/akun" className="text-sm hover:text-blue-600">Profil</Link></li>
              <li><Link href="/pesanan" className="text-sm hover:text-blue-600">Riwayat Pesanan</Link></li>
              <li><Link href="/wishlist" className="text-sm hover:text-blue-600">Wishlist</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Ikuti Kami</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-blue-600">
                <Facebook size={24} />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-pink-600">
                <Instagram size={24} />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-400">
                <Twitter size={24} />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center border-t pt-6">
          <p className="text-xs text-gray-600">&copy; 2024 Store. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;