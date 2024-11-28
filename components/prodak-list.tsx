import { Prodak } from "@/types";
import NoResult from "./ui/no-result";
import ProdakCard from "./ui/prodakCard";


interface prodakProps{
    title: string;
    item: Prodak[];
}

const ProdakList: React.FC<prodakProps> = ({title, item}) => {
    return ( 
        <div className="space-y-4">
          <h3 className="font-bold text-3xl">{title}</h3>
          {item.length === 0 && <NoResult/>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {item.map((item) => (
              <ProdakCard key={item.id} data={item}/>
            ))}
          </div>
        </div>
     );
}
 
export default ProdakList