'use client';

import { useRouter } from 'next/navigation';

const PaymentSuccess = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/'); // Arahkan pengguna ke halaman beranda setelah pembayaran
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-green-50 p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-green-700 mb-4">
          Pembayaran Berhasil!
        </h1>
        <p className="text-lg text-center text-gray-700">
          Terima kasih telah melakukan pembayaran. Kami telah menerima pembayaran Anda, dan pesanan Anda sedang diproses.
        </p>

        <div className="mt-8 text-center">
          <button
            onClick={handleBackToHome}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </main>
  );
};

export default PaymentSuccess;
