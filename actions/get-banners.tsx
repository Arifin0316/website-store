import { Banner } from "@/types";

const Url = `${process.env.PUBLIC_API_URL}/benners`;

const getBanner = async (): Promise<Banner[]> => {
 try {
   const res = await fetch(Url, {
     cache: 'no-store', // Disable caching
     // Atau untuk Next.js 13+
     next: { 
       revalidate: 0, // Revalidate setiap saat
       tags: ['banners'] // Optional: untuk revalidasi spesifik
     }
   });

   if (!res.ok) {
     throw new Error(`HTTP error! status: ${res.status}`);
   }

   const data = await res.json();
   return data;
 } catch (error) {
   console.error("Error fetching banners:", error);
   return []; // Kembalikan array kosong jika error
 }
};

export default getBanner;