'use client';

import { cn } from '@/lib/utils';
import { Catagori } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MainnavProps {
  data: Catagori[];
}

const Mainnav: React.FC<MainnavProps> = ({ data }) => {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/catagori/${route.id}`,
    label: route.name,
    active: pathname === `/catagori/${route.id}`,
  }));
  return (
    <nav className="mx-4 sm:mx-6 lg:mx-8 flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link key={route.href} href={route.href} className={cn('relative text-sm font-medium transition duration-200 hover:text-blue-600', route.active ? 'text-blue-600 font-semibold' : 'text-gray-500')}>
          {route.label}
          {route.active && <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-blue-600 rounded-full"></span>}
        </Link>
      ))}
    </nav>
  );
};

export default Mainnav;
