import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import ModalProvider from '@/providers/modal-provider';
import icon from '@/public/icon.png';
import { CartProvider } from '@/context/CartContext';

const font = Urbanist({ subsets: ['latin'], fallback: ['sans-serif'] });

export const metadata: Metadata = {
  title: 'Yumemart - Toko Online Terlengkap & Terpercaya',
  icons: { icon: "/icon.png" },
  description: 'Belanja online kebutuhan sehari-hari, fashion, elektronik, dan banyak lagi di Yumemart. Dapatkan produk berkualitas dengan harga terbaik dan pengiriman cepat!',
  keywords: ['toko online', 'belanja online', 'produk murah', 'yumemart', 'fashion', 'elektronik', 'promo toko online'],
  authors: [{ name: 'Yumemart Team', url: 'https://yumemart.com' }],
  openGraph: {
    title: 'Yumemart - Toko Online Terlengkap & Terpercaya',
    description: 'Belanja online kebutuhan sehari-hari, fashion, elektronik, dan banyak lagi di Yumemart. Dapatkan produk berkualitas dengan harga terbaik dan pengiriman cepat!',
    url: 'https://yumemart.com',
    siteName: 'Yumemart',
    images: [
      {
        url: 'https://yumemart.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Yumemart - Toko Online Terlengkap & Terpercaya',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yumemart',
    title: 'Yumemart - Toko Online Terlengkap & Terpercaya',
    description: 'Belanja online kebutuhan sehari-hari, fashion, elektronik, dan banyak lagi di Yumemart. Dapatkan produk berkualitas dengan harga terbaik dan pengiriman cepat!',
    images: ['https://yumemart.com/images/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <CartProvider>
          <ModalProvider />
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
