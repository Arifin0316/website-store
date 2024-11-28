import getProdak from '@/actions/get-prodak';
import getProdaks from '@/actions/get-prodaks';
import Galeri from '@/components/galeri';
import Info from '@/components/info';
import ProdakList from '@/components/prodak-list';
import Container from '@/components/ui/container';

interface ProdakpageProps {
  params: {
    prodakid: string;
  };
}

const ProdakPage: React.FC<ProdakpageProps> = async ({ params }) => {
  const prodak = await getProdak(params.prodakid);

  const sugestedProdak = await getProdaks({
    catagoriId: prodak?.catagori?.id,
  });
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Galeri Produk */}
            <Galeri images={prodak.images} />

            {/* Informasi Produk */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info data={prodak} />
            </div>
          </div>

          {/* Garis Pemisah */}
          <hr className="my-10 border-gray-200" />

          {/* Produk Terkait */}
          <ProdakList title="Produk Terkait" item={sugestedProdak} />
        </div>
      </Container>
    </div>
  );
};

export default ProdakPage;
