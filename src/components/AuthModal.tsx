import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

export const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, authModalView } = useUIStore();

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={closeAuthModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md p-8 bg-cream dark:bg-dark-bg rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeAuthModal}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
            {authModalView === 'login' ? <SignInForm /> : <SignUpForm />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
