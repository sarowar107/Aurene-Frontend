import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useCartStore } from '../store/cartStore';

export const ConfirmationPage = () => {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-20 text-center"
    >
      <div className="bg-white dark:bg-dark-surface p-10 rounded-xl shadow-lg">
        <CheckCircle className="h-20 w-20 mx-auto text-green-500" />
        <h1 className="mt-6 text-4xl font-serif font-bold">Order Confirmed!</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Thank you for your purchase. Your order is being processed and will be on its way shortly.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block bg-brand-primary text-white py-3 px-8 rounded-full font-semibold hover:bg-brand-primary/90 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </motion.div>
  );
};
