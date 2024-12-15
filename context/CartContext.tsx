'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  DocumentData,
  DocumentReference
} from 'firebase/firestore';
import { app } from '@/lib/firebase/init'; // Adjust the import path to your Firebase config
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

// Ensure price is consistently handled as a number
export interface CartItem {
  id: string;
  name: string;
  price: number; // Explicitly use number for price
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const auth = getAuth(app);
  const db = getFirestore(app);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      // If user is logged in, fetch their cart
      if (currentUser) {
        fetchUserCart(currentUser.uid);
      } else {
        // Reset cart and loading state when no user is logged in
        setCart([]);
        setIsLoading(false);
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  // Fetch user's cart from Firestore
  const fetchUserCart = async (userId: string) => {
    try {
      setIsLoading(true);
      const cartDocRef: DocumentReference<DocumentData> = doc(db, 'carts', userId);
      const cartDoc = await getDoc(cartDocRef);

      if (cartDoc.exists()) {
        const cartData = cartDoc.data()?.items || [];
        // Validate and transform cart data
        const validatedCart: CartItem[] = cartData.map((item: any) => ({
          id: item.id || '',
          name: item.name || '',
          price: Number(item.price) || 0, // Ensure price is a number
          quantity: Number(item.quantity) || 1
        }));
        setCart(validatedCart);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Save entire cart to Firestore
  const saveCartToFirestore = async (userId: string, cartItems: CartItem[]) => {
    if (!userId) return;

    try {
      const cartDocRef = doc(db, 'carts', userId);
      await setDoc(cartDocRef, { items: cartItems });
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const addToCart = async (item: CartItem) => {
    if (!user) {
      // Show SweetAlert login prompt
      const result = await Swal.fire({
        title: 'Silakan Login',
        text: 'Anda harus login terlebih dahulu untuk menambahkan item ke keranjang',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Batal',
        reverseButtons: true
      });

      // If user clicks 'Login', redirect to login page
      if (result.isConfirmed) {
        router.push('/login');
      }
      
      return;
    }

    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        const updatedCart = prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
        saveCartToFirestore(user.uid, updatedCart);
        return updatedCart;
      }
      const newCart = [...prev, { ...item, price: Number(item.price) }]; // Ensure price is a number
      saveCartToFirestore(user.uid, newCart);
      return newCart;
    });
  };

  const removeFromCart = async (id: string) => {
    if (!user) return;

    setCart((prev) => {
      const updatedCart = prev.filter((item) => item.id !== id);
      saveCartToFirestore(user.uid, updatedCart);
      return updatedCart;
    });
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (!user) return;

    if (quantity <= 0) {
      await removeFromCart(id);
      return;
    }

    setCart((prev) => {
      const updatedCart = prev.map((item) => 
        item.id === id ? { ...item, quantity } : item
      );
      saveCartToFirestore(user.uid, updatedCart);
      return updatedCart;
    });
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const cartDocRef = doc(db, 'carts', user.uid);
      await setDoc(cartDocRef, { items: [] }); // Use setDoc instead of deleteDoc to maintain the document
      setCart([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        isLoading 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};