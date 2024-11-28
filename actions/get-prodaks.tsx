import { Prodak } from "@/types";
import qs from "query-string";

const URL = `${process.env.PUBLIC_API_URL}/products`;

interface Query {
  catagoriId?: string;
  isFiatured?: boolean;
}

const getProdaks = async (query: Query): Promise<Prodak[]> => {
  try {
    // Membuat query string dari parameter
    const queryString = qs.stringify(query, { skipNull: true, skipEmptyString: true });
    const fullUrl = `${URL}?${queryString}`;

    // Fetch data dari API
    const res = await fetch(fullUrl);

    // Memeriksa apakah respons berhasil
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export default getProdaks;
