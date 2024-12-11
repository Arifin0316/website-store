import { Banner } from "@/types";


const Ulr = `${process.env.PUBLIC_API_URL}/benners`;


const getBanner = async (): Promise<Banner[]> => {
    const res = await fetch(Ulr);
    return res.json();
};

export default getBanner