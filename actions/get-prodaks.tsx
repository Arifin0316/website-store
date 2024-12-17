import { Prodak } from "@/types";
import qs from "query-string";

const URL = `${process.env.PUBLIC_API_URL}/products`;

interface Query {
  catagoriId?: string;
  isFiatured?: boolean;
}

const getProdaks = async (query: Query): Promise<Prodak[]> => {
  try {
    const queryString = qs.stringify(query, { skipNull: true, skipEmptyString: true });
    const fullUrl = `${URL}?${queryString}`;

    const res = await fetch(fullUrl, {
      // Tambahkan cache configuration
      cache: 'no-store', // Untuk data dinamis
      // atau 
      next: { revalidate: 0 } // Untuk Next.js
    });

    if (!res.ok) {
      const errorText = await res.text(); // Dapatkan pesan error
      console.error('Error response:', errorText);
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export default getProdaks;
