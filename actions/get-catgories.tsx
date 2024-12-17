import { Catagori } from "@/types";

const Url = `${process.env.PUBLIC_API_URL}/catagoris`;

const getCatgories = async (): Promise<Catagori[]> => {
  try {
    const res = await fetch(Url, {
      cache: 'no-store', // Disable caching
      // Atau untuk Next.js 13+
      next: { 
        revalidate: 0, // Revalidate setiap saat
        tags: ['categories'] // Optional: untuk revalidasi spesifik
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // Kembalikan array kosong jika error
  }
};

export default getCatgories;