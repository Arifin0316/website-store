import { Banner as BannerType } from '@/types';

interface BannerProps {
  data: BannerType;
}

const Banner: React.FC<BannerProps> = ({ data }) => {
  return (
    <div className="my-12 shadow-lg rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
      <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
        <div style={{ backgroundImage: `url(${data?.imageUrl})` }} className=" rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover">
          <div className="w-full h-full flex flex-col items-center justify-center text-center gap-y-8">
            <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">{data?.label}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
