'use client';

import { Prodak } from '@/types';
import Link from 'next/link';
import Currency from './ui/currency';
import { Button } from './ui/button';
import { MessageCircleIcon, ShoppingCartIcon } from 'lucide-react'; // Tambahkan ShoppingCartIcon
import { MouseEventHandler } from 'react';
import { useCart } from '@/context/CartContext';

interface InfoProps {
  data: Prodak;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const URL = `${window.location.origin}/prodak/${data.id}`;
  const telpon = process.env.NEXT_PUBLIC_TELPON;
  const { addToCart } = useCart();
  const pesan = `Halo, saya ingin membeli produk ${data.name} dengan harga ${data.price} dengan link ${URL}`;

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    addToCart({
      id: data.id,
      name: data.name,
      price: Number(data.price),
      quantity: 1,
    }); // Menambahkan produk ke keranjang
  };

  const link = `https://wa.me/${telpon}?text=${encodeURIComponent(pesan)}`; // Encode pesan
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-950">{data.name}</h1>
      <div className="mt-3 flex justify-between items-end">
        <p className=" text-2xl text-gray-950">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="mt-10 flex items-center gap-x-3">
        {/* Tombol Chat Penjual */}
        <Link href={link} target="_blank">
          <Button className="flex items-center gap-x-3">
            Chat Penjual
            <MessageCircleIcon size={20} />
          </Button>
        </Link>
        {/* Tombol Tambah ke Keranjang */}
        <Button onClick={onAddToCart} className="flex items-center gap-x-3">
          Tambah ke Keranjang
          <ShoppingCartIcon size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Info;
