'use client';

import { Prodak } from '@/types';
import Image from 'next/image';
import IconButton from './iconButon';
import { Expand, Heart } from 'lucide-react';
import Currency from './currency';
import { useRouter } from 'next/navigation';
import { MouseEventHandler, useState } from 'react';
import usePrieviewModal from '@/hooks/use-prefiew-modal';

interface ProdakCardProps {
  data: Prodak;
}

const ProdakCard: React.FC<ProdakCardProps> = ({ data }) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);

  const HendleClick = () => {
    router.push(`/prodak/${data?.id}`);
  };

  const PriviewModal = usePrieviewModal();
  const onPrivie: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    PriviewModal.onOpen(data);
  };

  const onLike: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div 
      onClick={HendleClick} 
      className="bg-white group rounded-2xl cursor-pointer p-4 space-y-4 border-2 border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
    >
      {/* Image dan Action */}
      <div className="aspect-square rounded-xl bg-gray-50 relative overflow-hidden shadow-inner">
        <Image 
          alt="image" 
          src={data?.images?.[0]?.url || '/placeholder.png'} 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill={true}
          className="aspect-square object-cover rounded-xl transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute w-full px-6 bottom-5">
          <div className="flex gap-x-4 justify-center">
            <IconButton 
              onClick={onPrivie} 
              icon={<Expand size={20} className="text-gray-600 hover:text-black transition" />} 
            />
            <IconButton 
              onClick={onLike} 
              icon={
                <Heart 
                  size={20} 
                  className={`transition ${
                    isLiked 
                    ? 'text-red-500 fill-red-500' 
                    : 'text-gray-600 hover:text-red-500'
                  }`} 
                />
              } 
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <p className="font-bold text-xl text-gray-900 truncate">{data.name}</p>
        <p className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block">
          {data.catagori?.name}
        </p>
      </div>

      {/* Harga */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <Currency value={data?.price} />
        <div className="text-sm text-green-600 font-semibold">
          Tersedia
        </div>
      </div>
    </div>
  );
};

export default ProdakCard;