'use client';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi password
    if (password.length < 6) {
      setError('Password harus minimal 6 karakter');
      return;
    }

    try {
      await signup(email, password, { name, phone });
      router.push('/');
    } catch (err: any) {
      // Tangani error spesifik Firebase
      switch(err.code) {
        case 'auth/email-already-in-use':
          setError('Email sudah terdaftar');
          break;
        case 'auth/invalid-email':
          setError('Format email tidak valid');
          break;
        default:
          setError('Registrasi gagal. Silakan coba lagi.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Daftar Akun</h2>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label 
              htmlFor="name" 
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label 
              htmlFor="email" 
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label 
              htmlFor="phone" 
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nomor Telepon (Opsional)
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label 
              htmlFor="password" 
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 mb-4"
          >
            Daftar
          </button>
          
          <div className="text-center">
            <p className="text-gray-600 mb-2">Sudah punya akun?</p>
            <Link 
              href="/login" 
              className="w-full inline-block text-center bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}