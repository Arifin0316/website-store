'use client';

import { Prodak } from '@/types';
import Image from 'next/image';
import IconButton from './iconButon';
import { Expand } from 'lucide-react';
import Currency from './currency';
import { useRouter } from 'next/navigation';
import { MouseEventHandler } from 'react';
import usePrieviewModal from '@/hooks/use-prefiew-modal';

interface ProdakCardProps {
  data: Prodak;
}

const ProdakCard: React.FC<ProdakCardProps> = ({ data }) => {
  const router = useRouter();

  const HendleClick = () => {
    router.push(`/prodak/${data?.id}`);
  };

  const PriviewModal = usePrieviewModal();
  const onPrivie: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    PriviewModal.onOpen(data);
  };

  return (
    <div onClick={HendleClick} className="bg-white group rounded-xl cursor-pointer p-4 space-y-4 border border-gray-200 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
      {/* Image dan Action */}
      <div className="aspect-square rounded-lg bg-gray-100 relative overflow-hidden">
        <Image alt="image" src={data?.images?.[0]?.url || '/placeholder.png'} fill className="aspect-square object-cover rounded-md transition-transform duration-300 group-hover:scale-105" />
        <div className="opacity-0 group-hover:opacity-100 transition duration-300 absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton onClick={onPrivie} icon={<Expand size={20} className="text-gray-500 hover:text-gray-800 transition" />} />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1">
        <p className="font-semibold text-lg text-gray-800">{data.name}</p>
        <p className="text-sm text-gray-500">{data.catagori?.name}</p>
      </div>

      {/* Harga */}
      <div className="flex items-center justify-between">
        <Currency value={data?.price} />
      </div>
    </div>
  );
};

export default ProdakCard;
