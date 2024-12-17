'use client'

import Image from 'next/image';
import { Heart, ShoppingBag, Star, Truck } from 'lucide-react';
import Container from '@/components/ui/container';
import sara from '@/public/about-images/sara.jpg';
import rina from '@/public/about-images/Rina.jpg';
import michael from '@/public/about-images/Michael.jpg';
import Link from 'next/link';
import { useEffect, useState } from 'react';


const AboutPage = () => {
  const [isMounted, setIsMounted] = useState(false);

 

  const teamMembers = [
    {
      name: 'Sarah Wijaya',
      role: 'Founder & CEO',
      image: sara,
      description: 'Penggerak visi Yumemart untuk memberikan pengalaman belanja terbaik.'
    },
    {
      name: 'Michael Kurniawan',
      role: 'Kepala Operasional',
      image: michael,
      description: 'Bertanggung jawab memastikan kelancaran operasional dan kepuasan pelanggan.'
    },
    {
      name: 'Rina Permata',
      role: 'Direktur Produk',
      image: rina,
      description: 'Ahli dalam memilih dan mengembangkan produk berkualitas.'
    }
  ];

  const keyValues = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: 'Pelayanan Dengan Cinta',
      description: 'Kami melayani setiap pelanggan dengan sepenuh hati dan perhatian.'
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-blue-500" />,
      title: 'Kualitas Terjamin',
      description: 'Setiap produk kami lewati proses seleksi ketat untuk memastikan kualitas terbaik.'
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: 'Kepuasan Pelanggan',
      description: 'Komitmen kami adalah memberikan pengalaman belanja yang tak terlupakan.'
    },
    {
      icon: <Truck className="w-8 h-8 text-green-500" />,
      title: 'Pengiriman Cepat',
      description: 'Layanan pengiriman cepat dan aman ke seluruh wilayah Indonesia.'
    }
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      <Container>
        <div className="py-16 px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Hero Section */}
          <section className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Tentang Yumemart
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              Yumemart lahir dari passion kami untuk memberikan pengalaman belanja online 
              yang mudah, nyaman, dan menyenangkan. Kami percaya setiap transaksi adalah 
              kesempatan untuk membangun hubungan yang bermakna dengan pelanggan.
            </p>
          </section>

          {/* Nilai Inti */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Nilai Inti Kami
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {keyValues.map((value, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className="mb-4 flex justify-center">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Tim Kami */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Tim Kami
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-square relative">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Penutup */}
          <section className="text-center bg-blue-50 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Mari Bertumbuh Bersama
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-700 mb-8">
              Yumemart tidak hanya sekadar toko online. Kami adalah mitra Anda dalam 
              menemukan produk berkualitas yang membuat hidup Anda lebih baik.
            </p>
            <Link
              href="/" 
              className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Mulai Belanja
            </Link>
          </section>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;