import { cn } from '@/lib/utils';
import { Images as imagestypes } from '@/types';
import { Tab } from '@headlessui/react';
import Image from 'next/image';

interface GaleriTabProps {
  image: imagestypes;
}

const GaleriTab: React.FC<GaleriTabProps> = ({ image }) => {
  return (
    <Tab className=" relative aspect-square flex cursor-pointer items-center justify-center rounded-md bg-white hover:opacity-80">
      {({ selected }) => (
        <div>
          <span className=" absolute h-full w-full aspect-square inset-0 overflow-hidden">
            <Image alt="image" src={image.url} fill className=" object-cover rounded-md" />
          </span>
          <span className={cn('absolute inset-0 rounded-md ring-2 ring-offset-2', selected ? 'ring-black' : 'ring-transparent')}></span>
        </div>
      )}
    </Tab>
  );
};

export default GaleriTab;
