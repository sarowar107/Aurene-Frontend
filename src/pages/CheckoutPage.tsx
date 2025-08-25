import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCartStore } from '../store/cartStore';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items } = useCartStore();
  const [address, setAddress] = useState('');

  // Calculate the total amount from the cart
  const calculateTotal = () => {
    return items.reduce((total: number, item: { price: number; quantity: number }) => total + item.price * item.quantity, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim() === '') {
      // You can replace this alert with a custom message box UI
      console.error('Please enter a delivery address.');
      return;
    }
    
    const totalAmount = calculateTotal();
    
    // Navigate to the new payment page, passing the total amount in BDT
    navigate('/payment', { state: { totalAmount: totalAmount } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="text-center">
        <h1 className="text-4xl font-serif font-bold mb-2">Delivery Information</h1>
        <p className="text-gray-600 dark:text-gray-400">Please provide your address to complete the order.</p>
      </div>
      <form onSubmit={handleSubmit} className="mt-10 bg-white dark:bg-dark-surface p-8 rounded-xl shadow-lg">
        <div className="space-y-6">
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Delivery Address
            </label>
            <div className="mt-1">
              <textarea
                id="address"
                name="address"
                rows={4}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg shadow-sm focus:border-brand-primary focus:ring-brand-primary sm:text-sm"
                placeholder="123 Main St, Anytown, USA"
                required
              />
            </div>
          </div>
        </div>
        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-brand-primary text-white py-3 px-8 rounded-full flex items-center justify-center text-lg font-semibold hover:bg-brand-primary/90 transition-colors"
          >
            Confirm Address & Place Order
          </button>
        </div>
      </form>
    </motion.div>
  );
};
