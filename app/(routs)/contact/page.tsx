'use client';

import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Container from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';


const ContactPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState('idle');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
   const { user } = useAuth();

    useEffect(() => {
       if (user) {
         setIsLoggedIn(true);
       }
     }, [user]);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!isLoggedIn) {
      Swal.fire({
        title: 'Login Diperlukan',
        text: 'Anda harus login terlebih dahulu untuk mengirim pesan',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Login Sekarang',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/login'); // Sesuaikan dengan route login Anda
        }
      });
      return;
    }

    setSubmitStatus('sending');

    try {
      // Simulasi pengiriman pesan
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setSubmitStatus('success');

      // Tampilkan Sweet Alert sukses
      Swal.fire({
        title: 'Berhasil!',
        text: 'Pesan Anda telah berhasil dikirim',
        icon: 'success',
        confirmButtonColor: '#3085d6'
      });
    } catch (error) {
      setSubmitStatus('error');
      
      // Tampilkan Sweet Alert error
      Swal.fire({
        title: 'Error!',
        text: 'Gagal mengirim pesan. Silakan coba lagi.',
        icon: 'error',
        confirmButtonColor: '#3085d6'
      });
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <Container>
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Hubungi Kami
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kami senang mendengar dari Anda! Silakan isi formulir di bawah atau hubungi kami melalui kontak yang tersedia.
            </p>
          </div>

          {/* Konten Utama */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Formulir Kontak */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Masukkan nama Anda"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="email@contoh.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Nomor telepon (opsional)"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Tulis pesan Anda di sini"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={submitStatus === 'sending'}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
                >
                  {submitStatus === 'sending' ? 'Mengirim...' : 'Kirim Pesan'}
                </Button>
              </form>
            </div>

            {/* Informasi Kontak */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Informasi Kontak</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Mail className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-700">Email</p>
                      <p className="text-gray-600">support@yumemart.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Phone className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="font-medium text-gray-700">Telepon</p>
                      <p className="text-gray-600">+62 812-3456-7890</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <MapPin className="w-6 h-6 text-red-500" />
                    <div>
                      <p className="font-medium text-gray-700">Alamat</p>
                      <p className="text-gray-600">
                        Jl. Raya Bisnis No. 123, 
                        Kota Teknologi, 
                        Indonesia 12345
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Jam Operasional */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Jam Operasional</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Senin - Jumat</span>
                    <span className="text-gray-600">09:00 - 17:00 WIB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Sabtu</span>
                    <span className="text-gray-600">10:00 - 14:00 WIB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Minggu & Libur Nasional</span>
                    <span className="text-gray-600">Tutup</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;