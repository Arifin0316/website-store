'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import profilImage from "@/public/profil-image/profil.jpg";
import { app } from "@/lib/firebase/init"; // Import Firebase config

const Profil = () => {
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const auth = getAuth(app);
      const db = getFirestore(app);

      // Listener untuk mendeteksi user yang sedang login
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            // Ambil data profil user dari Firestore
            const docRef = doc(db, "users", user.uid); // Asumsi koleksi bernama "users"
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              setName(docSnap.data().name || "Guest"); // Ambil nama user atau fallback ke "Guest"
            } else {
              setError("Profil tidak ditemukan");
            }
          } catch (err) {
            console.error("Error fetching profile:", err);
            setError("Gagal memuat profil");
          }
        } else {
          setName(null); // Reset jika tidak ada user
        }

        setLoading(false);
      });

      return () => unsubscribe(); // Cleanup listener
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div className="text-sm text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-sm text-red-500">{error}</div>;
  }

  return (
    <div className="flex items-center space-x-2 cursor-pointer">
      <Image
        src={profilImage} // Gambar profil dari folder public
        alt="Profil"
        width={40}
        height={40}
        className="rounded-full"
      />
      <span className="text-sm">{name || ""}</span>
    </div>
  );
};

export default Profil;
