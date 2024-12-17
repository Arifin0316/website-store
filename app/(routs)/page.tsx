
import getBanner from '@/actions/get-banners';
import getProdaks from '@/actions/get-prodaks';
import HeroSection from '@/components/herosection';
import ProdakList from '@/components/prodak-list';
import Container from '@/components/ui/container';


const HomePage = async () => {
  const Banner = await getBanner();
  const images = Banner.map((banner) => banner.imageUrl);
  const Prodak = await getProdaks({ isFiatured: true });


  return (
    <div className="bg-gray-100 py-12 ">
      <Container>
        <HeroSection images={images} objectFit="contain" autoPlayInterval={15000} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 pt-12">
          <ProdakList title="prodak ungulan" item={Prodak} />
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
