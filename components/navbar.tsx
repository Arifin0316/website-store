import Link from 'next/link';
import Container from './ui/container';
import Mainnav from './ui/mainav';
import getCatgories from '@/actions/get-catgories';

export const revalidate = 0;

async function navbar() {
  const Catagoris = await getCatgories();

  return (
    <div className="border-b bg-white shadow-sm sticky top-0 z-50">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-x-2">
            <p className="font-bold text-2xl text-gray-800 hover:text-gray-900">toko</p>
          </Link>

          {/* Navigation */}
          <Mainnav data={Catagoris} />
        </div>
      </Container>
    </div>
  );
}

export default navbar;
