import { useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc 
} from 'firebase/firestore';
import { auth, firestore } from '@/lib/firebase/init';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login error', error);
      throw error;
    }
  };

  const signup = async (
    email: string, 
    password: string, 
    additionalData: {
      name: string;
      phone?: string;
    }
  ) => {
    try {
      // Buat akun pengguna
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Simpan data tambahan ke Firestore
      await setDoc(doc(firestore, 'users', user.uid), {
        email: user.email,
        name: additionalData.name,
        phone: additionalData.phone || '',
        createdAt: new Date()
      });

      return user;
    } catch (error) {
      console.error('Signup error', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  return { user, loading, login, signup, logout };
}