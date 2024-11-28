import { Prodak } from "@/types";

const Ulr = `${process.env.PUBLIC_API_URL}/products`;


const getProdak = async (id: string): Promise<Prodak> => {
    const res = await fetch(`${Ulr}/${id}`);
    return res.json();
};

export default getProdak;