'use client';

import { useEffect, useState } from 'react';
import Currency from '@/components/ui/currency';
import { useCart } from '@/context/CartContext';
import { Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import Swal from 'sweetalert2';

const MAX_QUANTITY = 99;

const CartPage = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = Number(item.price);
      if (isNaN(price) || price < 0) return total;
      return total + price * item.quantity;
    }, 0);
  };

  const handleQuantityUpdate = async (itemId: string, newQuantity: number) => {
    if (newQuantity > MAX_QUANTITY) return;
    setIsLoading(true);
    try {
      await updateQuantity(itemId, newQuantity);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      Swal.fire('Keranjang Kosong!', 'Tambahkan item ke keranjang sebelum checkout.', 'warning');
      return;
    }
  
    setIsLoading(true);
    try {
      const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      
      const totalAmount = calculateTotal();
      const itemName = cart.length > 1 
        ? `${cart[0].name} dan ${cart.length - 1} item lainnya`
        : cart[0].name;
  
      const orderData = {
        id: orderId,
        name: itemName,
        price: totalAmount,
        quantity: 1,
      };
  
      const response = await fetch('/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const { token } = await response.json();
  
      if (typeof window.snap === 'undefined') {
        throw new Error('Midtrans Snap belum dimuat. Mohon tunggu sebentar dan coba lagi.');
      }
  
      window.snap.pay(token, {
        onSuccess: function(result) {
          Swal.fire('Success!', 'Pembayaran berhasil!', 'success');
          clearCart();
        },
        onPending: function(result) {
          Swal.fire('Info', 'Pembayaran dalam proses', 'info');
        },
        onError: function(result) {
          Swal.fire('Error!', 'Pembayaran gagal', 'error');
        },
        onClose: function() {
          setIsLoading(false);
        }
      });
    } catch (error) {
      Swal.fire('Error!', 
        error instanceof Error ? error.message : 'Terjadi kesalahan saat memproses pembayaran', 
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
    const myMidtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || '';
  
    let scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute('data-client-key', myMidtransClientKey);
  
    const handleScriptLoad = () => {
      console.log('Midtrans Snap loaded successfully');
      // Memastikan window.snap sudah tersedia
      if (typeof window.snap === 'undefined') {
        console.error('Snap object not found');
      }
    };
  
    scriptTag.addEventListener('load', handleScriptLoad);
    scriptTag.addEventListener('error', () => {
      console.error('Failed to load Midtrans Snap');
    });
  
    document.body.appendChild(scriptTag);
  
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        <span className="flex items-center justify-center gap-2">
          <ShoppingCart className="w-8 h-8" />
          Your Shopping Cart
        </span>
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-xl text-gray-600">Your cart is empty</p>
          <p className="text-gray-500 mt-2">Start shopping to add items to your cart</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div role="list" className="divide-y divide-gray-200 bg-white rounded-xl shadow-lg overflow-hidden">
            {cart.map((item) => (
              <div
                key={item.id}
                role="listitem"
                className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex-1">
                  <p className="font-semibold text-lg text-gray-800">{item.name}</p>
                  <Currency value={item.price} />
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-gray-100 rounded-lg">
                    <button
                      onClick={() => handleQuantityUpdate(item.id, Math.max(0, item.quantity - 1))}
                      className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors disabled:opacity-50"
                      disabled={item.quantity <= 1 || isLoading}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-5 h-5 text-gray-600" />
                    </button>
                    <span className="w-12 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors disabled:opacity-50"
                      disabled={item.quantity >= MAX_QUANTITY || isLoading}
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    disabled={isLoading}
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-700">Total:</span>
              <span className="text-2xl font-bold text-gray-900">
                Rp{calculateTotal().toLocaleString()}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                onClick={handleCheckout}
                className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 font-medium shadow-md disabled:opacity-50"
                disabled={isLoading}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CartPage;
