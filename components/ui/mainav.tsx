'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from './button';
import { useState } from 'react';
import { Catagori } from '@/types';
import { usePathname } from 'next/navigation';

interface CatagoriNavProps {
  data: Catagori[];
}

const CatagoriNav: React.FC<CatagoriNavProps> = ({ data }) => {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/catagori/${route.id}`,
    label: route.name,
    active: pathname === `/catagori/${route.id}`,
  }));

  return (
    <>
      {/* Tombol Toggle */}
      <div>
        <Button 
          variant={'ghost'} 
          className={`
            ${show ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}
            hover:bg-blue-50 hover:text-blue-600 
            transition duration-300 ease-in-out
            rounded-full px-4
          `} 
          onClick={() => setShow((prev) => !prev)}
        >
          Kategori
        </Button>
      </div>

      {/* Menu Navigasi */}
      {show && (
        <div className="
          absolute top-16 left-0 w-full 
          max-w-full
          bg-white shadow-2xl border-t border-gray-200 
          z-30 py-2
          animate-slide-down
        ">
          <nav className="
            container mx-auto 
            flex flex-col md:flex-row 
            items-center justify-start 
            space-y-2 md:space-y-0 md:space-x-6 
            px-4 py-4
          ">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'relative text-sm font-medium',
                  'px-3 py-1 rounded-full transition duration-300 ease-in-out',
                  route.active 
                    ? 'bg-blue-50 text-blue-600 font-semibold' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default CatagoriNav;