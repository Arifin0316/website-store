'use client';

import { Prodak } from '@/types';
import Link from 'next/link';
import Currency from './ui/currency';
import { Button } from './ui/button';
import { MessageCircleIcon } from 'lucide-react';

interface InfoProps {
  data: Prodak;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const URL = `${window.location.origin}/prodak/${data.id}`;
  const telpon = process.env.NEXT_PUBLIC_TELPON;
  const pesan = `halo saya ingin membeli produk ${data.name} dengan harga ${data.price} dengan link ${URL}`;

  const link = `https://wa.me/${telpon}?text=${pesan}`;
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
        <Link href={link} target="_blank">
          <Button className=" flex items-center gap-x-3">
            chat penjual
            <MessageCircleIcon size={20} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Info;
