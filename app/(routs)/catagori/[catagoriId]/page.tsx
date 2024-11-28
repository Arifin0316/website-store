import getCatagori from '@/actions/get-catagori';
import getProdaks from '@/actions/get-prodaks';
import Banner from '@/components/banner';
import Container from '@/components/ui/container';
import NoResult from '@/components/ui/no-result';
import ProdakCard from '@/components/ui/prodakCard';

interface CatagoriPageProps {
  params: { catagoriId: string };
}

const Catagoripage: React.FC<CatagoriPageProps> = async ({ params }) => {
  const prodak = await getProdaks({ catagoriId: params.catagoriId });
  const catagori = await getCatagori(params.catagoriId);
  return (
    <div className="bg-white">
      <Container>
        {/* Banner */}
        <Banner data={catagori.banner} />

        {/* Konten Produk */}
        <div className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mt-6 lg:col-span-4 lg:mt-0">
            {/* No Result */}
            {prodak.length === 0 && <NoResult />}

            {/* Grid Produk */}
            <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {prodak.map((prodak) => (
                <ProdakCard key={prodak.id} data={prodak} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Catagoripage;
