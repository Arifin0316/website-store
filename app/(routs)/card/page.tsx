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
      return total + (price * item.quantity);
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

  const handleRemoveItem = async (itemId: string) => {
    const result = await Swal.fire({
      title: 'apakah kamu yakin?',
      text: "kamu akan menghapus item ini?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      setIsLoading(true);
      try {
        await removeFromCart(itemId);
        Swal.fire(
          'Deleted!',
          'Item berhasil di hapus.',
          'success'
        );
      } catch (error) {
        Swal.fire(
          'Error!',
          'prodak gagal dihapus.',
          'error'
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClearCart = async () => {
    const result = await Swal.fire({
      title: 'apakah kamu yakin?',
      text: "kamu akan menghapus semua item!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      setIsLoading(true);
      try {
        await clearCart();
        Swal.fire(
          'Cleared!',
          'Your cart has been cleared.',
          'success'
        );
      } catch (error) {
        Swal.fire(
          'Error!',
          'Failed to clear cart.',
          'error'
        );
      } finally {
        setIsLoading(false);
      }
    }
  };



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
                    onClick={() => handleRemoveItem(item.id)}
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
                onClick={handleClearCart}
                className="px-6 py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200 font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                disabled={isLoading}
              >
                <Trash2 className="w-5 h-5" />
                Clear Cart
              </button>
              <button 
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