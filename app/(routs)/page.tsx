import getBanners from '@/actions/get-banners';
import getProdaks from '@/actions/get-prodaks';
import Banner from '@/components/banner';
import Container from '@/components/ui/container';
import ProdakList from '@/components/prodak-list';

export const revalidate = 0;

async function Homepage() {
  const Prodak = await getProdaks({ isFiatured: true });
  const banner = await getBanners('563bbe9d-9978-4bb3-b601-2c05bfe1fb8f');

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Banner data={banner} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProdakList title="prodak ungulan" item={Prodak} />
        </div>
      </div> 
    </Container>
  );
}

export default Homepage;
