'use client';

import { Images as imagestypes } from '@/types';
import Image from 'next/image';
import { TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import GaleriTab from './galeriTab';

interface GaleriProps {
  images: imagestypes[];
}

const Galeri: React.FC<GaleriProps> = ({ images }) => {
  return (
    <TabGroup as="div" className=" flex flex-col-reverse">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <TabList className="grid grid-cols-4 gap-6">
          {images.map((image) => (
            <GaleriTab key={image.id} image={image} />
          ))}
        </TabList>
      </div>
      <TabPanels className=" aspect-square w-full">
        {images.map((image) => (
          <TabPanel key={image.id}>
            <div className=" aspect-square relative h-full w-full sm:rounded-md overflow-hidden">
              <Image alt="image" src={image.url} fill className=" object-cover objekt-center rounded-md" />
            </div>
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default Galeri;
