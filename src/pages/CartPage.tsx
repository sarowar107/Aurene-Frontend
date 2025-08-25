import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CartPage = () => {
  const { items, removeFromCart, increaseQuantity, decreaseQuantity } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const { openAuthModal } = useUIStore();
  const subtotal = items.reduce((acc, item) => acc + (item.discountPrice ?? item.price) * item.quantity, 0);



  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <h1 className="text-4xl font-serif font-bold mb-8">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-xl">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-400" />
          <h2 className="mt-4 text-2xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-gray-500">Looks like you haven't added anything yet.</p>
          <Link to="/" className="mt-6 inline-block bg-brand-primary text-white py-3 px-6 rounded-full font-semibold hover:bg-brand-primary/90 transition-colors">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              <AnimatePresence>
                {items.map(item => (
                  <motion.li
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
                    className="flex py-6"
                  >
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                      <img src={item.image_url} alt={item.name} className="h-full w-full object-cover object-center" />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                          <h3>{item.name}</h3>
                          <p className="ml-4">৳{((item.discountPrice ?? item.price) * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-full">
                          <button onClick={() => decreaseQuantity(item.id)} className="p-2"><Minus className="h-4 w-4" /></button>
                          <span className="px-3">{item.quantity}</span>
                          <button onClick={() => increaseQuantity(item.id)} className="p-2"><Plus className="h-4 w-4" /></button>
                        </div>
                        <div className="flex">
                          <button onClick={() => removeFromCart(item.id)} type="button" className="font-medium text-red-500 hover:text-red-700 flex items-center gap-1">
                            <Trash2 className="h-4 w-4" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
          <div className="lg:col-span-1">
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 sticky top-28">
              <h2 className="text-lg font-medium">Order Summary</h2>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Subtotal</p>
                  <p className="text-sm font-medium">৳{subtotal.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                  <p className="text-base font-medium">Order total</p>
                  <p className="text-base font-medium">৳{subtotal.toFixed(2)}</p>
                </div>
              </div>
              {isAuthenticated ? (
                <Link
                  to="/checkout"
                  className="mt-6 w-full bg-brand-primary text-white py-3 px-8 rounded-full flex items-center justify-center text-lg font-semibold hover:bg-brand-primary/90 transition-colors"
                >
                  Confirm Order
                </Link>
              ) : (
                <button
                  onClick={() => openAuthModal('login')}
                  className="mt-6 w-full bg-brand-primary text-white py-3 px-8 rounded-full flex items-center justify-center text-lg font-semibold hover:bg-brand-primary/90 transition-colors"
                >
                  Login to Continue
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
