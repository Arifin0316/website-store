import { Catagori } from "@/types";

const Ulr = `${process.env.PUBLIC_API_URL}/catagoris`;


const getCatgories = async (): Promise<Catagori[]> => {
    const res = await fetch(Ulr);
    return res.json();
};

export default getCatgories