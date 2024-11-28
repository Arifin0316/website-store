import { Banner } from "@/types";

const Ulr = `${process.env.PUBLIC_API_URL}/benners`;


const getBanners = async (id: string): Promise<Banner> => {
    const res = await fetch(`${Ulr}/${id}`);
    return res.json();
};

export default getBanners;